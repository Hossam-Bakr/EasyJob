import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    id:"1",
    name: "jobs",
    residual: 100,
    consumer: 200,
  },
  {
    id:"2",
    name: "unlocks",
    residual: 150,
    consumer: 400,
  },
  {
    id:"3",
    name: "Invite",
    residual: 100,
    consumer: 200,
  },
];

const Packageconsumption = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="consumer" stackId="a" fill="rgba(220, 0, 0)" />
        <Bar dataKey="residual" stackId="a" fill="rgb(0, 110, 255)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Packageconsumption;
