import React from "react";

type VideoDisplayProps = {
  videoUrl: string;
};

export const VideoDisplay = ({ videoUrl }: VideoDisplayProps) => (
  <video
    id="compress-video-player"
    className="flex-1 h-full w-full px-4 overflow-auto"
    controls
  >
    <source src={videoUrl} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
);
