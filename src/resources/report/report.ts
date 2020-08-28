import { IReportTemplate, IFilterMeta } from "resources/report/ReportTemplate";
import { RequestError } from "resources/api/helper";
import { ReadReportModel } from "./ReadReportModel";
import { ReportSQL } from "./ReportSQL";
const getError = (code: number, message: string) => {
  return { code, message } as RequestError;
};
const base = process.env.REACT_APP_API_URL;
export const download = async (
  method: string,
  path: string,
  body?: BodyInit
) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(`${base}/${path}`, {
    method,
    headers,
    body,
  });
  if (!response.ok) {
    const text = await response.text();
    return Promise.reject(getError(response.status, text));
  }
  const blob = await response.blob();
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "data.xlsx";
  document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
  a.click();
  a.remove();
};
export const request = async <T>(
  method: string,
  path: string,
  body?: BodyInit
) => {
  const headers = {
    "Content-Type": "application/json",
  };
  var response = await fetch(`${base}/${path}`, {
    method,
    headers,
    body,
  });
  if (response.status !== 200) {
    var text = await response.text();
    return Promise.reject(getError(response.status, text));
  }
  return (await response.json()) as T;
};
export const get = async <T>(path: string) =>
  request<T>("GET", path, undefined);
export const post = async <T>(path: string, body?: string) =>
  request<T>("POST", path, body);
export const _delete = async <T>(path: string, body?: string) =>
  request<T>("DELETE", path, body);
export const put = async <T>(path: string, body?: string) => {
  return await request<T>("PUT", path, body);
};
const getTemplates = async () => {
  return await get<IReportTemplate[]>(`admin/all`);
};
const getTemplate = async (key: number) => {
  return await get<IReportTemplate>(`admin/report?key=${key}`);
};
const addTemplate = async (template: IReportTemplate) => {
  return await post<IReportTemplate>(`admin/report`, JSON.stringify(template));
};
const updateTemplate = async (template: IReportTemplate) => {
  await put(`admin/report`, JSON.stringify(template));
  return;
};
const deleteTemplate = async (key: number) => {
  await _delete(`admin/report?key=${key}`);
  return;
};
const getFilterItem = async (id: number) => {
  return await get<IFilterMeta>(`admin/filter?id=${id}`);
};
const addFilterItem = async (filter: IFilterMeta) => {
  return await put<IFilterMeta>(`admin/filter`, JSON.stringify(filter));
};
const updateFilterItem = async (filter: IFilterMeta) => {
  return await post<IFilterMeta>(`admin/filter`, JSON.stringify(filter));
};
const deleteFilterItem = async (id: number) => {
  return await _delete<IFilterMeta>(`admin/filter?id=${id}`);
};

const getReport = async (model: ReadReportModel) => {
  return await post<any[]>("report", JSON.stringify(model));
};

const downloadExcelReport = async (model: ReadReportModel) => {
  await download("POST", "report/excel", JSON.stringify(model));
};

const getReportSQL = async (model: ReadReportModel) => {
  return await post<ReportSQL>("report/sql", JSON.stringify(model));
};

export const reportAPI = {
  getTemplates,
  getTemplate,
  addTemplate,
  updateTemplate,
  deleteTemplate,
  getFilterItem,
  addFilterItem,
  updateFilterItem,
  deleteFilterItem,
  getReport,
  downloadExcelReport,
  getReportSQL,
};
