import React from "react";
import { Button } from "@blueprintjs/core";
import { ReportAdminContext } from "views/ReportAdmin";

export const DeleteReportButton = () => {
  const { onDeleteReport, setSelectedReport } = React.useContext(
    ReportAdminContext
  );
  if (setSelectedReport == null) return <></>;
  return (
    <Button
      icon="delete"
      intent="danger"
      onClick={() => onDeleteReport && onDeleteReport()}
    />
  );
};
