import fs from 'node:fs';
import { dbg, pwd, emitErr, work_dir } from './settings.js'
import path from 'node:path';
import stream from 'node:stream';

const mv = async (filenameSrc, dirnameDst) => {

    let src = path.resolve(work_dir.path(), filenameSrc);
    let dst = path.resolve(work_dir.path(), dirnameDst, path.basename(filenameSrc));
    if (src === dst) {
        dbg.log(`src (${src}) === dst (${dst})`);
        emitErr(`Operation failed`);
        return;
    }

    await fs.promises.access(src, fs.constants.R_OK)
        .then(() => {
            stream.pipeline(
                fs.createReadStream(src),
                fs.createWriteStream(dst, { flags: 'wx+' }),
                (err) => {
                    if (err) {
                        dbg.log(err);
                        emitErr(`Operation failed`);
                    } else {
                        fs.promises.unlink(src)
                            .then(() => {
                                dbg.log('done');
                                pwd(work_dir.path());
                            })
                            .catch(err => {
                                dbg.log(err);
                                emitErr(`Operation failed`);
                            });
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
    mv
};