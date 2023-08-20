import {
  EnvelopeOutlineSVG,
  ReplyOutlineSVG,
  RepostOutlineSVG,
} from "@/components/SVGIcons";
import Like from "./components/Like";

export default function PostActions({ hasLiked, threadId }) {
  return (
    <div className="flex">
      <div className="hover:bg-gray-100 p-2 -ml-3 hover:cursor-pointer rounded-full">
        <Like />
      </div>
      <div className="hover:bg-gray-100 p-2 hover:cursor-pointer rounded-full">
        <ReplyOutlineSVG className="w-6 h-6" />
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
