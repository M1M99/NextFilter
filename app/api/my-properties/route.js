import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    const token = request.cookies.get('token')?.value;
    const payload = token && await verifyToken(token);
    if (!payload) {
        return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });
    }

    const properties=await prisma.property.findMany({
        where:{
            ownerId:Number(payload.id)
        },
        orderBy:{
            createdAt:'desc'
        }
    });

    return NextResponse.json(properties);
}