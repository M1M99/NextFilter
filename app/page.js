'use client';

import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";

export default function Home() {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [properties, setProperties] = useState([]);
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch("http://localhost:3000/api/properties", { cache: 'no-store' });
      const data = await res.json();

      const locations = [...new Set(data.map((p) => p.location))];
      setAllLocations(locations);
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      const query = new URLSearchParams();
      selectedLocations.forEach((loc) => query.append("location", loc));

      const res = await fetch(`http://localhost:3000/api/properties?${query.toString()}`, {
        cache: 'no-store'
      });

      const data = await res.json();
      setProperties(data);
    };

    fetchProperties();
  }, [selectedLocations]);

  const handleCheckboxChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="mb-6">
        <h2 className="font-bold text-lg mb-2">Filter by Location</h2>
        {allLocations.length === 0 && <p className="text-gray-500">Loading locations...</p>}
        {allLocations.map((city) => (
          <label key={city} className="block">
            <input
              type="checkbox"
              value={city}
              checked={selectedLocations.includes(city)}
              onChange={() => handleCheckboxChange(city)}
              className="mr-2"
            />
            {city}
          </label>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}
