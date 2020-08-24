export interface KV {
  value: string;
  label: string;
}

export const newKV = (value: string, label: string): KV => {
  return { value, label };
};
