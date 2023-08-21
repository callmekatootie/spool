import { useEffect, useState } from "react";
import { HeartOutlineSVG, HeartSolidSVG } from "@/components/SVGIcons";
import { useSelf } from "@/hooks/useSelf";

export default function Like({ hasLiked, threadId }) {
  const [isFilled, setIsFilled] = useState(false);
  const { user } = useSelf();

  useEffect(() => {
    setIsFilled(hasLiked);
  }, [hasLiked]);

  const onFavorite = async (e) => {
    e.stopPropagation()

    if (!user?.isLoggedIn) {
      return alert("You need to be logged in");
    }

    // Optimistic about the update
    setIsFilled((prev) => !prev);

    if (!isFilled) {
      await fetch(`/api/threads/${threadId}/like`, { method: "POST" });
    } else {
      await fetch(`/api/threads/${threadId}/like`, { method: "DELETE" });
    }
  };

  if (isFilled) {
    return (
      <HeartSolidSVG className="w-6 h-6 text-rose-600" onClick={onFavorite} />
    );
  } else {
    return <HeartOutlineSVG className="w-6 h-6" onClick={onFavorite} />;
  }
}
