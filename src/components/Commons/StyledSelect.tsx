import React, { CSSProperties } from "react";
import Select, { Props } from "react-select/src/Select";
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

export const StyledSelect = (props: Props<any>) => {
  return (
    <Select
      {...props}
      menuPortalTarget={document.body}
      styles={{
        container: (provided, state) => ({ ...provided, ...containStyle }),
        control: (provided) => ({ ...provided, ...controlStyle }),
        valueContainer: (providede) => ({ ...providede, ...valueStyle }),
        menu: (provided) => ({
          ...provided,
          width: "auto",
          left: 0,
          right: 0,
        }),
        menuPortal: (provided) => ({
          ...provided,
          right: 0,
          width: "auto",
        }),
      }}
    />
  );
};
