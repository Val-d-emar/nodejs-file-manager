import os from 'node:os';
import { dbg, pwd, emitErr, work_dir } from './settings.js'

const info = async (param) => {

    switch (param) {
        case "cpus": {
            let cpus = [].concat(os.cpus()).map((a) => {return { 'Model of CPU': a.model, 'Clock rate, GHz': a.speed / 1000}});
            console.log(`Overall amount of CPUS: ${cpus.length}`);
            console.table(cpus);
            pwd(work_dir.path());
            break;
        }
        default:
            dbg.log(err);
            emitErr(`Operation failed`);
    }
 
};
export {
    info
};