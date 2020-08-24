import React from "react";
import { InputGroup, FormGroup, EditableText } from "@blueprintjs/core";
import { ReportAdminContext } from "views/ReportAdmin";
import { FilterEditor } from "./FilterEditor";
import { IFilterMeta } from "resources/report/ReportTemplate";
import { PreviewButton } from "./Buttons/PreviewButton";
import { SaveNewReportButton } from "./Buttons/SaveNewReportButton";
import { CancelEditReportButton } from "./Buttons/CancelEditReportButton";
import { AddFilterButton } from "./Buttons/AddFilterButton";
import { UpdateReportButton } from "./Buttons/UpdateReportButton";
import { EditorHeader } from "./EditorHeader";

export const ReportEditor = () => {
  const { selectedReport, setSelectedReport } = React.useContext(
    ReportAdminContext
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleTemplateSQLChange = (templateSql: string) => {
    setSelectedReport &&
      setSelectedReport((selectedReport) =>
        selectedReport ? { ...selectedReport, templateSql } : undefined
      );
  };

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

  if (selectedReport == null) return <></>;
  return (
    <div className="card">
      <div className="card-header align-left">
        <EditorHeader />
        <div className="card-header-actions">
          <PreviewButton />
          <SaveNewReportButton />
          <UpdateReportButton />
          <CancelEditReportButton />
        </div>
      </div>
      <div className="card-content">
        <FormGroup label="Tiêu đề">
          <InputGroup
            type="text"
            name="title"
            onChange={handleInputChange}
            value={selectedReport.title}
          />
        </FormGroup>
        <FormGroup
          label="Tên menu"
          helperText="Ví dụ: Bán hàng/doanh số theo chi nhánh"
        >
          <InputGroup
            type="text"
            name="alias"
            onChange={handleInputChange}
            value={selectedReport.alias}
          />
        </FormGroup>
        <FormGroup label="Mẫu SQL">
          <EditableText
            multiline={true}
            minLines={12}
            maxLines={12}
            defaultValue={selectedReport.templateSql}
            onConfirm={handleTemplateSQLChange}
          />
        </FormGroup>

        <div style={{ display: "flex" }}>
          <h3 style={{ flexGrow: 1 }} className="bp3-heading">
            Filters
          </h3>
          <AddFilterButton />
        </div>
        {selectedReport.filterMetas &&
          selectedReport.filterMetas.map((filter, index) => (
            <FilterEditor
              key={index}
              index={index}
              filter={filter}
              onChange={updateFilter}
              onRemove={handleRemove}
            />
          ))}
      </div>
    </div>
  );
};
