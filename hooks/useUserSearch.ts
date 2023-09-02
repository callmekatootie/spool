import useSwr from "swr";
import { fetcher } from "./common";

function useUserSearch(query: string) {
  const { data, error, isLoading } = useSwr(
    !query ? null : `/api/search/users?q=${encodeURIComponent(query)}`,
    fetcher,
    {
      shouldRetryOnError: false, // Can result in multiple api calls to Threads, which could disable / rate limit the account
      revalidateOnFocus: false,
    },
  );

  return {
    results: data ? data.users : null,
    error,
    isLoading,
  };
}

export { useUserSearch };
