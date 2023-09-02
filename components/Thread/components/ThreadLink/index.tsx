import type { SpoolThread } from "@/application-types";

type ThreadLinkProps = Pick<SpoolThread, 'isInternalNode' | 'isRootNode'>

export default function ThreadLink({ isInternalNode, isRootNode }: ThreadLinkProps) {
  let markup;

  if (isInternalNode || isRootNode) {
    markup = (
      <div className="flex justify-center grow pt-1">
        <div className="border-l-2 border-gray-300 h-full"></div>
      </div>
    );
  }

  return markup;
}
