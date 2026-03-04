import { IsTimeUpdate } from "@/app/utils/diffTime";
import React from "react";

export default function ServerStatus({
  tanggal,
  waktu,
  feedback,
}: {
  tanggal: string;
  waktu: string;
  feedback: string;
}) {
  // Ubah format tanggal dari YYYY-MM-DD ke DD/MM/YYYY
  const [year, month, day] = tanggal.split("-");
  const tanggalBaru = `${day}/${month}/${year}`;

  // Ambil jam dan menit saja dari waktu
  const [jam, menit] = waktu.split(":");
  const waktuBaru = `${jam}:${menit}`;

  return (
    <div
      className={`flex flex-col font-sf-pro-rounded text-center ${
        process.env.AQMS_TYPE === "fixed" ? "text-cyan-500" : "text-blue-darkest"
      }`}
    >
      <p className="font-bold text-2xl">
        Update:{" "}
        <span className="font-black">
          {tanggalBaru} {waktuBaru}
        </span>
      </p>
      <div className="font-bold text-2xl">
        <span className="">
          <div
            className={`badge ${
              IsTimeUpdate(tanggal, waktu) && feedback.includes("success")
                ? "badge-success"
                : "badge-error"
            }`}
          >
            <span className="text-lg">
              {IsTimeUpdate(tanggal, waktu) && feedback.includes("success")
                ? "Server Connected"
                : "Server Disconnected"}
            </span>
          </div>
        </span>
      </div>
    </div>
  );
}
