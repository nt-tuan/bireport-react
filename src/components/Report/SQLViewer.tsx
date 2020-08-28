import React from "react";
import { ReportSQL } from "resources/report/ReportSQL";

export const SQLViewer = ({ reportSQL }: { reportSQL?: ReportSQL }) => {
  if (reportSQL == null) return <></>;
  return (
    <>
      <div className="card-header align-left">
        <h2>SQL</h2>
      </div>
      <div className="card-content">
        <pre className="bp3-code-block" style={{ whiteSpace: "pre-wrap" }}>
          <code>{reportSQL.sql.replace(/\n\s*\n/g, "\n")}</code>
        </pre>
      </div>
    </>
  );
};
