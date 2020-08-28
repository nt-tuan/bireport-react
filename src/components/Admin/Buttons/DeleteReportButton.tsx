import React from "react";
import { Button, Alert, Intent } from "@blueprintjs/core";
import { ReportAdminContext } from "views/ReportAdmin";

export const DeleteReportButton = () => {
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  const { selectedReport, onDeleteReport } = React.useContext(
    ReportAdminContext
  );
  const handleConfirmDelete = () => {
    onDeleteReport && onDeleteReport();
    setShowAlert(false);
  };

  if (selectedReport == null) return <></>;
  return (
    <>
      <Alert
        cancelButtonText="Không"
        confirmButtonText="Xóa"
        icon="trash"
        intent={Intent.DANGER}
        isOpen={showAlert}
        onCancel={() => setShowAlert(false)}
        onConfirm={handleConfirmDelete}
      >
        <p>
          Bạn có muốn xóa{" "}
          <b>
            [#{selectedReport.id}] {selectedReport.title}
          </b>
          ?
        </p>
      </Alert>
      <Button
        icon="delete"
        intent="danger"
        onClick={() => setShowAlert(true)}
      />
    </>
  );
};
