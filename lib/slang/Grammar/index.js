var fs = require('fs');
var ohm = require('ohm-js');
var contents = fs.readFileSync('./lib/slang/Grammar/Slang.ohm');
var grammar = ohm.grammar(contents);
module.exports = grammar;