const std = {
    min: (elems) => Math.min(...elems),
    max: (elems) => Math.max(...elems),
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

    storeValue(key, value) {
        this.debug("[slang-vm] store key-value pair", { key, value });
        this.context[key] = value;
    }

    lookupValue(key) {
        const value = this.context[key];
        this.debug("[slang-vm] lookup key", { key, value });
        return value || null;
    }

    defineAnonymousFunction(args, expr) {
        const lambda = { args, expr, ctx: this.context };
        return lambda;
    }

    callAnonymousFunction(fn, params) {
        this.debug("[slang-vm] call anonymous function", { fn, params })
        const { args, expr, ctx } = fn;
        let context = Object.assign({}, ctx);
        this.contexts.push(Object.assign(context, this.context))
        args.forEach((arg, i) => this.storeValue(arg, params[i]))
        const result = expr.evaluate(this);
        this.contexts.pop()
        this.debug("[slang-vm] called function (by ref)", { fn, params, result });
        return result;
    }
}

module.exports = new VM()