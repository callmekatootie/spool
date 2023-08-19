import borel from "@/utils/borel";
import Thread from "../Thread";
import { useUserTimeline } from "@/hooks/useUserTimeline";
import Loader from "../Loader";
import { RefreshSolidSVG, TrashOutlineSVG, UserSolidSVG } from "../SVGIcons";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";
import clsx from "clsx";
import NoMorePost from "../Thread/NoMorePost";

export default function Spool({ username, onDeletion }) {
  const {
    spool,
    error,
    isLoading,
    refetch,
    isLoadingMore,
    isEmpty,
    isRefreshing,
    setSize,
    size,
    hasReachedEnd,
  } = useUserTimeline(username);

  const [ref, entry] = useIntersectionObserver();

  let content;

  if (isLoading) {
    content = <Loader />;
  } else {
    content = spool.map((s, i) => <Thread key={`${s.id}${i}`} {...s} />);
  }

  useEffect(() => {
    if (entry?.isIntersecting && !isRefreshing) {
      setSize(size + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting, isRefreshing]);

  const onDelete = () => {
    if (window.confirm("Are you sure you want to remove this spool?")) {
      onDeletion(username)
    }
  }

  // !TODO - Handle "error" state from api
  // !TODO - Handle "isEmpty" state form api

  return (
    <section className="flex-shrink-0 w-96 flex flex-col h-full mr-1">
      <div className="px-4 bg-white border-b border-gray-300 flex justify-between items-center">
        <div className="flex items-center text-gray-700 font-medium leading-8">
          <UserSolidSVG className="w-4 h-4 text-gray-500 text-lg" />
          <span className={`pt-2 ${borel.className}`}>&nbsp;@{username}</span>
        </div>
        <div className="flex">
          <RefreshSolidSVG
            className={clsx(
              "w-6 h-6 text-gray-400 hover:cursor-pointer hover:text-gray-900 mr-2",
              {
                "animate-spin": isRefreshing || isLoading,
              },
            )}
            onClick={() => refetch()}
          />
          <TrashOutlineSVG
            className="w-6 h-6 text-gray-400 hover:cursor-pointer hover:text-gray-900"
            onClick={onDelete}
          />
        </div>
      </div>
      <section className="flex flex-col h-full overflow-y-auto overflow-x-hidden border-r pr-1 grow">
        {content}
        <section ref={ref}>
          {isLoadingMore && (
            <div className="bg-white flex h-16 justify-center">
              <Loader />
            </div>
          )}
        </section>
        {hasReachedEnd && <NoMorePost />}
      </section>
    </section>
  );
}
