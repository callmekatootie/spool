import useSwrInfinite from "swr/infinite";
import { fetcher } from "./common";

const getKey = (pageIndex, previousPageData, username) => {
  if (previousPageData && !previousPageData.cursor) {
    return null;
  }

  if (pageIndex === 0) {
    return `/api/timeline/${encodeURIComponent(username)}`;
  }

  return `/api/timeline/${encodeURIComponent(username)}?cursor=${
    previousPageData.cursor
  }`;
};

function useUserTimeline(username, cursor) {
  const { data, error, isLoading, mutate, size, setSize, isValidating } =
    useSwrInfinite((...args) => getKey(...args, username), fetcher, {
      shouldRetryOnError: false, // Can result in multiple api calls to Threads, which could disable / rate limit the account
      revalidateOnFocus: false,
      persistSize: true,
      revalidateFirstPage: false, // Don't set this to false. See https://github.com/junhoyeo/threads-api/issues/311
    });

  const threads = data
    ? [].concat(...[].concat(...data).map((d) => d.threads))
    : [];
  const hasReachedEnd = data && data.length && !data[data.length - 1].cursor;
  const isLoadingMore =
    !hasReachedEnd && size > 0 && data && typeof data[size - 1] === "undefined";
  const isEmpty = data?.[0]?.threads.length === 0;
  const isRefreshing = isValidating && data && data.length === size;

  const spool = [];

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
      }

      // Capture video content
      if (reference.video_versions.length > 0) {
        thread.video = reference.video_versions[0].url;
      } else if (reference.image_versions2.candidates.length > 0) {
        // Capture image content - either video or image content possible (or neither). Never both together
        thread.image = reference.image_versions2.candidates.reduce(
          (prev, current) => (prev.width > current.width ? prev : current),
        );
      }

      // Capture any link previews
      if (reference.text_post_app_info.link_preview_attachment) {
        const {
          display_url: displayUrl,
          image_url: imageUrl,
          title,
          url,
        } = reference.text_post_app_info.link_preview_attachment;

        thread.linkPreview = { displayUrl, imageUrl, title, url };
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

      if (reference.has_liked) {
        thread.hasLiked = true
      }

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

      thread.id = reference.id;
      thread.createdAt = reference.taken_at;

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

        // Capture video in the quoted post
        if (quotedPost.video_versions.length > 0) {
          thread.quotedPost.video = quotedPost.video_versions[0].url;
        } else if (quotedPost.image_versions2.candidates.length > 0) {
          // Capture image in the quoted post
          thread.quotedPost.image =
            quotedPost.image_versions2.candidates.reduce((prev, current) =>
              prev.width > current.width ? prev : current,
            );
        }

        // Capture link previews in the quoted post
        if (quotedPost.text_post_app_info.link_preview_attachment) {
          const {
            display_url: displayUrl,
            image_url: imageUrl,
            title,
            url,
          } = quotedPost.text_post_app_info.link_preview_attachment;

          thread.quotedPost.linkPreview = { displayUrl, imageUrl, title, url };
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
            // Check if the nested quoted post contains an image (or video)
            // In such a case, the content is `<handle>'s photo` (or <handle>'s video)
            if (nestedQuotedPost.video_versions.length > 0) {
              thread.quotedPost.nestedQuotedPost.hasVideo = true;
            } else if (nestedQuotedPost.image_versions2.candidates.length > 0) {
              thread.quotedPost.nestedQuotedPost.hasImage = true;
            }
          }
        }
      }

      spool.push(thread);
    }
  }

  return {
    hasReachedEnd,
    isEmpty,
    error,
    isLoading,
    isLoadingMore,
    isRefreshing,
    refetch: mutate,
    setSize,
    size,
    spool,
  };
}

export { useUserTimeline };
