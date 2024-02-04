import process from 'node:process';
import path from 'node:path';
import { EOL } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dbg, work_dir, emitErr } from './settings.js'
import { ls } from './ls.js';
import { cat } from './cat.js';
import { add } from './add.js';
import { rn } from './rn.js';
import { cp } from './cp.js';
import { mv } from './mv.js';
import { rm } from './rm.js';
import { info } from './info.js';
import { hash } from './hash.js';
import { compress } from './compress.js';
import { decompress } from './decompress.js';

function filter1par(currentOperation, begin = new RegExp("^\\w+\\s+", 'u')) {
    let params = currentOperation.replace(begin, '').replace(/\s\s+/g, ' ').trim();
    return params.startsWith('"') ? params
        .replace(/^"/, '').replace(/"$/, '')
        : params.startsWith("'") ? params
            .replace(/^'/, '').replace(/'$/, '')
            : params.startsWith("`") ? params
                .replace(/^`/, '').replace(/`$/, '')
                : params;
}

function filter2par(currentOperation, begin = new RegExp("^\\w+\\s+", 'u')) {
    let params = currentOperation.replace(begin, '').replace(/\s\s+/g, ' ').trim();
    return params.startsWith('"') ? params
        .split('" "').map(a => a.replace(/^"/, '').replace(/"$/, ''))
        : params.startsWith("'") ? params
            .split("' '").map(a => a.replace(/^'/, '').replace(/'$/, ''))
            : params.startsWith("`") ? params
                .split("` `").map(a => a.replace(/^`/, '').replace(/`$/, ''))
                : params.split(' ');
}

const read_tty = async () => {
    dbg.log(work_dir.path());
    let currentOperation = '';
    let username = 'Anonymous';
    if (process.argv.length > 2) {
        for (let i = 2; i < process.argv.length; i++) {
            let val = process.argv[i];
            if (typeof (val) === 'string' && val.length > 2 && val.startsWith("--username=")) {
                username = val.replace("--username=", '');
            }
            if (typeof (val) === 'string' && val.length > 2 && val.startsWith("--dir=src")) {
                try {
                    work_dir.arr(path.normalize(path.dirname(fileURLToPath(import.meta.url))));                    
                } catch {
                    work_dir.arr(path.resolve('./src'));
                }
            }            
            if (typeof (val) === 'string' && val.length > 2 && val.startsWith("--exec=")) {
                setTimeout(() => {
                    let cmd = val.replace("--exec=", '').replace(/_/g, ' ');
                    console.log(cmd);
                    process.stdin.emit("data", `${cmd}${EOL}`)
                }, i * 200);
            }
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
            } else if (currentOperation.startsWith('pwd')) {
                dbg.log(`Operation: ${currentOperation}`);
                work_dir.pwd();
            } else if (currentOperation.startsWith('ls')) {
                dbg.log(`Operation: ${currentOperation}`);
                ls();
            } else if (currentOperation.startsWith('cd ')) {
                let dir = filter1par(currentOperation);;
                dbg.log(`Operation: ${currentOperation}`);
                work_dir.cd(dir);
            } else if (currentOperation.startsWith('cat ')) {
                let filename = filter1par(currentOperation);
                dbg.log(`Operation: ${currentOperation}`);
                cat(filename);
            } else if (currentOperation.startsWith('add ')) {
                let filename = filter1par(currentOperation);
                dbg.log(`Operation: ${currentOperation}`);
                add(filename);
            } else if (currentOperation.startsWith('rm ')) {
                let filename = filter1par(currentOperation);
                dbg.log(`Operation: ${currentOperation}`);
                rm(filename);
            } else if (currentOperation.startsWith('os ')) {
                let param = filter1par(currentOperation, /^os\s+--/);
                dbg.log(`Operation: ${currentOperation}`);
                info(param);
            } else if (currentOperation.startsWith('hash ')) {
                let filename = filter1par(currentOperation);
                dbg.log(`Operation: ${currentOperation}`);
                hash(filename);
            } else if (currentOperation.startsWith('rn ')) {
                let filenames = filter2par(currentOperation);
                dbg.log(`Operation: ${currentOperation}`);
                if (filenames.length > 1) {
                    rn(...filenames);
                } else {
                    emitErr(`Invalid input`);
                }
            } else if (currentOperation.startsWith('cp ')) {
                let filenames = filter2par(currentOperation);
                dbg.log(`Operation: ${currentOperation}`);
                if (filenames.length > 1) {
                    cp(...filenames);
                } else {
                    emitErr(`Invalid input`);
                }
            } else if (currentOperation.startsWith('mv ')) {
                let filenames = filter2par(currentOperation);
                dbg.log(`Operation: ${currentOperation}`);
                if (filenames.length > 1) {
                    mv(...filenames);
                } else {
                    emitErr(`Invalid input`);
                }
            } else if (currentOperation.startsWith('compress ')) {
                let filenames = filter2par(currentOperation);
                dbg.log(`Operation: ${currentOperation}`);
                if (filenames.length > 1) {
                    compress(...filenames);
                } else {
                    emitErr(`Invalid input`);
                }
            } else if (currentOperation.startsWith('decompress ')) {
                let filenames = filter2par(currentOperation);
                dbg.log(`Operation: ${currentOperation}`);
                if (filenames.length > 1) {
                    decompress(...filenames);
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
            work_dir.pwd();
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
