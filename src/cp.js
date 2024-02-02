import fs from 'node:fs';
import { dbg, pwd, emitErr, work_dir } from './settings.js'
import path from 'node:path';

const cp = async (filenameSrc, filenameDst) => {

    // await fs.promises.copyFile(path.resolve(work_dir.path(), filenameSrc),
    // path.resolve(work_dir.path(), filenameDst))
    // .then(files => {
    //     dbg.log('done');
    //     pwd(dir);
    // })
    // .catch(err => {
    //     dbg.log(err);
    //     emitErr(`Operation failed`);
    // });

    fs.createReadStream(path.resolve(work_dir.path(), filenameSrc))
        .on('error', err => {
            dbg.log(err);
            emitErr(`Operation failed`);
        }).pipe(fs.createWriteStream(path.resolve(work_dir.path(), filenameDst)))
        .on('error', err => {
            dbg.log(err);
            emitErr(`Operation failed`);
        })
        .on('unpipe', () => {
            dbg.log('done');
            pwd(work_dir.path());
        });

};
export {
    cp
};