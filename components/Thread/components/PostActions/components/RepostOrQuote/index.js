import { useEffect, useState } from "react";
import { RepostOutlineSVG } from "@/components/SVGIcons";
import { useClickAway } from "@uidotdev/usehooks";
import { useSelf } from "@/hooks/useSelf";
import clsx from "clsx";

export default function RepostOrQuote({ hasReposted, threadId }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const ref = useClickAway(() => setShowDropdown(false))
  const { user } = useSelf()

  useEffect(() => {
    setIsFilled(hasReposted)
  }, [hasReposted])

  const onRepost = async () => {
    if (!user?.isLoggedIn) {
      return alert("You need to be logged in");
    }

    // Optimistic about the update
    setIsFilled((prev) => !prev)
    setShowDropdown(false)

    if (!isFilled) {
      await fetch(`/api/threads/${threadId}/repost`, { method: "POST" })

      setIsFilled(true)
    } else {
      await fetch(`/api/threads/${threadId}/repost`, { method: "DELETE" })
      setIsFilled(false)
    }
  }

  return (
    <div className="relative">
      <RepostOutlineSVG className={clsx("w-6 h-6", {
        "text-rose-600": isFilled
      })} onClick={() => setShowDropdown(true)} />
      {
        showDropdown && (
          <section className="absolute top-6 left-0 bg-white shadow z-50 rounded-lg" ref={ref}>
            <ul className="py-2 text-gray-900">
              <li className="opacity-25">
                <a href="#" className="block px-4 py-2 cursor-not-allowed">
                  {isFilled ? "Undo Repost" : "Repost"}
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Quote</a>
              </li>
            </ul>
          </section>
        )
      }
    </div>
  )
}
