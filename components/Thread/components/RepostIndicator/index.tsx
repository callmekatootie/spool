import type { SpoolThread } from "@/application-types";

type RepostIndicatorProps = Pick<SpoolThread, 'handle' | 'isRepost'>

export default function RepostIndicator({ handle, isRepost }: RepostIndicatorProps) {
  let markup;

  if (isRepost) {
    markup = <p className="text-gray-400 text-sm">{handle} reposted</p>;
  }

  return markup;
}
