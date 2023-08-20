import {
  EnvelopeOutlineSVG,
  ReplyOutlineSVG,
  RepostOutlineSVG,
} from "@/components/SVGIcons";
import Like from "./components/Like";
import Reply from "./components/Reply";

export default function PostActions({ post }) {
  return (
    <div className="flex">
      <div className="hover:bg-gray-100 p-2 -ml-3 hover:cursor-pointer rounded-full">
        <Like hasLiked={post.hasLiked} threadId={post.id} />
      </div>
      <div className="hover:bg-gray-100 p-2 hover:cursor-pointer rounded-full">
        <Reply id={post.id} handle={post.handle} />
      </div>
      <div className="hover:bg-gray-100 p-2 hover:cursor-pointer rounded-full">
        <RepostOutlineSVG className="w-6 h-6" />
      </div>
      <div className="hover:bg-gray-100 p-2 hover:cursor-pointer rounded-full opacity-25">
        <EnvelopeOutlineSVG className="w-6 h-6" />
      </div>
    </div>
  );
}
