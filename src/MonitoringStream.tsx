import React, { useEffect, useRef, useState } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";

export const MonitoringStream = () => {
  const [videoElement, setVideoElement] = useState<
    JSMpeg.VideoElement | undefined
  >(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current == null) return;

    if (!videoElement)
      setVideoElement(
        new JSMpeg.VideoElement(
          containerRef.current,
          "wss://monitoring.frikanalen.no/",
          {
            videoBufferSize: 512 * 1024 * 20,
            audioBufferSize: 128 * 1024 * 20,
          }
        )
      );

    return () => {
      videoElement?.destroy();
    };
  }, [videoElement]);

  const toggleMute = () => {
    if (!videoElement?.player) return;

    const { player } = videoElement;
    player.setVolume(player.getVolume() > 0 ? 0 : 1);
  };

  return (
    <div className={"aspect-video border-2 border-white"}>
      <div
        className={"w-full h-full"}
        ref={containerRef}
        onClick={toggleMute}
      />
    </div>
  );
};
