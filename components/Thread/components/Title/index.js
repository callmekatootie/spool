import { VerifiedSolidSVG } from "@/components/SVGIcons";
import getTimeSince from "@/utils/timeSince";

export default function Title({ handle, createdAt, isUserVerified }) {
  const dateTile = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(createdAt * 1000);

  return (
    <div className="flex justify-between leading-6 w-full">
      <span className="flex items-center">
        <a
          href={`https://threads.net/@${handle}`}
          className="hover:underline text-gray-900 font-semibold mr-2"
          target="_blank"
        >
          {handle}
        </a>
        {
          isUserVerified && (
            <VerifiedSolidSVG className="w-4 h-4 text-sky-400" />
          )
        }
      </span>
      <time
        className="text-gray-400"
        dateTime={new Date(createdAt * 1000).toISOString()}
        title={dateTile}
      >
        {getTimeSince(createdAt)}
      </time>
    </div>
  );
}
