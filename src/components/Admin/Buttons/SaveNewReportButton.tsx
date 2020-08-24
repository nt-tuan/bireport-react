import React from "react";
import { Button, IButtonProps } from "@blueprintjs/core";
import { reportAPI } from "resources/report/report";
import { ReportAdminContext } from "views/ReportAdmin";
import { toastError } from "components/Commons/ToasterError";
import { RequestError } from "resources/api/helper";

export const SaveNewReportButton = (props: IButtonProps) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { selectedReport, setSelectedReport, setReports } = React.useContext(
    ReportAdminContext
  );
  const handleClick = () => {
    if (selectedReport == null) return;
    setLoading(true);
    reportAPI
      .addTemplate(selectedReport)
      .then((report) => {
        setSelectedReport && setSelectedReport(report);
        setReports &&
          setReports((reports) =>
            reports?.map((old) => {
              if (old.id === report.id) return report;
              return old;
            })
          );
      })
      .catch((error: RequestError) => toastError(error.message))
      .finally(() => setLoading(false));
  };
  if (selectedReport == null || selectedReport.id != null) return <></>;
  return (
    <Button {...props} intent="primary" onClick={handleClick} loading={loading}>
      Lưu report
    </Button>
  );
};
