import { wrapExternalFunction } from "@/core/Functions/DynamicFunctionLibrary";
import * as Functions from "@/core/Functions/Generated/generatedWrappers";
import { between } from "unisoft-utils";

const functionsMap: { [key: string]: (...args: any[]) => any } = {
  after: Functions.wrappedAfter,
  before: Functions.wrappedBefore,
  consoleLog: Functions.consoleLog,
};

export function registerReactHook(name: string, passFunction?: any) {
  if (typeof passFunction === "function") {
    functionsMap[name] = passFunction;
    return functionsMap;
  }
}

export function registerFunc(name: string) {
  if (name !== "consoleLog") {
    const imMod = require("unisoft-utils")[name];
    const attrs = between(String(imMod), "(", ")").trim().split(", ");

    functionsMap[name] = wrapExternalFunction(imMod, (attributes) =>
      attrs.map((attr: string) => attributes[attr])
    );
  }
  return functionsMap;
}

export default functionsMap;
