const std = {
    min: (elems) => Math.min(...elems),
    max: (elems) => Math.max(...elems),
}

class VM {
    // database = {}
    constructor() {
        this.contexts = [{}]
        this.anonymousFunctions = {}
        this.lambdaCount = 0
    }

    get context() {
        // top context
        return this.contexts.slice().pop(); //[this.contexts.length-1];
    }

    hasBuiltin(keyword) { return Object.keys(std).includes(keyword); }

    builtin(keyword) { return std[keyword]; }

    storeValue(key, value) {
        console.log("[slang-vm] store key-value pair", { key, value });
        this.context[key] = value;
    }

    lookupValue(key) {
        const value = this.context[key];
        console.log("[slang-vm] lookup key", { key, value });
        return value || null;
    }

    defineAnonymousFunction(args, expr) {
        const ref = `lambda-${this.lambdaCount++}`
        const lambda = { args, expr };
        this.anonymousFunctions[ref] = lambda;
        return ref;
    }

    callFunction(ref, params) {
        const { args, expr } = this.anonymousFunctions[ref];
        this.contexts.push(Object.assign({ __current_method__: ref }, this.context))
        args.forEach((arg, i) => this.storeValue(arg, params[i]))
        const result = expr.evaluate(this);
        this.contexts.pop()
        console.log("[slang-vm] call function (by ref)", { ref, params, result });
        return result;
    }
}

module.exports = new VM()