import React from "react";
import { ReportAdminContext } from "views/ReportAdmin";

export const EditorHeader = () => {
  const { selectedReport } = React.useContext(ReportAdminContext);
  if (selectedReport == null) return <></>;
  if (selectedReport.id == null) return <h2>Thêm báo cáo mới</h2>;
  return <h2>Cập nhật báo cáo #{selectedReport.id}</h2>;
};
