import { useState } from "react";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-400 cursor-pointer absolute right-2"
            onClick={() => setShowNameInput(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </label>
        <div className="mt-2 rounded-md">
          <div className="flex relative grow">
            <div className="absolute inset-y-0 left-0 items-center p-3 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-gray-400">Add a new spool</span>
    </button>
  );
}
