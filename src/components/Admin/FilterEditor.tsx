import React from "react";
import {
  FormGroup,
  InputGroup,
  Button,
  Overlay,
  EditableText,
  Classes,
  Checkbox,
} from "@blueprintjs/core";
import { IFilterMeta } from "resources/report/ReportTemplate";
import { FilterType } from "resources/report/FilterType";
import { parseKVs, stringifyKVs } from "components/Report/CustomSelect";
import { Filter } from "components/Report/Filters";
import { FilterTypeSelect } from "./FilterTypeSelect";

interface Props {
  index: number;
  filter: IFilterMeta;
  onChange: (index: number, filter: IFilterMeta) => void;
  onRemove: (index: number) => void;
}

export const FilterContentEditor = ({
  index,
  filter,
  onChange,
  onRemove,
}: Props) => {
  const handleTypeSelect = (type: FilterType) => {
    const newFilter: IFilterMeta = { ...filter, type: type.toString() };
    onChange(index, newFilter);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (filter == null) return;
    const { name, value } = e.target;
    const newFilter: IFilterMeta = { ...filter, [name]: value };
    onChange(index, newFilter);
  };

  const onRequiredChange = () => {
    if (filter == null) return;
    const newFilter: IFilterMeta = {
      ...filter,
      required: !filter.required,
    };
    onChange(index, newFilter);
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
    <div>
      <FormGroup label={index === 0 ? "Loại filter" : undefined}>
        <FilterTypeSelect
          onChange={handleTypeSelect}
          defaultValue={
            filter.type
              ? FilterType[filter.type as keyof typeof FilterType]
              : undefined
          }
        />
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
      <Checkbox
        label="Bắt buộc"
        checked={filter.required}
        onChange={onRequiredChange}
      />
      {filter.type === FilterType.CUSTOM && (
        <FormGroup
          label="Options"
          labelInfo={`Các option, mỗi option là mỗi dòng có dạnhng: <value>, <label>`}
        >
          <EditableText
            defaultValue={filter.options}
            multiline={true}
            minLines={6}
            maxLines={12}
            onConfirm={handleOptionChanges}
          />
        </FormGroup>
      )}
    </div>
  );
};

export const FilterEditor = ({ index, filter, onChange, onRemove }: Props) => {
  const [show, setShow] = React.useState<boolean>();
  return (
    <>
      {filter.type}/{filter.name}
      <Filter name={filter.name} filterMeta={filter} />
      <Overlay
        isOpen={show}
        className={Classes.OVERLAY_SCROLL_CONTAINER}
        onClose={() => setShow(false)}
        usePortal
      >
        <div className={`overlay-content ${Classes.CARD}`}>
          <FilterContentEditor
            index={index}
            filter={filter}
            onChange={onChange}
            onRemove={onRemove}
          />
        </div>
      </Overlay>
      <div style={{ position: "absolute", top: 0, right: 0 }}>
        <Button small icon="edit" onClick={() => setShow(true)} />
        <Button small icon="delete" onClick={() => onRemove(index)} />
      </div>
    </>
  );
};
