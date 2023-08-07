import useSwr from "swr";

const fetcher = (...args) => {
  return fetch(...args[0]).then((res) => res.json());
};

function useUserTimeline(username) {
  const { data, error, isLoading } = useSwr(
    [`/api/threads?${new URLSearchParams({ u: username })}`, { method: "GET" }],
    fetcher,
  );

  if (isLoading) {
    return {
      spool: [],
      isError: error,
      isLoading,
    };
  }

  const spool = [];

  for (let i = 0; i < data.length; i++) {
    const threadItems = data[i].thread_items;
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

      if (post.text_post_app_info.share_info.reposted_post) {
        reference = post.text_post_app_info.share_info.reposted_post;

        thread.isRepost = true;
        thread.repostedBy = post.user.username;
      }

      thread.handle = reference.user.username;
      thread.profilePic = reference.user.profile_pic_url;

      if (reference.text_post_app_info.reply_to_author) {
        thread.isReply = true;
        thread.replyTo = reference.text_post_app_info.reply_to_author.username;
      }

      // Quotes posts may or may not have a caption text
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

      spool.push(thread);
    }
  }

  return {
    spool,
    isError: error,
    isLoading,
  };
}

export { useUserTimeline };
