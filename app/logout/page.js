'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function LogOutPage() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            await fetch('/api/logout', { method: "POST" });
            router.push('/login');
        };
        logout();
    }, []);

    return (
        <div className="max-w-md mx-auto py-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Logout going . . .</h2>
            <p>Please wait a second</p>
        </div>
    )
}