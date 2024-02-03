import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { dbg, emitErr, work_dir } from './settings.js'

const cat = async (filename) => {
    fs.createReadStream(path.resolve(work_dir.path(), filename))
        .on('error', err => {
            dbg.log(err);
            emitErr(`Operation failed`);
        })
        .pipe(process.stdout)
        .on('unpipe', () => {
            console.log();
            work_dir.pwd();
        });
};
export {
    cat
};