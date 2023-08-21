import { useSelf } from "@/hooks/useSelf"
import { useState } from "react"
import ComposeEditor from "./editor"

export default function ComposeThread() {
  const [showEditor, setShowEditor] = useState(false)

  const { user } = useSelf()

  const showModal = () => {
    if (!user?.isLoggedIn) {
      alert("You need to be logged in")

      return
    }

    setShowEditor(true)
  }

  return (
    <>
      <div className="fixed bg-black p-2 rounded-full w-16 h-16 text-white bottom-8 right-4 flex justify-center items-center hover:scale-110" onClick={showModal}>
        <a href="#" className="w-full h-full block text-3xl flex justify-center items-center">
          +
        </a>
      </div>
      {
        showEditor && (
          <ComposeEditor onClose={() => setShowEditor(false)} />
        )
      }
    </>
  )
}
