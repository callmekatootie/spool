async function fetcher(...args) {
  const res = await fetch(...args);

  const data = await res.json();

  if (data.message === "login_required") {
    alert(
      "It appears you were automatically logged out by Threads. Refreshing the application to reflect correct state.",
    );

    await fetch("/api/logout", { method: "POST" });

    window.location.reload();
  }

  return data;
}

export { fetcher };
