import Image from "next/image";

export default function LinkPreviewContent({ linkPreview }) {
  if (!linkPreview) {
    return null;
  }

  const { displayUrl, imageUrl, title, url } = linkPreview;

  return (
    <a
      href={url}
      className="flex flex-col border rounded-b border-gray-200 mb-2"
      target="_blank"
    >
      <Image
        src={imageUrl}
        width={0}
        height={0}
        sizes="100vw"
        alt="An image"
        className="rounded-t w-full h-auto mb-2"
      />
      <span className="text-sm text-gray-400 p-4">{displayUrl}</span>
      <p className="text-sm px-4 pb-4">{title}</p>
    </a>
  );
}
