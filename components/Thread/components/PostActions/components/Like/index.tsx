import { useEffect, useState } from "react";
import {
  HeartOutlineSVG,
  HeartSolidSVG,
  SVGIconProps,
} from "@/components/SVGIcons";
import { useSelf } from "@/hooks/useSelf";
import type { SpoolThread } from "@/application-types";

type LikeProps = Pick<SpoolThread, "id" | "hasLiked">;

export default function Like({ hasLiked, id }: LikeProps) {
  const [isFilled, setIsFilled] = useState(false);
  const { user } = useSelf();

  useEffect(() => {
    setIsFilled(!!hasLiked);
  }, [hasLiked]);

  const onFavorite: SVGIconProps["onClick"] = async (e) => {
    e.stopPropagation();

    if (!user?.isLoggedIn) {
      return alert("You need to be logged in");
    }

    // Optimistic about the update
    setIsFilled((prev) => !prev);

    if (!isFilled) {
      await fetch(`/api/threads/${id}/like`, { method: "POST" });
    } else {
      await fetch(`/api/threads/${id}/like`, { method: "DELETE" });
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
