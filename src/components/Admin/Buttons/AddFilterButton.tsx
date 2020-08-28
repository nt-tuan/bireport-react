import React from "react";
import { Button, ControlGroup } from "@blueprintjs/core";
import { ReportAdminContext } from "views/ReportAdmin";
import { DefaultFilters } from "resources/report/ReportTemplate";
import { FilterTypeSelect } from "../FilterTypeSelect";
import { FilterType } from "resources/report/FilterType";

export const AddFilterButtons = () => {
  const [selectedType, setSelectedType] = React.useState<FilterType>(
    FilterType.DATE
  );
  const { setSelectedReport } = React.useContext(ReportAdminContext);
  const handleAddFilter = () => {
    if (selectedType == null) return;
    const newFilter = DefaultFilters[selectedType];
    setSelectedReport &&
      setSelectedReport((report) =>
        report
          ? {
              ...report,
              filterMetas: [
                ...(report?.filterMetas ?? []),
                { ...newFilter, x: 0, y: 0 },
              ],
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
      <ControlGroup vertical={false}>
        <FilterTypeSelect
          onChange={setSelectedType}
          defaultValue={FilterType.DATE}
        />
        <Button intent="primary" icon="add" onClick={handleAddFilter}>
          Thêm
        </Button>
      </ControlGroup>
      <Button icon="add" intent="primary" onClick={handleAddDefaultFilters}>
        Thêm tất cả
      </Button>
    </>
  );
};
