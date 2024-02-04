import fs from 'node:fs';
import { dbg, emitErr, work_dir } from './settings.js'
import path from 'node:path';

const rm = async (filename) => {

    await fs.promises.unlink(path.resolve(work_dir.path(), filename))
        .then(() => {
            dbg.log('done');
            work_dir.pwd();
        })
        .catch(err => {
            dbg.log(err);
            emitErr(`Operation failed`);
        });
};
export {
    rm
};