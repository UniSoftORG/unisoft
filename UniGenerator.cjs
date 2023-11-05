const ts = require("typescript");
const fs = require('fs');

const fileName = './src/predefined/components/Sliders/1/Slider.ts';
const fileContent = fs.readFileSync(fileName, 'utf8');

// Transpile TypeScript to JavaScript
const transpiledCode = ts.transpileModule(fileContent, {
    fileName,
    compilerOptions: {
        target: ts.ScriptTarget.Latest,
        module: ts.ModuleKind.CommonJS
    }
}).outputText;

// Mock the required modules (adjust paths accordingly)
global["@/definitions/creators"] = require('./src/definitions/creators');
global["@/definitions/functions"] = require('./src/definitions/functions');
global["@/definitions/dynamic"] = require('./src/definitions/dynamic');

// Execute the transpiled code
const sliderComponent = eval(transpiledCode);

// Log the result (JSON representation of Slider component)
console.log(JSON.stringify(sliderComponent, null, 2));

// // nodemon-wrapper.js
// const nodemon = require('nodemon');
// const path = require('path');
// const { spawn } = require('child_process');
//
// // The directory of your TypeScript files
// const tsFilesDir = './predefined/**/*.ts';
//
// // Start nodemon
// nodemon({
//     watch: [tsFilesDir],
//     ext: 'ts',
//     ignore: ['node_modules'],
//     // Using a dummy script because we are going to handle the execution ourselves
//     execMap: {
//         ts: 'cd src && node --loader ts-node/esm'
//     }})
//
// nodemon.on('restart', function (changedFiles) {
//     console.log('Files changed:', changedFiles);
//
//     if (changedFiles && changedFiles.length > 0) {
//         const changedFile = changedFiles[0]; // Taking the first changed file
//         const tsNodePath = path.join('node_modules', '.bin', 'ts-node');
//
//         // // On Windows, the executable is named `ts-node.cmd`
//         const tsNodeExecutable = process.platform === "win32" ? `${tsNodePath}.cmd` : tsNodePath;
//         //
//         console.log(`Running: ${tsNodeExecutable} --loader ts-node/cjs ${changedFile}`);
//         //
//         const tsNodeProcess = spawn(tsNodeExecutable, ['--loader', 'ts-node/esm', changedFile], { stdio: 'inherit' });
//         //
//         tsNodeProcess.on('error', (err) => {
//             console.error('Failed to start subprocess.', err);
//         });
//     }
// });
// //
//     // const tsNodeProcess = spawn('npx', ['ts-node', changedFile], { stdio: 'inherit' });
//     //
//     // tsNodeProcess.on('close', (code) => {
//     //     console.log(`ts-node process exited with code ${code}`);
//     // });
// // else {
// //     console.log('No TypeScript file change detected.');
// // }
//
// // const fs = require('fs');
// // const { exec } = require('child_process');
// // const ts = require("typescript");
// //
// // const watchFile = './predefined/components/Sliders/1/Slider.ts'
// // const getCurrent = fs.readFileSync(watchFile, 'utf8')
// // const sourceFile = ts.createSourceFile(watchFile, getCurrent, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
// //
// // fs.watch(getCurrent, (eventType, filename) => {
// //     if (eventType === 'change') {
// //         console.log(`${sourceFile} has been changed, running the script...`);
// //         // exec(`node ${sourceFile}`, (error, stdout, stderr) => {
// //         //     if (error) {
// //         //         console.error(`exec error: ${error}`);
// //         //         return;
// //         //     }
// //         //     console.log(`stdout: ${stdout}`);
// //         //     console.error(`stderr: ${stderr}`);
// //         // });
// //     }
// // });
// //
// // // const fs = require('fs');
// // // const diff = require('deep-diff')
// // //
// // // const watchFile = './src/predefined/components/Sliders/1/Slider.ts';
// // // const getCurrent = () => fs.readFileSync(watchFile, { encoding: 'utf8', flag: 'r' })
// // // let currObj = getCurrent().load(markup);
// // //
// // //
// // // console.log(`Watching for file changes on ${typeof currObj}`);
// // // fs.watch(watchFile, { encoding: 'buffer' }, (eventType, filename) => {
// // //     if (eventType !== 'change') return
// // //
// // //     // const newObj = JSON.parse(getCurren(t))
// // //     // const differences = diff(currObj, newObj)
// // //     console.log(currObj)
// // //
// // //     // { kind: 'N' } for new key additions
// // //     // { kind: 'E' } for edits
// // //     // { kind: 'D' } for deletions
// // //
// // //     // currObj = newObj
// // // })