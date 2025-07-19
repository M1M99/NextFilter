import { NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function middleware(req) {
    const token = req.cookies.get('token')?.value;

    const payload = token && await verifyToken(token);

    if (!payload) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/add-property', '/my-properties/:path*']
}