import { useEffect, useRef } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";

export const MonitoringStream = ({ muted }: { muted: boolean }) => {
  const playerRef = useRef<JSMpeg.VideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log({ muted });
    if (!playerRef.current) return;
    playerRef.current.player.setVolume(muted ? 0 : 1);
  }, [muted]);

  if (!import.meta.env.VITE_STREAM_URL?.length)
    return <div>Error: VITE_STREAM_URL not set</div>;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (playerRef.current != null) return;
      if (containerRef.current == null) return;

      playerRef.current = new JSMpeg.VideoElement(
        containerRef.current,
        import.meta.env.VITE_STREAM_URL || "",
        {
          videoBufferSize: 512 * 1024 * 20,
          audioBufferSize: 128 * 1024 * 20,
        }
      );
      playerRef.current.player.setVolume(muted ? 0 : 1);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (playerRef.current == null) return;
      playerRef.current.destroy();
      playerRef.current = null;
    };
  }, []);

  return (
    <div className={"aspect-video"}>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};
