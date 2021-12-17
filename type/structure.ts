import { ValueType } from "./valuetype.ts";

type value = string | number | boolean | List;

interface Value {
  type: ValueType;
  value: value | List;
}

interface List {
  type: ValueType;
  value: value[];
}

export type { List, Value, value };
