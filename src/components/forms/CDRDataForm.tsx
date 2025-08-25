import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Props {
  firNumber: string;
  onSubmit: (type: "CDR", fir: string, formData: Record<string, string | number | Date>) => void;
  loading: boolean;
}

const CDRDataForm = ({ firNumber, onSubmit, loading }: Props) => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    callType: "",
    duration: "",
    timestamp: "",
    location: "",
    notes: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.phoneNumber || !formData.callType || !formData.duration || !formData.timestamp) {
      alert("All required fields must be filled");
      return;
    }

    onSubmit("CDR", firNumber, {
      phoneNumber: formData.phoneNumber,
      callType: formData.callType,
      duration: Number(formData.duration),
      timestamp: new Date(formData.timestamp),
      location: formData.location,
      notes: formData.notes,
    });

    setFormData({ phoneNumber: "", callType: "", duration: "", timestamp: "", location: "", notes: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Phone Number</Label>
        <Input value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
      </div>

      <div>
        <Label>Call Type</Label>
        <Select value={formData.callType} onValueChange={(value) => setFormData({ ...formData, callType: value })}>
          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="incoming">Incoming</SelectItem>
            <SelectItem value="outgoing">Outgoing</SelectItem>
            <SelectItem value="missed">Missed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Duration (seconds)</Label>
        <Input type="number" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
      </div>

      <div>
        <Label>Timestamp</Label>
        <Input type="datetime-local" value={formData.timestamp} onChange={(e) => setFormData({ ...formData, timestamp: e.target.value })} />
      </div>

      <div>
        <Label>Location</Label>
        <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
      </div>

      <div>
        <Label>Notes</Label>
        <Textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
      </div>

      <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save CDR"}</Button>
    </form>
  );
};

export default CDRDataForm;
