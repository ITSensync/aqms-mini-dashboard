"use client";
import React from "react";
import dynamic from "next/dynamic";
import { formatNumber } from "@/app/utils/formatter";
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

export default function GaugeFixed({
  value = 1000.2,
  unit = "W/m3",
  name = "Lorem",
}: {
  value?: number;
  unit?: string;
  name?: string;
}) {
  const generateColorPM10 = () => {
    switch (true) {
      case value >= 0 && value <= 50:
        return ["#85ec83", "#696969", "#696969", "#696969"];
      case value > 50 && value <= 150:
        return ["#0070C0", "#0070C0", "#696969", "#696969"];
      case value > 100 && value <= 350:
        return ["#faff77", "#faff77", "#faff77", "#696969"];
      case value > 350:
        return ["#EA4228", "#EA4228", "#EA4228", "#EA4228"];
      default:
        return ["#696969"];
    }
  };

  const generateColorPM25 = () => {
    switch (true) {
      case value >= 0 && value <= 15.5:
        return ["#85ec83", "#696969", "#696969", "#696969"];
      case value > 15.5 && value <= 55.4:
        return ["#0070C0", "#0070C0", "#696969", "#696969"];
      case value > 55.4 && value <= 150.44:
        return ["#faff77", "#faff77", "#faff77", "#696969"];
      case value > 150.44:
        return ["#EA4228", "#EA4228", "#EA4228", "#EA4228"];
      default:
        return ["#696969"];
    }
  };

  const generateSubArcPM10 = () => {
    return [
      { limit: 50, showTick: true },
      { limit: 150, showTick: true },
      { limit: 350, showTick: true },
      { limit: 420, showTick: true },
    ];
  };
  const generateSubArcPM25 = () => {
    return [
      { limit: 15.5, showTick: true },
      { limit: 55.4, showTick: true },
      { limit: 150.44, showTick: true },
      { limit: 250.4, showTick: true },
    ];
  };
  return (
    <div className="w-full flex flex-col items-center">
      {/* Container untuk gauge + value di tengah */}
      <div className="relative flex items-center justify-center w-full">
        <GaugeComponent
          style={{ height: "100%", width:`400px` }}
          value={Number(formatNumber(value))}
          minValue={0}
          maxValue={name == "PM10" ? 420 : 250.4}
          className="-mb-10 w-full"
          type="radial"
          arc={{
            gradient: false,
            width: 0.1,
            colorArray:
              name === "PM10" ? generateColorPM10() : generateColorPM25(),
            subArcs:
              name === "PM10" ? generateSubArcPM10() : generateSubArcPM25(),
          }}
          pointer={{ hide: true }}
          labels={{
            valueLabel: {
              formatTextValue: () => "", // sembunyikan value bawaan
            },
            tickLabels: {
              hideMinMax: true,
            },
          }}
        />
        {/* Value custom ditaruh absolute di tengah */}
        <p className=" font-sf-pro-rounded absolute text-6xl font-extrabold pt-16">
          {value}
        </p>
      </div>

      {/* Name dan Unit tetap di bawah */}
      <div className="font-sf-pro-rounded flex flex-col items-center mt-2">
        <p className="text-3xl font-semibold">{name}</p>
        <p className="text-xl">{unit}</p>
      </div>
    </div>
  );
}
