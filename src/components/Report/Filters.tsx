import React, { useMemo } from "react";
import { IFilterMeta } from "resources/report/ReportTemplate";
import { FilterType } from "resources/report/FilterType";
import {
  ChinhanhSelect,
  ChungloaiSelect,
  KenhSelect,
  CTKenhSelect,
  KhuvucSelect,
  LoaiKDSelect,
  NhomtrilieuSelect,
  QuanSelect,
  TinhSelect,
} from "./DMSelect";
import { DateSelect } from "./DateSelect";
import { HanghoaSelect } from "./HanghoaSelect";
import { KhachhangSelect } from "./KhachhangSelect";
import { NumberInput } from "./NumberInput";
import { TextInput } from "./TextInput";
import { CustomSelect } from "./CustomSelect";
import { ReportContext } from "./Report";
import { Button } from "@blueprintjs/core";
import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import { ReportFilterConstants } from "constants/layouts";
const ResponsiveGridLayout = WidthProvider(Responsive);
interface Props {
  filters: IFilterMeta[];
}

export const Filter = ({
  name,
  filterMeta,
}: {
  name: string;
  filterMeta?: IFilterMeta;
}) => {
  const { report } = React.useContext(ReportContext);
  const meta = React.useMemo(() => {
    if (filterMeta != null) return filterMeta;
    const meta = report?.filterMetas.filter((meta) => meta.name === name);
    if (meta == null || meta.length === 0) return undefined;
    return meta[0];
  }, [name, filterMeta, report]);
  if (meta == null) return <></>;
  switch (meta.type) {
    case FilterType.CHINHANH:
      return <ChinhanhSelect {...meta} />;
    case FilterType.CHUNGLOAI:
      return <ChungloaiSelect {...meta} />;
    case FilterType.DATE:
      return <DateSelect {...meta} />;
    case FilterType.HANGHOA:
      return <HanghoaSelect {...meta} />;
    case FilterType.KENH:
      return <CTKenhSelect {...meta} />;
    case FilterType.KENHCHUNG:
      return <KenhSelect {...meta} />;
    case FilterType.KHACHHANG:
      return <KhachhangSelect {...meta} />;
    case FilterType.KHUVUC:
      return <KhuvucSelect {...meta} />;
    case FilterType.LOAIKD:
      return <LoaiKDSelect {...meta} />;
    case FilterType.NHOMTRILIEU:
      return <NhomtrilieuSelect {...meta} />;
    case FilterType.QUAN:
      return <QuanSelect {...meta} />;
    case FilterType.TINH:
      return <TinhSelect {...meta} />;
    case FilterType.NUMBER:
      return <NumberInput {...meta} />;
    case FilterType.TEXT:
      return <TextInput {...meta} />;
    case FilterType.CUSTOM:
      return <CustomSelect {...meta} />;
  }

  return <></>;
};

export const Filters = ({ filters }: Props) => {
  const [show, setShow] = React.useState<boolean>(true);
  const [layouts, setLayouts] = React.useState<Layouts>({ lg: [] });
  React.useEffect(() => {
    const layout = filters.map((f) => {
      const { x, y, w, h } = f;
      return { i: f.name, x, y, w, h };
    });
    const maxRow = layout.reduce((max, cur) => {
      if (cur.y > max) return cur.y;
      return max;
    }, 0);
    const md = layout.map((layout) => ({
      ...layout,
      x: layout.x % ReportFilterConstants.cols.md,
      y:
        layout.y +
        Math.floor(layout.x / ReportFilterConstants.cols.md) * maxRow,
    }));
    const sm = layout.map((layout) => ({
      ...layout,
      x: layout.x % ReportFilterConstants.cols.sm,
      y:
        layout.y +
        Math.floor(layout.x / ReportFilterConstants.cols.sm) * maxRow,
    }));
    const xs = layout.map((layout) => ({
      ...layout,
      x: layout.x % ReportFilterConstants.cols.xs,
      y:
        layout.y +
        Math.floor(layout.x / ReportFilterConstants.cols.xs) * maxRow,
    }));
    setLayouts({ lg: layout, md, sm, xs });
  }, [filters]);
  const handleLayoutChange = (layout: Layout[], layouts: Layouts) => {
    console.log("layout", layout, "layouts", layouts);
  };
  return (
    <>
      <div className="card-header align-left">
        <h2>Filter</h2>
        <div className="card-header-actions">
          <Button
            icon={show ? "chevron-up" : "chevron-down"}
            onClick={() => setShow((show) => !show)}
          />
        </div>
      </div>
      <div className="card-content">
        <ResponsiveGridLayout
          layouts={layouts}
          className="layout"
          breakpoints={ReportFilterConstants.breakpoints}
          cols={ReportFilterConstants.cols}
          onLayoutChange={handleLayoutChange}
          isResizable={false}
          isDraggable={false}
          isDroppable={false}
          rowHeight={62}
          measureBeforeMount={false}
        >
          {filters.map((f) => (
            <div key={f.name}>
              <Filter key={f.name} name={f.name} />
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </>
  );
};
