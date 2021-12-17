import { List, value } from "./type/structure.ts";
import { CheckType } from "./type/checktype.ts";

type fnget_rtype_ = value | undefined | List;
type fnget_rtype = fnget_rtype_ | fnget_rtype_[];
const encoder: TextEncoder = new TextEncoder();

class HateJson {
  public filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  public get(k: string): fnget_rtype {
    const content = Deno.readTextFileSync(this.filename);
    let result: fnget_rtype;
    content.split("\n").forEach((line) => {
      if (line.startsWith(k)) {
        const check = new CheckType(line.split("=").slice(1).join("=").trim());
        if (check.getValue().type == 3) {
          result = (check.getValue().value as List).value;
        } else {
          result = check.getValue().value;
        }
      }
    });
    return result;
  }

  public async set(k: string, v: string, option?: Deno.WriteFileOptions) {
    await Deno.writeFile(
      this.filename,
      encoder.encode(`${k}=${v}\n`),
      option,
    );
  }

  public isExist(k: string): boolean {
    const content = Deno.readTextFileSync(this.filename);
    let result: boolean = false;
    content.split("\n").forEach((line) => {
      if (line.startsWith(k)) {
        result = true;
      }
    });
    return result;
  }
}

export { HateJson };
