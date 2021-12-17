import { Value } from "./structure.ts";
import { ValueType } from "./valuetype.ts";
import { ParseList } from "./list.ts";

class CheckType {
  public value: string = "";

  public constructor(value: string) {
    this.value = value;
  }

  public isString(): boolean {
    return this.value?.toString().startsWith('"') == true &&
      this.value?.toString().endsWith('"') == true;
  }

  public isNumber(): boolean {
    return !isNaN(parseFloat(this.value.toString()));
  }

  public isBoolean(): boolean {
    return this.value.toString() == "true" || this.value.toString() == "false";
  }

  public isValue(): boolean {
    return this.isString() || this.isNumber() || this.isBoolean();
  }

  public isList(): boolean {
    return this.value?.toString().startsWith("[") == true &&
      this.value?.toString().endsWith("]") == true;
  }

  public getValue(): Value {
    if (this.isString()) {
      return {
        type: ValueType.String,
        value: this.value.toString().replace(/"/g, ""),
      };
    } else if (this.isNumber()) {
      return {
        type: ValueType.Number,
        value: parseFloat(this.value.toString()),
      };
    } else if (this.isBoolean()) {
      return {
        type: ValueType.Boolean,
        value: this.value.toString() == "true",
      };
    } else if (this.isList()) {
      const l = new ParseList(this.value.toString());
      return l.parse();
    } else {
      throw new Error(`Invalid value: \`${this.value}\``);
    }
  }
}

export { CheckType };
