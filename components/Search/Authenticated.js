import { useState } from "react";
import { TrashOutlineSVG, UserOutlineSVG } from "../SVGIcons";
import { useUserSearch } from "@/hooks/useUserSearch";
import Loader from "../Loader";
import Image from "next/image";

export default function AuthenticatedSearch({
  setShowNameInput,
  onEnterUsername,
}) {
  const [handle, setHandle] = useState("");
  const [query, setQuery] = useState();

  const { results, error, isLoading } = useUserSearch(query);

  let searchResults;

  const onSubmit = (e) => {
    e.preventDefault();

    setQuery(handle);
  };

  const onSelectResult = (username) => {
    onEnterUsername(username);
    setHandle("");
    setShowNameInput(false);
  };

  if (isLoading) {
    searchResults = <Loader />;
  } else if (results?.length) {
    searchResults = (
      <ul>
        {results.map((r) => (
          <li
            key={r.pk}
            className="flex items-center p-2 hover:bg-gray-100 hover:cursor-pointer"
            onClick={() => onSelectResult(r.username)}
          >
            <Image
              src={r.profile_pic_url}
              width={0}
              height={0}
              sizes="100vw"
              alt={`${r.username}'s avatar`}
              className="rounded-full w-6 h-6"
            />
            <div className="flex flex-col">
              <span className="text-sm ml-3">{r.username}</span>
              <span className="text-sm text-gray-400 ml-3">{r.full_name}</span>
            </div>
          </li>
        ))}
      </ul>
    );
  } else if (results && !results.length && handle.length) {
    searchResults = (
      <p className="text-center text-gray-400 p-4 bg-white text-xs">
        No users found
      </p>
    );
  }

  return (
    <section className="flex-shrink-0 w-96 flex flex-col items-center justify-begin h-full border-r bg-white mr-96">
      <label
        className="block text-sm font-medium leading-8 text-gray-900 flex items-center justify-center w-full relative"
        htmlFor="handle"
      >
        Search for users
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
      <section className="flex flex-col h-full overflow-y-auto overflow-x-hidden p-4 grow w-full">
        {searchResults}
      </section>
    </section>
  );
}
