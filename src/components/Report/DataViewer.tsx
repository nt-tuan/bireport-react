import React from "react";
import DataTable from "react-data-table-component";

function numberWithDots(x: number) {
  return x.toLocaleString("vi-VN");
}

export const DataViewer = ({ data }: { data?: any[] }) => {
  const columns = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    const first = data[0];
    return Object.keys(first).map((key) => ({
      name: key,
      selector: key,
      sortable: true,
      format: (row: any, index: number) => {
        if (typeof row[key] === "number") {
          return numberWithDots(row[key]);
        }
        return row[key];
      },
      right: typeof first[key] === "number",
    }));
  }, [data]);
  if (data == null) return <></>;
  return (
    <>
      <div className="card-header align-left">
        <h2>Bảng dữ liệu</h2>
      </div>
      <div className="card-content">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};
