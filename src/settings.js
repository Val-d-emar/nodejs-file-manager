import fs from 'node:fs';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// const DEBUGGING = true;
const DEBUGGING = false;

class Debug {
    debugging = false;
    log = (args) => { this.debugging ? console.log(args) : void 0; };
    constructor(arg = DEBUGGING) {
        this.debugging = arg;
    }
}

const dbg = new Debug();

let emitErr = (err) => { process.stdin.emit('error', new Error(err)); };

let pwd = (dir) => { process.stdin.emit('pwd', dir); };

class Working_directory {
    constructor(url = fileURLToPath(import.meta.url)) {
        this._path = path.normalize(path.dirname(url)).toString();
        this._arr = this.arr(this._path);
        this._lastOperation = 'pwd';
    };
    path = (arg = this._arr) => {
        if (arg.length == 1 && arg[0] === '') {
            arg[0] = '/';
        }    
        this._path = arg.join(path.sep);
        this._arr = arg;
        return this._path;
    }
    arr = (path_to = this._path) => {
        this._arr = path_to.split(path.sep);
        if (this._arr.length === 1 && this._arr[0] === '') {
            this._arr[0] = '/';
        }
        return this._arr;
    }
    up = () => {
        if (this._arr.length > 1) {
            this._arr.pop();
        } else {
            emitErr(`Operation failed`);
        }
        if (this._arr.length == 1 && this._arr[0] === '') {
            this._arr[0] = '/';
        }    
        pwd(work_dir.path());
        return this._path;
    }
    cd = async (path_to) => {
        path_to = path.resolve(this._path, path_to);
        dbg.log(path_to);
        await fs.promises.realpath(path_to)
            .then((result) => {
                dbg.log(this.arr(result));
                dbg.log(this.path());
            })
            .catch( err => {
                emitErr(`Operation failed`);
                dbg.log(err);
            })
        pwd(this._path);
    }
}
const work_dir = new Working_directory();

export {
    dbg,
    emitErr,
    pwd,
    work_dir,
};
