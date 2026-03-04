import LayoutReportFixed from "@/app/components/LayoutReport";
import LayoutReportMini from "@/app/components/LayoutReportMinit";
import React from "react";

export default function ReportPage() {
  return (
    <>
      {process.env.AQMS_TYPE === "fixed" ? (
        <LayoutReportFixed param="pm"/>
      ) : (
        <LayoutReportMini />
      )}
    </>
  );
}
