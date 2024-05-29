"use client";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react';
export default function DashboardLayout({ children }) {
    const { data: session, status } = useSession();
    const [insert, setInsert] = useState(false);
    const Router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center min-h-screen max-h-full w-full bg-gray-900" >
            {children}
        </div >
    );
}
