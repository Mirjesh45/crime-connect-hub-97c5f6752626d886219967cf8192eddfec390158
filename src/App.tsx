// src/App.tsx
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
import CrimeDetailsPage from "./pages/CrimeDetailsPage"; // ✅ fixed import
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
            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />

            {/* Crime Records */}
            <Route
              path="/incidents"
              element={
                <ProtectedRoute>
                  <CrimeRecordsView />
                </ProtectedRoute>
              }
            />

            {/* Crime Details */}
            <Route
              path="/incidents/:id"
              element={
                <ProtectedRoute>
                  <CrimeDetailsPage />
                </ProtectedRoute>
              }
            />

            {/* Root → login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CrimeRecordsProvider>
  </QueryClientProvider>
);

export default App;
