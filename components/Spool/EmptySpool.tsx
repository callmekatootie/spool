import { useState } from "react";
import { PlusSolidSVG } from "../SVGIcons";
import SearchUsers from "../Search";

type EmptySpoolProps = {
  onEnterUsername: (handle: string) => void
}

export default function EmptySpool({ onEnterUsername }: EmptySpoolProps) {
  const [showNameInput, setShowNameInput] = useState(false);

  if (showNameInput) {
    return (
      <SearchUsers
        setShowNameInput={setShowNameInput}
        onEnterUsername={onEnterUsername}
      />
    );
  }

  return (
    <button
      className="flex-shrink-0 w-96 flex flex-col items-center justify-center h-full border-dashed border rounded-lg border-2 hover:border-gray-700 mr-96"
      onClick={() => setShowNameInput(true)}
    >
      <PlusSolidSVG className="w-6 h-6" />
      <span className="text-gray-400">Add a new spool</span>
    </button>
  );
}
