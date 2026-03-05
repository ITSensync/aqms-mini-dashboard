import React from "react";
import Pm from "./Pm";
import Gas from "./Gas";
import { AirQuality } from "@/app/types/Datatypes";

export default function TopParameter({
  sensorData,
}: {
  sensorData: AirQuality;
}) {
  return (
    <div
      className={`${process.env.AQMS_TYPE === "mini" ? "h-[calc(100vh-350px)]" : "h-full w-1/2"} flex flex-row p-3 gap-4 text-blue-darkest`}
    >
      <Pm pm10Value={sensorData.pm10} pm25Value={sensorData.pm25} />
      {process.env.AQMS_TYPE === "mini" && (
        <Gas no2={sensorData.no2} so2={sensorData.so2} />
      )}
    </div>
  );
}
