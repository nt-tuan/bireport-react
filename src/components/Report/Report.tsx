import React from "react";
import { IReportTemplate } from "resources/report/ReportTemplate";
import { Filters } from "./Filters";
import { Button, Callout, ButtonGroup } from "@blueprintjs/core";
import { FilterItem } from "resources/report/FilterItem";
import { reportAPI } from "resources/report/report";
import { toastError } from "components/Commons/ToasterError";
import { ReportSQL } from "resources/report/ReportSQL";
import { RequestError } from "resources/api/helper";
import { DataViewer } from "./DataViewer";
import { SQLViewer } from "./SQLViewer";
export type FilterItemSet = { [key: string]: FilterItem };
interface ReportContextState {
  items: FilterItemSet;
  report?: IReportTemplate;
  setItems?: React.Dispatch<React.SetStateAction<FilterItemSet>>;
}

export const ReportContext = React.createContext<ReportContextState>({
  items: {},
});

interface Props {
  report: IReportTemplate;
  hasSQLPreview?: boolean;
}

const validateInput = () => {};

export const Report = (props: Props) => {
  const [items, setItems] = React.useState<FilterItemSet>({});
  const [reportSQL, setReportSQL] = React.useState<ReportSQL>();
  const [error, setError] = React.useState<string>();
  const [data, setData] = React.useState<any[]>();
  const handlePreview = () => {
    const id = props.report.id;
    if (id === undefined) {
      toastError("Report không hợp lệ");
      return;
    }
    const array = Object.values(items);
    reportAPI
      .getReportSQL({ items: array, id })
      .then(setReportSQL)
      .catch((err: RequestError) => setError(err.message));
  };
  const handleViewOnline = () => {
    const id = props.report.id;
    if (id === undefined) {
      toastError("Report không hợp lệ");
      return;
    }
    const array = Object.values(items);
    reportAPI
      .getReport({ items: array, id })
      .then(setData)
      .catch((err: RequestError) => setError(err.message));
  };
  const handleExportExcel = () => {
    const id = props.report.id;
    if (id === undefined) {
      toastError("Report không hợp lệ");
      return;
    }
    const array = Object.values(items);
    reportAPI
      .downloadExcelReport({ items: array, id })
      .catch((err: RequestError) => setError(err.message));
  };
  return (
    <ReportContext.Provider value={{ items, setItems, report: props.report }}>
      <div className="card">
        {error && (
          <Callout intent="danger" title="Lỗi">
            {error}
          </Callout>
        )}
        <div className="card-header align-left">
          <h2>{props.report.title}</h2>
          <div className="card-header-actions">
            <ButtonGroup minimal>
              <Button
                intent="primary"
                icon="eye-open"
                onClick={handleViewOnline}
              >
                Xem online
              </Button>
              <Button
                intent="primary"
                icon="export"
                onClick={handleExportExcel}
              >
                Xuất excel
              </Button>
              {props.hasSQLPreview && (
                <Button onClick={handlePreview} intent="primary" icon="code">
                  Xem SQL
                </Button>
              )}
            </ButtonGroup>
          </div>
        </div>
        <hr />

        <Filters filters={props.report.filterMetas} />
        <SQLViewer reportSQL={reportSQL} />
        <DataViewer data={data} />
      </div>
    </ReportContext.Provider>
  );
};
