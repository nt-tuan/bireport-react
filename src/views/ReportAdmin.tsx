import React from "react";
import { IReportTemplate } from "resources/report/ReportTemplate";
import { reportAPI } from "resources/report/report";
import { ReportList } from "components/Admin/ReportList";
import { ReportUpdator } from "components/Admin/ReportUpdator";
import { ReportEditor } from "components/Admin/ReportEditor";
import { ReportEmpty } from "components/Admin/ReportEmpty";
import { Layout2 } from "layout/Layout2";

interface SelectedReportState {
  loading: boolean;
}

interface IAdminContext {
  reports?: IReportTemplate[];
  setReports?: React.Dispatch<
    React.SetStateAction<IReportTemplate[] | undefined>
  >;
  selectedReport?: IReportTemplate;
  setSelectedReport?: React.Dispatch<
    React.SetStateAction<IReportTemplate | undefined>
  >;
  refresh?: () => void;
}
export const ReportAdminContext = React.createContext<IAdminContext>({});

export const ReportAdmin = () => {
  const [reports, setReports] = React.useState<IReportTemplate[]>();
  const [selectedReport, setSelectedReport] = React.useState<IReportTemplate>();
  const refresh = () => reportAPI.getTemplates().then(setReports);
  React.useEffect(() => {
    reportAPI.getTemplates().then(setReports);
  }, []);

  return (
    <ReportAdminContext.Provider
      value={{
        reports,
        setReports,
        selectedReport,
        setSelectedReport,
        refresh,
      }}
    >
      <Layout2 left={<ReportList></ReportList>}>
        {selectedReport && <ReportEditor />}
        {!selectedReport && <ReportEmpty />}
      </Layout2>
    </ReportAdminContext.Provider>
  );
};
