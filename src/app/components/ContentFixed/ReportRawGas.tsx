"use client";
import { sensorDataService } from "@/app/data/actions";
import { Gas } from "@/app/types/Datatypes";
import { splitDateTime } from "@/app/utils/formatter";
import React, { useEffect, useState } from "react";

export default function ReportRawGas() {
  const [sensorData, setSensorData] = useState<Gas[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [today, setToday] = useState('');
  const limit = 10;

  const fetchData = async () => {
    try {
      const response = await sensorDataService.getPagination(
        page,
        limit,
        "gas"
      );
      setTotalPage(response.pagination.total_page);
      setSensorData(response.data);
      setToday(splitDateTime(response.data[0].waktu).tanggal)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getColSpan = () => {
    if (process.env.AQMS_TYPE === "fixed") {
      return 16;
    } else if (process.env.AQMS_TYPE === "mini") {
      return 12;
    } else {
      return 10;
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="p-6 w-full">
      <div className="bg-cyan-500 p-2 rounded-box opacity-85 mb-4">
        <p className="font-sf-pro-rounded text-xl font-bold text-white text-center">
          Raw Data Parameter Gas ({today})
        </p>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-cyan-500 opacity-85">
        <table className="table text-white font-sf-pro-rounded">
          {/* head */}
          <thead className="text-zinc-100 font-light text-center">
            <tr>
              <th></th>
              <th>Waktu</th>
              <th>CO</th>
              <th>SO2</th>
              <th>NO2</th>
              <th>HC</th>
              <th>RAW CO</th>
              <th>RAW SO2</th>
              <th>RAW NO2</th>
              <th>RAW HC</th>
              <th>PPM CO</th>
              <th>PPM SO2</th>
              <th>PPM NO2</th>
              <th>PPM HC</th>
            </tr>
          </thead>
          <tbody className="font-extrabold text-md text-center">
            {sensorData.map((data, index) => {
              const rowNumber = (page - 1) * limit + (index + 1);

              return (
                <tr key={data.id}>
                  <td>{rowNumber}</td>
                  <td>{splitDateTime(data.waktu).jam}</td>
                  <td>{data.co}</td>
                  <td>{data.so2}</td>
                  <td>{data.no2}</td>
                  <td>{data.hc}</td>
                  <td>{data.raw_co}</td>
                  <td>{data.raw_so2}</td>
                  <td>{data.raw_no2}</td>
                  <td>{data.raw_hc}</td>
                  <td>{data.ppm_co}</td>
                  <td>{data.ppm_so2}</td>
                  <td>{data.ppm_no2}</td>
                  <td>{data.ppm_hc}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="">
            <tr>
              <td colSpan={getColSpan()} className="p-4">
                <div className="flex justify-end gap-3 px-2">
                  {page !== 1 && (
                    <span
                      className="cursor-pointer"
                      onClick={() => setPage((p) => p - 1)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 text-white"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                  <p className="text-white font-sf-pro-rounded font-semibold text-md">
                    Page {page} <span className="font-normal">of</span>{" "}
                    {totalPage}
                  </p>
                  {page !== totalPage && (
                    <span
                      className="cursor-pointer"
                      onClick={() => setPage((p) => p + 1)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 text-white"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
