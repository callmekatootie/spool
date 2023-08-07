export default function CellE({ handle, createdDate }) {
  return (
    <div className="flex justify-between leading-6">
      <span className="text-gray-900 font-semibold">{handle}</span>
      <time className="text-gray-400" dateTime="2023-07-23T15:56">
        {createdDate}
      </time>
    </div>
  );
}
