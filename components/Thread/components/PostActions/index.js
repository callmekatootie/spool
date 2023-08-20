import {
  EnvelopeOutlineSVG,
  HeartOutlineSVG,
  ReplyOutlineSVG,
  RepostOutlineSVG,
} from "@/components/SVGIcons";
import { useSelf } from "@/hooks/useSelf";

export default function PostActions() {
  const user = useSelf()



  return (
    <div className="flex">
      <div className="hover:bg-gray-100 p-2 -ml-3 hover:cursor-pointer rounded-full">
        <HeartOutlineSVG className="w-6 h-6" />
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
