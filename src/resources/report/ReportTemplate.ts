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
  columnIndex: number;
  rowIndex: number;
  required: boolean;
  options?: string;
  reportKey?: string;
}
const newFilter = (
  type: string,
  label: string,
  name: string,
  columnIndex: number,
  rowIndex: number,
  required?: boolean,
  options?: string
) => {
  return {
    type,
    label,
    name,
    columnIndex,
    rowIndex,
    required: required ?? false,
    options,
  } as IFilterMeta;
};

export const DefaultFilters: IFilterMeta[] = [
  newFilter(
    FilterType.CUSTOM,
    "Loại giá trị",
    "valueType",
    0,
    0,
    true,
    `
  doanhso, Doanh Số
  soluong, Số lượng  
  `
  ),
  newFilter(FilterType.DATE, "Từ ngày", "fromDate", 0, 0, true),
  newFilter(FilterType.DATE, "Đến ngày", "toDate", 0, 1, true),
  newFilter(FilterType.KHUVUC, "Khu vực", "khuvuc", 1, 0),
  newFilter(FilterType.CHINHANH, "Chi nhánh", "chinhanh", 1, 1),
  newFilter(FilterType.TINH, "Tỉnh/TP", "tinh", 1, 2),
  newFilter(FilterType.QUAN, "Quận", "quan", 1, 3),
  newFilter(FilterType.CHUNGLOAI, "Chủng loại", "chungloai", 2, 0),
  newFilter(FilterType.LOAIKD, "Danh mục", "danhmuc", 2, 1),
  newFilter(FilterType.NHOMTRILIEU, "Nhóm trị liệu", "nhomtrilieu", 2, 2),
  newFilter(FilterType.HANGHOA, "Hàng hóa", "hanghoa", 2, 3),
  newFilter(FilterType.KENH, "Kênh", "kenh", 3, 0),
  newFilter(FilterType.KENHCHUNG, "Chi tiết kênh", "ctkenh", 3, 1),
  newFilter(FilterType.KHACHHANG, "Khách hàng", "khachhang", 3, 2),
  newFilter(FilterType.NUMBER, "Sample number input", "number", 3, 3),
  newFilter(FilterType.TEXT, "Sample text input", "number", 3, 4),
];
