
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { FileText, Database, AlertTriangle, Users, Shield, Search, LogOut, Sparkles } from "lucide-react";
import CrimeDashboard from "@/components/CrimeDashboard"; // ✅ default import
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Database, color: 'text-electric-blue' },
    { id: 'crimes', label: 'Crime Records', icon: FileText, color: 'text-electric-purple' },
    { id: 'data-entry', label: 'Data Entry', icon: Users, color: 'text-electric-cyan' },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, color: 'text-neon-orange' },
    { id: 'search', label: 'Search & Cross-Reference', icon: Search, color: 'text-neon-green' },
    { id: 'investigations', label: 'Active Investigations', icon: Shield, color: 'text-neon-pink' },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="animate-slide-in-right">
          <SidebarHeader className="bg-gradient-electric p-4 rounded-b-lg">
            <div className="flex items-center gap-2 px-4 py-2 animate-bounce-in">
              <Shield className="h-6 w-6 text-white animate-pulse-glow" />
              <span className="font-bold text-lg text-white drop-shadow-lg">Crime Data Management System</span>
              <Sparkles className="h-4 w-4 text-white animate-spin" />
            </div>
            {user.username && (
              <div className="px-4 py-2 text-sm text-white/90 animate-fade-in">
                Welcome, <span className="font-semibold">{user.username}</span>
              </div>
            )}
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu className="space-y-2">
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className={`hover-scale hover-glow rounded-lg transition-all duration-300 ${
                      activeView === item.id 
                        ? 'bg-gradient-electric text-white shadow-lg animate-pulse-glow' 
                        : 'hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10'
                    }`}
                  >
                    <item.icon className={`h-4 w-4 ${activeView === item.id ? 'text-white' : item.color} transition-colors duration-300`} />
                    <span className={`${activeView === item.id ? 'text-white font-semibold' : 'text-foreground'} transition-all duration-300`}>
                      {item.label}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <div className="mt-auto p-4 animate-fade-in">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full hover-scale bg-gradient-to-r from-destructive/10 to-destructive/20 hover:from-destructive hover:to-destructive/80 hover:text-white transition-all duration-300 border-destructive/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="font-medium">Logout</span>
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-gradient-to-r from-background to-primary/5 animate-gradient-shift backdrop-blur-sm">
            <SidebarTrigger className="hover-scale" />
            <div className="flex items-center gap-2 animate-fade-in">
              <h1 className="text-xl font-bold gradient-text">Crime Data Management System</h1>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-neon-pink rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 animate-fade-in">
            <div className="glass-effect p-6 rounded-xl">
              <CrimeDashboard activeView={activeView} />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
