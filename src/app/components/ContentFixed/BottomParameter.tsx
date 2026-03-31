import React from "react";
import WeatherTextValue from "./WeatherTextValue";
import { FaCompass } from "react-icons/fa";
import { GiSpeedometer, GiWindsock } from "react-icons/gi";
import { FaTemperatureHalf } from "react-icons/fa6";
import { RiWaterPercentFill } from "react-icons/ri";
import { IoRainyOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { TbUvIndex } from "react-icons/tb";

export default function BottomParameter({
  ws = 0 ,
  wd = 0,
  temp = 0,
  humd = 0,
  rain = 0,
  uv = 0,
  solar = 0,
  press = 0,
}: {
  ws: number;
  wd: number;
  temp: number;
  humd: number;
  press: number;
  rain: number;
  solar: number;
  uv: number;
}) {
  return (
    <div className={`${process.env.AQMS_TYPE === 'mini'  ? "grid-cols-8 h-[calc(100vh-520px)]": 'grid-cols-4 w-2/3'} grid p-3 gap-4 text-blue-darkest`}>
      <WeatherTextValue
        icon={<FaCompass size={50} />}
        param="Arah Angin"
        value={wd}
        unit="°"
      />
      <WeatherTextValue
        icon={<GiWindsock size={50} />}
        param="Kec. Angin"
        value={ws}
        unit="mph"
      />
      <WeatherTextValue
        icon={<FaTemperatureHalf size={50} />}
        param="Suhu"
        value={temp}
        unit="°C"
      />
      <WeatherTextValue
        icon={<RiWaterPercentFill size={50} />}
        param="Kelembapan"
        value={humd}
        unit="%"
      />
      <WeatherTextValue
        icon={<IoRainyOutline size={50} />}
        param="Curah Hujan"
        value={rain}
        unit="mm/jam"
      />
      <WeatherTextValue
        icon={<GiSpeedometer size={50} />}
        param="Tekanan"
        value={press}
        unit="mBar"
      />
      <WeatherTextValue
        icon={<MdOutlineWbSunny size={50} />}
        param="Radiasi"
        value={solar}
        unit="w/m2"
      />
      <WeatherTextValue icon={<TbUvIndex size={50} />} param="UV" value={uv} />
    </div>
  );
}
