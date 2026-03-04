"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { locationService } from "@/app/data/actions";
import { AirQuality, Location } from "@/app/types/Datatypes";
import DigitalClock from "./DigitalClock";
import ServerStatus from "./ServerStatus";

export default function Navbar({ sensorData }: { sensorData: AirQuality }) {
  const [isOnline, setIsOnline] = useState(true);
  const [location, setLocation] = useState({
    lat: 0,
    long: 0,
  });
  const router = useRouter();

  const loadLocation = async () => {
    try {
      const locResponse = await locationService.getLocation();
      if (locResponse.data) {
        const locData: Location = locResponse.data;
        setLocation({
          lat: locData.lat,
          long: locData.long,
        });
      } else {
        throw {
          message: "Failed To Get Location",
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadLocation();

    const interval = setInterval(loadLocation, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkOnlineStatus = async () => {
      try {
        const res = await fetch("/api/ping");
        const data = await res.json();
        setIsOnline(data.online);
      } catch {
        setIsOnline(false);
      }
    };

    // cek pertama kali
    checkOnlineStatus();

    // tambahkan event listener online/offline
    const handleOnline = () => checkOnlineStatus();
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // opsional: polling setiap beberapa detik
    const interval = setInterval(checkOnlineStatus, 300000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []);

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <div className={`navbar text-blue-darkest shadow-lg`}>
      <div className="w-full flex justify-between items-center mx-5 my-2">
        <div
          className="flex flex-row items-center gap-6 hover:cursor-pointer"
          onClick={handleHomeClick}
        >
          <div className="flex flex-row">
            {/* <Image src={"/klhk.png"} width={90} height={20} alt="DLH logo" /> */}
            {/* <div className="divider divider-horizontal divider-accent"></div> */}
            <Image
              src={"/sensync-logo.png"}
              width={50}
              height={40}
              alt="sensync logo"
            />
          </div>
          <div className="flex flex-col gap-1">
            <a className="text-3xl  font-extrabold font-sf-pro-rounded">
              AQMS Mini - {process.env.AQMS_SITE}
            </a>
            <div className="flex flex-row gap-2 align-middle items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-emerald-800"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.262 6.072a8.25 8.25 0 1 0 10.562-.766 4.5 4.5 0 0 1-1.318 1.357L14.25 7.5l.165.33a.809.809 0 0 1-1.086 1.085l-.604-.302a1.125 1.125 0 0 0-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z"
                  clipRule="evenodd"
                />
              </svg>

              <a className="font-sf-pro-rounded text-lg ">
                <span className="font-extrabold">
                  {location.lat.toFixed(3)}
                </span>{" "}
                <span className="">&deg;LU</span>
              </a>
              <a className="font-sf-pro-rounded text-lg ">,</a>
              <a className="font-sf-pro-rounded text-lg ">
                <span className="font-extrabold">
                  {location.long.toFixed(3)}
                </span>{" "}
                <span className="">&deg;LS</span>
              </a>
            </div>
          </div>
        </div>
        <div>
          <ServerStatus
            tanggal={sensorData.tanggal}
            waktu={sensorData.jam}
            feedback={sensorData.feedback}
          />
        </div>
        <div className="flex gap-5 items-center">
          <ul className="menu menu-horizontal px-1 items-center gap-2 z-10">
            <li>
              <details>
                <summary className="font-sf-pro-rounded font-bold text-2xl ">
                  Menu
                </summary>
                <ul
                  className={`${
                    process.env.AQMS_TYPE === "fixed"
                      ? "bg-zinc-800"
                      : "bg-blue-light"
                  } rounded-t-none p-2`}
                >
                  <li className="w-full mb-2">
                    <Link
                      href={"/report"}
                      className={`flex flex-row items-center w-full justify-between border-0 ${
                        process.env.AQMS_TYPE === "fixed"
                          ? "hover:bg-zinc-900"
                          : "hover:bg-blue-darkest"
                      } font-sf-pro-rounded font-black`}
                    >
                      <p
                        className={`${
                          process.env.AQMS_TYPE === "fixed"
                            ? "text-cyan-500"
                            : "text-white"
                        }`}
                      >
                        Lihat Laporan
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`size-6 ${
                          process.env.AQMS_TYPE === "fixed"
                            ? "text-cyan-500"
                            : "text-white"
                        }`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                          clipRule="evenodd"
                        />
                        <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                      </svg>
                    </Link>
                  </li>

                  <li className="w-full">
                    <Link
                      href={"/graph"}
                      className={`flex flex-row items-center w-full justify-between border-0 ${
                        process.env.AQMS_TYPE === "fixed"
                          ? "hover:bg-zinc-900"
                          : "hover:bg-blue-darkest"
                      } font-sf-pro-rounded font-black`}
                    >
                      <p
                        className={`${
                          process.env.AQMS_TYPE === "fixed"
                            ? "text-cyan-500"
                            : "text-white"
                        }`}
                      >
                        Grafik / Trend
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`size-6 ${
                          process.env.AQMS_TYPE === "fixed"
                            ? "text-cyan-500"
                            : "text-white"
                        }`}
                      >
                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                      </svg>
                    </Link>
                  </li>

                  <li className="w-full">
                    <Link
                      href={"http://192.168.20.20/spku/display/button.php"}
                      className={`flex flex-row items-center w-full justify-between border-0  ${
                        process.env.AQMS_TYPE === "fixed"
                          ? "hover:bg-zinc-900"
                          : "hover:bg-blue-darkest"
                      } font-sf-pro-rounded font-black `}
                    >
                      <p
                        className={`${
                          process.env.AQMS_TYPE === "fixed"
                            ? "text-cyan-500"
                            : "text-white"
                        }`}
                      >
                        ON / OFF
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        className={`size-6 ${
                          process.env.AQMS_TYPE === "fixed"
                            ? "text-cyan-500"
                            : "text-white"
                        }`}
                      >
                        <path
                          fill="currentColor"
                          d="M12 11a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m.5-9c4.5 0 4.61 3.57 2.25 4.75c-.99.49-1.43 1.54-1.62 2.47c.48.2.9.51 1.22.91c3.7-2 7.68-1.21 7.68 2.37c0 4.5-3.57 4.6-4.75 2.23c-.5-.99-1.56-1.43-2.49-1.62c-.2.48-.51.89-.91 1.23c1.99 3.69 1.2 7.66-2.38 7.66c-4.5 0-4.59-3.58-2.23-4.76c.98-.49 1.42-1.53 1.62-2.45c-.49-.2-.92-.52-1.24-.92C5.96 15.85 2 15.07 2 11.5C2 7 5.56 6.89 6.74 9.26c.5.99 1.55 1.42 2.48 1.61c.19-.48.51-.9.92-1.22C8.15 5.96 8.94 2 12.5 2"
                        />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li className="flex flex-row items-center gap-4">
              <DigitalClock />
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle  text-5xl"
              >
                {isOnline ? (
                  <WifiIcon fontSize="inherit" />
                ) : (
                  <WifiOffIcon fontSize="inherit" />
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
