export default function CellC({ isInternalNode, isRootNode }) {
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
