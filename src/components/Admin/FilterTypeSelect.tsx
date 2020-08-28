import React from "react";
import { HTMLSelect } from "@blueprintjs/core";
import { FilterType } from "resources/report/FilterType";

export const FilterTypeSelect = ({
  onChange,
}: {
  onChange: (type: FilterType) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value in FilterType) {
      onChange(FilterType[value as keyof typeof FilterType]);
    }
  };
  return (
    <div className="bp3-select">
      <HTMLSelect
        onChange={handleChange}
        options={Object.keys(FilterType)}
        defaultValue={FilterType.DATE}
      ></HTMLSelect>
    </div>
  );
};
