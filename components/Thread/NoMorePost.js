import { useSelf } from "@/hooks/useSelf";

export default function NoMorePost() {
  const { user } = useSelf();

  let text;

  if (user?.isLoggedIn) {
    text = (
      <>
        You have reached the beginning of the timeline.
        <br />
        There are no more posts to show.
      </>
    );
  } else {
    text = (
      <>
        You have reached the end.
        <br />
        You cannot view more posts unless you login.
      </>
    );
  }

  return (
    <section>
      <p className="text-center text-gray-400 p-4 bg-white text-xs">{text}</p>
    </section>
  );
}
