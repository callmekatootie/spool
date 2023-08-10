import getTimeSince from "@/utils/timeSince";

export default function CellE({ handle, createdAt }) {
  const dateTile = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(createdAt * 1000)

  return (
    <div className="flex justify-between leading-6 w-full">
      <a href={`https://threads.net/@${handle}`} className="hover:underline text-gray-900 font-semibold" target="_blank">{handle}</a>
      <time className="text-gray-400" dateTime={(new Date(createdAt * 1000)).toISOString()} title={dateTile}>
        {getTimeSince(createdAt)}
      </time>
    </div>
  );
}
