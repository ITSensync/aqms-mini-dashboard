import { formatNumber } from "@/app/utils/formatter";
import React from "react";

export default function GasTextValue({
  param,
  value = 100,
  unit,
}: {
  param: string;
  value?: number | string;
  unit: string;
}) {
  return (
    <div
      className={`flex flex-col font-sf-pro-rounded items-center justify-center 
    bg-blue-light/20 border border-blue-darkest gap-2 p-5 rounded-xl w-full h-full`}
    >
      <p className="font-bold text-2xl">{param}</p>
      <p className="font-extrabold text-6xl">
        {typeof value === "number" ? formatNumber(value) : value}
      </p>
      <p className="font-bold text-lg">{unit}</p>
    </div>
  );
}
