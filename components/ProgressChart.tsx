"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export function ProgressChart({
  data,
  dataKey = "score",
  xKey = "label",
  height = 220,
}: {
  data: Record<string, string | number>[];
  dataKey?: string;
  xKey?: string;
  height?: number;
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
          <CartesianGrid stroke="#EFEAF7" vertical={false} />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 11, fill: "#6F6978" }}
            axisLine={{ stroke: "#DDD7E5" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#6F6978" }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #DDD7E5",
              fontSize: 12,
              boxShadow: "0 8px 24px rgba(75,58,107,0.12)",
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#4B3A6B"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#4B3A6B" }}
            activeDot={{ r: 6, fill: "#C8A96B" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
