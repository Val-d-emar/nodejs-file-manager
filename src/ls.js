import fs from 'node:fs';
import { dbg, pwd, emitErr, work_dir } from './settings.js'

const ls = async (dir = work_dir.path()) => {
    await fs.promises.readdir(dir, { withFileTypes: true })
        .then(files => {
            dbg.log(files);
            if (files.length > 0) {
                let i = 0;
                let table = files.map(f => {return { Name: f.name, Type: f.isDirectory() ? 'directory' : 'file' }} ) 
                table.sort((a, b) => { return Number(a.Type === 'file') - Number(b.Type === 'file')});  
                console.table(table);
                dbg.log(table);
            }
            pwd(dir);
        })
        .catch(err => {
            dbg.log(err);
            emitErr(`Operation failed`);
        });
};

export {
    ls
};