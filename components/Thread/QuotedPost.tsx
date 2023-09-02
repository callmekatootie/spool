import ProfilePic from "./components/ProfilePic";
import Title from "./components/Title";
import Stats from "./components/Stats";
import TextContent from "./components/TextContent";
import ImageContent from "./components/ImageContent";
import NestedQuotedPost from "./components/NestedQuotedPost";
import LinkPreviewContent from "./components/LinkPreviewContent";
import { SpoolThreadQuotedPost } from "@/application-types";

export default function QuotedPost({
  content, // Thread body
  createdAt, // Time when the thread was created
  handle, // Handle of author of thread
  likeCount, // # of likes
  profilePic, // Profile picture of author of thread
  nestedQuotedPost, // Details of nested quoted post, if any
  image, // Details of image in quoted post, if any
  linkPreview, // Details of link previews, if any
  isUserVerified, // Is the user verified
}: SpoolThreadQuotedPost) {
  return (
    <article className="border rounded bg-white flex flex-col p-2">
      <div className="flex mb-2">
        <ProfilePic handle={handle} profilePic={profilePic} isQuotedPost />
        <Title
          handle={handle}
          createdAt={createdAt}
          isUserVerified={isUserVerified}
        />
      </div>

      <TextContent content={content} />
      <ImageContent image={image} />
      <LinkPreviewContent linkPreview={linkPreview} />

      <NestedQuotedPost post={nestedQuotedPost} />

      <Stats likeCount={likeCount} replyCount={0} />
    </article>
  );
}
