// nodemon-wrapper.cjs
const nodemon = require('nodemon');
const path = require('path');
const { spawn } = require('child_process');

// The directory of your TypeScript files
const tsFilesDir = 'src/predefined/**/*.ts';

// Start nodemon
nodemon({
    watch: [tsFilesDir],
    ext: 'ts',
    ignore: ['node_modules'],
    // Using a dummy script because we are going to handle the execution ourselves
    execMap: {
        ts: 'node ts-node/esm'
    }});

nodemon.on('restart', function (changedFiles) {
    console.log('Files changed:', changedFiles);

    if (changedFiles && changedFiles.length > 0) {
        const changedFile = changedFiles[0]; // Taking the first changed file
        const tsNodePath = path.join('node_modules', '.bin', 'ts-node');

        // On Windows, the executable is named `ts-node.cmd`
        const tsNodeExecutable = process.platform === "win32" ? `${tsNodePath}.cmd` : tsNodePath;

        console.log(`Running: ${tsNodeExecutable} --loader ts-node/cjs ${changedFile}`);

        const tsNodeProcess = spawn(tsNodeExecutable, ['--loader', 'ts-node/esm', changedFile], { stdio: 'inherit' });

        tsNodeProcess.on('error', (err) => {
            console.error('Failed to start subprocess.', err);
        });
    }
});

nodemon.on('quit', function () {
    console.log('Nodemon has quit');
    process.exit();
});

nodemon.on('error', function (err) {
    console.error('An error occurred, nodemon cannot continue', err);
    process.exit(1);
});
