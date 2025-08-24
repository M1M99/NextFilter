'use client'

import SubmitButton from "@/components/SubmitButton";
import { AppContext } from "@/context/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useContext, useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const { setIsLoggedIn } = useContext(AppContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (res.ok) {
            setIsLoggedIn(true)
            router.push('/');
        }
        else {
            const data = await res.json();
            setError(data.error || 'Some error happened');
        }
    }

    return (
        <div className="max-w-md mx-auto py-10">
            <h2 className="text-2xl font-bold mb-6">
                Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border px-4 py-2 rounded w-full"
                />
                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border px-4 py-2 rounded w-full"
                />

                {error && <p className="text-red-500">{error}</p>}
                <div className="flex items-center justify-between">
                    <SubmitButton>Sign In</SubmitButton>
                    <Link href="/register" className="text-blue-500 font-bold">Go to Register</Link>
                </div>
            </form>
        </div>
    )
}