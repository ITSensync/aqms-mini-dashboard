import React, { useState } from "react";
import LineGraph from "./LineGraph";
import { AirQuality } from "../types/Datatypes";

export default function SlidePm({ pmData }: { pmData: AirQuality[] }) {
  const [buttonState, setPmState] = useState({
    pm25: true,
  });

  const handleBtnPm25 = () => {
    setPmState({
      pm25: true,
    });
  };

  const buttonStateColor = (state: boolean) => {
    if (process.env.AQMS_TYPE === "fixed") {
      return state ? "bg-cyan-700" : "bg-cyan-500 opacity-85";
    } else {
      return state ? "bg-blue-darkest" : "bg-blue-light opacity-85";
    }
  };

  return (
    <>
      <div
        className={`grid ${
          process.env.AQMS_TYPE === "fixed" ? "grid-cols-2" : "grid-cols-1"
        } gap-10 p-4 mt-4`}
      >
        <div
          onClick={handleBtnPm25}
          className={`${buttonStateColor(
            buttonState.pm25
          )} text-white font-bold text-center w-full p-4 rounded-box cursor-pointer active:transition active:scale-90 active:ease-in-out`}
        >
          PM2.5
        </div>
      </div>
      <div className="p-4">
        <div
          className={`w-full bg-white opacity-85 p-2 rounded-box chart-container ${
            process.env.AQMS_TYPE == "fixed"
              ? "h-[calc(100vh-270px)]"
              : "h-[calc(100vh-150px)]"
          }`}
        >
          <LineGraph
            param="pm"
            sensorData={pmData}
            // height={process.env.AQMS_TYPE === "supermini" ? 150 : 120}
            buttonStatePm={buttonState}
          />
        </div>
      </div>
    </>
  );
}
