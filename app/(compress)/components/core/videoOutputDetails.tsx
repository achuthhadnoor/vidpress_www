import { FileActions } from "~/types";
import {
  bytesToSize,
  calculateBlobSize,
  reduceSize,
} from "~/utils/bytesToSize";
import { formatTime } from "~/utils/convert";
import { motion } from "framer-motion";
import { save } from '@tauri-apps/api/dialog'
import { writeBinaryFile } from '@tauri-apps/api/fs';
declare global {
  interface Window { __TAURI_IPC__: any; }
}
type VideoOutputDetailsProps = {
  videoFile: FileActions;
  timeTaken?: number;
};

export const VideoOutputDetails = ({
  videoFile,
  timeTaken,
}: VideoOutputDetailsProps) => {
  const outputFileSize = calculateBlobSize(videoFile.outputBlob);
  const { sizeReduced, percentage } = reduceSize(
    videoFile.fileSize,
    videoFile.outputBlob
  );

  const download = async () => {
    if (!videoFile?.url) return;
    if (videoFile.outputBlob && window.__TAURI_IPC__) {
      const filePath = await save({ defaultPath: `${videoFile.fileName}.${videoFile.fileType}` });
      if (filePath && videoFile.data) {
        try {
          const binaryData = await videoFile.outputBlob.slice(0, videoFile.outputBlob.size).arrayBuffer();
          await writeBinaryFile(filePath, binaryData);
          console.log("wrote to disk")
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = videoFile.url;
      a.download = videoFile.output;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(videoFile.url);
      document.body.removeChild(a);
    }
  };

  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      key="output"
      transition={{ type: "tween" }}
      className=" rounded-2xl px-4 py-3 h-fit"
    >
      <div className="text-sm">
        <div className="flex justify-between items-center mb-2 pb-2">
          <div className="flex items-center gap-1">
            <p className="">Output File</p>
          </div>
          <button
            onClick={download}
            type="button"
            className="bg-yellow-600 rounded-lg text-white/90 px-2.5 py-1.5 relative text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-500 focus:ring-zinc-950 "
          >
            Download
          </button>
        </div>
        <hr className="h-px my-2 border-0 bg-gray-700" />

        <div className="flex justify-between items-center mb-2 pb-2">
          <p className="font-semibold">New file size</p>
          <p className="font-semibold">{outputFileSize}</p>
        </div>
        <div className="flex justify-between items-center mb-2 pb-2">
          <p className="font-semibold">Size Reduced %</p>
          <p className="font-semibold">{percentage}%</p>
        </div>
        <div className="flex justify-between items-center mb-2 pb-2">
          <p>Original file size</p>
          <p>{bytesToSize(videoFile.fileSize)}</p>
        </div>
        <div className="flex justify-between items-center mb-2 pb-2">
          <p>Size reduced</p>
          <p>{sizeReduced}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Time taken</p>
          <p>{timeTaken ? formatTime(timeTaken / 1000) : "-"}</p>
        </div>
      </div>
      <hr className="h-px my-2 border-0 bg-gray-700" />
    </motion.div>

  );
};
