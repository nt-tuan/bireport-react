import React, { useEffect } from "react";
import { KV } from "resources/danhmuc/KeyValue";
import { ValueType, OptionsType } from "react-select";
import { FilterItem } from "resources/report/FilterItem";
import { IFilterMeta } from "resources/report/ReportTemplate";
import { FormGroup } from "@blueprintjs/core";
import { ReportContext, FilterItemSet } from "./Report";
import { StyledSelect } from "components/Commons/StyledSelect";

interface Props extends IFilterMeta {
  items?: KV[];
  getFromSource?: () => Promise<KV[]>;
}

export const KVSelect = ({
  items,
  getFromSource,
  name,
  label,
  required,
}: Props) => {
  const [options, setOptions] = React.useState<OptionsType<KV>>();
  const { setItems } = React.useContext(ReportContext);
  const handleSelect = (item: ValueType<KV>) => {
    const kvs = item as OptionsType<KV>;
    if (kvs == null) {
      setItems && setItems((items) => ({ ...items, [name]: { key: name } }));
      return;
    }
    const filter: FilterItem = {
      key: name,
      strings: kvs.map((u) => u.value),
    };
    setItems &&
      setItems((items) => ({ ...items, [name]: filter } as FilterItemSet));
  };
  useEffect(() => {
    if (items) {
      setOptions(items);
    }
  }, [items]);
  useEffect(() => {
    if (getFromSource) {
      getFromSource().then(setOptions);
    }
  }, [getFromSource]);
  return (
    <FormGroup label={label} labelInfo={required ? "(*)" : ""}>
      <StyledSelect
        closeMenuOnSelect={false}
        isMulti
        options={options}
        onChange={handleSelect}
      />
    </FormGroup>
  );
};
