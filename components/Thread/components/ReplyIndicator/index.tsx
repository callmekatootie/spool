import type { SpoolThread } from "@/application-types";

type ReplyIndicatorProps = Pick<SpoolThread, 'isReply' | 'replyTo'>

export default function ReplyIndicator({ isReply, replyTo }: ReplyIndicatorProps) {
  let markup;

  if (isReply) {
    markup = <p className="text-gray-400 pb-2">Replying to @{replyTo}</p>;
  }

  return markup;
}
