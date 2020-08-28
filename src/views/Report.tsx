import React from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Layout2 } from "layout/Layout2";
import { EditableReportList } from "components/Admin/EditableReportList";
import { Report } from "components/Report/Report";
import { IReportTemplate } from "resources/report/ReportTemplate";
import { reportAPI } from "resources/report/report";
import { Classes } from "@blueprintjs/core";
import { ReportAdminContext } from "./ReportAdmin";

type TParams = { id: string };

const LoadingReportView = () => {
  return (
    <div className="card">
      <div className="card-header align-left">
        <h2 className={Classes.SKELETON}>Loading</h2>
      </div>
      <div className="card-content">
        <div className={Classes.SKELETON} style={{ height: "400px" }}></div>
      </div>
    </div>
  );
};

export const ReportView = ({ match }: RouteComponentProps<TParams>) => {
  const [report, setReport] = React.useState<IReportTemplate>();
  const [reports, setReports] = React.useState<IReportTemplate[]>();
  const history = useHistory();
  const setSelectedReport = (id?: number) => {
    if (id == null) {
      history.push(`/reportnotfound`);
      return;
    }
    history.push(`/report/${id}`);
  };
  React.useEffect(() => {
    const id = parseInt(match.params.id);
    reportAPI.getTemplate(id).then(setReport);
    reportAPI.getTemplates().then(setReports);
  }, [match]);

  return (
    <ReportAdminContext.Provider
      value={{
        reports,
        selectedReport: report,
        onSelectionChange: setSelectedReport,
      }}
    >
      <Layout2 left={<EditableReportList />}>
        {report && <Report report={report} hasSQLPreview />}
        {!report && <LoadingReportView />}
      </Layout2>
    </ReportAdminContext.Provider>
  );
};
