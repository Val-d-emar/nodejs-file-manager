import { createWriteStream } from 'node:fs';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { EOL } from 'node:os';
// import EventEmitter from 'node:events';
let path_to_working_directory = path.normalize(path.dirname(fileURLToPath(import.meta.url))).toString();
console.log(path_to_working_directory);

let emitErr = (err) => { process.stdin.emit('error', new Error(err)); };

let emitDir = (dir) => { process.stdin.emit('dir', dir); };

let dir2array = (path_to = path_to_working_directory) => {
    let res = path_to.split(path.sep);
    if (res.length > 0 && res[0] === '') {
        res[0] = '/';
    }
    return res;
}

let array_working_directory = dir2array(path_to_working_directory);

let dirUp = (path_to = path_to_working_directory) => {
    let res = path_to.split(path.sep);
    if (res.length > 1) {
        res.pop();
    }    
    if (res.length == 1 && res[0] === '') {
        res[0] = '/';
    }
    array_working_directory = res;
    console.log(array_working_directory);
    path_to_working_directory = array_working_directory.join(path.sep);
    return res;
}

const read_tty = async () => {
    // Write your code here 

    console.log(array_working_directory);
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
    process.stdout.write(`You are currently in ${path_to_working_directory}${EOL}`);

    process.stdin
        .on('data', data => {
            if (data.toString().startsWith('.exit')) {
                process.exit(0);
            } else if (data.toString().includes('up')) {
                process.stdout.write(`Operation: ${data}`);
                dirUp();
                currentOperation = data.toString().trim();
                emitDir(path_to_working_directory);
            } else if (data.toString().includes('ls')) {
                process.stdout.write(`Operation: ${data}`);
                currentOperation = data.toString().trim();
                // emitErr(`Operation failed: ${currentOperation}${EOL}`);
                emitDir(path_to_working_directory);
            } else {
                emitErr(`Invalid input: ${data}`);
            }

        })
        .on('dir', dir => {
            process.stdout.write(`You are currently in ${dir}${EOL}`);
        })
        .on('error', err => {
            process.stdout.write(err.message);
        });

    process.prependOnceListener('exit', code => {
        process.stdout.write(`${EOL}Thank you for using File Manager, ${username}, goodbye!${EOL}`);
        return code;
    });
    process.prependOnceListener("SIGINT", code => {
        process.exit(0);
    });

};

await read_tty();