
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SearchView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("all");

  const searchResults = [
    {
      firNumber: "FIR-2024-001",
      dataType: "Phone Number",
      value: "+91-9876543210",
      occurrences: 3,
      relatedCases: ["FIR-2024-015", "FIR-2024-032"]
    },
    {
      firNumber: "FIR-2024-003",
      dataType: "Bank Account",
      value: "HDFC-456789123",
      occurrences: 2,
      relatedCases: ["FIR-2024-021"]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Search & Cross-Reference</h2>
        <p className="text-muted-foreground">
          Search across all crime data and find interconnections
        </p>
      </div>

      <Card className="p-6">
        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Enter phone number, account number, address, or any data to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Search Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Data Types</SelectItem>
              <SelectItem value="phone">Phone Numbers</SelectItem>
              <SelectItem value="bank">Bank Accounts</SelectItem>
              <SelectItem value="address">Addresses</SelectItem>
              <SelectItem value="id">ID Documents</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Search Results</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {searchResults.map((result, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold">{result.firNumber}</span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {result.dataType}
                    </span>
                  </div>
                  <p className="font-mono text-sm mb-2">{result.value}</p>
                  <p className="text-sm text-muted-foreground">
                    Found in {result.occurrences} records
                    {result.relatedCases.length > 0 && (
                      <span> • Related cases: {result.relatedCases.join(", ")}</span>
                    )}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Connections
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};
