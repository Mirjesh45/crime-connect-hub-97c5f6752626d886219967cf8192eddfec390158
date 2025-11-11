// src/pages/CrimeRecordsView.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CrimeRecord } from "@/types/crimeRecord";

export const CrimeRecordsView: React.FC = () => {
  const [records, setRecords] = useState<CrimeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firNumber: "",
    crimeType: "",
    location: "",
    description: "",
  });

  // 🔹 Fetch Records
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch("/api/incidents", {
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch records");

        const data = await res.json();
        setRecords(data.incidents || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // 🔹 Handle Input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add record");

      const newRecord = await res.json();
      setRecords((prev) => [newRecord, ...prev]);
      setFormData({ firNumber: "", crimeType: "", location: "", description: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading crime records...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Crime Records</h1>

      {/* Add New Record */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Add New Crime Record</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input name="firNumber" placeholder="FIR Number" value={formData.firNumber} onChange={handleChange} required />
          <Input name="crimeType" placeholder="Crime Type" value={formData.crimeType} onChange={handleChange} required />
          <Input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={3}
          />
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Adding..." : "Add Record"}
          </Button>
        </form>
      </Card>

      {/* Crime Records Table */}
      <Card className="p-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-2">FIR No</th>
              <th className="text-left p-2">Crime Type</th>
              <th className="text-left p-2">Location</th>
              <th className="text-left p-2">Created At</th>
              <th className="text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record) => (
                <tr key={record.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{record.firNumber || "N/A"}</td>
                  <td className="p-2">{record.crimeType || "N/A"}</td>
                  <td className="p-2">{record.location_address || record.location || "N/A"}</td>
                  <td className="p-2">
                    {record.created_at ? new Date(record.created_at).toLocaleString() : "N/A"}
                  </td>
                  <td className="p-2">
                    <Link to={`/incidents/${record.id}`} className="text-blue-600 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
