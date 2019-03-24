class Primitive {}

class Null extends Primitive {
    constructor() { super(); }
    pretty() { return '(void)'}
}

class Int extends Primitive {
    constructor(value) { super(); this.value = value }
    pretty() { return this.value; }
    add(other) { return new Int(this.value + other.value); }
    sub(other) { return new Int(this.value - other.value); }
    times(other) { return new Int(this.value * other.value); }
    div(other) { return new Int(this.value / other.value); }
    exp(other) { return new Int(this.value ** other.value); }
    negate() { return new Int(-this.value); }
}

class String extends Primitive {
    constructor(text) { super(); this.text = text; }
    pretty() { return this.text; }
}

class Lambda extends Primitive {
    constructor(args, expr, ctx) {
        super()
        this.args = args;
        this.expr = expr;
        this.ctx = ctx;
    }

    pretty() { return "lambda"; }
}

class List extends Primitive {
    constructor(elems=[]) { super(); this.elems = elems; }
    pretty() { return "[" + this.elems.map(e => e.pretty()).join(", ") + "]"; }
    at(index) { return this.elems[index.value] || new Null(); }
    put(index, value) { this.elems[index.value] = value; return true; }
    push(value) { this.elems.push(value); }
    pushAll(values) { values.forEach(val => this.push(val)); } 
    forEach(f) { this.elems.forEach(f); }
}

class Hash extends Primitive {
    constructor() {
        super()
        this.data = {}
    }
    put(k,v) { this.data[k] = v }
    get(v) { return this.data[v] }
    pretty() {
        return "{" +
          Object
            .keys(this.data)
            .map(k => `${k}: ${this.get(k).pretty()}`)
            .join(",")
        + "}";
    }
}

module.exports = {
    Int,
    Hash,
    List,
    Lambda,
    String,
    Null,
}