const std = {
    min: (elems) => Math.min(...elems),
    max: (elems) => Math.max(...elems),
}

class VM {
    // database = {}
    constructor() {
        this.database = {}
    }
    hasBuiltin(keyword) { return Object.keys(std).includes(keyword); }
    builtin(keyword) { return std[keyword]; }
    storeValue(key, value) {
        this.database[key] = value;
    }
    lookupValue(key) {
        return this.database[key] || null;
    }
}

module.exports = new VM()