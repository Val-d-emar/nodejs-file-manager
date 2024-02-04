import fs from 'node:fs';
import { dbg, emitErr, work_dir } from './settings.js'
import path from 'node:path';
import stream from 'node:stream';
import { createBrotliDecompress } from "node:zlib";

const decompress = async (filenameSrc, filenameDst) => {

    let src = path.resolve(work_dir.path(), filenameSrc);
    let dst = path.resolve(work_dir.path(), filenameDst);

    await fs.promises.access(src, fs.constants.R_OK)
        .then(() => {
            stream.pipeline(
                fs.createReadStream(src),
                createBrotliDecompress(),
                fs.createWriteStream(dst, { flags: 'wx+' }),
                (err) => {
                    if (err) {
                        dbg.log(err);
                        emitErr(`Operation failed`);
                    } else {
                        dbg.log('done');
                        work_dir.pwd();
                    }
                }
            );
        })
        .catch(err => {
            dbg.log(err);
            emitErr(`Operation failed`);
        });
};
export {
    decompress
};