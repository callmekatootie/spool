import clsx from "clsx";
import TopLeftContent from "./components/TopLeftContent";
import ProfilePic from "./components/ProfilePic";
import ThreadLink from "./components/ThreadLink";
import RepostIndicator from "./components/RepostIndicator";
import Title from "./components/Title";
import ReplyIndicator from "./components/ReplyIndicator";
import PostActions from "./components/PostActions";
import Stats from "./components/Stats";
import QuotedPost from "./QuotedPost";
import TextContent from "./components/TextContent";
import ImageContent from "./components/ImageContent";
import VideoContent from "./components/VideoContent";
import LinkPreviewContent from "./components/LinkPreviewContent";

export default function Thread({
  id,
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
  hasLiked, // Has the current user liked the post?
  isUserVerified // Is the user verified
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
        <TopLeftContent
          isRepost={isRepost}
          isInternalNode={isInternalNode}
          isLeafNode={isLeafNode}
        />
        <ProfilePic handle={handle} profilePic={profilePic} />
        <ThreadLink isInternalNode={isInternalNode} isRootNode={isRootNode} />
      </div>
      <div
        className={clsx("flex flex-col grow pr-3 text-sm", {
          "pb-3": isInternalNode || isRootNode || isLeafNode,
        })}
      >
        <RepostIndicator handle={repostedBy} isRepost={isRepost} />
        <Title handle={handle} createdAt={createdAt} isUserVerified={isUserVerified} />
        <ReplyIndicator isReply={isReply} replyTo={replyTo} />
        <TextContent content={content} />
        {video && <VideoContent url={video} />}
        {!video && <ImageContent image={image} />}
        <LinkPreviewContent linkPreview={linkPreview} />

        {quotedPost && <QuotedPost {...quotedPost} />}

        <PostActions
          post={{ id, handle, hasLiked }}
        />
        <Stats likeCount={likeCount} replyCount={replyCount} />
      </div>
    </article>
  );
}
