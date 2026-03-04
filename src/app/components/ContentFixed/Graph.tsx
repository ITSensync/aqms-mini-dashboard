"use client";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import SlideGas from "../SlideGas";
import SlideWeather from "../SlideWeather";
import SlidePm from "../SlidePm";
import { AirQuality } from "@/app/types/Datatypes";
import { sensorDataService } from "@/app/data/actions";

export default function Graph() {
  const [sensorData, setSensorData] = useState<AirQuality[]>([]);
  const fetchData = async () => {
    try {
      const today = new Date();

      const now =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");

      const response = await sensorDataService.get(now);
      console.log(response);

      setSensorData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Swiper className="mySwiper ">
      <SwiperSlide>
        <SlidePm pmData={sensorData} />
      </SwiperSlide>
      {process.env.AQMS_TYPE === "mini" && (
        <SwiperSlide>
          <SlideGas gasData={sensorData} />
        </SwiperSlide>
      )}
      <SwiperSlide>
        <SlideWeather weatherData={sensorData} />
      </SwiperSlide>
    </Swiper>
  );
}
