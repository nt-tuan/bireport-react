import React from "react";
import { Button } from "@blueprintjs/core";
import { ReportAdminContext } from "views/ReportAdmin";
import { DefaultFilters, IFilterMeta } from "resources/report/ReportTemplate";

const newFilter: IFilterMeta = {
  label: "",
  name: "",
  columnIndex: 0,
  rowIndex: 0,
  required: false,
};
export const AddFilterButton = () => {
  const { setSelectedReport } = React.useContext(ReportAdminContext);
  const handleAddFilter = () => {
    setSelectedReport &&
      setSelectedReport((report) =>
        report
          ? {
              ...report,
              filterMetas: [...(report?.filterMetas ?? []), newFilter],
            }
          : undefined
      );
  };

  const handleAddDefaultFilters = () => {
    setSelectedReport &&
      setSelectedReport((report) =>
        report
          ? {
              ...report,
              filterMetas: [],
            }
          : undefined
      );
    DefaultFilters.forEach(
      (filter) =>
        setSelectedReport &&
        setSelectedReport((report) =>
          report
            ? {
                ...report,
                filterMetas: [...report.filterMetas, filter],
              }
            : undefined
        )
    );
  };
  return (
    <>
      <Button icon="add" intent="primary" onClick={handleAddFilter}>
        New
      </Button>
      <Button icon="add" intent="primary" onClick={handleAddDefaultFilters}>
        New default
      </Button>
    </>
  );
};
