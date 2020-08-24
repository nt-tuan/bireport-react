import { DateInput, IDateFormatProps } from "@blueprintjs/datetime";
import React from "react";
import { IFilterMeta } from "resources/report/ReportTemplate";
import { FormGroup } from "@blueprintjs/core";
import { ReportContext } from "./Report";

const jsDateFormatter: IDateFormatProps = {
  // note that the native implementation of Date functions differs between browsers
  formatDate: (date) => date.toLocaleDateString(),
  parseDate: (str) => new Date(str),
  placeholder: "DD/MM/YYYY",
};

interface Props extends IFilterMeta {}
export const DateSelect = (props: Props) => {
  const { setItems } = React.useContext(ReportContext);
  const handleChange = (date: Date) => {
    setItems &&
      setItems((items) => ({
        ...items,
        [props.name]: { date: date, key: props.name },
      }));
  };
  return (
    <FormGroup label={props.label}>
      <DateInput {...jsDateFormatter} fill onChange={handleChange} />
    </FormGroup>
  );
};
