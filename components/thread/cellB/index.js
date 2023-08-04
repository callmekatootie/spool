import Image from "next/image";

export default function CellB({ handle, profilePic }) {
  return (
    <div className="flex justify-center">
      <Image
        src={profilePic}
        width={36}
        height={36}
        alt={`${handle}'s avatar`}
        className="rounded-full"
      />
    </div>
  );
}
