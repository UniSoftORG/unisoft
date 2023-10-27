"use client"
// import InitiateRenderer from "@/renderer/InitiateRenderer";
// import {Slider} from "@/predefined/components/Sliders/Slider";
// import {Creators} from "unisoft-utils";

import {
  executeFunctionConfigs,
  registerFunction,
  registerFunctionsFromModule, runFunctionTask
} from "@/utils/Functions/DynamicFunctionLibrary";
import * as Utils from "@/utils/Functions/generatedWrappers";
import * as Base from "@/utils/Functions/Base/cyclicFunctions";
export default function Home() {
  const consoleLog = (attributes: any) => {
    if (attributes.value) {
      console.log(attributes.value);
    }
  };
  // registerFunction('consoleLog', consoleLog);
  // registerFunctionsFromModule(Utils);
  // registerFunctionsFromModule(Base);



  const functionTasks = [
    {
      name: "after",
      attributes: {
        subject: "Rade is pro",
        search: "is"
      },
        callbacks: [{
          name: "consoleLog",
          attributes: {
            value: "result"
          }
        }]
    }
  ];
  functionTasks.forEach(runFunctionTask);

  // return await InitiateRenderer(Creators.simpleDeepClone([Slider]))
}
