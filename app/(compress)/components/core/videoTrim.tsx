"use client";
import { useEffect, useState } from "react";
import { VideoSlider } from "~/components/ui/videoSlider";
import { VideoInputSettings } from "~/types";
import { calculateTimeInHoursMinutesSeconds } from "~/utils/timeConverter";
import { motion } from "framer-motion";
type VideoTrimProps = {
  videoSettings: VideoInputSettings;
  onVideoSettingsChange: (value: VideoInputSettings) => void;
  disable: boolean;
};
export const VideoTrim = ({
  onVideoSettingsChange,
  videoSettings,
  disable,
}: VideoTrimProps) => {
  const [videoEndTime, setVideoEndTime] = useState(0);
  const { customEndTime, customStartTime } = videoSettings;
  const startTime = calculateTimeInHoursMinutesSeconds(customStartTime);
  const endTime = calculateTimeInHoursMinutesSeconds(customEndTime);

  useEffect(() => {
    const video = document.getElementById(
      "compress-video-player"
    ) as HTMLVideoElement;
    if (video) {
      const handleLoadedMetadata = () => {
        const durationInSeconds = video.duration;
        onVideoSettingsChange({
          ...videoSettings,
          customEndTime: durationInSeconds,
        });
        setVideoEndTime(durationInSeconds);
      };
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, []);

  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      key="trim"
      transition={{ type: "tween" }}
      className="px-4"
    >
      <div className=" text-sm">
        {/* <div className="flex justify-between items-center mb-2 pb-2">
          <p className="font-semibold">Trim Video</p>
        </div> */}
        <div className="flex justify-between items-center border border-neutral-600 mb-2 rounded-md">
          <VideoSlider
            disabled={disable}
            value={[customStartTime, customEndTime]}
            max={videoEndTime}
            step={1}
            className="w-full"
            onValueChange={(value: number[]) => {
              const [startTime, endTime] = value;
              onVideoSettingsChange({
                ...videoSettings,
                customEndTime: endTime,
                customStartTime: startTime,
              });
            }}
          />
        </div>
        <div className="flex justify-between pb-4">
          <div>
            {/* <p className="text-gray-500">Start Time</p> */}
            <p className="font-medium text-neutral-500">{startTime}</p>
          </div>
          <div>
            {/* <p className="text-gray-500">End Time</p> */}
            <p className="text-end font-medium text-neutral-500">{endTime}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
