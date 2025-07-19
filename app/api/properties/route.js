import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// export async function GET(){
//     const properties=await prisma.property.findMany();
//     return NextResponse.json(properties);
// }

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const maxPrice = searchParams.get('maxPrice');

    const properties = await prisma.property.findMany({
        where: {
            ...(location && { location: { contains: location } }),
            ...(maxPrice && { price: { lte: parseInt(maxPrice) } })
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return NextResponse.json(properties);
}

export async function POST(request) {

    const token = request.cookies.get('token')?.value;

    const payload = token && await verifyToken(token);

    if (!payload) {
        return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });
    }
    console.log("payload",payload);

    const body = await request.json();
    const { title, description, price, location, imageUrl } = body;

    if (!title || !description || !price || !location || !imageUrl) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const property = await prisma.property.create({
        data: {
            title,
            description,
            price: parseInt(price),
            location,
            imageUrl,
            ownerId: Number(payload.id)
        }
    })

    return NextResponse.json(property);
}