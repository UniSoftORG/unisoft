const fs = require('fs');

// Read the TypeScript functions
const fileContent = fs.readFileSync('../../../packages/utils/src/getters/string.ts', 'utf8');

// Simple regex to extract function names and parameters (assuming no nested functions)
const regex = /export const (\w+) = \(([\w\W]*?)\):/g;

let match;
let output =
`import {wrapExternalFunction} from "@/utils/Functions/DynamicFunctionLibrary";
 'import {Getters} from "unisoft-utils";
 
 
 `;

while (match = regex.exec(fileContent)) {
    const funcName = match[1];
    const parameters = match[2].split(',').map(p => p.split(':')[0].trim());

    // Generate the wrapper
    output += `
export const wrapped${funcName + funcName.slice(1)} = wrapExternalFunction(
    Getters.${funcName},
    attributes => [${parameters.map(p => `attributes.${p}`).join(', ')}]
);
`;

    // Add the registration
    // output += `registerFunction('${funcName}', wrapped${funcName.charAt(0).toUpperCase() + funcName.slice(1)});\n\n`;
}

fs.writeFileSync('./testWrappers.ts', output);
