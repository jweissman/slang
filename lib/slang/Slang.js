const { tree } = require("./Semantics");

class Slang {
    interpret(str) {
        const program = tree(str);
        return program.evaluate();
    }
}

module.exports = Slang;