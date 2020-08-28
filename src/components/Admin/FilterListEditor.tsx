import React from "react";
import RGL, { Layout, WidthProvider } from "react-grid-layout";
import { ReportFilterConstants } from "constants/layouts";
import { ReportAdminContext } from "views/ReportAdmin";
import { IFilterMeta } from "resources/report/ReportTemplate";
import { FilterEditor } from "./FilterEditor";
import { AddFilterButtons } from "./Buttons/AddFilterButton";
const GridLayout = WidthProvider(RGL);
export const FilterListEditor = () => {
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
      <div style={{ display: "flex", alignItems: "center" }}>
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
