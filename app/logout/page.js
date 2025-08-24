'use client'
import {AppContext} from "@/context/AppContext";
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react";
export default function LogOutPage() {
    const { setIsLoggedIn } = useContext(AppContext)
    const router = useRouter();
    useEffect(() => {
        const logout = async () => {
            await fetch('/api/logout', { method: "POST" });
            setIsLoggedIn(false)
            router.push('/login');
        };
        logout();
    }, [setIsLoggedIn, router]);

    return (
        <div className="max-w-md mx-auto py-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Logout going . . .</h2>
            <p>Please wait a second</p>
        </div>
    )
}