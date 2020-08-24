import React, { useMemo, CSSProperties } from "react";
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
import useScreenSize, { ScreenSize } from "layout/useScreenSize";

interface Props {
  filters: IFilterMeta[];
}

interface FilterColumn {
  index: number;
  filters: FilterRow[];
}

interface FilterRow {
  index: number;
  filter: IFilterMeta;
}

const compareFilterRow = (row1: FilterRow, row2: FilterRow) => {
  return row1.index - row2.index;
};

const Filter = (props: IFilterMeta) => {
  switch (props.type) {
    case FilterType.CHINHANH:
      return <ChinhanhSelect {...props} />;
    case FilterType.CHUNGLOAI:
      return <ChungloaiSelect {...props} />;
    case FilterType.DATE:
      return <DateSelect {...props} />;
    case FilterType.HANGHOA:
      return <HanghoaSelect {...props} />;
    case FilterType.KENH:
      return <CTKenhSelect {...props} />;
    case FilterType.KENHCHUNG:
      return <KenhSelect {...props} />;
    case FilterType.KHACHHANG:
      return <KhachhangSelect {...props} />;
    case FilterType.KHUVUC:
      return <KhuvucSelect {...props} />;
    case FilterType.LOAIKD:
      return <LoaiKDSelect {...props} />;
    case FilterType.NHOMTRILIEU:
      return <NhomtrilieuSelect {...props} />;
    case FilterType.QUAN:
      return <QuanSelect {...props} />;
    case FilterType.TINH:
      return <TinhSelect {...props} />;
    case FilterType.NUMBER:
      return <NumberInput {...props} />;
    case FilterType.TEXT:
      return <TextInput {...props} />;
    case FilterType.CUSTOM:
      return <CustomSelect {...props} />;
  }

  return <></>;
};

const getColumnStyle = (size: ScreenSize) => {
  if (size === ScreenSize.SMALL)
    return {
      width: "100%",
      flex: "1 1 100%",
    };
  if (size === ScreenSize.MEDIUM)
    return {
      width: "50%",
      flex: "1 1 50%",
    };
  return {
    width: "25%",
    flex: "1 1 25%",
  };
};

const FilterColumn = (props: FilterColumn) => {
  const size = useScreenSize();
  const style = React.useMemo(() => {
    return getColumnStyle(size);
  }, [size]);
  return (
    <div
      style={{
        padding: "0 1px",
        flexWrap: "wrap",
        display: "flex",
        flexFlow: "column",
        ...style,
      }}
    >
      {props.filters.map((row) => (
        <Filter {...row.filter} />
      ))}
    </div>
  );
};

export const Filters = (props: Props) => {
  const groups = useMemo(() => {
    const groups = props.filters.reduce((groups: FilterColumn[], filter) => {
      const index = filter.columnIndex;
      const columns = groups.filter((u) => u.index === index);
      if (columns.length === 0) {
        return [
          ...groups,
          { index, filters: [{ index: filter.rowIndex, filter }] },
        ];
      }

      return groups.map((group) => {
        if (group.index !== index) return group;
        return {
          ...group,
          filters: [...group.filters, { index: filter.rowIndex, filter }],
        };
      });
    }, []);
    groups.forEach((group) => {
      group.filters.sort(compareFilterRow);
    });
    return groups;
  }, [props]);
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      {groups.map((group) => (
        <FilterColumn {...group} />
      ))}
    </div>
  );
};
