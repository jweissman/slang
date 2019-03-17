#!/usr/bin/env node

const Slang = require('../lib/slang');
console.log("Welcome to Slang!");
const slang = new Slang();

const repl = require('repl');
repl.start({
    eval: (input, _ctx, _filename, cb) => {
        const out = slang.interpret(input);
        cb(null, out);
    }
})
