class Slot {
  constructor(entity) { this.entity = entity; }
}

class Primitive {
  constructor(value) {
    this.value = value
  }
}

class Null extends Primitive {
  constructor() {
    super(null)
  }
  pretty() {
    return '(void)'
  }
}

class Int extends Primitive {
  get val() {
    return this.value
  }
  pretty() {
    return "" + (this.value)
  }
  add(other) {
    return new Int(this.value + other.value)
  }
  sub(other) {
    return new Int(this.value - other.value)
  }
  times(other) {
    return new Int(this.value * other.value)
  }
  div(other) {
    return new Int(this.value / other.value)
  }
  exp(other) {
    return new Int(this.value ** other.value)
  }
  negate() {
    return new Int(-this.value)
  }
  compare(other) {
    let res = -1
    if (this.value === other.value) {
      res = 0
    } else if (this.value > other.value) {
      res = 1
    }
    return res
  }
}

class String extends Primitive {
  get text() {
    return this.value
  }
  pretty() {
    return this.text
  }
  add(other) {
    return new String(this.text + other.text)
  }
  get length() {
    return new Int(this.text.length)
  }
}

class Lambda extends Primitive {
  constructor(args, expr, ctx) {
    super({ args, expr, ctx })
  }

  get args() {
    return this.value.args
  }
  get expr() {
    return this.value.expr
  }
  get ctx() {
    return this.value.ctx
  }

  pretty() {
    return [
      this.value.args.join(', '),
      '=>',
      this.value.expr.derive
    ].join('')
  }
}

class List extends Primitive {
  constructor(elems = []) {
    super(elems)
  }
  get elems() {
    return this.value
  }
  pretty() {
    // console.log("pretty list", { elements: this.elems })
    return '[' + this.elems.map(e => (e && e.pretty) ? e.pretty() : '??').join(', ') + ']'
  }
  at(index) {
    return this.elems[index.value]; // || new Null()
  }
  put(index, value) {
    this.elems[index.value] = value
    return true
  }
  shift() {
    return this.elems.shift()
  }
  // pop() {
    // return this.elems.pop()
  // }
  push(value) {
    this.elems.push(value)
  }
  pushAll(values) {
    values.forEach(val => this.push(val))
  }
  forEach(f) {
    this.elems.forEach(f)
  }
  get length() {
    let len = this.elems.length
    let result = new Int(len)
    return result;
  }
  
  rest() {
    let [_first, ...rest]=this.elems;
    return new List(rest);
  }
}

class Hash extends Primitive {
  constructor(elems={}) {
    super(elems)
  }

  get data() {
    return this.value
  }
  put(k, v) {
    this.data[k] = v
  }
  get(v) {
    return this.data[v]
  }
  pretty() {
    return (
      '{' +
      Object.keys(this.data)
        .map(k => `${k}: ${this.get(k).pretty()}`)
        .join(',') +
      '}'
    )
  }
  forEach(f) {
    Object.entries(this.data).forEach(f)
  }
}

class Boolean extends Primitive {
  constructor(val) { super(val) }
  pretty() {
    return (!!(this.value)) ? 'True' : 'False'
  }
}

class Stream extends Primitive {
  constructor(generator) {
    super(generator); 
    this.exhausted = false
    this.last = null
    this.times = 0
  }

  get generator() { return this.value }
  pretty() {
    return `[generator:${this.exhausted?'exhausted':'active'}; last: ${this.last && this.last.pretty()}; times: ${this.times}]`;
  }
  nextValue() {
    this.times += 1
    let it = this.generator;
    let state = it.next();
    if (state.done) {
      this.exhausted = true
    }
    let value = state.value
    // console.log("A stream value was extracted", value)
    this.last = value
    return value;
  }
}

module.exports = {
  Slot,

  Int,
  Hash,
  List,
  Lambda,
  String,
  Null,
  Boolean,
  Primitive,
  Stream,
}
