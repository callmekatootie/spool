import type { SpoolThread } from "@/application-types";
import clsx from "clsx";
import Image from "next/image";

type ProfilePicProps = Pick<SpoolThread, 'handle' | 'profilePic'> & { isQuotedPost: boolean }

export default function ProfilePic({
  handle,
  profilePic,
  isQuotedPost = false,
}: ProfilePicProps) {
  return (
    <div
      className={clsx("flex justify-center", {
        "mr-2": isQuotedPost,
      })}
    >
      <Image
        src={profilePic}
        width={0}
        height={0}
        sizes="100vw"
        alt={`${handle}'s avatar`}
        className={clsx("rounded-full", {
          "w-6 h-6": isQuotedPost,
          "w-9 h-9": !isQuotedPost,
        })}
      />
    </div>
  );
}
