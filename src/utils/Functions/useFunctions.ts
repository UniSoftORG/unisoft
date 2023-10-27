import * as Functions from "@/utils/Functions/generatedWrappers";
import {registerFunction} from "@/utils/Functions/DynamicFunctionLibrary";

const functionsMap: any = {
    'after': Functions.wrappedAfter,
    'consoleLog': Functions.consoleLog
};


export function useFunction(name: string){
    registerFunction(name, functionsMap[name]);
}

export default functionsMap