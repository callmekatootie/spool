export default function ReplyIndicator({ isReply, replyTo }) {
  let markup;

  if (isReply) {
    markup = <p className="text-gray-400 pb-2">Replying to @{replyTo}</p>;
  }

  return markup;
}
