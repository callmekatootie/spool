import Image from "next/image";
import type { SpoolThreadLinkPreview } from "@/application-types";

type LinkPreviewContentProps = {
  linkPreview?: SpoolThreadLinkPreview
}

export default function LinkPreviewContent({ linkPreview }: LinkPreviewContentProps) {
  if (!linkPreview) {
    return null;
  }

  const { displayUrl, imageUrl, title, url } = linkPreview;

  return (
    <a
      href={url}
      className="flex flex-col border rounded-b border-gray-200 mb-2"
      target="_blank"
      onClick={(e) => e.stopPropagation()}
    >
      <Image
        src={imageUrl}
        width={0}
        height={0}
        sizes="100vw"
        alt="An image"
        className="rounded-t w-full h-auto mb-2"
      />
      <span className="text-sm text-gray-400 px-4">{displayUrl}</span>
      <p className="text-sm px-4 pb-2">{title}</p>
    </a>
  );
}
