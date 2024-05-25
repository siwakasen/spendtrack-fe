"use client";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function DashboardLayout({ children }) {
    const { data: session, status } = useSession()
    const Router = useRouter()
    useEffect(() => {
        if (status === "loading") return
        if (!session) {
            Router.push("/auth")
        } else {

        }
    }, [session, status])
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
