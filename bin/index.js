#!/usr/bin/env node

const Slang = require('../lib/slang');
console.log("Welcome to Slang!");
const logo = `

 ______     __         ______     __   __     ______    
/\\  ___\\   /\\ \\       /\\  __ \\   /\\ "-.\\ \\   /\\  ___\\   
\\ \\___  \\  \\ \\ \\____  \\ \\  __ \\  \\ \\ \\-.  \\  \\ \\ \\__ \\  
 \\/\\_____\\  \\ \\_____\\  \\ \\_\\ \\_\\  \\ \\_\\\\"\\_\\  \\ \\_____\\ 
  \\/_____/   \\/_____/   \\/_/\\/_/   \\/_/ \\/_/   \\/_____/ 
                                                        

`;
console.log(logo);
const slang = new Slang();

const repl = require('repl');
repl.start({
    eval: (input, _ctx, _filename, cb) => {
        const out = slang.interpret(input);
        cb(null, out);
    }
})
