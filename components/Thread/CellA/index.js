export default function CellA({ isRepost, isInternalNode, isLeafNode }) {
  let markup;

  if (isRepost) {
    markup = (
      <div className="pt-0.5 pb-2 pr-2 flex items-center justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="text-gray-400 w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
          />
        </svg>
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