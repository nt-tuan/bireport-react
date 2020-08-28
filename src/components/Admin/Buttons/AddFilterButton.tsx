import React from "react";
import { Button, InputGroup, ControlGroup } from "@blueprintjs/core";
import { ReportAdminContext } from "views/ReportAdmin";
import { IFilterMeta, DefaultFilters } from "resources/report/ReportTemplate";
import { FilterTypeSelect } from "../FilterTypeSelect";
import { handleInputChange } from "react-select/src/utils";
import { FilterType } from "resources/report/FilterType";

const newFilter: IFilterMeta = {
  label: "",
  name: "",
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  required: false,
};
export const AddFilterButtons = () => {
  const [selectedType, setSelectedType] = React.useState<FilterType>();
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
    Object.values(DefaultFilters).forEach((filter) => {
      setSelectedReport &&
        setSelectedReport((report) =>
          report
            ? {
                ...report,
                filterMetas: [...report.filterMetas, filter],
              }
            : undefined
        );
    });
  };

  return (
    <>
      <ControlGroup>
        <FilterTypeSelect onChange={setSelectedType} />
        <Button icon="add" intent="primary" onClick={handleAddFilter}>
          Thêm
        </Button>
      </ControlGroup>
      <Button icon="add" intent="primary" onClick={handleAddDefaultFilters}>
        Thêm tất cả
      </Button>
    </>
  );
};
