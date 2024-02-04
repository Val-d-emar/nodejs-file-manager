1. Task: [File Manager](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md)  
2. Done 03.02.2024 / deadline 06.02.2024  
3. Score: 330 / 330  
   
# NOTES  
For to use even a once path with whitespace symbols in the parameters of operations divided by spaces you should place both paths in the same kind of quotes.  
Examples: 
```bash
cp 'file to copy.txt' './dir to copy/'
rn "file to rename.txt" "new name.txt"
mv `file.txt` `./dir to move/`
```  
For to use quotes and spaces in path place this filename inside another kind of quotes.  
Examples (**NOTE: in Windows you can't use some kinds of quotes in filenames**):  
```bash
cp 'file"my super name".txt' './dir to copy/'
rn "file'my crazy dream'" "new_name.txt"
mv `my "super 'crazy'"file."txt"` `./folder/`
```  
You can using any paths without quotes in the operations with one parameter but any quotes in the begin and in the end of parameter will be ignored.  
Examples (showed the one same path name below):  
```bash
cat `my "super 'crazy'"file."txt"`
cat my "super 'crazy'"file."txt"
```  
# Scoring: File Manager  
## Basic Scope  
- General  
  [x]**+6** Application accepts username and prints proper message  
  [x]**+10** Application exits if user pressed `ctrl+c` or sent `.exit` command and proper message is printed  
- Operations fail  
  [x]**+20** Attempts to perform an operation on a non-existent file or work on a non-existent path result in the operation fail  
  [x]**+10** Operation fail doesn't crash application  
- Navigation & working directory operations implemented properly  
  [x]**+10** Go upper from current directory  
  [x]**+10** Go to dedicated folder from current directory  
  [x]**+20** List all files and folders in current directory  
- Basic operations with files implemented properly  
  [x]**+10** Read file and print it's content in console  
  [x]**+10** Create empty file  
  [x]**+10** Rename file  
  [x]**+10** Copy file  
  [x]**+10** Move file  
  [x]**+10** Delete file  
- Operating system info (prints following information in console) implemented properly  
  [x]**+6** Get EOL (default system End-Of-Line)  
  [x]**+10** Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)  
  [x]**+6** Get home directory  
  [x]**+6** Get current *system user name* (Do not confuse with the username that is set when the application starts)  
  [x]**+6** Get CPU architecture for which Node.js binary has compiled  
- Hash calculation implemented properly  
  [x]**+20** Calculate hash for file   
- Compress and decompress operations  
  [x]**+20** Compress file (using Brotli algorithm)  
  [x]**+20** Decompress file (using Brotli algorithm)  

## Advanced Scope  

[x] **+30** All operations marked as to be implemented using certain streams should be performed using Streams API  
[x] **+20** No synchronous Node.js API with asynchronous analogues is used (e.g. not used `readFileSync` instead of `readFile`)  
[x] **+20** Codebase is written in ESM modules instead of CommonJS  
[x] **+20** Codebase is separated (at least 7 modules)  

# Tested on  
[x]  Linux 5.10.0 + Node.js 20.11.0  
[x]  Wine 8.0.2 + Node.js 20.11.0  
[-]  Windows  