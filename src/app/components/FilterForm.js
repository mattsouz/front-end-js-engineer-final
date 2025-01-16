"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const FilterForm = () => {
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const currentYear = new Date().getFullYear();
  const modelYears = Array.from(
    { length: currentYear - 2014 },
    (_, i) => i + 2015
  );
  const isButtonDisabled = !selectedMake || !selectedYear;

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
        );
        const data = await response.json();
        setVehicleMakes(data.Results);
      } catch (error) {
        console.error("Error fetching vehicle makes:", error);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-blue-200 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl text-blue-700 font-bold mb-6 text-center">
          Car Dealer App
        </h1>
        <div className="mb-4">
          <label className="block text-blue-700 mb-2">
            Select Vehicle Model:
          </label>
          <select
            className="w-full border text-black border-blue-300 rounded p-2"
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
          >
            <option value="">-- Select a Make --</option>
            {vehicleMakes.map((make) => (
              <option key={make.MakeId} value={make.MakeId}>
                {make.MakeName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 mb-2">Select Model Year:</label>
          <select
            className="w-full border text-black border-blue-300 rounded p-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">-- Select a Year --</option>
            {modelYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <Link href={`/result/${selectedMake}/${selectedYear}`} passHref>
          <button
            disabled={isButtonDisabled}
            className={`w-full bg-blue-500 text-grey py-2 px-4 rounded ${
              isButtonDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FilterForm;
