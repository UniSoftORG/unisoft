import * as Functions from "@/utils/Functions/Generated/generatedWrappers";
import {registerFunction, wrapExternalFunction} from "@/utils/Functions/DynamicFunctionLibrary";
import {between} from "unisoft-utils";

const functionsMap: { [key: string]: (...args: any[]) => any } = {
    'consoleLog': Functions.consoleLog
};

export function useFunction(name: string) {
    registerFunction(name, functionsMap[name]);
}


export function registerReactFunction(name: string, passFunction?: any) {
    // const attrs = between(String(passFunction), '(', ')').trim().split(', ')

    functionsMap[name] = passFunction
    // functionsMap[name] = wrapExternalFunction(
    //     passFunction,
    //     attributes => attrs.map((attr) => attributes[attr])
    // );

    return functionsMap
}

export function registerFunc(name: string) {
    if(name !== 'consoleLog') {
        const imMod = require('unisoft-utils')[name]
        const attrs = between(String(imMod), '(', ')').trim().split(', ')

        functionsMap[name] = wrapExternalFunction(
            imMod,
            attributes => attrs.map((attr) => attributes[attr])
        );
    }
    return functionsMap
}

export default functionsMap