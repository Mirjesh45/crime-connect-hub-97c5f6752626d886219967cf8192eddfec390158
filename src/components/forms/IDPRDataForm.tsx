import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  firNumber: string;
  onSubmit: (type: "IDPR", fir: string, formData: Record<string, string | number | Date>) => void;
  loading: boolean;
}

const IDPRDataForm = ({ firNumber, onSubmit, loading }: Props) => {
  const [formData, setFormData] = useState({
    documentType: "",
    documentNumber: "",
    holderName: "",
    dateOfBirth: "",
    address: "",
    issueDate: "",
    expiryDate: "",
    issuingAuthority: "",
    notes: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.documentNumber || !formData.documentType) {
      alert("Document Type and Document Number are required");
      return;
    }

    onSubmit("IDPR", firNumber, {
      documentType: formData.documentType,
      documentNumber: formData.documentNumber,
      holderName: formData.holderName,
      dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
      address: formData.address,
      issueDate: formData.issueDate ? new Date(formData.issueDate) : undefined,
      expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : undefined,
      issuingAuthority: formData.issuingAuthority,
      notes: formData.notes,
    });

    setFormData({
      documentType: "",
      documentNumber: "",
      holderName: "",
      dateOfBirth: "",
      address: "",
      issueDate: "",
      expiryDate: "",
      issuingAuthority: "",
      notes: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Document Type</Label>
        <Input value={formData.documentType} onChange={(e) => setFormData({ ...formData, documentType: e.target.value })} />
      </div>

      <div>
        <Label>Document Number</Label>
        <Input value={formData.documentNumber} onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })} />
      </div>

      <div>
        <Label>Holder Name</Label>
        <Input value={formData.holderName} onChange={(e) => setFormData({ ...formData, holderName: e.target.value })} />
      </div>

      <div>
        <Label>Date of Birth</Label>
        <Input type="date" value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} />
      </div>

      <div>
        <Label>Address</Label>
        <Input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
      </div>

      <div>
        <Label>Issue Date</Label>
        <Input type="date" value={formData.issueDate} onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })} />
      </div>

      <div>
        <Label>Expiry Date</Label>
        <Input type="date" value={formData.expiryDate} onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })} />
      </div>

      <div>
        <Label>Issuing Authority</Label>
        <Input value={formData.issuingAuthority} onChange={(e) => setFormData({ ...formData, issuingAuthority: e.target.value })} />
      </div>

      <div>
        <Label>Notes</Label>
        <Textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
      </div>

      <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save IDPR"}</Button>
    </form>
  );
};

export default IDPRDataForm;
