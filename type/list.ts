import { Value, value } from "./structure.ts";
import { ValueType } from "./valuetype.ts";

class ParseList {
  public value: string;
  public value_0: string;

  constructor(list: string) {
    this.value = list;
    const list_value = this.value.toString().replace(/\[|\]/g, "").split(",")
      .filter((value) => value != "");
    if (list_value.length == 0) {
      throw new Error("List is empty");
    }
    this.value_0 = list_value[0];
  }
  public parse(): Value {
    const list_value = this.value.toString().replace(/\[|\]/g, "").split(
      /,\s/g,
    );
    let result: value[] = [];
    if (this.isNumber()) {
      result = list_value.map((value) => parseInt(value));
    } else if (this.isString()) {
      result = list_value.map((value) => value.toString().replace(/"/g, ""));
    } else if (this.isBoolean()) {
      result = list_value.map((value) => {
        console.log(value.toString() === "true");
        return value.toString().replace(/\s/g, "") === "true";
      });
    }

    return {
      type: ValueType.List,
      value: {
        type: this.getType(),
        value: result,
      },
    };
  }

  public isString(): boolean {
    return this.value_0.startsWith('"') == true &&
      this.value_0.endsWith('"') == true;
  }

  public isNumber(): boolean {
    return !isNaN(parseFloat(this.value_0.toString()));
  }

  public isBoolean(): boolean {
    return this.value_0.toString() == "true" ||
      this.value_0.toString() == "false";
  }

  public getType(): ValueType {
    if (this.isString()) {
      return ValueType.String;
    } else if (this.isNumber()) {
      return ValueType.Number;
    } else if (this.isBoolean()) {
      return ValueType.Boolean;
    } else {
      return ValueType.List;
    }
  }
}

export { ParseList };
