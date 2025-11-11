import DashboardView from "@/components/views/DashboardView";
import {CrimeRecordsView} from "../components/views/CrimeRecordsView";

import DataEntryView from "@/components/views/DataEntryView";
import AlertsView from "@/components/views/AlertsView";
import {SearchView} from "@/components/views/SearchView";
import {InvestigationsView} from "@/components/views/InvestigationsView";

interface CrimeDashboardProps {
  activeView: string;
}

const CrimeDashboard = ({ activeView }: CrimeDashboardProps) => {
  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />;
      case "crimes":
        return <CrimeRecordsView />;
      case "data-entry":
        return <DataEntryView />;
      case "alerts":
        return <AlertsView />;
      case "search":
        return <SearchView />;
      case "investigations":
        return <InvestigationsView />;
      default:
        return <DashboardView />;
    }
  };

  return <div className="w-full">{renderView()}</div>;
};

export default CrimeDashboard;
