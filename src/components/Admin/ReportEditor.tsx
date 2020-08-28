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
import { SaveNewReportButton } from "./Buttons/SaveNewReportButton";
import { CancelEditReportButton } from "./Buttons/CancelEditReportButton";
import { UpdateReportButton } from "./Buttons/UpdateReportButton";
import { EditorHeader } from "./EditorHeader";
import { Report } from "components/Report/Report";
import { NewCopyButton } from "./Buttons/NewCopyButton";
import { ReportEmpty } from "./ReportEmpty";
import { FilterListEditor } from "./FilterListEditor";

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
          <Tab id="rx" title="Điều kiện lọc" panel={<FilterListEditor />} />
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
