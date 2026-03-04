"use client";
import React from "react";
import dynamic from "next/dynamic";
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

export default function GaugeDiagram({
  value = "1000.20",
  unit = "W/m3",
  name = "Lorem",
}: {
  value?: string | number;
  unit?: string;
  name?: string;
}) {
  return (
    <div className={`${process.env.AQMS_TYPE === "mini" && "flex flex-row"}`}>
      <GaugeComponent
        value={Number(value)}
        className={`${
          process.env.AQMS_TYPE === "mini"
            ? ""
            : process.env.AQMS_TYPE === "supermini"
            ? "w-[20vw] ml-10"
            : "-mb-8"
        }`}
        type="radial"
        arc={{
          gradient: true,
          width: 0.25,
          colorArray: ["#5BE12C", "#EA4228"],
          subArcs: [
            {
              color: "#EA4228",
              // showTick: true,
            },
            {},
            {},
            // {
            //   // limit: 37,
            //   // color: "#F5CD19",
            //   // showTick: true,
            // },
            // {
            //   // limit: 58,
            //   // color: "#5BE12C",
            //   // showTick: true,
            // },
            // {
            //   // limit: 75,
            //   // color: "#F5CD19",
            //   // showTick: true,
            // },
            { color: "#EA4228" },
          ],
        }}
        pointer={{
          length: 0.65,
          color: "#001e2d",
          elastic: true,
          animationDelay: 0,
          width: 15,
        }}
        labels={{
          valueLabel: {
            formatTextValue: () => "",
            style: {
              fontSize: 24,
              fill: "#0F67B1",
              fontWeight: "bold",
              textShadow: "",
            },
          },
          tickLabels: {
            hideMinMax: true,
            type: "outer",
            defaultTickValueConfig: {
              formatTextValue: (value) => value,
              style: {
                fill: "#0F67B1",
                fontSize: 8,
              },
            },
            defaultTickLineConfig: {
              length: 5,
              color: "#0567B1",
            },
          },
        }}
      />
      {process.env.AQMS_TYPE === "mini" ? (
        <div className="font-sf-pro-rounded text-blue-darkest flex flex-col justify-center items-start gap-2">
          <p className="font-black text-4xl">{value}</p>
          {/* <div className="flex flex-row items-start gap-0.5"></div> */}
          <p className="text-2xl font-semibold">
            {name} ({unit})
          </p>
        </div>
      ) : process.env.AQMS_TYPE === "supermini" ? (
        <div className="font-sf-pro-rounded text-blue-darkest flex flex-col justify-center items-center gap-4">
          <div className="flex flex-row items-end gap-0.5">
            <p className="font-black text-5xl">{value}</p>
            <p className="text-xl">{unit}</p>
          </div>
          <p className="text-4xl font-semibold text-center">{name}</p>
        </div>
      ) : (
        <div className="font-sf-pro-rounded text-blue-darkest flex flex-col justify-center items-center">
          <div className="flex flex-row items-end gap-0.5">
            <p className="font-black text-xl">{value}</p>
            <p className="text-md">{unit}</p>
          </div>
          <p className="text-lg font-semibold text-center">{name}</p>
        </div>
      )}
    </div>
  );
}
