import os from 'node:os';
import { dbg, emitErr, work_dir } from './settings.js'

const info = async (param) => {
    try {
        switch (param) {
            case "cpus": {
                let cpus = [].concat(os.cpus()).map((a) => { return { 'Model of CPU': a.model, 'Clock rate, GHz': a.speed / 1000 } });
                console.log(`Overall amount of CPUS: ${cpus.length}`);
                console.table(cpus);
                work_dir.pwd();
                break;
            }
            case "EOL": {
                let eol = os.EOL;
                console.log(`EOL: ${eol.replace("\n", "LF").replace("\r", "CR")}`);
                console.log(eol);
                work_dir.pwd();
                break;
            }
            case "homedir": {
                console.log(`${os.homedir()}`);
                work_dir.pwd();
                break;
            }
            case "username": {
                console.log(`${os.userInfo().username}`);
                work_dir.pwd();
                break;
            }
            case "architecture": {
                console.log(`${os.arch()}`);
                work_dir.pwd();
                break;
            }            
            default:
                dbg.log('case default:');
                emitErr(`Invalid input`);
        }
    } catch {
        dbg.log(err);
        emitErr(`Operation failed`);
    }
};
export {
    info
};