import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, FolderOpen, AlertTriangle, Lock } from "lucide-react";
import { CrimeRecordModal } from "@/components/modals/CrimeRecordModal";
import { CrimeRecord } from "@/types/crimeRecord";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { useCrimeRecords } from "@/context/CrimeRecordsContext";

export const CrimeRecordsView: React.FC = () => {
  const { records: crimeRecords, addRecord, setRecords } = useCrimeRecords();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Fetch records from backend (auth disabled)
// inside CrimeRecordsView.tsx

const fetchRecords = async () => {
  try {
    const res = await fetch("http://localhost:5000/incidents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch incidents");

    // 👇 Expecting the backend to return { items: CrimeRecord[] }
    const data: { items: CrimeRecord[] } = await res.json();

    const records: CrimeRecord[] = (data.items || []).map((item) => ({
      id: item.id,
      crimeType: item.crimeType,
      status: item.status,
      location: item.location,
      date: item.date,
      confidential: item.confidential,
      password: item.password,
      dataCount: item.dataCount || 0,
      hasMatches: item.hasMatches || false,
    }));

    setRecords(records);
  } catch (err) {
    setError(err instanceof Error ? err.message : "An unknown error occurred");
  }
};


  useEffect(() => {
    if (crimeRecords.length === 0) fetchRecords();
  }, []);

  const handleAddRecord = (newRecord: CrimeRecord) => {
    addRecord(newRecord);
  };

  const handleViewDetails = (record?: CrimeRecord) => {
    if (!record) return alert("Record not found");

    if (record.confidential && record.password) {
      const inputPassword = prompt("Enter password to view this confidential record");
      if (inputPassword !== record.password) {
        alert("Incorrect password!");
        return;
      }
    }
    navigate(`/incidents/${record.id}`);
  };

  const filteredRecords = crimeRecords.filter(
    (r) =>
      r.crimeType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Crime Records</h2>
          <p className="text-muted-foreground">Manage and track all crime investigation records</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add New Record
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by crime type or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crime Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Data Records</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    {record.crimeType ?? "N/A"}{" "}
                    {record.confidential && <Lock className="inline h-4 w-4 text-red-500 ml-1" />}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        record.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {record.status ?? "Unknown"}
                    </span>
                  </TableCell>

                  <TableCell>{record.location ?? "N/A"}</TableCell>
                  <TableCell>{record.date ?? "N/A"}</TableCell>
                  <TableCell>
                    {record.dataCount ?? 0}
                    {record.hasMatches && (
                      <AlertTriangle className="h-4 w-4 text-red-500 inline ml-1" />
                    )}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(record)}
                    >
                      <FolderOpen className="h-4 w-4 mr-2" /> View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <CrimeRecordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddRecord}
      />
    </div>
  );
};
