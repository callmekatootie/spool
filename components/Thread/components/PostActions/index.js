import { EnvelopeOutlineSVG } from "@/components/SVGIcons";
import Like from "./components/Like";
import Reply from "./components/Reply";
import RepostOrQuote from "./components/RepostOrQuote";

export default function PostActions({ post }) {
  return (
    <div className="flex">
      <div className="hover:bg-gray-100 p-2 -ml-3 cursor-pointer rounded-full">
        <Like hasLiked={post.hasLiked} threadId={post.id} />
      </div>
      <div className="hover:bg-gray-100 p-2 cursor-pointer rounded-full">
        <Reply threadId={post.id} handle={post.handle} />
      </div>
      <div className="hover:bg-gray-100 p-2 cursor-pointer rounded-full">
        <RepostOrQuote
          hasReposted={false}
          threadId={post.id}
          handle={post.handle}
        />
      </div>
      <div className="hover:bg-gray-100 p-2 rounded-full opacity-25 cursor-not-allowed">
        <EnvelopeOutlineSVG className="w-6 h-6" />
      </div>
    </div>
  );
}
