const { tree } = require("./Semantics");
const vm = require('./VM');

class Slang {
    interpret(str) {
        const program = tree(str);
        if (program) {
            let result;
            result = program.evaluate(vm);
            return result;
        }
    }
}

module.exports = Slang;