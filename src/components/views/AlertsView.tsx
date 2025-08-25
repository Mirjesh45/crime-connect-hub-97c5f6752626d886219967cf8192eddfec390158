import { Card } from "../../components/ui/card";
import {Badge} from "../../components/ui/badge"
import { AlertTriangle, Clock, Eye, CheckCircle } from "lucide-react";
import {Button} from "../../components/ui/button";

interface AlertType {
  id: string;
  type: string;
  firNumbers: string[];
  data: string;
  priority: string;
  timestamp: string;
  status: string;
}

const AlertsView = () => {
  const alerts: AlertType[] = [
    { id: "1", type: "Phone Number Match", firNumbers: ["FIR-001"], data: "+91-9876543210", priority: "High", timestamp: "2024-01-25 14:30", status: "New" }
  ];

  const getPriorityColor = (priority: string) => priority === "High" ? "text-red-600 bg-red-50" : "text-gray-600 bg-gray-50";

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Alerts</h2>
      {alerts.map((alert) => (
        <Card key={alert.id}>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p>{alert.type}</p>
              <Badge className={getPriorityColor(alert.priority)}>{alert.priority}</Badge>
            </div>
            <div>
              <Button size="sm"><Eye /> View</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AlertsView;
