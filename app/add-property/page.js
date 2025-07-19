'use client'

import SubmitButton from "@/components/SubmitButton";
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function AddpropertyPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        imageUrl: ''
    });

    const [error, setError] = useState('');

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.title || !form.description || !form.price || !form.location || !form.imageUrl) {
            setError('All fields are required');
            return;
        }

        const res = await fetch('/api/properties', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...form,
                price: parseInt(form.price)
            })
        });

        if (res.ok) {
            router.push('/');
        }
        else {
            const data = await res.json();
            setError(data.error || 'Some error happened');
        }
    }

    return <div className="max-w-xl mx-auto py-10">
        <h2 className="text-2xl font-bold mb-6">Add new property</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
            />
            <input name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
            />
            <input name="price"
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
            />
            <input name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
            />
            <input name="imageUrl"
                placeholder="Image Url"
                value={form.imageUrl}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
            />
            <SubmitButton>
                Add Property
            </SubmitButton>
        </form>
    </div>
}