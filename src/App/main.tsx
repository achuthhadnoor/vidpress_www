import React from "react";

const Main = () => {
    return (
        <div className="grid grid-cols-12 gap-4 h-full  dark:text-neutral-50 ">
            <div className="drag w-full fixed py-4 flex gap-2 left-[15px] opacity-[0.3] transition ease-in-out text-neutral-700 dark:text-neutral-300">
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
            </div>
            {/* Left Panel */}
            <div className="col-span-7 border-dotted border-neutral-50 rounded-md p-4">
                <div className="h-full flex items-center justify-center text-center">
                    <p>
                        Drop your files here and let them get compresssed!!
                    </p>
                </div>
            </div>

            {/* Right Panel */}
            <div className="col-span-5 space-y-4">
                {/* Input Files */}
                <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium ">
                        Input files (360)
                    </label>
                    <div className="flex items-center space-x-2">
                        <button className="border-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                            Clear
                        </button>
                        <button className="border-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                            Change
                        </button>
                    </div>
                </div>

                {/* Output Folder */}
                <div>
                    <label className="block text-sm font-medium ">
                        Output folder
                    </label>
                    <select className="mt-1 block w-full rounded-md bg-transparent border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        <option>Same as input</option>
                        <option>Custom folder</option>
                    </select>
                </div>

                {/* Remove Input Files */}
                <div className="flex items-center">
                    <input
                        id="remove-files"
                        type="checkbox"
                        className="h-4 w-4   bg-transparent border-gray-300 rounded"
                    />
                    <label
                        htmlFor="remove-files"
                        className="ml-2 text-sm font-medium  "
                    >
                        Remove input files
                    </label>
                </div>

                {/* Video Settings */}
                <div>
                    <label className="block text-sm font-medium  ">
                        Video quality
                    </label>
                    <select className="mt-1 block w-full rounded-md bg-transparent border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        <option>Good</option>
                        <option>Best</option>
                        <option>Low</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium ">
                            Video resolution
                        </label>
                        <select className="mt-1 block w-full rounded-md bg-transparent border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <option>Same as input</option>
                            <option>1080p</option>
                            <option>720p</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">
                            Video format
                        </label>
                        <select className="mt-1 block w-full rounded-md bg-transparent shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <option>MP4</option>
                            <option>AVI</option>
                            <option>MKV</option>
                        </select>
                    </div>
                </div>

                {/* Image Settings */}
                <div>
                    <label className="block text-sm font-medium ">
                        Image quality
                    </label>
                    <select className="mt-1 block w-full rounded-md bg-transparent border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        <option>Highest</option>
                        <option>High</option>
                        <option>Medium</option>
                    </select>
                </div>

                {/* GIF Settings */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium ">
                            GIF quality
                        </label>
                        <select className="mt-1 block w-full rounded-md bg-transparent border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <option>Acceptable</option>
                            <option>Good</option>
                            <option>High</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">
                            GIF dimension
                        </label>
                        <select className="mt-1 block w-full rounded-md bg-transparent border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <option>25%</option>
                            <option>50%</option>
                            <option>100%</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;