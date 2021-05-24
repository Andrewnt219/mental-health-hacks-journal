import dayjs from "dayjs";
import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const data = [];
for (let i = 30; i >= 0; i--) {
  data.push({
    date: dayjs(new Date()).subtract(i, "d").format("MMM DD, YYYY"),
    value: getRandomArbitrary(-1, 1),
  });
}

const MoodChart = () => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ left: -60 }}>
        <Line type="monotone" dataKey="value" stroke="#F2994A" fill="#FF9F43" />

        <XAxis dataKey="date" tick={false} />

        <YAxis dataKey="value" tick={false} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MoodChart;
