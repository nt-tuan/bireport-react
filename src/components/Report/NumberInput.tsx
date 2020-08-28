import React from "react";
import { ReportContext } from "./Report";
import { FormGroup, NumericInput } from "@blueprintjs/core";
import { IFilterMeta } from "resources/report/ReportTemplate";

interface Props extends IFilterMeta {}
export const NumberInput = (props: Props) => {
  const { setItems } = React.useContext(ReportContext);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var number = parseFloat(e.target.value);
    setItems &&
      setItems((items) => ({
        ...items,
        [props.name]: { key: props.name, number },
      }));
  };
  return (
    <FormGroup label={props.label} labelInfo={props.required ? "(*)" : ""}>
      <NumericInput fill onChange={handleChange} />
    </FormGroup>
  );
};
