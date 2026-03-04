import React from "react";
import GasTextValue from "./GasTextValue";

export default function Gas({
  so2,
  no2,
}: {
  hc?: number | string;
  so2: number | string;
  no2: number | string;
  o3?: number | string;
  co?: number | string;
}) {
  return (
    <div className="flex flex-row gap-6 w-1/2  h-full items-center justify-between rounded-xl p-3 overflow-x-auto overflow-y-hidden">
      <GasTextValue param="SO2" unit="μg/m3" value={so2} />
      <GasTextValue param="NO2" unit="μg/m3" value={no2} />
    </div>
  );
}
