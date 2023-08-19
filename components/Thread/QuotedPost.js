import CellB from "./CellB";
import CellE from "./CellE";
import CellH from "./CellH";
import TextContent from "./TextContent";
import ImageContent from "./ImageContent";
import NestedQuotedPost from "./NestedQuotedPost";
import LinkPreviewContent from "./LinkPreviewContent";

export default function QuotedPost({
  content, // Thread body
  createdAt, // Time when the thread was created
  handle, // Handle of author of thread
  likeCount, // # of likes
  profilePic, // Profile picture of author of thread
  replyCount, // # of replies
  nestedQuotedPost, // Details of nested quoted post, if any
  image, // Details of image in quoted post, if any
  linkPreview, // Details of link previews, if any
}) {
  return (
    <article className="border rounded bg-white flex flex-col p-2">
      <div className="flex mb-2">
        <CellB handle={handle} profilePic={profilePic} isQuotedPost />
        <CellE handle={handle} createdAt={createdAt} />
      </div>

      <TextContent content={content} />
      <ImageContent image={image} />
      <LinkPreviewContent linkPreview={linkPreview} />

      <NestedQuotedPost post={nestedQuotedPost} />

      <CellH likeCount={likeCount} replyCount={replyCount} />
    </article>
  );
}
