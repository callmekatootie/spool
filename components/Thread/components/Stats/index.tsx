import type { SpoolThread } from "@/application-types";

type StatsProps = Pick<SpoolThread, 'likeCount' | 'replyCount'>

function getReplylabel(replyCount: number) {
  const suffix = replyCount === 1 ? "reply" : "replies";

  return `${new Intl.NumberFormat().format(replyCount)} ${suffix}`;
}

function getLikeLabel(likeCount: number) {
  const suffix = `like${likeCount === 1 ? "" : "s"}`;
  return `${new Intl.NumberFormat().format(likeCount)} ${suffix}`;
}

export default function Stats({ likeCount, replyCount }: StatsProps) {
  let markup;

  if (likeCount > 0 && replyCount > 0) {
    markup = (
      <p className="text-gray-400">
        <span className="pr-2">{getReplylabel(replyCount)}</span>
        &#183;
        <span className="pl-2">{getLikeLabel(likeCount)}</span>
      </p>
    );
  } else if (likeCount > 0) {
    markup = <p className="text-gray-400">{getLikeLabel(likeCount)}</p>;
  } else if (replyCount > 0) {
    markup = <p className="text-gray-400">{getReplylabel(replyCount)}</p>;
  }

  return markup;
}
