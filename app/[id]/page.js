'use client'

import PropertyCard from "@/components/PropertyCard";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function PropertyDetailPage() {
    const params = useParams();
    const id = params.id;
    const [property, setProperty] = useState(null);

    useEffect(() => {
        fetch(`/api/properties/${id}`)
            .then(res => res.json())
            .then(data => setProperty(data));

    }, []);

    if (!property) return <p>Loading . . . </p>

    return (
        <div className="m-2">
            <PropertyCard property={property} />
        </div>

    )
}