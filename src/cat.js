import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { dbg, emitErr, work_dir } from './settings.js'

const cat = async (file) => {
    return fs.createReadStream(path.resolve(work_dir.path(), file))
    .on('error', err => {
        dbg.log(err);
        emitErr(`Operation failed`);
    })
    .pipe(process.stdout)
    .on('unpipe', () => console.log());
};
export {
    cat
};