import { createWriteStream } from 'node:fs';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { dirname, normalize } from 'node:path';
import { EOL } from 'node:os';
// import EventEmitter from 'node:events';
const dir = dirname(fileURLToPath(import.meta.url));

let emitErr = (err) => {
    process.stdin.emit(
        'error',
        new Error(err)
    );
}

const read_tty = async () => {
    // Write your code here 

    let currentOperation = '';
    let username = 'Anonymous';
    if (process.argv.length > 2) {
        let val = process.argv[2];
        if (typeof (val) === 'string' && val.length > 2 && val.startsWith("--username=")) {
            username = val.slice(11);
        } else {
            process.stdout.write(`Invalid input arg --username=${EOL}`);
        }
    } else {
        process.stdout.write(`Invalid input args${EOL}`);
    };

    process.stdout.write(`Welcome to the File Manager, ${username}!${EOL}`);

    process.stdin
        .on('data', data => {
            if (data.toString().startsWith('.exit')) {
                process.exit(0);
            } else if (data.toString().includes('ls')) {
                process.stdout.write(`Operation: ${data}`);
                currentOperation = data.toString().trim();
                emitErr(`Operation failed: ${currentOperation}${EOL}`);
            } else {
                emitErr(`Invalid input: ${data}`);
            }
        })
        .on('error', err => {
            process.stdout.write(err.message);
        })
        ;
    process.prependOnceListener('exit', code => {
        process.stdout.write(`Thank you for using File Manager, ${username}, goodbye!${EOL}`);
        return code;
    });
    process.prependOnceListener("SIGINT", code => {
        process.exit(0);
    });

};

await read_tty();