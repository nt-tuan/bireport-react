import React from "react";
import { IReportTemplate } from "resources/report/ReportTemplate";
import { reportAPI } from "resources/report/report";
import { EditableReportList } from "components/Admin/EditableReportList";
import { ReportEditor } from "components/Admin/ReportEditor";
import { Layout2 } from "layout/Layout2";
import { RequestError } from "resources/api/helper";
import { toastError } from "components/Commons/ToasterError";

interface IAdminContext {
  reports?: IReportTemplate[];
  setReports?: React.Dispatch<
    React.SetStateAction<IReportTemplate[] | undefined>
  >;
  selectedReport?: IReportTemplate;
  selectedReportLoading?: boolean;
  setSelectedReport?: React.Dispatch<
    React.SetStateAction<IReportTemplate | undefined>
  >;
  onSelectionChange?: (id?: number) => void;
  onNewReport?: () => void;
  onDeleteReport?: () => void;
  refresh?: () => void;
}
export const ReportAdminContext = React.createContext<IAdminContext>({});

export const ReportAdmin = () => {
  const [reports, setReports] = React.useState<IReportTemplate[]>();
  const [selectedReport, setSelectedReport] = React.useState<IReportTemplate>();
  const [selectedReportLoading, setSelectedReportLoading] = React.useState<
    boolean
  >();
  const refresh = () => reportAPI.getTemplates().then(setReports);
  const onSelectionChange = (id?: number) => {
    setSelectedReport(undefined);

    if (id == null) return;
    setSelectedReportLoading(true);
    reportAPI
      .getTemplate(id)
      .then(setSelectedReport)
      .catch((err: RequestError) => toastError(err.message))
      .finally(() => setSelectedReportLoading(false));
  };
  const onNewReport = () => {
    setSelectedReport({
      alias: "Report",
      title: "New report",
      templateSql: "",
      filterMetas: [],
    });
  };
  const onDeleteReport = () => {
    const id = selectedReport?.id;
    if (id == null) return;
    reportAPI.deleteTemplate(id).then(() => {
      setSelectedReport(undefined);
      setReports((reports) => reports?.filter((report) => report.id !== id));
    });
  };
  React.useEffect(() => {
    reportAPI.getTemplates().then(setReports);
  }, []);

  return (
    <ReportAdminContext.Provider
      value={{
        reports,
        setReports,
        selectedReport,
        selectedReportLoading,
        setSelectedReport,
        refresh,
        onSelectionChange,
        onNewReport,
        onDeleteReport,
      }}
    >
      <Layout2 left={<EditableReportList></EditableReportList>}>
        <ReportEditor />
      </Layout2>
    </ReportAdminContext.Provider>
  );
};
