import fs from 'node:fs';
import process from 'node:process';
import path from 'node:path';
import os from 'node:os';

const DEBUGGING = false
// || true; //uncomment it to turn on debug out

class Debug {
    debugging = false;
    log = (args) => { this.debugging ? console.log(args) : void 0; };
    constructor(arg = DEBUGGING) {
        this.debugging = arg;
    }
}

const dbg = new Debug();

let emitErr = (err) => { process.stdin.emit('error', new Error(err)); };

class Working_directory {
    constructor(url = `${os.homedir()}`) {
        try {
            this._path = path.normalize(url);
        } catch {
            this._path = path.resolve('./');
        }
        this._arr = this.arr(this._path);
        this._lastOperation = 'pwd';
    };
    pwd = () => {
        this.path();
        process.stdin.emit('pwd', this._path);
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
            this.pwd();
        } else {
            emitErr(`Operation failed`);
        }
        if (this._arr.length == 1 && this._arr[0] === '') {
            this._arr[0] = '/';
            this.pwd();
        }        
        return this._path;
    }
    cd = async (path_to) => {
        path_to = path.resolve(this._path, path_to);
        dbg.log(path_to);
        await fs.promises.realpath(path_to)
            .then((result) => {
                dbg.log(this.arr(result));
                dbg.log(this.path());
                this.pwd();
            })
            .catch(err => {
                dbg.log(err);
                emitErr(`Operation failed`);
            });

    }
}
const work_dir = new Working_directory();

export {
    dbg,
    emitErr,
    work_dir,
};
