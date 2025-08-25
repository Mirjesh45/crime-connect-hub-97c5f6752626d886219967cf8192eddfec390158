// src/components/modals/CrimeRecordModal.tsx
import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CrimeRecord } from "@/types/crimeRecord";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newRecord: CrimeRecord) => void;
};

export const CrimeRecordModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [crimeType, setCrimeType] = useState("");
  const [status, setStatus] = useState("Active");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [confidential, setConfidential] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  if (!crimeType || !location || !date) return alert("All fields are required");
  if (confidential && !password) return alert("Password required for confidential record");

  setLoading(true);
  try {
    const res = await fetch("http://localhost:5000/incidents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ crimeType, status, location, date, confidential, password }),
    });

    if (!res.ok) throw new Error("Failed to add incident");

    const data = await res.json();
    onAdd(data.incident || data);

    // Reset form
    setCrimeType("");
    setStatus("Active");
    setLocation("");
    setDate("");
    setConfidential(false);
    setPassword("");

    onClose();
  } catch (err: unknown) {
    alert(err instanceof Error ? err.message : "An error occurred");
  } finally {
    setLoading(false);
  }
};


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Add New Crime Record</h2>
      <div className="space-y-2">
        <Input placeholder="Crime Type" value={crimeType} onChange={(e) => setCrimeType(e.target.value)} />
        <select className="w-full border rounded px-2 py-1" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Active">Active</option>
          <option value="Closed">Closed</option>
        </select>
        <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <Input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />

        <div className="flex items-center space-x-2">
          <input type="checkbox" checked={confidential} onChange={(e) => setConfidential(e.target.checked)} />
          <label>Confidential Record</label>
        </div>

        {confidential && (
          <Input type="password" placeholder="Set password" value={password} onChange={(e) => setPassword(e.target.value)} />
        )}
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding..." : "Add Record"}
        </Button>
      </div>
    </Modal>
  );
};
