import React from "react";
import LayoutGraph from "../components/LayoutGraph";

export default function GraphPage() {
  return (
    <>
      <LayoutGraph />
      {/* {process.env.AQMS_TYPE === "fixed" ? (
        <LayoutGraphFixed />
      ) : (
        <LayoutGraphMini />
      )} */}
    </>
  );
}
