"use client";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react';
export default function DashboardLayout({ children }) {
    const { data: session, status } = useSession();
    const [insert, setInsert] = useState(false);
    const Router = useRouter()
    useEffect(() => {
        if (status === "loading") return
        if (!session) {
            Router.push("/auth")
        } else {
            console.log(insert);
            if (!insert) {
                const setSessionInBackend = async () => {
                    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/set-session`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify({ user: session.user })
                    });
                };
                setSessionInBackend();
                setInsert(true);
            }
        }
    }, [session, status]);

    if (status === "authenticated") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen max-h-full w-full bg-gray-900" >
                {children}
            </div >
        );
    } else {
        return null
    }
}
