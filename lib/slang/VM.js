const { Int, Hash, String, List, Lambda, Null, } = require('./Primitive');

const std = {
    min: (elems) => new Int(Math.min(...(elems.map(e => e.value)))),
    max: (elems) => new Int(Math.max(...(elems.map(e => e.value)))),
    p: (elems) => {
        console.log(...elems.map(e => e.pretty()));
        return new Null();
    },
}

class VM {
    constructor() {
        this.contexts = [{}]
        this.debugging = false;
    }

    debug(...args) {
        if (this.debugging) {
            console.log(...args);
        }
    }

    get context() {
        return this.contexts.slice().pop();
    }

    hasBuiltin(keyword) { return Object.keys(std).includes(keyword); }

    builtin(keyword) { return std[keyword]; }

    createInt(value) { return new Int(value); }
    createString(text) { return new String(text); }
    createList(elems) { return new List(elems); }
    createHash() { return new Hash(); }

    storeValue(key, value) {
        this.debug("[slang-vm] store key-value pair", { key, value });
        this.context[key] = value;
    }

    lookupValue(key) {
        if (Object.keys(this.context).includes(key)) {
            const value = this.context[key];
            this.debug("[slang-vm] lookup key", { key, value });
            return value;
        } else {
            throw new Error(`No such variable or method ${key}`)
        }
    }

    defineAnonymousFunction(args, expr) {
        const lambda = new Lambda( args, expr, this.context );
        return lambda;
    }

    callAnonymousFunction(fn, params) {
        this.debug("[slang-vm] call anonymous function", { fn, params })
        const { args, expr, ctx } = fn.value;
        let context = Object.assign({}, ctx);
        this.contexts.push(Object.assign({}, context))
        args.forEach((arg, i) => this.storeValue(arg, params[i]))
        const result = expr.evaluate(this);
        this.contexts.pop()
        this.debug("[slang-vm] called function (by ref)", { fn, params, result });
        return result;
    }

}

module.exports = {
    vm: new VM(),
    Int,
    Hash,
}