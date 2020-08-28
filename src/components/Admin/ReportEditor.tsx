import React from "react";
import {
  InputGroup,
  FormGroup,
  EditableText,
  Tabs,
  Tab,
  ButtonGroup,
  Classes,
  Button,
} from "@blueprintjs/core";
import { ReportAdminContext } from "views/ReportAdmin";
import { FilterEditor } from "./FilterEditor";
import { IFilterMeta } from "resources/report/ReportTemplate";
import { SaveNewReportButton } from "./Buttons/SaveNewReportButton";
import { CancelEditReportButton } from "./Buttons/CancelEditReportButton";
import { AddFilterButtons } from "./Buttons/AddFilterButton";
import { UpdateReportButton } from "./Buttons/UpdateReportButton";
import { EditorHeader } from "./EditorHeader";
import { Report } from "components/Report/Report";
import { NewCopyButton } from "./Buttons/NewCopyButton";
import { ReportEmpty } from "./ReportEmpty";
import RGL, { Layout, WidthProvider } from "react-grid-layout";
import { Filter } from "components/Report/Filters";
import { ReportFilterConstants } from "constants/layouts";
const GridLayout = WidthProvider(RGL);
const ReportFilterList = () => {
  const { selectedReport, setSelectedReport } = React.useContext(
    ReportAdminContext
  );
  const updateFilter = (index: number, newFilter: IFilterMeta) => {
    setSelectedReport &&
      setSelectedReport((report) =>
        report
          ? {
              ...report,
              filterMetas: report?.filterMetas.map((filter, filterIndex) => {
                if (filterIndex !== index) {
                  return filter;
                }
                return newFilter;
              }),
            }
          : undefined
      );
  };
  const handleRemove = (index: number) => {
    const filterMetas =
      selectedReport?.filterMetas.filter(
        (_, filterIndex) => filterIndex !== index
      ) ?? [];
    setSelectedReport &&
      setSelectedReport((report) =>
        report
          ? {
              ...report,
              filterMetas,
            }
          : undefined
      );
  };
  const handleLayoutChange = React.useCallback(
    (layouts: Layout[]) => {
      console.log(layouts);
      if (selectedReport == null || setSelectedReport == null) return;
      const metas = selectedReport.filterMetas.map((f, index) => {
        const layout = layouts.filter(
          (layout) => layout.i === index.toString()
        );
        if (layout.length > 0) {
          const { x, y, w, h } = layout[0];
          return { ...f, x, y, w, h };
        }
        return f;
      });
      console.log(metas);
      setSelectedReport((report) =>
        report ? { ...report, filterMetas: metas } : report
      );
    },
    [selectedReport, setSelectedReport]
  );
  const layout = React.useMemo(() => {
    if (selectedReport == null) return [];
    return selectedReport.filterMetas.map((f, index) => {
      const { x, y, w, h } = f;
      return { i: index.toString(), x, y, w, h };
    });
  }, [selectedReport]);
  return (
    <>
      <div style={{ display: "flex" }}>
        <h3 style={{ flexGrow: 1 }} className="bp3-heading">
          Điều kiện lọc
        </h3>
        <AddFilterButtons />
      </div>
      {selectedReport && selectedReport.filterMetas && (
        <GridLayout
          layout={layout}
          className="layout"
          cols={ReportFilterConstants.cols.lg}
          rowHeight={ReportFilterConstants.rowHeight + 20}
          compactType="vertical"
          onLayoutChange={handleLayoutChange}
        >
          {selectedReport.filterMetas.map((f, index) => (
            <div key={index.toString()} className="editing-filter">
              <FilterEditor
                index={index}
                filter={f}
                onChange={updateFilter}
                onRemove={handleRemove}
              />
            </div>
          ))}
        </GridLayout>
      )}
    </>
  );
};

const SQLEditor = () => {
  const { selectedReport, setSelectedReport } = React.useContext(
    ReportAdminContext
  );
  const handleTemplateSQLChange = (templateSql: string) => {
    setSelectedReport &&
      setSelectedReport((selectedReport) =>
        selectedReport ? { ...selectedReport, templateSql } : undefined
      );
  };
  if (selectedReport == null) return <></>;
  return (
    <FormGroup label="Mẫu SQL">
      <EditableText
        multiline={true}
        minLines={12}
        defaultValue={selectedReport.templateSql}
        onConfirm={handleTemplateSQLChange}
      />
    </FormGroup>
  );
};

const ReportGeneralEditor = () => {
  const { selectedReport, setSelectedReport } = React.useContext(
    ReportAdminContext
  );
  const handleInputChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedReport &&
      setSelectedReport((selectedReport) =>
        selectedReport
          ? {
              ...selectedReport,
              [name]: value,
            }
          : undefined
      );
  };

  if (selectedReport == null) return <></>;
  return (
    <>
      <FormGroup label="Tiêu đề">
        <InputGroup
          type="text"
          name="title"
          onBlur={handleInputChange}
          defaultValue={selectedReport.title}
        />
      </FormGroup>
      <FormGroup
        label="Tên menu"
        helperText="Ví dụ: Bán hàng/doanh số theo chi nhánh"
      >
        <InputGroup
          type="text"
          name="alias"
          onBlur={handleInputChange}
          defaultValue={selectedReport.alias}
        />
      </FormGroup>
    </>
  );
};

const ReportEditorLoading = () => {
  return (
    <div className="card">
      <div className="card-header align-left">
        <h2 className={Classes.SKELETON}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </h2>
        <div className={`card-header-actions`}>
          <Button className={Classes.SKELETON}>Lorem ipsum</Button>
          <Button className={Classes.SKELETON}>Lorem ipsum</Button>
          <Button className={Classes.SKELETON}>Lorem ipsum</Button>
        </div>
      </div>
      <div className="card-content">
        <div
          className={Classes.SKELETON}
          style={{ height: "50vh", width: "100%" }}
        ></div>
      </div>
    </div>
  );
};

export const ReportEditor = () => {
  const { selectedReport, selectedReportLoading } = React.useContext(
    ReportAdminContext
  );
  if (selectedReport == null && !selectedReportLoading) return <ReportEmpty />;
  if (selectedReport == null) return <ReportEditorLoading />;
  return (
    <div className="card">
      <div className="card-header align-left">
        <EditorHeader />
        <div className="card-header-actions">
          <ButtonGroup minimal={true}>
            <SaveNewReportButton />
            <UpdateReportButton />
            <NewCopyButton />
            <CancelEditReportButton />
          </ButtonGroup>
        </div>
      </div>
      <div className="card-content">
        <Tabs id="TabsExample" renderActiveTabPanelOnly>
          <Tab
            id="ng"
            title="Thông tin chung"
            panel={<ReportGeneralEditor />}
          />
          <Tab id="mb" title="Mẫu SQL" panel={<SQLEditor />} />
          <Tab id="rx" title="Điều kiện lọc" panel={<ReportFilterList />} />
          <Tab
            id="preview"
            title="Preview"
            panel={<Report report={selectedReport} hasSQLPreview={true} />}
          />
        </Tabs>
      </div>
    </div>
  );
};
