import { useSelf } from "@/hooks/useSelf"

export default function NotLoggedIn() {
  const { mutateUser } = useSelf()

  const login = async () => {
    const res = await fetch("/api/login", { method: "POST" })

    const user = await res.json()

    return user
  }

  return (
    <div className="fixed border bg-amber-300 border-amber-900 px-4 py-3 rounded-lg text-gray-900 w-96 bottom-8 right-4 text-sm">
      <p>
        You are not logged in currently. Only limited features are available in this mode.
      </p>
      <div className="flex items-center justify-end mt-4">
        <button className="leading-6 font-semibold bg-transparent mr-4">
          Read More
        </button>
        <button className="font-semibold py-2 px-3 bg-amber-400 rounded-md"
          onClick={async () => {
            mutateUser(await login())
          }}
        >
          Login
        </button>
      </div>
    </div>
  )
}
