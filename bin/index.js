#!/usr/bin/env node

const Slang = require('../lib/slang');
const slang = new Slang();

const args = process.argv.slice(2);
if (args.length === 0) {
    const logo = `

 ______     __         ______     __   __     ______    
/\\  ___\\   /\\ \\       /\\  __ \\   /\\ "-.\\ \\   /\\  ___\\   
\\ \\___  \\  \\ \\ \\____  \\ \\  __ \\  \\ \\ \\-.  \\  \\ \\ \\__ \\  
 \\/\\_____\\  \\ \\_____\\  \\ \\_\\ \\_\\  \\ \\_\\\\"\\_\\  \\ \\_____\\ 
  \\/_____/   \\/_____/   \\/_/\\/_/   \\/_/ \\/_/   \\/_____/ 
                                                        

`;
    console.log(logo);
    console.log("Welcome to (Interactive) Slang!");

    const repl = require('repl');
    repl.start({
        prompt: "is> ",
        eval: (input, _ctx, _filename, cb) => {
            const out = slang.interpret(input);
            cb(null, out);
        }
    })

} else {
    const fs = require('fs');
    const contents = fs.readFileSync(args[0]).toString();
    const result = slang.interpret(contents);
    // console.debug(result);
}