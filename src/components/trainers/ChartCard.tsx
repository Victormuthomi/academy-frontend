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
} from "recharts";

// Fix TS for PieChart: allow extra keys
interface PieData {
  name: string;
  value: number;
  [key: string]: any; // required for Recharts compatibility
}

interface BarData {
  name: string;
  value: number;
}

interface ChartCardProps {
  title: string;
  type: "pie" | "bar";
  pieData?: PieData[];
  barData?: BarData[];
  colors?: string[];
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  type,
  pieData,
  barData,
  colors,
}) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl shadow-md hover:scale-105 transform transition">
      <h3 className="text-xl font-bold mb-4">{title}</h3>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          {/* Pie Chart */}
          {type === "pie" && pieData && (
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                labelLine={true}
                label={({
                  cx,
                  cy,
                  midAngle = 0, // default 0 to fix TS
                  outerRadius,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 20; // move label outside
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#fff"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                      fontSize={12}
                    >
                      {`${pieData[index].name}: ${pieData[index].value}`}
                    </text>
                  );
                }}
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors?.[index % colors.length] || "#8884d8"}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          )}

          {/* Bar Chart */}
          {type === "bar" && barData && (
            <BarChart
              data={barData}
              margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="name" tick={{ fill: "#fff" }} />
              <YAxis tick={{ fill: "#fff" }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill={colors?.[0] || "#60a5fa"} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartCard;
