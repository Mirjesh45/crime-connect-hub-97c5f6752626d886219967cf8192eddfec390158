// src/pages/CrimeDetailsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CrimeRecord } from "@/types/crimeRecord";

export const CrimeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [incident, setIncident] = useState<CrimeRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  if (!id) {
    navigate(-1);
    return;
  }

  const fetchIncident = async () => {
    try {
      const res = await fetch(`http://localhost:5000/incidents/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Incident not found");
      }

      const data = await res.json();
      const incidentData: CrimeRecord = data.incident;

      // Handle confidential records
      if (incidentData.confidential && incidentData.password) {
        const inputPassword = prompt(
          "Enter password to view this confidential record"
        );
        if (inputPassword !== incidentData.password) {
          alert("Incorrect password!");
          navigate(-1);
          return;
        }
      }

      setIncident(incidentData);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  fetchIncident();
}, [id, navigate]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!incident) return <p>No incident data found.</p>;

  return (
    <div className="space-y-4">
      <Button onClick={() => navigate(-1)}>Back</Button>
      <Card className="p-6 space-y-2">
        <h2 className="text-2xl font-bold">{incident.crimeType}</h2>
        <p><strong>FIR Number:</strong> {incident.firNumber || "N/A"}</p>
        <p><strong>Description:</strong> {incident.description || "N/A"}</p>
        <p>
          <strong>Location:</strong>{" "}
          {incident.location_address || incident.location || "N/A"} (
          {incident.location_lat ?? "?"}, {incident.location_lng ?? "?"})
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {incident.created_at ? new Date(incident.created_at).toLocaleString() : "N/A"}
        </p>

        <div>
          <h3 className="font-semibold mt-2">Suspects</h3>
          <ul>
            {incident.suspects_enc?.length ? (
              incident.suspects_enc.map((s, idx) => (
                <li key={idx}>
                  {s.name || "Unknown"} {s.phone ? `(${s.phone})` : ""}{" "}
                  {s.idNumber ? `- ID: ${s.idNumber}` : ""}{" "}
                  {s.notes ? `- Notes: ${s.notes}` : ""}
                </li>
              ))
            ) : (
              <li>No suspects recorded</li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mt-2">Victims</h3>
          <ul>
            {incident.victims_enc?.length ? (
              incident.victims_enc.map((v, idx) => (
                <li key={idx}>
                  {v.name || "Unknown"} {v.phone ? `(${v.phone})` : ""}{" "}
                  {v.idNumber ? `- ID: ${v.idNumber}` : ""}{" "}
                  {v.notes ? `- Notes: ${v.notes}` : ""}
                </li>
              ))
            ) : (
              <li>No victims recorded</li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mt-2">Evidence Links</h3>
          <ul>
            {incident.evidence_links?.length ? (
              incident.evidence_links.map((e, idx) => <li key={idx}>{e}</li>)
            ) : (
              <li>No evidence links</li>
            )}
          </ul>
        </div>
      </Card>
    </div>
  );
};
