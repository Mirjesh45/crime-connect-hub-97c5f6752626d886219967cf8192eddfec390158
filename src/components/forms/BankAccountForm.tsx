import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  firNumber: string;
  onSubmit: (type: "BANK", fir: string, formData: Record<string, string | number | Date>) => void;
  loading: boolean;
}

const BankAccountForm = ({ firNumber, onSubmit, loading }: Props) => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    bankName: "",
    accountHolder: "",
    transactionDate: "",
    amount: "",
    transactionType: "",
    description: "",
    notes: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.accountNumber || !formData.bankName) {
      alert("Account Number and Bank Name are required");
      return;
    }

    onSubmit("BANK", firNumber, {
      accountNumber: formData.accountNumber,
      bankName: formData.bankName,
      accountHolder: formData.accountHolder,
      transactionDate: formData.transactionDate ? new Date(formData.transactionDate) : undefined,
      amount: formData.amount ? Number(formData.amount) : undefined,
      transactionType: formData.transactionType,
      description: formData.description,
      notes: formData.notes,
    });

    setFormData({
      accountNumber: "",
      bankName: "",
      accountHolder: "",
      transactionDate: "",
      amount: "",
      transactionType: "",
      description: "",
      notes: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Account Number</Label>
        <Input value={formData.accountNumber} onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })} />
      </div>

      <div>
        <Label>Bank Name</Label>
        <Input value={formData.bankName} onChange={(e) => setFormData({ ...formData, bankName: e.target.value })} />
      </div>

      <div>
        <Label>Account Holder</Label>
        <Input value={formData.accountHolder} onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })} />
      </div>

      <div>
        <Label>Transaction Date</Label>
        <Input type="date" value={formData.transactionDate} onChange={(e) => setFormData({ ...formData, transactionDate: e.target.value })} />
      </div>

      <div>
        <Label>Amount</Label>
        <Input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
      </div>

      <div>
        <Label>Transaction Type</Label>
        <Input value={formData.transactionType} onChange={(e) => setFormData({ ...formData, transactionType: e.target.value })} />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      </div>

      <div>
        <Label>Notes</Label>
        <Textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
      </div>

      <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Bank"}</Button>
    </form>
  );
};

export default BankAccountForm;
