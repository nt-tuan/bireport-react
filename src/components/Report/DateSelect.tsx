import { DateInput, IDateFormatProps } from "@blueprintjs/datetime";
import React from "react";
import { IFilterMeta } from "resources/report/ReportTemplate";
import { FormGroup } from "@blueprintjs/core";
import { ReportContext } from "./Report";
import moment from "moment";
const locale = "vi-VN";
function getMomentFormatter(format: string): IDateFormatProps {
  // note that locale argument comes from locale prop and may be undefined
  return {
    formatDate: (date, locale) => {
      moment.locale(locale);
      return moment(date).format(format);
    },
    parseDate: (str, locale) => {
      moment.locale(locale);
      const date = moment(str, format).toDate();
      console.log(date, str, locale);
      return date;
    },
    placeholder: format,
  };
}

interface Props extends IFilterMeta {}
export const DateSelect = (props: Props) => {
  const { setItems } = React.useContext(ReportContext);
  const handleChange = (date: Date) => {
    moment.locale(locale);
    const dateString = moment(date).format("YYYY-MM-DD[T]HH:mm:ss");
    setItems &&
      setItems((items) => ({
        ...items,
        [props.name]: {
          date: dateString,
          key: props.name,
        },
      }));
  };
  return (
    <FormGroup label={props.label} labelInfo={props.required ? "(*)" : ""}>
      <DateInput
        {...getMomentFormatter("DD/MM/YYYY")}
        fill
        onChange={handleChange}
        locale={locale}
      />
    </FormGroup>
  );
};
