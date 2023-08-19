import { useState } from "react";
import { TrashOutlineSVG, UserOutlineSVG } from "../SVGIcons";

export default function UnAuthenticatedSearch({
  setShowNameInput,
  onEnterUsername,
}) {
  const [handle, setHandle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    onEnterUsername(handle);
    setHandle("");
    setShowNameInput(false);
  };

  return (
    <section className="flex-shrink-0 w-96 flex flex-col items-center justify-begin h-full border-r bg-white mr-96">
      <label
        className="block text-sm font-medium leading-8 text-gray-900 flex items-center justify-center w-full relative"
        htmlFor="handle"
      >
        Enter exact handle of user
        <TrashOutlineSVG
          className="w-6 h-6 text-gray-400 cursor-pointer absolute right-2"
          onClick={() => setShowNameInput(false)}
        />
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
