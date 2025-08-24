import Link from "next/link";

export default function PropertyCard({ property, width = 600, height = 400 }) {
    return (
        <div key={property.id} className="p-4 rounded-lg shadow shadow-blue-600">
            <Link href={`/${property.id}`}>
                {property.imageUrl && <img src={property.imageUrl} style={{ width: `${width}px`, height: `${height}px` }} alt={property.title} className="rounded mb-3" />}
                <h2 className="text-xl font-semibold mb-1">{property.title}</h2>
                <p className="text-gray-600 mb-2">{property.description}</p>
                <p className="font-bold text-blue-600">{property.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{property.location}</p>
                <p className="text-sm text-gray-500">Date :  {new Date(property.createdAt).toLocaleString()}</p>
            </Link>
        </div>
    )
}