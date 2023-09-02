import type { SpoolThread } from "@/application-types";
import Image from "next/image";

type ImageContentProps = {
  image: SpoolThread["image"]
}

export default function ImageContent({ image }: ImageContentProps) {
  if (!image) {
    return null;
  }

  return (
    <Image
      src={image.url}
      width={0}
      height={0}
      sizes="100vw"
      alt="An image"
      className="rounded w-full h-auto mb-2"
    />
  );
}
