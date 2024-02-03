import fs from 'node:fs';
import path from 'node:path';
import { dbg, emitErr, pwd, work_dir } from './settings.js'

const add = async (filename) => {

    fs.createWriteStream(path.resolve(work_dir.path(), filename), {flags:'wx+'})
        .on('error', err => {
            dbg.log(err);
            emitErr(`Operation failed`);
        })
        .on('finish', () => {
            dbg.log('done');
            pwd(work_dir.path());
        })        
        .end();

};
export {
    add
};
