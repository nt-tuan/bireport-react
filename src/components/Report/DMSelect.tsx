import React from "react";
import { KVSelect } from "./KVSelect";
import {
  getDMChungLoai,
  getDMKenh,
  getDMKenhChung,
  getDMKhuVuc,
  getDMNhomTriLieu,
  getDMLoaiKD,
  getDMQuan,
  getDMTinh,
  getDMChiNhanh,
} from "resources/danhmuc/api";
import { IFilterMeta } from "resources/report/ReportTemplate";
interface Props extends IFilterMeta {}
export const ChinhanhSelect = (props: Props) => {
  return <KVSelect {...props} getFromSource={getDMChiNhanh} />;
};

export const ChungloaiSelect = (props: Props) => {
  return <KVSelect {...props} getFromSource={getDMChungLoai} />;
};

export const CTKenhSelect = (props: Props) => {
  return <KVSelect {...props} getFromSource={getDMKenh} />;
};

export const KenhSelect = (props: Props) => {
  return <KVSelect {...props} getFromSource={getDMKenhChung} />;
};

export const KhuvucSelect = (props: Props) => {
  return <KVSelect {...props} getFromSource={getDMKhuVuc} />;
};

export const NhomtrilieuSelect = (props: Props) => {
  return <KVSelect {...props} getFromSource={getDMNhomTriLieu} />;
};

export const LoaiKDSelect = (props: Props) => {
  return <KVSelect {...props} getFromSource={getDMLoaiKD} />;
};

export const QuanSelect = (props: Props) => {
  return <KVSelect {...props} getFromSource={getDMQuan} />;
};

export const TinhSelect = (props: Props) => {
  return <KVSelect {...props} getFromSource={getDMTinh} />;
};
