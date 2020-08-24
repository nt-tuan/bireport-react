import React, { useEffect, CSSProperties } from "react";
import { KV } from "resources/danhmuc/KeyValue";
import Select, { ValueType, OptionsType } from "react-select";
import { FilterItem } from "resources/report/FilterItem";
import { IFilterMeta } from "resources/report/ReportTemplate";
import { FormGroup } from "@blueprintjs/core";
import { ReportContext, FilterItemSet } from "./Report";

export const containStyle: CSSProperties = {
  appearance: "none",
  background: "#ffffff",
  border: "none",
  borderRadius: "3px",
  boxShadow:
    "0 0 0 0 rgba(19, 124, 189, 0), 0 0 0 0 rgba(19, 124, 189, 0), inset 0 0 0 1px rgba(16, 22, 26, 0.15), inset 0 1px 1px rgba(16, 22, 26, 0.2)",
  color: "#182026",
  fontSize: "14px",
  fontWeight: 400,
  minHeight: "30px",
  lineHeight: "30px",
  outline: "none",
  padding: "0",
  transition: "box-shadow 100ms cubic-bezier(0.4, 1, 0.75, 0.9)",
  verticalAlign: "middle",
};

export const controlStyle: CSSProperties = {
  border: "none",
  minHeight: "30px",
  lineHeight: "30px",
  backgroundColor: "none",
};

export const valueStyle: CSSProperties = {
  border: "none",
  minHeight: "20px",
  lineHeight: "20px",
};

interface Props extends IFilterMeta {
  items?: KV[];
  getFromSource?: () => Promise<KV[]>;
}

export const KVSelect = (props: Props) => {
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
    setItems &&
      setItems(
        (items) => ({ ...items, [props.name]: filter } as FilterItemSet)
      );
  };
  useEffect(() => {
    if (props.items) {
      setOptions(props.items);
    }
    if (props.getFromSource) {
      props.getFromSource().then(setOptions);
    }
  }, [props]);
  return (
    <FormGroup label={props.label}>
      <Select
        closeMenuOnSelect={false}
        isMulti
        options={options}
        onChange={handleSelect}
        styles={{
          container: (provided, state) => ({ ...provided, ...containStyle }),
          control: (provided) => ({ ...provided, ...controlStyle }),
          valueContainer: (providede) => ({ ...providede, ...valueStyle }),
        }}
      />
    </FormGroup>
  );
};
