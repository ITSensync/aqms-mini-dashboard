"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { AirQuality } from "../types/Datatypes";

// Dynamically import ApexCharts to prevent SSR issues
type StateGas = {
  so2: boolean;
  no2: boolean;
};

type StateWeather = {
  ws: boolean;
  wd: boolean;
  temp: boolean;
  hum: boolean;
  press: boolean;
  sr: boolean;
  rain: boolean;
};

type StatePM = {
  pm25: boolean;
};

export default function LineGraph({
  param,
  sensorData,
  buttonStateGas = { so2: false, no2: false},
  buttonStateWeather = {
    ws: false,
    wd: false,
    temp: false,
    hum: false,
    press: false,
    sr: false,
    rain: false,
  },
  buttonStatePm = { pm25: false },
  // height = 100,
}: {
  param: string;
  sensorData: AirQuality[];
  buttonStateGas?: StateGas;
  buttonStateWeather?: StateWeather;
  buttonStatePm?: StatePM;
  // height: number;
}) {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const generateColorPm = (state: StatePM) => {
    switch (true) {
      case state.pm25:
        return "rgba(63, 81, 181, 0.9)";
      default:
        return "rgba(0, 0, 0, 1)";
    }
  };

  const generateColorGas = (state: StateGas) => {
    switch (true) {
      case state.so2:
        return "rgba(255, 183, 77, 0.8)";
      case state.no2:
        return "rgba(129, 212, 250, 0.8)";
      default:
        return "rgba(0, 0, 0, 1)";
    }
  };

  const generateColorWeather = (state: StateWeather) => {
    switch (true) {
      case state.ws:
        return "rgba(255, 0, 0, 1)";
      case state.wd:
        return "rgba(255, 165, 0, 1)";
      case state.temp:
        return "rgba(0, 123, 255, 1)";
      case state.hum:
        return "rgba(0, 200, 83, 1)";
      case state.press:
        return "rgba(156, 39, 176, 1)";
      case state.rain:
        return "rgba(33, 150, 243, 1)";
      case state.sr:
        return "rgba(255, 193, 7, 1)";
      default:
        return "rgba(0, 0, 0, 1)";
    }
  };

  const generateTextGas = (state: StateGas) => {
    switch (true) {
      case state.so2:
        return "SO2";
      case state.no2:
        return "NO2";
      default:
        return "-";
    }
  };

  const generateTextPm = (state: StatePM) => {
    switch (true) {
      case state.pm25:
        return "PM25";
      default:
        return "-";
    }
  };

  const generateTextWeather = (state: StateWeather) => {
    switch (true) {
      case state.ws:
        return "Kecepatan Angin";
      case state.wd:
        return "Arah Angin";
      case state.temp:
        return "Suhu";
      case state.press:
        return "Tekanan";
      case state.hum:
        return "Kelembapan";
      case state.rain:
        return "Curah Hujan";
      case state.sr:
        return "Solar Radiasi";
      default:
        return "-";
    }
  };

  const renderDataPm = (state: StatePM, pmData: AirQuality) => {
    switch (true) {
      case state.pm25:
        return pmData.pm25;
      default:
        return 0;
    }
  };

  const renderDataGas = (state: StateGas, gasData: AirQuality) => {
    switch (true) {
      case state.so2:
        return gasData.so2;
      case state.no2:
        return gasData.no2;
      default:
        return 0;
    }
  };

  const renderDataWeather = (state: StateWeather, weatherData: AirQuality) => {
    switch (true) {
      case state.ws:
        return weatherData.ws;
      case state.wd:
        return weatherData.wd;
      case state.hum:
        return weatherData.humidity;
      case state.temp:
        return weatherData.temperature;
      case state.press:
        return weatherData.pressure;
      case state.rain:
        return weatherData.rain_intensity;
      case state.sr:
        return weatherData.sr;
      default:
        return 0;
    }
  };

  const data = {
    labels: sensorData.map((data) => {
      return data.jam.substring(0, 5);
    }),
    datasets: [
      {
        label: "",
        data: sensorData.map((data) => {
          if (param == "gas") {
            return renderDataGas(buttonStateGas, data);
          } else if (param === "pm") {
            return renderDataPm(buttonStatePm, data);
          } else {
            return renderDataWeather(buttonStateWeather, data);
          }
        }),
        borderColor:
          param === "gas"
            ? generateColorGas(buttonStateGas)
            : param === "pm"
            ? generateColorPm(buttonStatePm)
            : generateColorWeather(buttonStateWeather),
        backgroundColor:
          param === "gas"
            ? generateColorGas(buttonStateGas)
            : param === "pm"
            ? generateColorPm(buttonStatePm)
            : generateColorWeather(buttonStateWeather),
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${
          param === "gas"
            ? generateTextGas(buttonStateGas)
            : param === "pm"
            ? generateTextPm(buttonStatePm)
            : generateTextWeather(buttonStateWeather)
        } Data Chart`,
        font: { size: 20, family: "SF Pro Rounded" },
        color:
          param === "gas"
            ? generateColorGas(buttonStateGas)
            : param === "pm"
            ? generateColorPm(buttonStatePm)
            : generateColorWeather(buttonStateWeather),
      },
    },
  };

  return (
    <Line
      data={data}
      options={options}
      height={100}
      className="p-4 font-sf-pro"
    />
  );
}
