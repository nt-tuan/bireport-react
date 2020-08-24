import React from "react";
import { ReportAdminContext } from "views/ReportAdmin";
import { Button, Overlay, Classes } from "@blueprintjs/core";
import classNames from "classnames";
import { Filters } from "components/Report/Filters";
import { Report } from "components/Report/Report";

export const PreviewButton = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { selectedReport } = React.useContext(ReportAdminContext);
  const handleClick = () => {
    console.log(selectedReport);
  };
  return (
    <>
      <Button intent="primary" onClick={() => setIsOpen(true)}>
        Xem trước
      </Button>
      <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div
          style={{
            width: "80%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="content">
            <div className="container">
              {selectedReport && (
                <Report report={selectedReport} hasSQLPreview={true} />
              )}
            </div>
          </div>
        </div>
      </Overlay>
    </>
  );
};
