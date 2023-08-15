import { useState } from "react";
import { PlusSolidSVG, TrashOutlineSVG, UserOutlineSVG } from "../SVGIcons";

export default function EmptySpool({ onEnterUsername }) {
  const [showNameInput, setShowNameInput] = useState(false);
  const [handle, setHandle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    onEnterUsername(handle);
    setShowNameInput(false);
    setHandle("");
  };

  if (showNameInput) {
    return (
      <section className="flex-shrink-0 w-96 flex flex-col items-center justify-begin h-full border-r bg-white">
        <label
          className="block text-sm font-medium leading-8 text-gray-900 flex items-center justify-center w-full relative"
          htmlFor="handle"
        >
          Search for users
          <TrashOutlineSVG className="w-6 h-6 text-gray-400 cursor-pointer absolute right-2" onClick={() => setShowNameInput(false)} />
        </label>
        <div className="mt-2 rounded-md">
          <div className="flex relative grow">
            <div className="absolute inset-y-0 left-0 items-center p-3 flex">
              <UserOutlineSVG className="w-6 h-6" />
            </div>
            <form onSubmit={onSubmit}>
              <input
                type="search"
                name="handle"
                id="handle"
                className="leading-6 text-sm text-gray-900 pl-10 py-1.5 rounded-md w-full block focus:outline-0 border-2 border-gray-700"
                placeholder="zuck"
                autoComplete="off"
                spellCheck={false}
                autoFocus
                onChange={(e) => setHandle(e.target.value)}
                value={handle}
              />
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <button
      className="flex-shrink-0 w-96 flex flex-col items-center justify-center h-full border-dashed border rounded-lg border-2 hover:border-gray-700"
      onClick={() => setShowNameInput(true)}
    >
      <PlusSolidSVG className="w-6 h-6" />
      <span className="text-gray-400">Add a new spool</span>
    </button>
  );
}
