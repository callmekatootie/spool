import { useState, useReducer } from "react";
import { CloseOutlineSVG, ReplyOutlineSVG } from "@/components/SVGIcons";
import { useSelf } from "@/hooks/useSelf";
import styles from "./index.module.css";
import { useClickAway } from "@uidotdev/usehooks";

const DISPATCH_TYPE = {
  REPLY_INVOKED: "reply_invoked",
  INVOKED_CLOSE: "invoked_close",
  SUBMITTING_REPLY: "reply_submitting",
  SUBMITTED_REPLY: "reply_submitted",
  UPDATED_REPLY: "updated_reply"
}

function reducer(state, action) {
  switch(action.type) {
    case DISPATCH_TYPE.REPLY_INVOKED:
      return {
        ...state,
        showModal: true
      }
    case DISPATCH_TYPE.INVOKED_CLOSE:
    case DISPATCH_TYPE.SUBMITTED_REPLY:
      return {
        ...state,
        content: "",
        showModal: false,
        submitInProgress: false
      }
    case DISPATCH_TYPE.SUBMITTING_REPLY:
      return {
        ...state,
        submitInProgress: true
      }
    case DISPATCH_TYPE.UPDATED_REPLY:
      return {
        ...state,
        content: action.content,
      }
    default:
      throw Error(`Unknown action ${action.type}`)
  }
}

export default function Reply(props) {
  const [state, dispatch] = useReducer(reducer, {
    content: "",
    showModal: false,
    submitInProgress: false
  })

  const ref = useClickAway(() => dispatch({ type: DISPATCH_TYPE.INVOKED_CLOSE }))

  const { user } = useSelf()

  const showModal = () => {
    if (!user?.isLoggedIn) {
      alert("You need to be logged in")

      return
    }

    dispatch({ type: DISPATCH_TYPE.REPLY_INVOKED })
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: DISPATCH_TYPE.SUBMITTING_REPLY })

    await fetch(`/api/threads/${props.id}/reply`, {
      method: "POST",
      body: JSON.stringify({ text: state.content.trim() }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })

    dispatch({ type: DISPATCH_TYPE.SUBMITTED_REPLY })
  }

  return (
    <>
      <ReplyOutlineSVG className="w-6 h-6" onClick={showModal} />
      {
        state.showModal && (
          <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/50 flex items-center justify-center">
            <section className="bg-white w-2/6 rounded border p-4" ref={ref}>
              <label className="text-sm font-semibold text-gray-900 flex justify-between block" htmlFor="reply">
                <span>Reply to @{props.handle}</span>
                <span>
                  <CloseOutlineSVG className="w-6 h-6 cursor-pointer" onClick={() => dispatch({ type: DISPATCH_TYPE.INVOKED_CLOSE })} />
                </span>
              </label>
              <textarea
                id="reply"
                className="w-full border rounded p-2 my-2"
                rows={4}
                placeholder="Enter your reply"
                onChange={(e) => dispatch({ type: DISPATCH_TYPE.UPDATED_REPLY, content: e.target.value })}
                value={state.content}
                autoFocus></textarea>
              <div className="flex justify-end">
                <button type="button" className="px-4 py-2 font-semibold text-sm bg-black text-white rounded-md w-20 text-center" onClick={onSubmit}>
                  {
                    state.submitInProgress && (
                      <span className={styles.loader}></span>
                    )
                  }
                  {
                    !state.submitInProgress && (
                      <>Reply</>
                    )
                  }
                </button>
              </div>
            </section>            
          </div>
        )
      }
    </>
  )
}
