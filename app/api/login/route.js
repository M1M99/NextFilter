import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { signToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";

export async function POST(request) {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return NextResponse.json({ error: 'No found user' }, { status: 400 });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return NextResponse.json({ error: 'Password is invalid' }, { status: 400 });
    }

    const token = await signToken({ id: user.id, email: user.email });

    const response = NextResponse.json({ success: true });

    response.cookies.set('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 1//1 days
    });

    return response;
}