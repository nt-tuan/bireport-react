import React from "react";
import { Button, IButtonProps } from "@blueprintjs/core";
import { ReportAdminContext } from "views/ReportAdmin";

export const CancelEditReportButton = (props: IButtonProps) => {
  const { setSelectedReport } = React.useContext(ReportAdminContext);
  const handleClick = () => {
    setSelectedReport && setSelectedReport(undefined);
  };
  return (
    <Button {...props} intent="primary" onClick={handleClick}>
      Hủy
    </Button>
  );
};
