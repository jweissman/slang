const { tree } = require("./Semantics");

const std = {
    max: (elems) => {
        let res = elems.slice().sort((a,b) => a+b)[0]
        return res;
    },
    min: (elems) => {
        let res = elems.slice().sort((a,b) => a-b)[0]
        return res;
    },
}

class VM {
    hasBuiltin(keyword) { return Object.keys(std).includes(keyword); }
    builtin(keyword) { return std[keyword]; }
    // assignValue(identifier, value)
    // retrieveValue ...
    // defineUserFunction name args block ...
}

class Slang {
    interpret(str) {
        const program = tree(str);
        const vm = new VM();
        return program.evaluate(vm);
    }
}

module.exports = Slang;