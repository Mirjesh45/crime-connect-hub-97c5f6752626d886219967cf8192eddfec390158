
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderOpen, Calendar, User, AlertTriangle } from "lucide-react";

export const InvestigationsView = () => {
  const investigations = [
    {
      firNumber: "FIR-2024-001",
      title: "Financial Fraud Case",
      officer: "Inspector Sharma",
      startDate: "2024-01-15",
      status: "Active",
      priority: "High",
      dataFolders: 5,
      totalRecords: 127,
      hasAlerts: true
    },
    {
      firNumber: "FIR-2024-003",
      title: "Cybercrime Investigation", 
      officer: "Inspector Kumar",
      startDate: "2024-01-22",
      status: "Under Review",
      priority: "Medium",
      dataFolders: 3,
      totalRecords: 89,
      hasAlerts: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-green-600 bg-green-50";
      case "Under Review": return "text-yellow-600 bg-yellow-50";
      case "Closed": return "text-gray-600 bg-gray-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-600 bg-red-50";
      case "Medium": return "text-yellow-600 bg-yellow-50";
      case "Low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Active Investigations</h2>
        <p className="text-muted-foreground">
          Manage ongoing crime investigations and their data folders
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {investigations.map((investigation) => (
          <Card key={investigation.firNumber} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{investigation.title}</h3>
                <p className="text-sm text-muted-foreground font-mono mb-2">
                  {investigation.firNumber}
                </p>
              </div>
              {investigation.hasAlerts && (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              )}
            </div>

            <div className="flex space-x-2 mb-4">
              <Badge className={getStatusColor(investigation.status)}>
                {investigation.status}
              </Badge>
              <Badge className={getPriorityColor(investigation.priority)}>
                {investigation.priority}
              </Badge>
            </div>

            <div className="space-y-2 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {investigation.officer}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Started: {investigation.startDate}
              </div>
              <div className="flex items-center">
                <FolderOpen className="h-4 w-4 mr-2" />
                {investigation.dataFolders} Data Folders • {investigation.totalRecords} Records
              </div>
            </div>

            <div className="flex space-x-2">
              <Button className="flex-1">
                <FolderOpen className="h-4 w-4 mr-2" />
                Open Case Files
              </Button>
              <Button variant="outline">
                View Timeline
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
