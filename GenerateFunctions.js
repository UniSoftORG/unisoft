const ts = require("typescript");
const fs = require('fs');

const fileName = './packages/utils/src/evaluators/string.ts';
const fileContent = fs.readFileSync(fileName, 'utf8');

const sourceFile = ts.createSourceFile(
    fileName,
    fileContent,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
);

const functions = [];
const imports = [];

function visitNode(node, currentFunction = null) {
    if (ts.isImportDeclaration(node)) {
        imports.push(node.getText(sourceFile));
    } else if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) || ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
        const funcName = node.name ? node.name.getText(sourceFile) : (ts.isVariableDeclaration(node.parent) && node.parent.name) ? node.parent.name.getText(sourceFile) : 'anonymous';
        if (funcName !== 'anonymous') {
            const parameters = node.parameters.map(param => ({
                name: param.name.getText(sourceFile),
                type: param.type ? param.type.getText(sourceFile) : 'unknown',
                defaultValue: param.initializer ? param.initializer.getText(sourceFile) : null,
                optional: !!param.questionToken
            }));
            const returnType = node.type ? node.type.getText(sourceFile) : 'unknown';
            const generics = node.typeParameters ? node.typeParameters.map(typeParam => typeParam.getText(sourceFile)) : [];
            const newFunction = {
                name: funcName,
                parameters: parameters,
                returnType: returnType,
                generics: generics,
                constants: [],
            };
            functions.push(newFunction);
            ts.forEachChild(node, childNode => visitNode(childNode, newFunction));
        }
    } else if (ts.isVariableDeclaration(node) && currentFunction) {
        const name = node.name.getText(sourceFile);
        const type = node.type ? node.type.getText(sourceFile) : 'unknown';
        const initializer = node.initializer ? node.initializer.getText(sourceFile) : null;
        const declarationObj = {name, type, initializer};
        currentFunction.constants.push(declarationObj);
    } else {
        ts.forEachChild(node, childNode => visitNode(childNode, currentFunction));
    }
}

visitNode(sourceFile);

const output = {
    filePath: fileName,
    imports: imports,
    functions: functions
};

console.log(output);

fs.writeFileSync('./src/functions/utils.json', JSON.stringify(output));
