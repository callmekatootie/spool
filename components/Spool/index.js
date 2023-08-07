import localFont from "next/font/local";
import Thread from "../Thread";
import { useUserTimeline } from "@/hooks";
import Loader from "../Loader";

const borel = localFont({
  src: "../../public/fonts/Borel-Regular.ttf",
});

export default function Spool({ username, onDeletion }) {
  const { spool, isError, isLoading } = useUserTimeline(username);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else {
    content = spool.map((s) => <Thread key={s.id} {...s} />);
  }

  // !TODO - Handle "error" state from api

  return (
    <section className="flex-shrink-0 w-96 flex flex-col h-full mr-1">
      <div
        className="px-4 bg-white border-b border-gray-300 flex justify-between items-center"
      >
        <div className="flex items-center text-gray-700 font-medium leading-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500 text-lg">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
          <span className={`pt-2 ${borel.className}`}>&nbsp;@{username}</span>
        </div>
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400 hover:cursor-pointer hover:text-gray-900" onClick={() => onDeletion(username)}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </div>
      </div>
      <section className="flex flex-col h-full overflow-y-auto overflow-x-hidden border-r pr-1 grow">
        {content}
      </section>
    </section>
  );
}
