import useSwr from "swr"
import { fetcher } from "./common"

function useSelf() {
  const { data: user, mutate } = useSwr("/api/me", fetcher)

  return {
    user,
    mutateUser: mutate
  }
}

export { useSelf }
