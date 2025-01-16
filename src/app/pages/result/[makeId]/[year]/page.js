"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ResultPage = () => {
  const { query: { makeId, year } } = useRouter();
  const [vehicleModels, setVehicleModels] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (makeId && year) {
      fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`)
        .then(response => response.ok ? response.json() : Promise.reject('Failed to fetch vehicle models'))
        .then(data => setVehicleModels(data.Results))
        .catch(setError);
    }
  }, [makeId, year]);

  if (error) {
    return (
      <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h1 className="text-xl font-bold text-blue-500">Error</h1>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Models for Make ID: {makeId} and Year: {year}</h1>
      {vehicleModels.length > 0 ? (
        <ul className="bg-white shadow-md rounded w-full max-w-2xl p-4 space-y-2">
          {vehicleModels.map(({ Model_ID, Model_Name }) => (
            <li key={Model_ID} className="p-4 border border-blue-300 rounded">
              <p className="font-semibold">{Model_Name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-blue-500 mt-4">No models found for the selected make and year.</p>
      )}
    </div>
  );
}

export default ResultPage;