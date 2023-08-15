import { EnvelopeOutlineSVG, HeartOutlineSVG, ReplyOutlineSVG, RepostOutlineSVG } from "@/components/SVGIcons";

export default function CellG() {
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
      <div className="hover:bg-gray-100 p-2 hover:cursor-pointer rounded-full">
        <EnvelopeOutlineSVG className="w-6 h-6" />
      </div>
    </div>
  );
}
