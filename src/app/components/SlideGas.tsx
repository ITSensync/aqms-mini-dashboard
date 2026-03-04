"use client";
import React, { useState } from "react";
import LineGraph from "./LineGraph";
import { AirQuality } from "../types/Datatypes";

export default function SlideGas({ gasData }: { gasData: AirQuality[] }) {
  const [buttonState, setButtonState] = useState({
    so2: process.env.AQMS_TYPE === "mini",
    no2: false,
  });

  const handleBtnSO2 = () => {
    const newState = {
      so2: true,
      no2: false,
    };

    setButtonState(newState);
  };

  const handleBtnNO2 = () => {
    const newState = {
      so2: false,
      no2: true,
    };

    setButtonState(newState);
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
          process.env.AQMS_TYPE === "fixed" ? "grid-cols-5" : "grid-cols-2"
        } gap-10 p-4 mt-4`}
      >
        <div
          onClick={handleBtnSO2}
          className={`${
            buttonStateColor(buttonState.so2)
          } text-white font-bold text-center w-full p-4 rounded-box cursor-pointer active:transition active:scale-90 active:ease-in-out`}
        >
          SO2
        </div>
        <div
          onClick={handleBtnNO2}
          className={`${
            buttonState.no2 ? "bg-blue-darkest" : "bg-blue-light opacity-85"
          } text-white font-bold text-center w-full p-4 rounded-box cursor-pointer active:transition active:scale-90 active:ease-in-out`}
        >
          NO2
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
            param="gas"
            sensorData={gasData}
            // height={process.env.AQMS_TYPE === "supermini" ? 160 : 120}
            buttonStateGas={buttonState}
          />
        </div>
      </div>
    </>
  );
}
