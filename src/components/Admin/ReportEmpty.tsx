import React from "react";
import { NonIdealState } from "@blueprintjs/core";

export const ReportEmpty = () => {
  return (
    <div className="card">
      <NonIdealState
        icon="document"
        title="Không có báo nào đăng được chọn"
      ></NonIdealState>
    </div>
  );
};
