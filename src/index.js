import process from 'node:process';
import { EOL } from 'node:os';
import { dbg, pwd, work_dir, emitErr } from './settings.js'
import { ls } from './ls.js';
import { cat } from './cat.js';
import { add } from './add.js';
import { rn } from './rn.js';
import { cp } from './cp.js';
import { mv } from './mv.js';

const read_tty = async () => {
    dbg.log(work_dir.path());
    let currentOperation = '';
    let username = 'Anonymous';
    if (process.argv.length > 2) {
        let val = process.argv[2];
        if (typeof (val) === 'string' && val.length > 2 && val.startsWith("--username=")) {
            username = val.slice(11);
        } else {
            console.log(`Invalid input arg --username=`);
        }
    } else {
        console.log(`Invalid input args`);
    };

    console.log(`Welcome to the File Manager, ${username}!`);
    console.log(`You are currently in ${work_dir.path()}`);

    process.stdin
        .on('data', data => {
            currentOperation = data.toString().trim();
            if (currentOperation.startsWith('.exit')) {
                process.exit(0);
            } else if (currentOperation.startsWith('up')) {
                dbg.log(`Operation: ${currentOperation}`);
                work_dir.up();
            } else if (currentOperation.startsWith('cd ')) {
                let dir = currentOperation.replace(/^cd\s+/, '');
                dbg.log(`Operation: ${currentOperation}`);
                work_dir.cd(dir);
            } else if (currentOperation.startsWith('ls')) {
                dbg.log(`Operation: ${currentOperation}`);
                ls();
            } else if (currentOperation.startsWith('cat')) {
                let filename = currentOperation.replace(/^cat\s+/, '');
                dbg.log(`Operation: ${currentOperation}`);
                cat(filename);
            } else if (currentOperation.startsWith('add')) {
                let filename = currentOperation.replace(/^add\s+/, '');
                dbg.log(`Operation: ${currentOperation}`);
                add(filename);
            } else if (currentOperation.startsWith('rn')) {
                let filenames = currentOperation.replace(/^rn\s+/, '')
                .replace(/\s\s+/g, ' ').split(' ');
                dbg.log(`Operation: ${currentOperation}`);
                if (filenames.length > 1) {
                    rn(...filenames);
                } else {
                    emitErr(`Invalid input`);
                }
            } else if (currentOperation.startsWith('cp')) {
                let filenames = currentOperation.replace(/^cp\s+/, '')
                .replace(/\s\s+/g, ' ').split(' ');
                dbg.log(`Operation: ${currentOperation}`);
                if (filenames.length > 1) {
                    cp(...filenames);
                } else {
                    emitErr(`Invalid input`);
                }
            } else if (currentOperation.startsWith('mv')) {
                let filenames = currentOperation.replace(/^mv\s+/, '')
                    .replace(/\s\s+/g, ' ').split(' ');
                dbg.log(`Operation: ${currentOperation}`);
                if (filenames.length > 1) {
                    mv(...filenames);
                } else {
                    emitErr(`Invalid input`);
                }
            } else {
                emitErr(`Invalid input`);
            }
        })
        .on('pwd', dir => {
            console.log(`You are currently in ${dir}`);
        })
        .on('error', err => {
            console.log(err.message);
            pwd(work_dir.path());
        });

    process.prependOnceListener('exit', code => {
        console.log(`${EOL}Thank you for using File Manager, ${username}, goodbye!`);
        return code;
    });
    process.prependOnceListener("SIGINT", _code => {
        process.exit();
    });

};

await read_tty();