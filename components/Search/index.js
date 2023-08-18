import { useSelf } from "@/hooks/useSelf";
import AuthenticatedSearch from "./Authenticated";
import UnAuthenticatedSearch from "./UnAuthenticated";

export default function SearchUsers(props) {
  const { user } = useSelf();

  if (user?.isLoggedIn) {
    return (
      <AuthenticatedSearch
        {...props}
      />
    )
  } else {
    return (
      <UnAuthenticatedSearch
        {...props}
      />
    )
  }
}
