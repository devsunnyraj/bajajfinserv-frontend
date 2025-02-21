"use client";

import { useState } from "react";
import { Card, CardContent } from "../app/components/ui/card";
import { Button } from "../app/components/ui/button";
import { Select, SelectItem } from "../app/components/ui/select";
import { Input } from "../app/components/ui/input";
import { Checkbox } from "../app/components/ui/checkbox";

export default function BFHLFrontend() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error('Invalid JSON format. Expected {"data": [values]}');
      }
  
      const res = await fetch("http://localhost:5000/bfhl", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });
  
      const data = await res.json();
      setResponseData(data);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };
  

  const handleFilterChange = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter]
    );
  };

  const renderResponse = () => {
    if (!responseData) return null;
    let filteredData = {};
    if (selectedFilters.includes("Alphabets")) filteredData.alphabets = responseData.alphabets;
    if (selectedFilters.includes("Numbers")) filteredData.numbers = responseData.numbers;
    if (selectedFilters.includes("Highest Alphabet")) filteredData.highest_alphabet = responseData.highest_alphabet;
    return JSON.stringify(filteredData, null, 2);
  };

  return (
    <div className="p-6 flex flex-col items-center bg-black min-h-screen text-black">
      <h1 className="text-xl font-bold mb-4">BFHL Challenge Frontend</h1>
      <Card className="w-96 p-4 bg-gray-800 text-black">
        <CardContent>
          <Input
            placeholder='Enter JSON (e.g. {"data": ["A", "1", "B"]})'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="text-white bg-gray-900 border border-gray-600 placeholder-gray-400"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <Button onClick={handleSubmit} className="mt-4 w-full bg-blue-500 hover:bg-blue-700">
            Submit
          </Button>
          <div className="mt-4">
            <p className="mb-2">Select Filters:</p>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <Checkbox checked={selectedFilters.includes("Alphabets")} onCheckedChange={() => handleFilterChange("Alphabets")} />
                <span className="ml-2">Alphabets</span>
              </label>
              <label className="flex items-center">
                <Checkbox checked={selectedFilters.includes("Numbers")} onCheckedChange={() => handleFilterChange("Numbers")} />
                <span className="ml-2">Numbers</span>
              </label>
              <label className="flex items-center">
                <Checkbox checked={selectedFilters.includes("Highest Alphabet")} onCheckedChange={() => handleFilterChange("Highest Alphabet")} />
                <span className="ml-2">Highest Alphabet</span>
              </label>
            </div>
          </div>
          {responseData && (
            <pre className="bg-gray-700 text-white p-4 mt-4 rounded-md">
              {renderResponse()}
            </pre>
          )}
        </CardContent>
      </Card>
    </div>
  );
}