import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

import React from "react";

export default function GaugeMui({
  name,
  unit,
  value,
}: {
  name: string;
  unit: string;
  value: number;
}) {
  return (
    <div className="bg-red-300">
      <Gauge
        cornerRadius={50}
        value={value}
        valueMin={0}
        valueMax={100}
        startAngle={-110}
        endAngle={110}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
            fontWeight: 700,
            transform: "translate(0px, 0px)",
          },
          [`& .${gaugeClasses.valueText} text`]: {
            fill: "#06b6d4", // <-- change text color
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "#85ec83",
          },
        }}
        text={({ value }) => `${value}`}
      />

      <div className="font-sf-pro-rounded text-cyan-500 flex flex-col items-center mt-2">
        <p className="text-2xl font-semibold">{name}</p>
        <p className="text-xl">{unit}</p>
      </div>
    </div>
  );
}
