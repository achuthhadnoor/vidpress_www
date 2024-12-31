"use client";
import { useState } from "react";
import ReactDropzone from "react-dropzone";
import { toast } from "sonner";
import { Projector } from "~/components/svg/projector";

type CustomDropZoneProps = {
  handleUpload: (files: File) => void;
  acceptedFiles: { [key: string]: string[] };
  disabled?: boolean;
};

export const CustomDropZone = ({
  handleUpload,
  acceptedFiles,
  disabled,
}: CustomDropZoneProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleHover = (): void => setIsHover(true);
  const handleExitHover = (): void => setIsHover(false);
  const onDrop = (files: File[]) => {
    handleUpload(files[0]);
    handleExitHover();
  };
  const onDropRejected = () => {
    handleExitHover();
    toast.error("Error uploading your file(s)", {
      description: "Allowed Files: Audio, Video and Images.",
      duration: 5000,
    });
  };
  const onError = () => {
    handleExitHover();
    toast.error("Error uploading your file(s)", {
      description: "Allowed Files: Audio, Video and Images.",
      duration: 5000,
    });
  };

  return (
    <ReactDropzone
      disabled={disabled}
      onDrop={onDrop}
      onDragEnter={handleHover}
      onDragLeave={handleExitHover}
      accept={acceptedFiles}
      onDropRejected={onDropRejected}
      multiple={false}
      onError={onError}
    >
      {({ getRootProps, getInputProps }: any) => (
        <div
          {...getRootProps()}
          className={`${isHover ? "border-black bg-yellow-900 text-neutral-50" : "border-default-gray"
            } flex justify-center items-center flex-col cursor-pointer w-full py-6 ${disabled ? "cursor-not-allowed" : ""
            }`}
        >
          <input {...getInputProps()} />
          <span className="p-5 bg-yellow-200/10 rounded-full">
            <Projector />
          </span>
          <h3 className=" text-center mt-5 text-md">
            <span className="font-bold text-yellow-400">Drop a video</span> <span>or upload from device </span>
          </h3>
        </div>
      )}
    </ReactDropzone>
  );
};
