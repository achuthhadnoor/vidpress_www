import React from "react";
import { Switch } from "~/components/ui/switch";
import { QualityType, VideoFormats, VideoInputSettings } from "~/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { motion } from "framer-motion";

type VideoControlDetailsProps = {
  videoSettings: VideoInputSettings;
  onVideoSettingsChange: (value: VideoInputSettings) => void;
  disable: boolean;
};

export const VideoInputControl = ({
  videoSettings,
  onVideoSettingsChange,
  disable,
}: VideoControlDetailsProps) => (
  <>
    <div
      key="input"
      className=" rounded-2xl px-4 h-fit"
    >
      <div className="text-sm">
        <div className="flex justify-between items-center  mb-2 pb-2">
          <p>Remove Audio</p>
          <Switch
            disabled={disable}
            onCheckedChange={(value: boolean) =>
              onVideoSettingsChange({ ...videoSettings, removeAudio: value })
            }
            checked={videoSettings.removeAudio}
          />
        </div>
        <div
          className={`flex justify-between items-center ${videoSettings.twitterCompressionCommand ? "" : " mb-2 pb-2"
            }`}
        >
          <p>Compression for Twitter</p>
          <Switch
            disabled={disable}
            onCheckedChange={(value: boolean) =>
              onVideoSettingsChange({
                ...videoSettings,
                twitterCompressionCommand: value,
              })
            }
            checked={videoSettings.twitterCompressionCommand}
          />
        </div>
        {!videoSettings.twitterCompressionCommand && (
          <>
            <div className="flex justify-between items-center  mb-2 pb-2">
              <p>Quality</p>
              <Select
                disabled={disable}
                value={videoSettings.quality}
                onValueChange={(value: string) => {
                  const quality = value as QualityType;
                  onVideoSettingsChange({ ...videoSettings, quality });
                }}
              >
                <SelectTrigger className="w-[100px] text-sm">
                  <SelectValue placeholder="Select Quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {quality.map(({ label, value }) => (
                      <SelectItem value={value} key={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between items-center">
              <p>Formate</p>
              <Select
                disabled={disable}
                value={videoSettings.videoType}
                onValueChange={(value: string) => {
                  const videoType = value as VideoFormats;
                  onVideoSettingsChange({ ...videoSettings, videoType });
                }}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select Quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {formate.map(({ label, value }) => (
                      <SelectItem value={value} key={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>
    </div>
    <hr className="h-px my-2 border-0 bg-gray-700" />
  </>
);

const quality: { label: string; value: QualityType }[] = [
  { label: "High", value: QualityType.Hight },
  { label: "Medium", value: QualityType.Medium },
  { label: "Low", value: QualityType.Low },
];

const formate: { label: string; value: VideoFormats }[] = [
  { label: "MP4 (.mp4)", value: VideoFormats.MP4 },
  { label: "MKV (.mkv)", value: VideoFormats.MKV },
  { label: "AVI (.avi)", value: VideoFormats.AVI },
  { label: "MOV (.mov)", value: VideoFormats.MOV },
  { label: "FLV (.flv)", value: VideoFormats.FLV },
  { label: "WEBM (.webm)", value: VideoFormats.WEBM },
];
