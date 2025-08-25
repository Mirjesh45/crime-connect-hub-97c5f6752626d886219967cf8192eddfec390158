// DashboardView.tsx
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from "recharts";

const DashboardView: React.FC = () => {
  const [crimeStats, setCrimeStats] = useState<unknown[]>([]);
  const [crimeTypes, setCrimeTypes] = useState<unknown[]>([]);
  const [crimeTrends, setCrimeTrends] = useState<unknown[]>([]);

  useEffect(() => {
    // 🔹 Mock stats per year
    setCrimeStats([
      { year: "2021", count: 15 },
      { year: "2022", count: 25 },
      { year: "2023", count: 40 },
      { year: "2024", count: 32 },
      { year: "2025", count: 50 }
    ]);

    // 🔹 Mock stats per crime type
    setCrimeTypes([
      { name: "Theft", value: 45 },
      { name: "Burglary", value: 25 },
      { name: "Assault", value: 15 },
      { name: "Fraud", value: 10 },
      { name: "Other", value: 5 }
    ]);

    // 🔹 Mock monthly crime trend for 2025
    setCrimeTrends([
      { month: "Jan", crimes: 4 },
      { month: "Feb", crimes: 6 },
      { month: "Mar", crimes: 5 },
      { month: "Apr", crimes: 8 },
      { month: "May", crimes: 7 },
      { month: "Jun", crimes: 9 },
      { month: "Jul", crimes: 11 },
      { month: "Aug", crimes: 6 },
      { month: "Sep", crimes: 10 },
      { month: "Oct", crimes: 12 },
      { month: "Nov", crimes: 14 },
      { month: "Dec", crimes: 15 }
    ]);
  }, []);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f", "#a3d8ff"];

  return (
    <div className="p-6">
      {/* 🔹 Quick Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="shadow-md p-4 text-center rounded-2xl">
          <h3 className="text-lg font-medium">Total Crimes</h3>
          <p className="text-2xl font-bold">175</p>
        </Card>

        <Card className="shadow-md p-4 text-center rounded-2xl">
          <h3 className="text-lg font-medium">This Year</h3>
          <p className="text-2xl font-bold">50</p>
        </Card>

        <Card className="shadow-md p-4 text-center rounded-2xl">
          <h3 className="text-lg font-medium">Most Common Crime</h3>
          <p className="text-2xl font-bold">Theft</p>
        </Card>
      </div>

      {/* 🔹 Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Crimes per Year */}
        <Card className="shadow-lg rounded-2xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Crimes per Year</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={crimeStats}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Crimes by Type */}
        <Card className="shadow-lg rounded-2xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Crimes by Type</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={crimeTypes}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {crimeTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Crime Trend (Line Chart) */}
        <Card className="shadow-lg rounded-2xl md:col-span-2">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Monthly Crime Trend (2025)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={crimeTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="crimes" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default DashboardView;
