import { useState } from "react";

export default function EditForm({
    property,
    onCancel,
    onSave
}) {

    const [form, setForm] = useState({
        title: property.title,
        description: property.description,
        price: property.price,
        location: property.location,
        imageUrl: property.imageUrl
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`/api/properties/${property.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ ...form, price: Number(form.price) }),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();

        if (res.ok) {
            onSave(data);
        }
        else {
            alert(data.error || 'Error happened');
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 m-10">
                <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="border px-3 py-2 rounded w-full"
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="border px-3 py-2 rounded w-full"
                    />
                    <input
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="border px-3 py-2 rounded w-full" />
                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Location"
                        className="border px-3 py-2 rounded w-full" />
                    <input
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        placeholder="Image Url"
                        className="border px-3 py-2 rounded w-full" />

                    <div className="flex gap-2">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                            Save Property
                        </button>
                        <button type="button" className="bg-gray-600 text-white px-4 py-2 rounded"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}