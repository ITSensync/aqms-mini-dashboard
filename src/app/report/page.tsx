import React from "react";
import LayoutReport from "../components/LayoutReport";

export default function ReportPage() {
  return (
    <>
      <LayoutReport />
      {/* {process.env.AQMS_TYPE === "fixed" ? (
        <LayoutReportFixed />
      ) : (
        <LayoutReportMini />
      )} */}
    </>
  );
}
