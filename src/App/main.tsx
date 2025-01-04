import React, { useCallback, useState } from "react";

declare global {
    interface Window {
        api: {
            send: (channel: string, data: any) => void;
            getPathForFile: (file: File) => string;
        };
    }
}

const Main = () => {

    const [message, setMessage] = useState("");

    const [videoBitrate, setVideoBitrate] = useState("1000k");
    const [resolution, setResolution] = useState("1920x1080");
    const [frameRate, setFrameRate] = useState("30");
    const [videoCodec, setVideoCodec] = useState("libx265");
    const [videoPreset, setVideoPreset] = useState("veryslow");

    // declare state for image select options
    const [imageQuality, setImageQuality] = useState("90");
    const [imageResize, setImageResize] = useState("800x600");
    const [imageCodec, setImageCodec] = useState("webp");
    const [imagePreset, setImagePreset] = useState("slow");

    // declare state for gif select options

    const [gifFrameRate, setGifFrameRate] = useState("10");
    const [gifLoop, setGifLoop] = useState("0");
    const [gifOptimizePalette, setGifOptimizePalette] = useState("max_colors=256");
    const [gifDithering, setGifDithering] = useState("bayer:bayer_scale=5");

    // declare state for drag and drop
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);

    const handleDrag = useCallback((e: any) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragIn = useCallback((e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    }, []);

    const handleDragOut = useCallback((e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
            console.log("file", e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    }, []);
    const compresssClick = () => {
        // generate an ffmpeg command based on the selected options depending on the file slected 

        const filePath = window.api.getPathForFile(file);
        if (file && file.type.startsWith('video/')) {
            const command = `-i "${filePath}" -b:v ${videoBitrate} -s ${resolution} -r ${frameRate} -c:v ${videoCodec} -preset ${videoPreset} "${file.name}"`
            console.log("command", command);
            window.api.send('compress', command);
        }
        if (file.type.startsWith('image/')) {
            const command = `-i "${filePath}" -q:v ${imageQuality} -vf scale=${imageResize} -c:v ${imageCodec} -preset ${imagePreset} "${file.name}"`
            console.log("command", command);
            window.api.send('compress', command);
        }
        if (file.type === 'image/gif') {
            const command = `-i "${filePath}" -r ${gifFrameRate} -loop ${gifLoop} -vf palettegen palette.png && -i ${filePath} -i palette.png -lavfi paletteuse -r ${gifFrameRate} -loop ${gifLoop} -f gif "${file.name}"`
            console.log("command", command);
            window.api.send('compress', command);
        }
    }
    return (
        <div className="flex flex-col h-full">
            <div className="drag pr-5 relative w-full py-4 flex gap-2 justify-between transition ease-in-out ">
                <span className="opacity-[0.3] relative left-[15px] text-neutral-700 dark:text-neutral-300">
                    <svg
                        width="56"
                        height="16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="8" cy="8" r="5.5" stroke="currentColor"></circle>
                        <circle cx="28" cy="8" r="5.5" stroke="currentColor"></circle>
                        <circle cx="48" cy="8" r="5.5" stroke="currentColor"></circle>
                    </svg>
                </span>
                <span>〄 Compresss</span>
                <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.6763 4.31627C13.2488 2.56124 10.7512 2.56124 10.3237 4.31627C10.2599 4.57999 10.1347 4.82492 9.95831 5.03112C9.78194 5.23732 9.55938 5.39897 9.30874 5.50291C9.0581 5.60684 8.78646 5.65014 8.51592 5.62927C8.24538 5.60839 7.9836 5.52394 7.75187 5.38279C6.20832 4.44227 4.44201 6.20855 5.38254 7.75207C5.99006 8.74884 5.45117 10.0494 4.31713 10.325C2.56096 10.7514 2.56096 13.25 4.31713 13.6753C4.58093 13.7392 4.8259 13.8645 5.03211 14.041C5.23831 14.2175 5.39991 14.4402 5.50375 14.691C5.6076 14.9418 5.65074 15.2135 5.62968 15.4841C5.60862 15.7547 5.52394 16.0165 5.38254 16.2482C4.44201 17.7917 6.20832 19.558 7.75187 18.6175C7.98356 18.4761 8.24536 18.3914 8.51597 18.3704C8.78658 18.3493 9.05834 18.3924 9.30912 18.4963C9.5599 18.6001 9.7826 18.7617 9.95911 18.9679C10.1356 19.1741 10.2609 19.4191 10.3248 19.6829C10.7512 21.439 13.2499 21.439 13.6752 19.6829C13.7393 19.4192 13.8647 19.1744 14.0413 18.9684C14.2178 18.7623 14.4405 18.6008 14.6912 18.497C14.9419 18.3932 15.2135 18.35 15.4841 18.3709C15.7546 18.3919 16.0164 18.4764 16.2481 18.6175C17.7917 19.558 19.558 17.7917 18.6175 16.2482C18.4763 16.0165 18.3918 15.7547 18.3709 15.4842C18.35 15.2136 18.3932 14.942 18.497 14.6913C18.6008 14.4406 18.7623 14.2179 18.9683 14.0414C19.1744 13.8648 19.4192 13.7394 19.6829 13.6753C21.439 13.2489 21.439 10.7502 19.6829 10.325C19.4191 10.2611 19.1741 10.1358 18.9679 9.95928C18.7617 9.78278 18.6001 9.56007 18.4962 9.3093C18.3924 9.05853 18.3493 8.78677 18.3703 8.51617C18.3914 8.24556 18.4761 7.98376 18.6175 7.75207C19.558 6.20855 17.7917 4.44227 16.2481 5.38279C16.0164 5.52418 15.7546 5.60886 15.484 5.62992C15.2134 5.65098 14.9417 5.60784 14.6909 5.504C14.4401 5.40016 14.2174 5.23856 14.0409 5.03236C13.8644 4.82616 13.7391 4.58119 13.6752 4.3174L13.6763 4.31627Z" stroke="currentColor" strokeWidth="2" />
                        <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </div>
            </div>
            <div className="flex-1 flex">
                <div
                    className={`w-full flex-1 mx-4 mb-4 ${file ? '' : 'border-2 border-dashed'} rounded-lg flex items-center justify-center transition-colors ${isDragging ? 'border-indigo-500 bg-indigo-400/10' : 'border-neutral-500'
                        }`}
                    onDragEnter={handleDragIn}
                    onDragLeave={handleDragOut}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="text-center">
                        {file ? (
                            <div className="relative w-full h-full">
                                <div className="absolute top-2 left-2 bg-neutral-300/40 px-2 py-1 rounded shadow">
                                    <p className="font-medium text-xs">{file.name}</p>
                                </div>
                                <div className="absolute top-2 right-2 bg-neutral-300/40 px-2 py-1 rounded shadow">
                                    <p className="font-medium text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                <div className="flex items-center justify-center h-full">
                                    {file.type.startsWith('image/') ? (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="Selected file"
                                            className="max-w-full max-h-full object-contain rounded-md"
                                        />
                                    ) : file.type.startsWith('video/') ? (
                                        <video
                                            controls
                                            src={URL.createObjectURL(file)}
                                            className="max-w-full max-h-full object-contain rounded-md"
                                        />
                                    ) : (
                                        <p className="mt-2">Unsupported file type</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-600 text-lg">Drop your file here</p>
                        )}
                    </div>
                </div>
                {file && <div className="flex-1 w-full ">
                    <div className="flex flex-col space-y-2">
                        <p className="text-sm font-medium">File Name: {file.name}</p>
                        <p className="text-sm font-medium">File Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <div className="mt-4">
                        {file.type.startsWith('video/') && (
                            <div className="mt-2">
                                <div className="flex justify-between">
                                    <label className="text-sm font-medium flex-1 w-full flex">Video Bitrate</label>
                                    <select
                                        className="mt-1 block border bg-transparent border-gray-300 rounded-md shadow-sm"
                                        value={videoBitrate}
                                        onChange={(e) => setVideoBitrate(e.target.value)}

                                    >
                                        <option value="500k">500k</option>
                                        <option value="1000k">1000k</option>
                                        <option value="1500k">1500k</option>
                                    </select>
                                </div>
                                <div className="flex justify-between">
                                    <label className="text-sm font-medium flex-1 w-full flex mt-2">Resolution</label>
                                    <select className="mt-1 block border bg-transparent border-gray-300 rounded-md shadow-sm"
                                        value={resolution}
                                        onChange={(e) => setResolution(e.target.value)}

                                    >
                                        <option value="1280x720">1280x720</option>
                                        <option value="1920x1080" >1920x1080</option>
                                        <option value="3840x2160">3840x2160</option>
                                    </select>
                                </div>
                                <div className="flex justify-between">
                                    <label className="text-sm font-medium flex-1 w-full flex mt-2">Frame Rate</label>
                                    <select className="mt-1 block border bg-transparent border-gray-300 rounded-md shadow-sm"
                                        value={frameRate}
                                        onChange={(e) => setFrameRate(e.target.value)}

                                    >
                                        <option value="24">24</option>
                                        <option value="30" >30</option>
                                        <option value="60">60</option>
                                    </select>
                                </div>
                                <div className="flex justify-between">
                                    <label className="text-sm font-medium flex-1 w-full flex mt-2">Codec</label>
                                    <select className="mt-1 block border bg-transparent border-gray-300 rounded-md shadow-sm"
                                        value={videoCodec}
                                        onChange={(e) => setVideoCodec(e.target.value)}

                                    >
                                        <option value="libx264">libx264</option>
                                        <option value="libx265" >libx265</option>
                                        <option value="vp9">vp9</option>
                                    </select>
                                </div>
                                <div className="flex justify-between">
                                    <label className="text-sm font-medium flex-1 w-full flex mt-2">Preset</label>
                                    <select className="mt-1 block border bg-transparent border-gray-300 rounded-md shadow-sm"
                                        value={videoPreset}
                                        onChange={(e) => setVideoPreset(e.target.value)}

                                    >
                                        <option value="ultrafast">ultrafast</option>
                                        <option value="veryslow">veryslow</option>
                                        <option value="medium">medium</option>
                                    </select>
                                </div>
                            </div>
                        )}
                        {file.type.startsWith('image/') && (
                            <div className="mt-2">
                                <label className="block text-sm font-medium">Image Quality</label>
                                <select className="mt-1 block w-full border bg-transparent border-gray-300 rounded-md shadow-sm"
                                    value={imageQuality}
                                    onChange={(e) => setImageQuality(e.target.value)}

                                >
                                    <option value="50">50</option>
                                    <option value="75">75</option>
                                    <option value="90" >90</option>
                                </select>
                                <label className="block text-sm font-medium mt-2">Resize</label>
                                <select className="mt-1 block w-full border bg-transparent border-gray-300 rounded-md shadow-sm"
                                    value={imageResize}
                                    onChange={(e) => setImageResize(e.target.value)}

                                >
                                    <option value="800x600">800x600</option>
                                    <option value="1024x768">1024x768</option>
                                    <option value="1920x1080">1920x1080</option>
                                </select>
                                <label className="block text-sm font-medium mt-2">Codec</label>
                                <select className="mt-1 block w-full border bg-transparent border-gray-300 rounded-md shadow-sm"
                                    value={imageCodec}
                                    onChange={(e) => setImageCodec(e.target.value)}

                                >
                                    <option value="jpeg">jpeg</option>
                                    <option value="png">png</option>
                                    <option value="webp" >webp</option>
                                </select>
                                <label className="block text-sm font-medium mt-2">Preset</label>
                                <select className="mt-1 block w-full border bg-transparent border-gray-300 rounded-md shadow-sm"
                                    value={imagePreset}
                                    onChange={(e) => setImagePreset(e.target.value)}

                                >
                                    <option value="fast">fast</option>
                                    <option value="slow">slow</option>
                                    <option value="medium">medium</option>
                                </select>
                            </div>
                        )}
                        {file.type === 'image/gif' && (
                            <div className="mt-2">
                                <label className="block text-sm font-medium">Frame Rate</label>
                                <select className="mt-1 block w-full border bg-transparent border-gray-300 rounded-md shadow-sm"
                                    value={gifFrameRate}
                                    onChange={(e) => setGifFrameRate(e.target.value)}

                                >
                                    <option value="5">5</option>
                                    <option value="10" >10</option>
                                    <option value="15">15</option>
                                </select>
                                <label className="block text-sm font-medium mt-2">Loop</label>
                                <select className="mt-1 block w-full border bg-transparent border-gray-300 rounded-md shadow-sm"
                                    value={gifLoop}
                                    onChange={(e) => setGifLoop(e.target.value)}

                                >
                                    <option value="0" >0 (infinite)</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                                <label className="block text-sm font-medium mt-2">Optimize Palette</label>
                                <select className="mt-1 block w-full border bg-transparent border-gray-300 rounded-md shadow-sm"
                                    value={gifOptimizePalette}
                                    onChange={(e) => setGifOptimizePalette(e.target.value)}

                                >
                                    <option value="max_colors=128">max_colors=128</option>
                                    <option value="max_colors=256" >max_colors=256</option>
                                    <option value="max_colors=512">max_colors=512</option>
                                </select>
                                <label className="block text-sm font-medium mt-2">Dithering</label>
                                <select className="mt-1 block w-full border bg-transparent border-gray-300 rounded-md shadow-sm"
                                    value={gifDithering}
                                    onChange={(e) => setGifDithering(e.target.value)}

                                >
                                    <option value="none">none</option>
                                    <option value="bayer:bayer_scale=5" >bayer:bayer_scale=5</option>
                                    <option value="floyd_steinberg">floyd_steinberg</option>
                                </select>
                            </div>
                        )}
                    </div >
                    <div className="flex-1 w-full">
                        <button
                            className="p-2 text-center w-full dark:bg-indigo-400 rounded-md dark:text-indigo-800 text-indigo-400  bg-indigo-800"
                            onClick={compresssClick}
                        >Compresss</button>
                    </div>
                </div >
                }
            </div >
        </div >
    );
};

export default Main;
