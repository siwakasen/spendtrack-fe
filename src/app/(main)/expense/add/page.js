"use client";
import { useEffect, useState } from "react";

export default function Page() {
    useEffect(() => {
        const showToast = () => {
            const toast = document.createElement("div");
            toast.textContent = "New expense has been created!";
            toast.classList.add(
                "fixed",
                "top-4",
                "left-1/2",
                "-translate-x-1/2",
                "bg-white",
                "text-gray-800",
                "py-2",
                "px-4",
                "rounded-md",
                "shadow-lg",
                "transition-all",
                "duration-300",
                "opacity-0",
                "z-50"
            );
            document.body.appendChild(toast);
            setTimeout(() => {
                toast.classList.remove("opacity-0");
                toast.classList.add("opacity-100");
            }, 200);

            setTimeout(() => {
                toast.classList.remove("opacity-100");
                toast.classList.add("opacity-0");
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 2000);
        };

        showToast();
    }, []);

    return (
        <>
            <div className="flex flex-col items-center  w-full h-full min-h-screen bg-black p-6 max-w-[512px]">
                test

            </div>
        </>
    );
}
