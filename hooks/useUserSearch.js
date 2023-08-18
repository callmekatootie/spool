import useSwr  from "swr";
import { fetcher } from "./common";

function useUserSearch(query) {
  const { data, error, isLoading } = useSwr(!query ? null : `/api/search/users?q=${encodeURIComponent(query)}`, fetcher, {
    revalidateOnFocus: false
  })

  return {
    results: data? data.users : null,
    error,
    isLoading
  }
}

export { useUserSearch }
