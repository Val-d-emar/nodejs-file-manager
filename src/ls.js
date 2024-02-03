import fs from 'node:fs';
import { dbg, emitErr, work_dir } from './settings.js'

const ls = async () => {
    await fs.promises.readdir(work_dir.path(), { withFileTypes: true })
        .then(files => {
            dbg.log(files);
            if (files.length > 0) {
                let i = 0;
                let table = files.map(f => { return { Name: f.name, Type: f.isDirectory() ? 'directory' : 'file' } })
                table.sort((a, b) => { return Number(a.Type === 'file') - Number(b.Type === 'file') });
                console.table(table);
                dbg.log(table);
            }
            work_dir.pwd();
        })
        .catch(err => {
            dbg.log(err);
            emitErr(`Operation failed`);
        });
};

export {
    ls
};