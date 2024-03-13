import React, { useEffect, useRef, useState } from "react";
import { acceptedVideoFiles } from "../utils/formats";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { toast } from "sonner";
import convertFile from "../utils/convert";
import { VideoDisplay } from "./core/videoDisplay";
import { CustomDropZone } from "./core/customDropZone";
import { VideoInputDetails } from "./core/videoInputDetails";
import { VideoInputControl } from "./core/videoInputControl";
import { VideoOutputDetails } from "./core/videoOutputDetails";
import { VideoCompressProgress } from "./core/videoCompressProgress";
import { VideoTrim } from "./core/videoTrim";
import {
  FileActions,
  QualityType,
  VideoFormats,
  VideoInputSettings,
} from "../types";
import { AnimatePresence, motion } from "framer-motion";

const CompressVideo = () => {
  const [videoFile, setVideoFile] = useState<FileActions>();
  const [progress, setProgress] = useState<number>(0);
  const [time, setTime] = useState<{
    startTime?: Date;
    elapsedSeconds: number;
  }>({ elapsedSeconds: 0 });
  const [status, setStatus] = useState<
    "notStarted" | "converted" | "compressing"
  >("notStarted");
  const [videoSettings, setVideoSettings] = useState<VideoInputSettings>({
    quality: QualityType.Hight,
    videoType: VideoFormats.MP4,
    customEndTime: 0,
    customStartTime: 0,
    removeAudio: false,
    twitterCompressionCommand: false,
  });
  const ffmpegRef = useRef(new FFmpeg());
  const disableDuringCompression = status === "compressing";

  useEffect(() => {
    let timer: any;

    if (time?.startTime) {
      timer = setInterval(() => {
        const endTime = new Date();
        const timeDifference = endTime.getTime() - time.startTime!.getTime();
        setTime({ ...time, elapsedSeconds: timeDifference });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [time]);
  useEffect(() => {
    console.log('====================================');
    console.log(status);
    console.log('====================================');
  }, [status])

  const handleUpload = (file: File) => {
    setVideoFile({
      fileName: file.name,
      fileSize: file.size,
      from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
      fileType: file.type,
      file,
      isError: false,
    });
  };

  const compress = async () => {
    if (!videoFile) return;
    try {
      setTime({ ...time, startTime: new Date() });
      setStatus("compressing");
      ffmpegRef.current.on("progress", ({ progress: completion }) => {
        debugger
        const percentage = completion * 100;
        setProgress(percentage);
      });
      ffmpegRef.current.on("log", ({ message }) => {
        console.log(message);
      });
      const { url, output, outputBlob } = await convertFile(
        ffmpegRef.current,
        videoFile,
        videoSettings
      );
      setVideoFile({
        ...videoFile,
        url,
        output,
        outputBlob,
      });
      setTime((oldTime) => ({ ...oldTime, startTime: undefined }));
      setStatus("converted");
      setProgress(0);
    } catch (err) {
      console.log(err);
      setStatus("notStarted");
      setProgress(0);
      setTime({ elapsedSeconds: 0, startTime: undefined });
      toast.error("Error Compressing Video");
    }
  };

  const load = async () => {
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.load({
      coreURL: await toBlobURL(
        `/download/ffmpeg-core.js`,
        "text/javascript"
      ),
      wasmURL: await toBlobURL(
        `/download/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
  };

  const loadWithToast = () => {
    toast.promise(load, {
      loading: "Downloading necessary packages from FFmpeg for offline use.",
      success: () => {
        return "All necessary file downloaded";
      },
      error: "Error loading FFmpeg packages",
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => loadWithToast(), []);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {videoFile ? (<>
        <div
          className="flex flex-col gap-4 justify-between flex-2 col-span-5 md:h-full w-full"
        >
          <VideoDisplay videoUrl={URL.createObjectURL(videoFile.file)} />
          {videoFile && (
            <VideoTrim
              disable={disableDuringCompression}
              onVideoSettingsChange={setVideoSettings}
              videoSettings={videoSettings}
            />
          )}
        </div>
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            key="size"
            transition={{ type: "tween" }}
            className=" flex rounded-3xl h-full relative w-1/2"
          >
            <div className="flex flex-1 flex-col gap-2 w-full h-screen overflow-auto pr-4">
              {videoFile && (
                <>
                  <VideoInputDetails
                    onClear={() => window.location.reload()}
                    videoFile={videoFile}
                  />
                </>
              )}
              <VideoInputControl
                disable={disableDuringCompression}
                onVideoSettingsChange={setVideoSettings}
                videoSettings={videoSettings}
              />
              <div
                className="rounded-2xl p-3 h-fit"
              >
                {status === "compressing" && (
                  <VideoCompressProgress
                    progress={progress}
                    seconds={time.elapsedSeconds}
                  />
                )}

                {(status === "notStarted" || status === "converted") && (
                  <button
                    onClick={compress}
                    type="button"
                    className=" bg-indigo-700 rounded-lg text-white/90 px-3.5 py-2.5 relative text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-500 focus:ring-zinc-950 w-full plausible-event-name=Compressed"
                  >
                    Compress
                  </button>
                )}
              </div>
              {status !== "converted" && videoFile && (
                <VideoOutputDetails
                  timeTaken={time.elapsedSeconds}
                  videoFile={videoFile}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </>
      ) : (
        <CustomDropZone
          acceptedFiles={acceptedVideoFiles}
          handleUpload={handleUpload}
        />
      )}

    </div>
  );
};

export default CompressVideo;
