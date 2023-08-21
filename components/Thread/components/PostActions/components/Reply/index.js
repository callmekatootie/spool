import { useState } from "react";
import { ReplyOutlineSVG } from "@/components/SVGIcons";
import { useSelf } from "@/hooks/useSelf";
import ComposeEditor from "@/components/Compose/editor";

export default function Reply(props) {
  const [showEditor, setShowEditor] = useState(false);

  const { user } = useSelf();

  const showModal = (e) => {
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
