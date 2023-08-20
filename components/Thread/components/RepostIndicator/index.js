export default function RepostIndicator({ handle, isRepost }) {
  let markup;

  if (isRepost) {
    markup = <p className="text-gray-400 text-sm">{handle} reposted</p>;
  }

  return markup;
}
