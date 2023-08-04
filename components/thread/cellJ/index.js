function getReplylabel(replyCount) {
  return replyCount === 1 ? "reply" : "replies";
}

function getLikeLabel(likeCount) {
  return `like${likeCount === 1 ? "" : "s"}`;
}

export default function CellH({ likeCount, replyCount }) {
  let markup;

  if (likeCount > 0 && replyCount > 0) {
    markup = (
      <p className="text-gray-400">
        <span className="pr-2">
          {replyCount} {getReplylabel(replyCount)}
        </span>
        &#183;
        <span className="pl-2">
          {likeCount} {getLikeLabel(likeCount)}
        </span>
      </p>
    );
  } else if (likeCount > 0) {
    markup = (
      <p className="text-gray-400">
        {likeCount} {getLikeLabel(likeCount)}
      </p>
    );
  } else if (replyCount > 0) {
    markup = (
      <p className="text-gray-400">
        {replyCount} {getReplylabel(replyCount)}
      </p>
    );
  }

  return markup;
}
