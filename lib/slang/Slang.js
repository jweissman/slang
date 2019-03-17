const { tree } = require("./Semantics");
const vm = require('./VM');

class Slang {
    interpret(str) {
        const program = tree(str);
        let result;
        program.forEach(statement => {
            result = statement.evaluate(vm)
        });
        return result;
    }
}

module.exports = Slang;