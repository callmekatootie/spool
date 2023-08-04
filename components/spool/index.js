import localFont from "next/font/local";
import Thread from "../thread";
import { useUserTimeline } from "@/hooks";
import Loader from "../loader";

const borel = localFont({
  src: "../../public/fonts/Borel-Regular.ttf",
});

export default function Spool({ username }) {
  const { spool, isError, isLoading } = useUserTimeline(username);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else {
    content = spool.map((s) => <Thread key={s.id} {...s} />);
  }

  return (
    <section className="flex-shrink-0 w-96 flex flex-col h-full mr-1">
      <h3
        className={`text-gray-700 mb-1 font-medium text-center ${borel.className}`}
      >
        <span className="text-gray-400 text-lg">User:</span>&nbsp; @{username}
      </h3>
      <section className="flex flex-col h-full overflow-y-auto overflow-x-hidden border-r pr-1 grow">
        {content}
      </section>
    </section>
  );
}
