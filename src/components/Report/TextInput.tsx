import React from "react";
import { ReportContext } from "./Report";
import { InputGroup, FormGroup } from "@blueprintjs/core";
import { IFilterMeta } from "resources/report/ReportTemplate";

export const TextInput = (props: IFilterMeta) => {
  const { setItems } = React.useContext(ReportContext);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItems &&
      setItems((items) => ({
        ...items,
        [props.name]: { key: props.name, string: e.target.value },
      }));
  };
  return (
    <FormGroup label={props.label} labelInfo={props.required ? "(*)" : ""}>
      <InputGroup
        fill
        type="text"
        onChange={handleChange}
        required={props.required}
      />
    </FormGroup>
  );
};
