import { useSelf } from "@/hooks/useSelf";
import { useState } from "react";
import styles from "./index.module.css";

export default function NotLoggedIn() {
  const [signingIn, setSigningIn] = useState(false);
  const { mutateUser } = useSelf();

  const login = async () => {
    const res = await fetch("/api/login", { method: "POST" });

    const user = await res.json();

    return user;
  };

  const signIn = async () => {
    setSigningIn(true);
    mutateUser(await login());
    window.location.reload();
  };

  let signInText;

  if (signingIn) {
    signInText = <span className={styles.loader}></span>;
  } else {
    signInText = <>Login</>;
  }

  return (
    <div className="fixed border bg-amber-300 border-amber-900 px-4 py-3 rounded-lg text-gray-900 w-96 bottom-8 right-4 text-sm">
      <p>
        You are not logged in currently. Only limited features are available in
        this mode.
      </p>
      <div className="flex items-center justify-end mt-4">
        <a href="https://github.com/callmekatootie/spool#limitations-if-you-dont-login" className="leading-6 font-semibold bg-transparent mr-4" target="_blank">
          Read More
        </a>
        <button
          className="font-semibold py-2 px-3 bg-amber-400 rounded-md w-16"
          onClick={signIn}
        >
          {signInText}
        </button>
      </div>
    </div>
  );
}
