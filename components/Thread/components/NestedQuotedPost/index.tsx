import borel from "@/utils/borel";
import type { SpoolThreadNestedQuotedPost } from "@/application-types";

type NestedQuotedPost = {
  post?: SpoolThreadNestedQuotedPost;
};

export default function NestedQuotedPost({ post }: NestedQuotedPost) {
  if (!post) {
    return null;
  }

  if (post.hasVideo && post.content.length === 0) {
    return (
      <p className={`text-gray-400 mb-2`}>
        <span className={borel.className}>&#8221;</span> {post.handle}&apos;s
        video
      </p>
    );
  } else if (post.hasImage && post.content.length === 0) {
    return (
      <p className={`text-gray-400 mb-2`}>
        <span className={borel.className}>&#8221;</span> {post.handle}&apos;s
        photo
      </p>
    );
  }
  return (
    <p className={`text-gray-400 mb-2`}>
      <span className={borel.className}>&#8221;</span> {post.handle}:{" "}
      {post.content}
    </p>
  );
}
