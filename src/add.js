import fs from 'node:fs';
import path from 'node:path';
import { dbg, emitErr, pwd, work_dir } from './settings.js'

const add = async (filename) => {

    fs.createWriteStream(path.resolve(work_dir.path(), filename))
        .on('error', err => {
            dbg.log(err);
            emitErr(`Operation failed`);
        })
        .on('end', () => {
            dbg.log('done');
            pwd(work_dir.path());
        }).end("");

};
export {
    add
};
