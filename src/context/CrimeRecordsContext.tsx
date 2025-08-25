import React, { createContext, useContext, useState, ReactNode } from "react";
import { CrimeRecord } from "@/types/crimeRecord";

interface CrimeRecordsContextType {
  records: CrimeRecord[];
  addRecord: (record: CrimeRecord) => void;
  setRecords: React.Dispatch<React.SetStateAction<CrimeRecord[]>>;
}

const CrimeRecordsContext = createContext<CrimeRecordsContextType | undefined>(undefined);

export const useCrimeRecords = () => {
  const context = useContext(CrimeRecordsContext);
  if (!context) throw new Error("useCrimeRecords must be used within CrimeRecordsProvider");
  return context;
};

export const CrimeRecordsProvider = ({ children }: { children: ReactNode }) => {
  const [records, setRecords] = useState<CrimeRecord[]>([]);

  const addRecord = (record: CrimeRecord) => setRecords(prev => [record, ...prev]);

  return (
    <CrimeRecordsContext.Provider value={{ records, addRecord, setRecords }}>
      {children}
    </CrimeRecordsContext.Provider>
  );
};
