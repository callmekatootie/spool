import useSwr from "swr";
import { fetcher } from "./common";

function useUserTimeline(username, cursor) {
  const { data, error, isLoading, mutate } = useSwr(
    `/api/users/${username}?cursor=${cursor ?? ""}`,
    fetcher,
    {
      revalidateOnFocus: false
    }
  );

  if (isLoading) {
    return {
      spool: [],
      isError: error,
      isLoading,
      refetch: mutate,
    };
  }

  const spool = [];

  const { threads } = data

  for (let i = 0; i < threads.length; i++) {
    const threadItems = threads[i].thread_items;
    for (let j = 0; j < threadItems.length; j++) {
      const post = threadItems[j].post;

      let thread = {
        isRepost: false,
        isReply: false,
        likeCount: 0,
        replyCount: 0,
        isRootNode: false,
        isInternalNode: false,
        isLeafNode: false,
      };

      let reference = post;

      // In a repost, the reposted post will have all the details
      // Hence, we use that as reference
      if (post.text_post_app_info.share_info.reposted_post) {
        reference = post.text_post_app_info.share_info.reposted_post;

        thread.isRepost = true;
        thread.repostedBy = post.user.username;

        if (reference.image_versions2.candidates.length > 0) {
          thread.image = reference.image_versions2.candidates.reduce(
            (prev, current) => (prev.width > current.width ? prev : current),
          );
        }
      } else {
        // For some weird reason, a reposted post can have the post's (the post details
        // of the author that reposted) "candidates" attribute to contain some invalid url
        // like "http://static.cdninstagram.com/rsrc.php/null.jpg" even though
        // it's not possible for the author to provide an image along with the repost
        // Hence this exists inside the Else clause...

        if (post.image_versions2.candidates.length > 0) {
          thread.image = post.image_versions2.candidates.reduce(
            (prev, current) => (prev.width > current.width ? prev : current),
          );
        }
      }

      thread.handle = reference.user.username;
      thread.profilePic = reference.user.profile_pic_url;

      if (reference.text_post_app_info.reply_to_author) {
        thread.isReply = true;
        thread.replyTo = reference.text_post_app_info.reply_to_author.username;
      }

      // Post may or may not have a caption text
      thread.content = reference.caption?.text || "";

      thread.likeCount = reference.like_count;

      // !NOTE view_replies_cta_string can be null
      thread.replyCount = parseInt(
        threadItems[j].view_replies_cta_string?.match(/\d+/)[0] ?? 0,
        10,
      );

      if (j === 0 && thread.replyCount === 1 && threadItems.length === 2) {
        // * In this case, the reply count is referring to the next node in the tree
        // * No reply count to be shown in such a case
        thread.replyCount = 0;
      }

      if (j === 0 && threadItems.length > 1) {
        thread.isRootNode = true;
      } else if (j + 1 < threadItems.length) {
        thread.isInternalNode = true;
      } else if (j + 1 === threadItems.length && threadItems.length > 1) {
        thread.isLeafNode = true;
      }

      thread.id = post.id;
      thread.createdAt = post.taken_at;

      // Handle quoted posts
      if (post.text_post_app_info.share_info.quoted_post) {
        const quotedPost = post.text_post_app_info.share_info.quoted_post;
        thread.quotedPost = {
          handle: quotedPost.user.username,
          profilePic: quotedPost.user.profile_pic_url,
          content: quotedPost.caption?.text || "",
          likeCount: quotedPost.like_count,
          createdAt: quotedPost.taken_at,
        };

        if (quotedPost.image_versions2.candidates.length > 0) {
          thread.quotedPost.image =
            quotedPost.image_versions2.candidates.reduce((prev, current) =>
              prev.width > current.width ? prev : current,
            );
        }

        // A quoted post itself can contain another quoted post
        if (quotedPost.text_post_app_info.share_info.quoted_post) {
          const nestedQuotedPost =
            quotedPost.text_post_app_info.share_info.quoted_post;

          thread.quotedPost.nestedQuotedPost = {
            handle: nestedQuotedPost.user.username,
            content: nestedQuotedPost.caption?.text || "",
          };

          if (thread.quotedPost.nestedQuotedPost.content.length === 0) {
            // Check if the nested quoted post contains an image
            // In such a case, the content is `<handle>'s photo`
            if (nestedQuotedPost.image_versions2.candidates.length > 0) {
              thread.quotedPost.nestedQuotedPost.hasImage = true;
            }
          }
        }
      }

      spool.push(thread);
    }
  }

  return {
    spool,
    isError: error,
    isLoading,
    refetch: mutate,
  };
}

export { useUserTimeline };
