import borel from "@/utils/borel";

export default function NestedQuotedPost({ post }) {
  if (!post) {
    return null
  }

  if (post.hasImage && post.content.length === 0) {
    return (
      <p className={`text-gray-400 mb-2`}>
        <span className={borel.className}>&#8221;</span> {post.handle}'s photo
      </p>
    )
  }

  return (
    <p className={`text-gray-400 mb-2`}>
      <span className={borel.className}>&#8221;</span> {post.handle}: {post.content}
    </p>
  )
}
