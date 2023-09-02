import { useState } from "react";
import { ReplyOutlineSVG, SVGIconProps } from "@/components/SVGIcons";
import { useSelf } from "@/hooks/useSelf";
import ComposeEditor from "@/components/Compose/editor";
import type { SpoolThread } from "@/application-types";

type ReplyProps = Pick<SpoolThread, "id" | "handle">;

export default function Reply(props: ReplyProps) {
  const [showEditor, setShowEditor] = useState(false);

  const { user } = useSelf();

  const showModal: SVGIconProps["onClick"] = (e) => {
    e.stopPropagation();

    if (!user?.isLoggedIn) {
      alert("You need to be logged in");

      return;
    }

    setShowEditor(true);
  };

  return (
    <>
      <ReplyOutlineSVG className="w-6 h-6" onClick={showModal} />
      {showEditor && (
        <ComposeEditor
          replyToPost={{ ...props }}
          onClose={() => setShowEditor(false)}
        />
      )}
    </>
  );
}
