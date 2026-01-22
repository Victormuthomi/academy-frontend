// src/components/trainees/ChartsCard.tsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

interface ChartDataItem {
  name: string;
  value: number;
}

interface ChartsCardProps {
  title: string;
  data: ChartDataItem[];
  type?: "pie" | "bar" | "line"; // default pie
}

const COLORS = [
  "#34d399",
  "#6366f1",
  "#facc15",
  "#f87171",
  "#4ade80",
  "#60a5fa",
];

const ChartsCard: React.FC<ChartsCardProps> = ({
  title,
  data,
  type = "pie",
}) => {
  // ✅ Convert data to Recharts-compatible type
  const chartData: { [key: string]: string | number }[] = data.map((d) => ({
    name: d.name,
    value: d.value,
  }));

  return (
    <div className="bg-black/60 p-6 rounded-2xl shadow-md border border-gray-700 hover:border-yellow-400 transition h-96 w-full">
      <h3 className="text-xl font-bold text-gray-200 mb-4">{title}</h3>

      <ResponsiveContainer width="100%" height="85%">
        {type === "pie" && (
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label={({ name, value }) => `${name}: ${value}`}
              labelLine={{ stroke: "#facc15", strokeWidth: 1 }}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", borderRadius: 6 }}
              itemStyle={{ color: "#facc15", fontWeight: "bold" }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ color: "#f3f4f6" }}
            />
          </PieChart>
        )}

        {type === "bar" && (
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#f3f4f6" />
            <YAxis stroke="#f3f4f6" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", borderRadius: 6 }}
              itemStyle={{ color: "#facc15", fontWeight: "bold" }}
            />
            <Legend wrapperStyle={{ color: "#f3f4f6" }} />
            <Bar dataKey="value" fill="#facc15" />
          </BarChart>
        )}

        {type === "line" && (
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#f3f4f6" />
            <YAxis stroke="#f3f4f6" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", borderRadius: 6 }}
              itemStyle={{ color: "#facc15", fontWeight: "bold" }}
            />
            <Legend wrapperStyle={{ color: "#f3f4f6" }} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#facc15"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartsCard;
