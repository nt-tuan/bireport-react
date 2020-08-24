import React from "react";
import { IReportTemplate } from "resources/report/ReportTemplate";
import { Filters } from "./Filters";
import { Button } from "@blueprintjs/core";
import { FilterItem } from "resources/report/FilterItem";
import { reportAPI } from "resources/report/report";
import { toastError } from "components/Commons/ToasterError";
export type FilterItemSet = { [key: string]: FilterItem };
interface ReportContextState {
  items: FilterItemSet;
  setItems?: React.Dispatch<React.SetStateAction<FilterItemSet>>;
}

export const ReportContext = React.createContext<ReportContextState>({
  items: {},
});

interface Props {
  report: IReportTemplate;
  hasSQLPreview?: boolean;
}

export const Report = (props: Props) => {
  const [items, setItems] = React.useState<FilterItemSet>({});
  const handlePreview = () => {
    const id = props.report.id;
    if (id === undefined) {
      toastError("Report không hợp lệ");
      return;
    }
    const array = Object.values(items);
    reportAPI.getReportSQL({ items: array, id }).then(console.log);
  };
  const handleViewOnline = () => {};
  const handleExportExcel = () => {};
  return (
    <ReportContext.Provider value={{ items, setItems }}>
      <div className="card">
        <div className="card-header align-left">
          <h2>{props.report.title}</h2>
          <div className="card-header-actions">
            <Button intent="primary" icon="eye-open" onClick={handleViewOnline}>
              Xem online
            </Button>
            <Button intent="primary" icon="export" onClick={handleExportExcel}>
              Xuất excel
            </Button>
            {props.hasSQLPreview && (
              <Button onClick={handlePreview} intent="primary" icon="code">
                Xem SQL
              </Button>
            )}
          </div>
        </div>
        <hr />
        <div className="card-content">
          <Filters filters={props.report.filterMetas} />
        </div>
      </div>
    </ReportContext.Provider>
  );
};
