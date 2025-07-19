import { NextResponse } from "next/server";
import bcrypt, { hash } from 'bcrypt';
import { signToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";

export async function POST(request) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required!' }, { status: 400 });
    }

    const exist = await prisma.user.findUnique({ where: { email } });
    if (exist) {
        return NextResponse.json({ error: 'This email is already exist' }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashed
        }
    });

    const token = await signToken({ id: user.id, email: user.email });

    const response = NextResponse.json({ success: true });

    response.cookies.set('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60
    });

    return response;
}