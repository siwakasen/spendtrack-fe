import { NextResponse } from 'next/server'
import { cookies } from "next/headers";
import { getSession } from "next-auth/react";

export async function middleware(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    const cookie = cookies().get("connect.sid");

    // if (path.startsWith("/summary") && !cookie) {
    //     return NextResponse.redirect(new URL("/auth", req.url));
    // }
    // if (path === "/" && !cookie) {
    //     return NextResponse.redirect(new URL("/auth", req.url));
    // }
    // if (path.startsWith("/auth") && cookie) {
    //     return NextResponse.redirect(new URL("/", req.url));
    // }
}
// Specify the paths where the middleware should be applied
export const config = {
    matcher: ['/', '/summary', '/auth'],
};
