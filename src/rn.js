import fs from 'node:fs';
import { dbg, emitErr, work_dir } from './settings.js'
import path from 'node:path';

const rn = async (filenameSrc, filenameDst) => {

    await fs.promises.rename(path.resolve(work_dir.path(), filenameSrc),
        path.resolve(work_dir.path(), filenameDst))
        .then(_value => {
            dbg.log('done');
            work_dir.pwd();
        })
        .catch(err => {
            dbg.log(err);
            emitErr(`Operation failed`);
        });

};
export {
    rn
};
