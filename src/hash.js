import fs from 'node:fs';
import { dbg, emitErr, work_dir } from './settings.js'
import path from 'node:path';
import { createHash } from 'node:crypto';

const hash = async (filename) => {

    let src = path.resolve(work_dir.path(), filename);
    let sha256 = createHash('sha256');

    await fs.promises.access(src, fs.constants.R_OK)
        .then(() => {
            const inp = fs.createReadStream(src);
            inp.on('readable', () => {
                const data = inp.read();
                if (data)
                    sha256.update(data);
                else {
                    console.log(`${sha256.digest('hex')}`);
                    work_dir.pwd();
                }
            });
        })
        .catch(err => {
            dbg.log(err);
            emitErr(`Operation failed`);
        });
};
export {
    hash
};