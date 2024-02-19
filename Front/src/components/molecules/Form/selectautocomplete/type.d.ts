export type PropsSelectAutoComplete = Omit<AutocompleteProps, "columns"> & {
  rules?: any;
  sm?: number;
  name: string;
  [key: string]: any;
};
