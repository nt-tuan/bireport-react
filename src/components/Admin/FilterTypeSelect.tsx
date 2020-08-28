import React from "react";
import { HTMLSelect } from "@blueprintjs/core";
import { FilterType } from "resources/report/FilterType";

export const FilterTypeSelect = ({
  onChange,
  defaultValue,
}: {
  onChange: (type: FilterType) => void;
  defaultValue?: FilterType;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value in FilterType) {
      onChange(FilterType[value as keyof typeof FilterType]);
    }
  };
  return (
    <HTMLSelect
      onChange={handleChange}
      options={Object.keys(FilterType)}
      defaultValue={defaultValue}
    />
  );
};
