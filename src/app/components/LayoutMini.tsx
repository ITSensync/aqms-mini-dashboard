"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./ContentFixed/Navbar";
import Content from "./ContentFixed/Content";
import { AirQuality } from "../types/Datatypes";

export default function LayoutMini() {
  const [sensorData, setSensorData] = useState<AirQuality>({
    id: 0,
    tanggal: "",
    jam: "",
    no2: 0,
    so2: 0,
    pm25: 0,
    ws: 0,
    wd: 0,
    humidity: 0,
    temperature: 0,
    pressure: 0,
    sr: 0,
    uv: 0,
    rain_intensity: 0,
    stat_conn: "",
    feedback: "",
    feedback2: "",
  });

  const wsFetch = () => {
    const ws = new WebSocket(`${process.env.WS_URL as string}`);

    ws.onopen = () => {
      console.log("Websocket Connected");
      ws.send("");
    };

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      const particulateResult: AirQuality = receivedData;
      setSensorData(particulateResult);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  };

  /* const fetchData = async () => {
      const dummy = {
        id: "272",
        tanggal: "2025-08-07",
        jam: "14:20:00",
        hc: "20",
        o3: "10.5",
        co: "80.4",
        no2: "20",
        so2: "23",
        pm25: "6",
        pm10: "40",
        ws: "140",
        wd: "21",
        humidity: "20",
        temperature: "27",
        pressure: "4",
        sr: "5",
        rain_intensity: "10",
        stat_conn: "ada",
        feedback: '{"status":"success","inserted":1,"failed":0}',
        feedback2: '{"status":"received","inserted":1,"failed":0}',
      };
  
      // const responseData = await sensorDataService.getlatest();
      setSensorData(dummy);
    }; */

  useEffect(() => {
    // fetchData();
    wsFetch();
  }, []);

  return (
    <div className={`h-screen bg-[#E8FFFF]`}>
      <Navbar sensorData={sensorData} />
      <Content sensorData={sensorData} />
    </div>
  );
}
