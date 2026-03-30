import { formatNumber } from "@/app/utils/formatter";
import { generateWindDirection } from "@/app/utils/windDirection";
import React from "react";

export default function WeatherTextValue({
  param = "-",
  value = 0,
  unit = "",
  icon,
}: {
  param?: string;
  value?: number;
  unit?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col bg-blue-light/20 border border-blue-darkest shadow-2xl rounded-2xl h-full gap-3 items-center justify-center font-sf-pro`}
    >
      <span className="">{icon}</span>
      <p className=" text-lg">{param}</p>
      <div className={`flex flex-row items-end`}>
        <p className="text-3xl font-bold">
          {formatNumber(value)}{" "}
          {param === "Arah Angin" && (
            <sup className="font-normal -ml-2">{unit}</sup>
          )}
        </p>
        <p className="font-normal text-sm">
          {param === "Arah Angin" ? `(${generateWindDirection(value)})` : unit}
        </p>
      </div>
    </div>
  );
}
