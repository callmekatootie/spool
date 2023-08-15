import borel from "@/utils/borel";
import Thread from "../Thread";
import { useUserTimeline } from "@/hooks/useUserTimeline";
import Loader from "../Loader";
import { RefreshSolidSVG, TrashOutlineSVG, UserSolidSVG } from "../SVGIcons";

export default function Spool({ username, onDeletion }) {
  const { spool, isError, isLoading, refetch } = useUserTimeline(username);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else {
    content = spool.map((s) => <Thread key={s.id} {...s} />);
  }

  // !TODO - Handle "error" state from api

  return (
    <section className="flex-shrink-0 w-96 flex flex-col h-full mr-1">
      <div className="px-4 bg-white border-b border-gray-300 flex justify-between items-center">
        <div className="flex items-center text-gray-700 font-medium leading-8">
          <UserSolidSVG className="w-4 h-4 text-gray-500 text-lg" />
          <span className={`pt-2 ${borel.className}`}>&nbsp;@{username}</span>
        </div>
        <div className="flex">
          <RefreshSolidSVG
            className="w-6 h-6 text-gray-400 hover:cursor-pointer hover:text-gray-900 mr-2"
            onClick={() => refetch()}
          />
          <TrashOutlineSVG
            className="w-6 h-6 text-gray-400 hover:cursor-pointer hover:text-gray-900"
            onClick={() => onDeletion(username)}
          />
        </div>
      </div>
      <section className="flex flex-col h-full overflow-y-auto overflow-x-hidden border-r pr-1 grow">
        {content}
      </section>
    </section>
  );
}
