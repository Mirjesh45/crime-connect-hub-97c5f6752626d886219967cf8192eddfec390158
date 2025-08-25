import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { CrimeRecordsView } from "@/components/views/CrimeRecordsView";
import { CrimeDetailsPage } from "./pages/CrimeDetailsPage";
import { CrimeRecordsProvider } from "@/context/CrimeRecordsContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CrimeRecordsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Dashboard or main page */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />

            {/* Crime Records Table */}
            <Route
              path="/incidents"
              element={
                <ProtectedRoute>
                  <CrimeRecordsView />
                </ProtectedRoute>
              }
            />

            {/* Crime Details Page */}
            <Route
              path="/incidents/:id"
              element={
                <ProtectedRoute>
                  <CrimeDetailsPage />
                </ProtectedRoute>
              }
            />

            {/* Root redirects to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CrimeRecordsProvider>
  </QueryClientProvider>
);

export default App;
