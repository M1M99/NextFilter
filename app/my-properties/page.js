'use client';

import ConfirmDialog from "@/components/ConfirmDialog";
import EditForm from "@/components/EditForm";
import PropertyCard from "@/components/PropertyCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyPropertiesPage() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(null);
    const router = useRouter();

    const [deleteId, setDeleteId] = useState(null);
    const [editProperty, setEditProperty] = useState(null);

    const handleDelete = async (id) => {

        const res = await fetch(`/api/properties/${id}`, {
            method: "DELETE"
        });

        if (res.ok) {
            setProperties(properties.filter(p => p.id !== id));
            setDeleteId(null);
        }
        else {
            const data = await res.json();
            alert(data.error || 'Error happened');
        }
    }

    useEffect(() => {

        const fetchProperties = async () => {
            try {
                const res = await fetch('/api/my-properties');
                const data = await res.json();

                setProperties(data);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        }

        fetchProperties();
    }, [router]);

    if (loading) {
        return <p className="text-center py-10">Loading . . . </p>
    }

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <h2 className="text-2xl font-bold mb-6">
                My Properties
            </h2>
            {
                properties.length === 0 && (
                    <p className="text-gray-600">You do not have any property</p>
                )
            }

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {
                    properties.map((p) => (
                        <div key={p.id} className="rounded-lg shadow">
                            <PropertyCard property={p} width={400} height={300} />
                            <div className="p-2">
                                <button
                                    onClick={() => setDeleteId(p.id)}
                                    className="mt-3 bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                                <button className="mt-3 bg-orange-600 text-white px-4 py-2 rounded ml-3"
                                    onClick={() => setEditProperty(p)}
                                >Edit</button>
                            </div>
                        </div>
                    ))
                }
            </div>


            {
                editProperty && (
                    <EditForm
                        property={editProperty}
                        onCancel={() => setEditProperty(null)}
                        onSave={(updated) => {
                            setProperties(properties.map(p => (p.id == updated.id ? updated : p)));
                            setEditProperty(null)
                        }}
                    />
                )
            }

            <ConfirmDialog
                isOpen={deleteId !== null}
                title="Are you sure delete this property"
                description="This operation can not undo , would you like continue ?"
                onCancel={() => setDeleteId(null)}
                onConfirm={() => deleteId && handleDelete(deleteId)}
            />
        </div>
    )

}