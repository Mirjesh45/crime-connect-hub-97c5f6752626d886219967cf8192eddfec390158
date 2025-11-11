// CrimeDetailsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Define the incident type
interface Incident {
  id: string;
  title: string;
  description: string;
  status: string;
  confidential: boolean;
}

const CrimeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // prevent fetch if id is undefined
    fetch(`http://localhost:5001/incidents/${id}`)
      .then((res) => res.json())
      .then((data: Incident) => {
        setIncident(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!incident) return <p className="p-4">Incident not found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Incident Details</h2>
      <p><strong>ID:</strong> {incident.id}</p>
      <p><strong>Title:</strong> {incident.title}</p>
      <p><strong>Description:</strong> {incident.description}</p>
      <p><strong>Status:</strong> {incident.status}</p>
      <p><strong>Confidential:</strong> {incident.confidential ? "Yes" : "No"}</p>
    </div>
  );
};

export default CrimeDetailsPage;
