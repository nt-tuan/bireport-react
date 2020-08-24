import { FilterItem } from "resources/report/FilterItem";

export interface ReadReportModel {
  id: number;
  excel?: boolean;
  items: FilterItem[];
}
