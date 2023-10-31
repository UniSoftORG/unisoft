import InitiateRenderer from "@/renderer/InitiateRenderer";
import {Slider} from "@/predefined/components/Sliders/Slider";
// import {
//     runFunctionTask, wrapExternalFunction
// } from "@/utils/Functions/DynamicFunctionLibrary";

const wrappedFunctions: { [key: string]: (...args: any[]) => any } = {};

// const functionConfig = [
//     {
//         exportName: 'Getters',
//         functionName: 'after',
//         params: ['subject', 'search'],
//     }
// ];

// function capitalize(str: string): string {
//     return str.charAt(0).toUpperCase() + str.slice(1);
// }

// async function wrapFunctions() {
//     for (const config of functionConfig) {
//         const imMod = (await import('unisoft-utils')) as any;
//         const func = config.functionName === 'default' ? imMod.default : imMod[config.functionName];
//
//         wrappedFunctions[`wrapped${capitalize(config.functionName)}`] = wrapExternalFunction(
//             func,
//             attributes => config.params.map(param => attributes[param])
//         );
//     }
// }


export default async function Home() {
// Initially call wrapFunctions to set up the wrappers
    // return  <pre>{JSON.stringify(initiate, null, 4)}</pre>
    // functionTasks.forEach(runFunctionTask);

    return await InitiateRenderer([Slider])
}
