import { jwtVerify, SignJWT } from "jose";

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signToken(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(key)
}

export async function verifyToken(token) {
    try {
        const { payload } = await jwtVerify(token, key);
        return payload;
    }
    catch (err) {
        console.error('JWT Verify Error : ', err.message);
        return null;
    }
}