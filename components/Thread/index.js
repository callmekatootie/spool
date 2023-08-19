import clsx from "clsx";
import CellA from "./CellA";
import CellB from "./CellB";
import CellC from "./CellC";
import CellD from "./CellD";
import CellE from "./CellE";
import CellF from "./CellF";
import CellG from "./CellG";
import CellH from "./CellH";
import QuotedPost from "./QuotedPost";
import TextContent from "./TextContent";
import ImageContent from "./ImageContent";
import VideoContent from "./VideoContent";
import LinkPreviewContent from "./LinkPreviewContent";

export default function Thread({
  content, // Thread body
  createdAt, // Time when the thread was created
  handle, // Handle of author of thread
  isInternalNode, // Is it part of a tree, but neither root node nor leaf node
  isLeafNode, // Is it the last node in the tree
  isReply, // Is this a reply to another thread?
  isRepost, // Is this thread a repost?
  isRootNode, // Is it the first node in the tree
  likeCount, // # of likes
  profilePic, // Profile picture of author of thread
  replyCount, // # of replies
  replyTo, // If it's a reply, handle of author being replied to
  repostedBy, // Handle of author that reposted
  quotedPost, // Details of quoted post, if any
  video, // Details of video in post, if any
  image, // Details of image in post, if any
  linkPreview, // Details of link previews, if any
}) {
  return (
    <article
      className={clsx("bg-white flex", {
        "pt-3": isRootNode,
        "border-b": isLeafNode,
        "py-3 border-b": !isInternalNode && !isRootNode && !isLeafNode,
      })}
    >
      <div className="flex flex-col w-16 shrink-0">
        <CellA
          isRepost={isRepost}
          isInternalNode={isInternalNode}
          isLeafNode={isLeafNode}
        />
        <CellB handle={handle} profilePic={profilePic} />
        <CellC isInternalNode={isInternalNode} isRootNode={isRootNode} />
      </div>
      <div
        className={clsx("flex flex-col grow pr-3 text-sm", {
          "pb-3": isInternalNode || isRootNode || isLeafNode,
        })}
      >
        <CellD handle={repostedBy} isRepost={isRepost} />
        <CellE handle={handle} createdAt={createdAt} />
        <CellF isReply={isReply} replyTo={replyTo} />
        <TextContent content={content} />
        {
          video && (
            <VideoContent url={video} />
          )
        }
        {
          !video && (
            <ImageContent image={image} />
          )
        }
        <LinkPreviewContent linkPreview={linkPreview} />

        {quotedPost && <QuotedPost {...quotedPost} />}

        <CellG />
        <CellH likeCount={likeCount} replyCount={replyCount} />
      </div>
    </article>
  );
}
