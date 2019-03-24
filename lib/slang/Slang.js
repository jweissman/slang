const { tree } = require("./Semantics");
const vm = require('./VM');

class Slang {
    interpret(input) {
        const program = tree(input);
        if (program) {
            let result = null;
            result = program.evaluate(vm);
            return result;
        } else {
            throw new Error("Could not parse program", input)
        }
    }
}

module.exports = Slang;