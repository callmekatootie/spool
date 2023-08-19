import Image from "next/image";

export default function ImageContent({ image }) {
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
