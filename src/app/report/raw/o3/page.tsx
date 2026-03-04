import React from "react";
import LayoutReportFixed from "@/app/components/LayoutReport";
import LayoutReportMini from "@/app/components/LayoutReportMinit";

export default function ReportPage() {
  return (
    <>
      {process.env.AQMS_TYPE === "fixed" ? (
        <LayoutReportFixed param="o3"/>
      ) : (
        <LayoutReportMini />
      )}
    </>
  );
}
