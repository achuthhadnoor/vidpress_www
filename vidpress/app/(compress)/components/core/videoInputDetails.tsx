import React from "react";
import { FileActions } from "~/types";
import { bytesToSize } from "~/utils/bytesToSize";
import { motion } from "framer-motion";

type VideoInputDetailsProps = {
  videoFile: FileActions;
  onClear: () => void;
};

export const VideoInputDetails = ({
  videoFile,
  onClear,
}: VideoInputDetailsProps) => (
  <motion.div
    layout
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    transition={{ type: "tween" }}
    key="details"
    className="rounded-2xl px-4 py-3 h-fit "
  >
    <div className=" text-sm">
      <div className="flex justify-between items-center  mb-2 pb-2">
        <p className="">Fill Input</p>
        <button
          onClick={onClear}
          type="button"
          className="bg-yellow-600 to-zinc-950 rounded-full p-2 text-white/90 px-2.5 py-1.5 relative text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-500 focus:ring-zinc-950"
        >
          Change
        </button>
      </div>
      <p className=" mb-2 pb-2">{videoFile?.fileName}</p>
      <div className="flex justify-between items-center">
        <p>File size</p>
        <p>{bytesToSize(videoFile.fileSize)}</p>
      </div>
      <hr className="h-px my-2 border-0 bg-gray-700" />
    </div>
  </motion.div>
);
