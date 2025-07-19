import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = await params;
    const property = await prisma.property.findUnique({
        where: { id: Number(id) }
    });

    return NextResponse.json(property);
}

export async function DELETE(request, { params }) {
    const { id } = await params;

    const token = request.cookies.get('token')?.value;

    const payload = token && await verifyToken(token);

    if (!payload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const property = await prisma.property.findUnique({
        where: { id: Number(id) }
    });

    if (!property) {
        return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    if (property.ownerId !== Number(payload.id)) {
        return NextResponse.json({ error: 'This property is not yours' }, { status: 403 });
    }

    await prisma.property.delete({
        where: { id: Number(id) }
    });

    return NextResponse.json({ success: true });
}

export async function PATCH(req, { params }) {
    const { id } = await params;
    const token = req.cookies.get('token')?.value;

    const payload = token && await verifyToken(token);

    if (!payload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const property = await prisma.property.findUnique({
        where: { id: Number(id) }
    });

    if (!property) {
        return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    if (property.ownerId !== Number(payload.id)) {
        return NextResponse.json({ error: 'This property is not yours' }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, price, location, imageUrl } = body;

    const updated = await prisma.property.update({
        where: { id: Number(id) },
        data: {
            title,
            description,
            price,
            location,
            imageUrl
        }
    })

    return NextResponse.json(updated);
}