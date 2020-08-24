import React from "react";
import { ReportAdminContext } from "views/ReportAdmin";
import {
  FormGroup,
  InputGroup,
  Button,
  Overlay,
  EditableText,
  Classes,
  HTMLSelect,
  NumericInput,
} from "@blueprintjs/core";
import { IFilterMeta } from "resources/report/ReportTemplate";
import { FilterType } from "resources/report/FilterType";
import classNames from "classnames";
import { parseKVs, stringifyKVs } from "components/Report/CustomSelect";
const FitlerTypeSelect = ({
  onChange,
  value,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}) => (
  <div className="bp3-select">
    <HTMLSelect
      onChange={onChange}
      options={Object.keys(FilterType)}
      value={value}
    ></HTMLSelect>
  </div>
);

export const FilterEditor = ({
  index,
  filter,
  onChange,
  onRemove,
}: {
  index: number;
  filter: IFilterMeta;
  onChange: (index: number, filter: IFilterMeta) => void;
  onRemove: (index: number) => void;
}) => {
  const [optionsOpen, setOptionsOpen] = React.useState<boolean>(false);
  // const filter: IFilterMeta | undefined = useMemo(() => {
  //   if (selectedReport == null) return undefined;
  //   return selectedReport.filterMetas[index];
  // }, [selectedReport, index]);

  const handleTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    var item = e.target.value;
    if (filter == null) return;
    const newFilter: IFilterMeta = { ...filter, type: item };
    onChange(index, newFilter);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (filter == null) return;
    const { name, value } = e.target;
    const newFilter: IFilterMeta = { ...filter, [name]: value };
    onChange(index, newFilter);
  };

  const handleNumbericInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (filter == null) return;
    const { name, value } = e.target;
    const intValue = parseInt(value);
    const newFilter: IFilterMeta = { ...filter, [name]: intValue };
    onChange(index, newFilter);
  };

  const onRequiredChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (filter == null) return;
    const newFilter: IFilterMeta = {
      ...filter,
      required: e.target.value === "true",
    };
    onChange(index, newFilter);
  };

  const handleDelete = () => {
    onRemove(index);
  };

  const handleOptionChanges = (value: string) => {
    const kvs = parseKVs(value);
    const normalizeText = stringifyKVs(kvs);
    if (filter == null) return;
    const newFilter: IFilterMeta = { ...filter, options: normalizeText };
    onChange(index, newFilter);
  };

  if (filter == null) return <></>;
  return (
    <>
      <div style={{ display: "flex", flexFlow: "row", flexWrap: "wrap" }}>
        <FormGroup label={index === 0 ? "Loại filter" : undefined}>
          <FitlerTypeSelect onChange={handleTypeSelect} value={filter.type} />
        </FormGroup>
        <FormGroup label={index === 0 ? "Label" : undefined}>
          <InputGroup
            name="label"
            value={filter.label}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup label={index === 0 ? "Name" : undefined}>
          <InputGroup
            name="name"
            value={filter.name}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup
          label={index === 0 ? "Cột" : undefined}
          style={{ flexBasis: "60px" }}
        >
          <NumericInput
            fill
            name="columnIndex"
            placeholder="Thứ tự cột"
            value={filter.columnIndex.toString()}
            onChange={handleNumbericInputChange}
          />
        </FormGroup>
        <FormGroup
          label={index === 0 ? "Dòng" : undefined}
          style={{ flexBasis: "60px" }}
        >
          <NumericInput
            fill
            name="rowIndex"
            placeholder="Thứ tự dòng"
            value={filter.rowIndex.toString()}
            onChange={handleNumbericInputChange}
          />
        </FormGroup>
        <FormGroup label={index === 0 ? "Options" : undefined}>
          <Button
            onClick={() => setOptionsOpen(true)}
            disabled={filter.type !== FilterType.CUSTOM}
          >
            Hiện options
          </Button>
          {filter.type === FilterType.CUSTOM && (
            <Overlay
              className={Classes.OVERLAY_SCROLL_CONTAINER}
              isOpen={optionsOpen}
              onClose={() => setOptionsOpen(false)}
              usePortal
            >
              <div
                className={classNames(Classes.CARD)}
                style={{
                  width: "500px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <EditableText
                  defaultValue={filter.options}
                  multiline={true}
                  minLines={6}
                  maxLines={12}
                  onConfirm={handleOptionChanges}
                />
              </div>
            </Overlay>
          )}
        </FormGroup>
        <FormGroup label={index === 0 ? "Bắt buộc" : undefined}>
          <div className="bp3-select">
            <select onChange={onRequiredChange}>
              <option value="true">Có</option>
              <option value="false">Không</option>
            </select>
          </div>
        </FormGroup>
        <FormGroup label={index === 0 ? "Actions" : undefined}>
          <Button intent="danger" icon="delete" onClick={handleDelete} />
        </FormGroup>
      </div>
    </>
  );
};
