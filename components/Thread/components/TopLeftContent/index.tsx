import type { SpoolThread } from "@/application-types";
import { RepostOutlineSVG } from "@/components/SVGIcons";

type TopLeftContent = Pick<
  SpoolThread,
  "isRepost" | "isInternalNode" | "isLeafNode"
>;

export default function TopLeftContent({
  isRepost,
  isInternalNode,
  isLeafNode,
}: TopLeftContent) {
  let markup;

  if (isRepost) {
    markup = (
      <div className="pt-0.5 pb-2 pr-2 flex items-center justify-end">
        <RepostOutlineSVG className="text-gray-400 w-4 h-4" />
      </div>
    );
  } else if (isInternalNode || isLeafNode) {
    markup = (
      <div className="flex justify-center pb-1">
        <div className="border-l-2 border-gray-300 h-full"></div>
      </div>
    );
  }

  return markup;
}
