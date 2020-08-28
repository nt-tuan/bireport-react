import React from "react";
import { IButtonProps, Button } from "@blueprintjs/core";
import { ReportAdminContext } from "views/ReportAdmin";

export const NewCopyButton = (props: IButtonProps) => {
  const { selectedReport, setSelectedReport } = React.useContext(
    ReportAdminContext
  );
  const handleClick = () => {
    if (selectedReport == null) return;
    const filterMetas = selectedReport.filterMetas.map((u) => ({
      ...u,
      id: undefined,
    }));
    setSelectedReport &&
      selectedReport &&
      setSelectedReport(
        JSON.parse(
          JSON.stringify({ ...selectedReport, filterMetas, id: undefined })
        )
      );
  };
  console.log(selectedReport);
  if (selectedReport == null) return <></>;
  return (
    <Button {...props} intent="primary" onClick={handleClick}>
      New copy
    </Button>
  );
};
