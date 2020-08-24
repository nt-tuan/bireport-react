import React from "react";
import { KVSelect } from "./KVSelect";
import { IFilterMeta } from "resources/report/ReportTemplate";
import { KV } from "resources/danhmuc/KeyValue";

export const parseKVs = (text: string): KV[] => {
  const optionsText = text.split("\n");
  const kvs = optionsText.reduce((options: KV[], text) => {
    const kvArray = text.split(",");
    if (kvArray.length < 2) return options;
    return [...options, { value: kvArray[0].trim(), label: kvArray[1].trim() }];
  }, []);
  return kvs;
};

export const stringifyKVs = (kvs: KV[]): string => {
  return kvs.reduce((text, kv) => {
    return text + kv.value + "," + kv.label + "\n";
  }, "");
};

export const CustomSelect = (props: IFilterMeta) => {
  const options: KV[] = parseKVs(props.options ?? "");
  return <KVSelect {...props} items={options} name={props.name} />;
};
