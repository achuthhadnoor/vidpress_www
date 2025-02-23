"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

export default function Header() {
    const links = [
        {
            name: "Product",
            href: "#",
        },
        {
            name: "Features",
            href: "#features",
        },
        // {
        //   name: "Case Studies",
        //   href: "#feedback",
        // },
        {
            name: "Testimonials",
            href: "#feedback",
        },
        {
            name: "Download",
            href: "/download",
        },
        {
            name: "Changelog",
            href: "#",
        },
    ];
    return (
        <motion.header
            className="px-2 py-1 text-sm"
            initial={{ opacity: 0, translateY: -20 }}
            whileInView={{ opacity: 1, translateY: 0, transitionDuration: ".2s" }}
        >
            <div className="flex items-center container mx-auto justify-between">
                <button className="md:hidden flex">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
                <span className="flex items-center space-x-2">
                    <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.74146 5.5H18.2588C18.6682 5.5 19 5.83586 19 6.25019V18.7493C19 19.2499 18.5248 19.6101 18.0502 19.4692L7.57936 16.3604C7.31991 16.2834 7.12246 16.0694 7.06424 15.8022L5.01769 6.41178C4.91567 5.94359 5.26777 5.5 5.74146 5.5Z"
                            stroke="currentColor"
                            stroke-width="2"
                        />
                    </svg>
                </span>
                <ul className="md:flex py-4 flex-wrap space-x-2 hidden   text-neutral-500">
                    {links.map((link) => (
                        <li
                            key={link.name}
                            className="px-4 py-1 transition ease-linear hover:bg-neutral-800/70 rounded hover:text-neutral-50"
                        >
                            <Link href={link.href}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
                <Link
                    href={"https://achuthhadnoor.gumroad.com/l/lapse_app"}
                    className="flex items-center space-x-2 px-4 py-1 transition ease-linear text-neutral-200 bg-indigo-900/20 rounded-lg border border-indigo-700/30"
                >
                    <span className="">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z"
                                fill="currentColor"
                            />
                        </svg>
                    </span>
                    <span className="md:block hidden">Download</span>
                </Link>
            </div>
        </motion.header>
    );
}
