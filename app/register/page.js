'use client'

import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function RegisterPage(){

    const router=useRouter();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');

    async function handleSubmit(e){
        e.preventDefault();
        const res=await fetch('/api/register',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{'Content-Type':'application/json'},
        });

        if(res.ok){
            router.push('/');
        }
        else{
            const data=await res.json();
            setError(data.error);
        }
    }

    return (
        <div className="max-w-md mx-auto py-10">
            <h2 className="text-2xl font-bold mb-6">
                Register
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
                    <SubmitButton>Submit</SubmitButton>
                    <Link href="/login" className="text-blue-500 font-bold">Go to Login</Link>
                </div>
            </form>
        </div>
    )
}