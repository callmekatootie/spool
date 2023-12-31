import { MouseEventHandler, useEffect, useState } from "react";
import { RepostOutlineSVG } from "@/components/SVGIcons";
import { useClickAway } from "@uidotdev/usehooks";
import { useSelf } from "@/hooks/useSelf";
import clsx from "clsx";
import ComposeEditor from "@/components/Compose/editor";
import type { SpoolThread } from "@/application-types";

type RepostOrQuoteProps = Pick<SpoolThread, "id" | "handle"> & {
  hasReposted: boolean;
};

export default function RepostOrQuote(props: RepostOrQuoteProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const ref = useClickAway(() => setShowDropdown(false));
  const { user } = useSelf();

  useEffect(() => {
    setIsFilled(props.hasReposted);
  }, [props.hasReposted]);

  const repost: MouseEventHandler = async (e) => {
    e.stopPropagation();

    if (!user?.isLoggedIn) {
      return alert("You need to be logged in");
    }

    if (!isFilled) {
      await fetch(`/api/threads/${props.id}/repost`, { method: "POST" });

      setIsFilled(true);
    } else {
      await fetch(`/api/threads/${props.id}/repost`, {
        method: "DELETE",
      });
      setIsFilled(false);
    }

    // Optimistic about the update
    setIsFilled((prev) => !prev);
    setShowDropdown(false);
  };

  const quote: MouseEventHandler = (e) => {
    e.stopPropagation();

    if (!user?.isLoggedIn) {
      alert("You need to be logged in");

      return;
    }

    setShowEditor(true);
  };

  return (
    <div className="relative">
      <RepostOutlineSVG
        className={clsx("w-6 h-6", {
          "text-rose-600": isFilled,
        })}
        onClick={(e) => {
          e.stopPropagation();
          setShowDropdown(true);
        }}
      />
      {showDropdown && (
        <section
          className="absolute top-6 left-0 bg-white shadow z-50 rounded-lg"
          ref={ref as React.MutableRefObject<HTMLElement>}
        >
          <ul className="py-2 text-gray-900">
            {/* <li onClick={repost}> */}
            <li>
              <a
                href="#"
                className="block px-4 py-2 cursor-not-allowed opacity-25"
              >
                {isFilled ? "Undo Repost" : "Repost"}
              </a>
            </li>
            <li onClick={quote}>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Quote
              </a>
            </li>
          </ul>
        </section>
      )}
      {showEditor && (
        <ComposeEditor
          quotePost={{ ...props }}
          onClose={() => setShowEditor(false)}
        />
      )}
    </div>
  );
}
