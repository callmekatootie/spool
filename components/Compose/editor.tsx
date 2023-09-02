import { MutableRefObject, useReducer } from "react";
import type { SpoolThread } from "@/application-types";
import { CloseOutlineSVG } from "@/components/SVGIcons";
import styles from "./index.module.css";
import { useClickAway } from "@uidotdev/usehooks";

enum DISPATCH_TYPE {
  INVOKED_CLOSE = "invoked_close",
  SUBMITTING_CONTENT = "submitting_content",
  SUBMITTED_CONTENT = "submitted_content",
  UPDATED_CONTENT = "updated_content",
}

const initialState = {
  content: "",
  submitInProgress: false,
};

type ACTION_A = {
  type:
    | DISPATCH_TYPE.INVOKED_CLOSE
    | DISPATCH_TYPE.SUBMITTING_CONTENT
    | DISPATCH_TYPE.SUBMITTED_CONTENT;
};

type ACTION_B = {
  type: DISPATCH_TYPE.UPDATED_CONTENT;
  content: string;
};

type ACTION_TYPES = ACTION_A | ACTION_B;

type ComposeEditorProps = Partial<{
  replyToPost: Pick<SpoolThread, "id" | "handle">;
  quotePost: Pick<SpoolThread, "id" | "handle"> & { hasReposted: boolean };
  onClose: () => void;
}>;

function reducer(state: typeof initialState, action: ACTION_TYPES) {
  switch (action.type) {
    case DISPATCH_TYPE.INVOKED_CLOSE:
    case DISPATCH_TYPE.SUBMITTED_CONTENT:
      return {
        ...state,
        content: "",
        submitInProgress: false,
      };
    case DISPATCH_TYPE.SUBMITTING_CONTENT:
      return {
        ...state,
        submitInProgress: true,
      };
    case DISPATCH_TYPE.UPDATED_CONTENT:
      return {
        ...state,
        content: action.content,
      };
  }
}

export default function ComposeEditor({
  replyToPost,
  quotePost,
  onClose = () => null,
}: ComposeEditorProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const ref = useClickAway(() => closeEditor());

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch({ type: DISPATCH_TYPE.SUBMITTING_CONTENT });

    let endpoint;

    if (replyToPost) {
      endpoint = `/api/threads/${replyToPost.id}/reply`;
    } else if (quotePost) {
      endpoint = `/api/threads/${quotePost.id}/quote`;
    } else {
      endpoint = `/api/threads`;
    }

    await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ text: state.content.trim() }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: DISPATCH_TYPE.SUBMITTED_CONTENT });
    onClose();
  };

  const closeEditor = () => {
    dispatch({ type: DISPATCH_TYPE.INVOKED_CLOSE });
    onClose();
  };

  let title;
  let placeholder;
  let ctaText;

  if (replyToPost) {
    title = <span>Reply to @{replyToPost.handle}</span>;
    placeholder = "Enter your reply";
    ctaText = "Reply";
  } else if (quotePost) {
    title = <span>You are quoting @{quotePost.handle}&apos;s post</span>;
    placeholder = "Share your thoughts";
    ctaText = "Quote";
  } else {
    title = <span>New Thread</span>;
    placeholder = "Share your thoughts";
    ctaText = "Post";
  }

  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/50 flex items-center justify-center">
      <section
        className="bg-white w-2/6 rounded border p-4"
        ref={ref as MutableRefObject<HTMLElement>}
      >
        <label
          className="text-sm font-semibold text-gray-900 flex justify-between block"
          htmlFor="content"
        >
          {title}
          <span>
            <CloseOutlineSVG
              className="w-6 h-6 cursor-pointer"
              onClick={closeEditor}
            />
          </span>
        </label>
        <textarea
          id="content"
          className="w-full border rounded p-2 my-2"
          rows={4}
          placeholder={placeholder}
          onChange={(e) =>
            dispatch({
              type: DISPATCH_TYPE.UPDATED_CONTENT,
              content: e.target.value,
            })
          }
          value={state.content}
          autoFocus
        ></textarea>
        <div className="flex justify-end">
          <button
            type="button"
            className="px-4 py-2 font-semibold text-sm bg-black text-white rounded-md w-20 text-center"
            onClick={onSubmit}
          >
            {state.submitInProgress && <span className={styles.loader}></span>}
            {!state.submitInProgress && <>{ctaText}</>}
          </button>
        </div>
      </section>
    </div>
  );
}
