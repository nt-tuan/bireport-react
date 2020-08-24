import { DMChiNhanh } from "./DMChiNhanh";
import { DMChungLoai } from "./DMChungLoai";
import { DMHanghoa } from "./DMHanghoa";
import { DMKenh } from "./DMKenh";
import { DMKenhChung } from "./DMKenhChung";
import { DMKhachHang } from "./DMKhachhang";
import { DmLoaiKD } from "./DMLoaiKD";
import { DMKhuVuc } from "./DMKhuVuc";
import { DMNhanVien } from "./DMNhanVien";
import { DMNhomTriLieu } from "./DMNhomTriLieu";
import { DMQuan } from "./DMQuan";
import { DMTinh } from "./DMTinh";
import { newKV } from "./KeyValue";
import { RequestError } from "resources/api/helper";

const getError = (code: number, message: string) => {
  return { code, message } as RequestError;
};
const base = process.env.REACT_APP_API_URL;
export const request = async <T>(
  method: string,
  path: string,
  body?: BodyInit
) => {
  const headers = {
    "Content-Type": "application/json",
  };
  var response = await fetch(`${base}/danhmuc/${path}`, {
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

export const getDMChiNhanh = async () =>
  (await get<DMChiNhanh[]>("chinhanh")).map((u) =>
    newKV(u.maChiNhanh, u.tenChiNhanh)
  );

export const getDMChungLoai = async () =>
  (await get<DMChungLoai[]>("chungloai")).map((u) =>
    newKV(u.maChungLoai, u.tenChungLoai)
  );
export const getDMHanghoa = async (key: string) =>
  (await get<DMHanghoa[]>(`hanghoa?key=${key}`)).map((u) =>
    newKV(u.maHanghoa, u.tenHanghoa)
  );

export const getDMKenh = async () =>
  (await get<DMKenh[]>("kenh")).map((u) => newKV(u.maKenh, u.tenKenh));
export const getDMKenhChung = async () =>
  (await get<DMKenhChung[]>("kenhchung")).map((u) =>
    newKV(u.maKenh, u.tenKenh)
  );

export const getDMKhachhang = async (key: string) =>
  (await get<DMKhachHang[]>(`khachhang?key=${key}`)).map((u) =>
    newKV(u.maKhachhang, u.tenKhachhang)
  );

export const getDMKhuVuc = async () =>
  (await get<DMKhuVuc[]>("khuvuc")).map((u) => newKV(u.maKhuVuc, u.tenKhuVuc));

export const getDMLoaiKD = async () =>
  (await get<DmLoaiKD[]>("loaikd")).map((u) => newKV(u.maLoaiKD, u.tenLoaiKD));

export const getDMNhanVien = async () =>
  (await get<DMNhanVien[]>("nhanvien")).map((u) =>
    newKV(u.maNhanvien, u.tenNhanvien)
  );

export const getDMNhomTriLieu = async () =>
  (await get<DMNhomTriLieu[]>("nhomtrilieu")).map((u) =>
    newKV(u.maNhomTriLieu, u.tenNhomTriLieu)
  );

export const getDMQuan = async () =>
  (await get<DMQuan[]>("quan")).map((u) => newKV(u.maQuan, u.tenQuan));

export const getDMTinh = async () =>
  (await get<DMTinh[]>("tinh")).map((u) => newKV(u.maTinh, u.tenTinh));
