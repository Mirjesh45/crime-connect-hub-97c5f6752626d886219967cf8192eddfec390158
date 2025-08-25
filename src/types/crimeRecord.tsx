// src/types/crimeRecord.ts
export interface Person {
  name?: string;
  phone?: string;
  idNumber?: string;
  notes?: string;
}

export interface CrimeRecord {
  id: string;
  firNumber?: string;
  crimeType: string;
  description?: string;
  location: string; // location string used in table
  location_lat?: number;
  location_lng?: number;
  location_address?: string;
  suspects_enc?: Person[];
  victims_enc?: Person[];
  evidence_links?: string[];
  confidential?: boolean;
  password?: string;
  created_at?: string;

  // Additional table fields
  status?: "Active" | "Closed" | string;
  dataCount?: number;
  hasMatches?: boolean;
  date?: string; // formatted date for table
}
export interface NewCrimeRecord {
  crimeType: string;
  status: "Active" | "Closed" | string;
  location: string;
  date: string; // formatted date for table
  confidential: boolean;
  password?: string;
}