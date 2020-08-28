import React from "react";
import { OptionsType, ValueType, InputActionMeta } from "react-select";
import { KV } from "resources/danhmuc/KeyValue";
import { getDMHanghoa } from "resources/danhmuc/api";
import { FilterItem } from "resources/report/FilterItem";
import { IFilterMeta } from "resources/report/ReportTemplate";
import { FormGroup } from "@blueprintjs/core";
import { ReportContext } from "./Report";
import { StyledSelect } from "components/Commons/StyledSelect";
interface Props extends IFilterMeta {
  items?: KV[];
  getFromSource?: () => Promise<KV[]>;
}
export const HanghoaSelect = (props: Props) => {
  const [options, setOptions] = React.useState<OptionsType<KV>>();
  const { setItems } = React.useContext(ReportContext);
  const handleSelect = (item: ValueType<KV>) => {
    const kvs = item as OptionsType<KV>;
    if (kvs == null) {
      setItems &&
        setItems((items) => ({ ...items, [props.name]: { key: props.name } }));
      return;
    }
    const filter: FilterItem = {
      key: props.name,
      strings: kvs.map((u) => u.value),
    };
    setItems && setItems((items) => ({ ...items, [props.name]: filter }));
  };
  const handleInputChange = (value: string, meta: InputActionMeta) => {
    if (meta.action === "input-change") getDMHanghoa(value).then(setOptions);
  };
  return (
    <FormGroup label={props.label} labelInfo={props.required ? "(*)" : ""}>
      <StyledSelect
        closeMenuOnSelect={false}
        isMulti
        options={options}
        onInputChange={handleInputChange}
        onChange={handleSelect}
      />
    </FormGroup>
  );
};
