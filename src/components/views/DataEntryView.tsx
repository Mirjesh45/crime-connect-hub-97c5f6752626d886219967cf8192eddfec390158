import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, CreditCard, FileText } from "lucide-react";

import CDRDataForm from "@/components/forms/CDRDataForm";
import BankAccountForm from "@/components/forms/BankAccountForm";
import IDPRDataForm from "@/components/forms/IDPRDataForm";

type DataType = "CDR" | "BANK" | "IDPR";
type FormDataType = Record<string, string | number | Date>;

const DataEntryView = () => {
  const [activeTab, setActiveTab] = useState<DataType>("CDR");
  const [firNumber, setFirNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    type: DataType,
    fir: string,
    formData: FormDataType
  ) => {
    if (!fir) {
      alert("FIR Number is required");
      return;
    }

    // Convert Date objects to ISO strings
    const sanitizedData = Object.fromEntries(
      Object.entries(formData).map(([k, v]) =>
        v instanceof Date ? [k, v.toISOString()] : [k, v]
      )
    );

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const res = await fetch("http://localhost:5000/ingest/raw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firNumber: fir, type, data: sanitizedData }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail ?? data.error ?? "Failed to save data");

      alert(data.message);
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
      else alert("Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Data Entry</h2>
      <p className="text-muted-foreground">
        Add investigation data for CDR, Bank Accounts, and IDPR records
      </p>

      <Card className="p-6">
        <Input
          placeholder="Enter FIR Number"
          value={firNumber}
          onChange={(e) => setFirNumber(e.target.value)}
        />
      </Card>

      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="CDR" className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> CDR Data
            </TabsTrigger>
            <TabsTrigger value="BANK" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Bank Accounts
            </TabsTrigger>
            <TabsTrigger value="IDPR" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> IDPR Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="CDR">
            <CDRDataForm firNumber={firNumber} onSubmit={handleSubmit} loading={loading} />
          </TabsContent>
          <TabsContent value="BANK">
            <BankAccountForm firNumber={firNumber} onSubmit={handleSubmit} loading={loading} />
          </TabsContent>
          <TabsContent value="IDPR">
            <IDPRDataForm firNumber={firNumber} onSubmit={handleSubmit} loading={loading} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default DataEntryView;
