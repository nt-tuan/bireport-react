import { FilterType } from "./FilterType";

export interface IReportTemplate {
  id?: number;
  alias: string;
  title: string;
  templateSql: string;
  filterMetas: IFilterMeta[];
}

export interface IFilterMeta {
  id?: number;
  type?: string;
  label: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  required: boolean;
  options?: string;
  reportKey?: string;
}
const newFilter = (
  type: string,
  label: string,
  name: string,
  x: number,
  y: number,
  w: number,
  h: number,
  required?: boolean,
  options?: string
) => {
  return {
    type,
    label,
    name,
    x,
    y,
    w,
    h,
    required: required ?? false,
    options,
  } as IFilterMeta;
};
const defaultWidth = 1;
const defaultHeight = 1;
export const DefaultDateRange = [
  newFilter(
    FilterType.DATE,
    "Từ ngày",
    "fromDate",
    0,
    0,
    defaultWidth,
    defaultHeight,
    true
  ),
  newFilter(
    FilterType.DATE,
    "Đến ngày",
    "toDate",
    0,
    1,
    defaultWidth,
    defaultHeight,
    true
  ),
];
export const DefaultDate = newFilter(
  FilterType.DATE,
  "Ngày",
  "date",
  0,
  1,
  defaultWidth,
  defaultHeight,
  true
);
export const DefaultKhuvuc = newFilter(
  FilterType.KHUVUC,
  "Khu vực",
  "khuvuc",
  1,
  0,
  defaultWidth,
  defaultHeight
);
export const DefaultChinhanh = newFilter(
  FilterType.CHINHANH,
  "Chi nhánh",
  "chinhanh",
  1,
  1,
  defaultWidth,
  defaultHeight
);
export const DefaultTinh = newFilter(
  FilterType.TINH,
  "Tỉnh/TP",
  "tinh",
  1,
  2,
  defaultWidth,
  defaultHeight
);
export const DefaultQuan = newFilter(
  FilterType.QUAN,
  "Quận",
  "quan",
  1,
  3,
  defaultWidth,
  defaultHeight
);
export const DefaultChungloai = newFilter(
  FilterType.CHUNGLOAI,
  "Chủng loại",
  "chungloai",
  2,
  0,
  defaultWidth,
  defaultHeight
);
export const DefaultLoaiKD = newFilter(
  FilterType.LOAIKD,
  "Danh mục",
  "danhmuc",
  2,
  1,
  defaultWidth,
  defaultHeight
);
export const DefaultNhomtrilieu = newFilter(
  FilterType.NHOMTRILIEU,
  "Nhóm trị liệu",
  "nhomtrilieu",
  2,
  2,
  defaultWidth,
  defaultHeight
);
export const DefaultHanghoa = newFilter(
  FilterType.HANGHOA,
  "Hàng hóa",
  "hanghoa",
  2,
  3,
  defaultWidth,
  defaultHeight
);
export const DefaultKenh = newFilter(
  FilterType.KENH,
  "Kênh",
  "kenh",
  3,
  0,
  defaultWidth,
  defaultHeight
);
export const DefaultKenhChung = newFilter(
  FilterType.KENHCHUNG,
  "Chi tiết kênh",
  "ctkenh",
  3,
  1,
  defaultWidth,
  defaultHeight
);
export const DefaultKhachhang = newFilter(
  FilterType.KHACHHANG,
  "Khách hàng",
  "khachhang",
  3,
  2,
  defaultWidth,
  defaultHeight
);
export const DefaultNumberInput = newFilter(
  FilterType.NUMBER,
  "Sample number input",
  "number",
  3,
  3,
  defaultWidth,
  defaultHeight
);
export const DefaultTextInput = newFilter(
  FilterType.TEXT,
  "Sample number input",
  "number",
  3,
  3,
  defaultWidth,
  defaultHeight
);
export const DefaultCustom = newFilter(
  FilterType.CUSTOM,
  "Loại giá trị",
  "valueType",
  0,
  0,
  defaultWidth,
  defaultHeight,
  true,
  `
doanhso, Doanh Số
soluong, Số lượng  
`
);

type FilterSet = { [key in FilterType]: IFilterMeta };

export const DefaultFilters: FilterSet = {
  DATE: DefaultDate,
  CUSTOM: DefaultCustom,
  KHUVUC: DefaultKhuvuc,
  CHINHANH: DefaultChinhanh,
  TINH: DefaultTinh,
  QUAN: DefaultQuan,
  CHUNGLOAI: DefaultChungloai,
  LOAIKD: DefaultLoaiKD,
  NHOMTRILIEU: DefaultNhomtrilieu,
  HANGHOA: DefaultHanghoa,
  KENH: DefaultKenh,
  KENHCHUNG: DefaultKenhChung,
  KHACHHANG: DefaultKhachhang,
  NUMBER: DefaultNumberInput,
  TEXT: DefaultTextInput,
};
