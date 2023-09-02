import type { SpoolThread } from "@/application-types";

type VideoContentProps = {
  url: SpoolThread["video"];
};

export default function VideoContent({ url }: VideoContentProps) {
  if (!url) {
    return null;
  }

  /**
   * Specifying controls="" seems to auto play the video. Without it, it won't autoplay for me
   * See - https://stackoverflow.com/a/69802843/2104976
   */
  return (
    <video className="rounded w-full h-auto mb-2" autoPlay loop muted>
      <source
        src={`/api/video?source=${encodeURIComponent(url)}`}
        className="w-full h-auto"
      />
    </video>
  );
}
