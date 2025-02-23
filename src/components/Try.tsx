"use client";
import React, { useState, useRef, useEffect } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import cl from "classnames";

export default function Try() {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [screenshots, setScreenshots] = useState<Blob[]>([]);
  const [captureInterval, setCaptureInterval] = useState<any>([]);
  const [intervalGap, setIntervalGap] = useState(2);
  const [isComplete, setIsComplete] = useState(false);
  const [timer, setTimer] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const ffmpeg = useRef<any>(null);
  const stopbtnRef = useRef<any>();
  useEffect(() => {
    (async () => {
      ffmpeg.current = createFFmpeg({ log: true });
      await ffmpeg.current.load();
    })();
  }, []);
  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      streamRef.current = mediaStream;
      const videoTrack = mediaStream.getVideoTracks()[0];
      const videoElement = document.createElement("video");
      videoElement.srcObject = new MediaStream([videoTrack]);

      videoElement.addEventListener("loadedmetadata", () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const videoWidth = videoElement.videoWidth;
        const videoHeight = videoElement.videoHeight;
        canvas.width = videoWidth;
        canvas.height = videoHeight;
        const captureFrame = () => {
          if (context) {
            context.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

            canvas.toBlob((blob) => {
              if (blob) {
                setScreenshots((prevScreenshots) => [...prevScreenshots, blob]);
              }
            });
          }
        };
        setIsRecording(true);
        const captureInterval = setInterval(captureFrame, intervalGap * 1000);
        setCaptureInterval(captureInterval);
      });

      videoTrack.addEventListener("ended", () => {
        stopbtnRef?.current.click();
      });
      videoElement.play();
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      setIsLoading(true);
      convertToVideo();
    }
  };

  const convertToVideo = async () => {
    if (!ffmpeg.current) {
      console.error("FFmpeg is not loaded");
      return;
    }
    clearInterval(captureInterval);
    for (let i = 0; i < screenshots.length; i++) {
      const blob = screenshots[i];
      try {
        await ffmpeg.current.FS(
          "writeFile",
          `/screenshot${i}.png`,
          await fetchFile(blob)
        );
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    }

    await ffmpeg.current.run(
      "-y",
      "-r",
      // `${app.lapse.settings.framerate}`,
      "12",
      "-f",
      "image2",
      "-start_number",
      "0",
      "-i",
      // app.lapse.ffmpegImgPattern,
      "/screenshot%d.png",
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-profile:v",
      "high",
      "-vcodec",
      "libx264",
      "-crf",
      // `${app.lapse.settings.quality}`,
      "25",
      "-coder",
      "1",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "-g",
      "30",
      "-bf",
      "2",
      "-c:a",
      "aac",
      "-b:a",
      "384k",
      "-profile:a",
      "aac_low",
      // outputPath,
      "/output.mp4"
    );

    const videoData = ffmpeg.current.FS("readFile", "/output.mp4");
    const videoBlob = new Blob([videoData.buffer], { type: "video/mp4" });
    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(videoBlob);
      window.open(URL.createObjectURL(videoBlob));
      setIsComplete(true);
      setIsLoading(false);
    }
  };
  return (
    <>
      {!isRecording && (
        <button
          //   className="mt-5 hidden items-center gap-2 rounded p-2  align-middle text-sm outline-none ring-1 ring-neutral-200/20 lg:flex"
          className="px-4 py-2 hidden md:block  text-neutral-800 dark:text-neutral-400  rounded-full ring-2 ring-neutral-500 transition ease-linear"
          onClick={startRecording}
        >
          {isLoading ? "Loading...." : "▶ Try Lapse now"}
        </button>
      )}
      {isRecording && (
        <button
          ref={stopbtnRef}
          //   className="mt-5 flex items-center gap-2 rounded  p-2 align-middle text-sm outline-none ring-1 ring-neutral-200/20"
          className="px-4 py-2 hidden md:block  text-neutral-800 dark:text-neutral-400  rounded-full ring-2 ring-neutral-500 transition ease-linear"
          onClick={stopRecording}
        >
          <span className="inline-block h-2 w-2 bg-neutral-100"></span>
          "stop Recording..
        </button>
      )}
      <div
        className={cl(
          "fixed top-0 left-0 flex h-full w-full justify-center bg-black/40 backdrop-blur-lg",
          isComplete ? "" : "pointer-events-none  opacity-0"
        )}
      >
        <div className="flex h-full flex-col justify-center">
          <span
            className="my-5  flex cursor-pointer justify-end"
            onClick={() => {
              setIsComplete(false);
            }}
          >
            <svg
              className="scale-100"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 9L9 15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 9L15 15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <video
              ref={videoRef}
              controls={true}
              className=" w-[400px] rounded-md md:w-[800px]"
            >
              {/* <source src="lapse.mp4" type="video/mp4" /> */}
              Your browser does not support HTML video.
            </video>
          </div>
        </div>
      </div>
    </>
  );
}
