import { HateJson } from "../hatejson.ts";

const f = new HateJson("./example.hj");
console.log("이름: ", f.get("name") ? f.get("name") : "null");
console.log("나이: ", f.get("age") ? f.get("age") : "null");
console.log("언어: ", f.get("lang") ? (f.get("lang") as string[]).join(", ") : "null");

console.log("Exist: ", f.isExist("name")); // true
console.log("Exist: ", f.isExist("nick")); // false