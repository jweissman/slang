class Slot {
  constructor(entity) { this.entity = entity; }
}

class Primitive {
  constructor(value) {
    this.value = value
  }
  updateValue(val) {
    console.log("SET", { value: this.value, val })
    if (val instanceof Primitive) {
      // what if we aren't the same KIND of primitive??
      this.value = val.value
    } else {
      throw new Error("Will not take a value from non-primitive...")
      //this.value = val
    }
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
    return this.value
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
    return 'lambda'
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
    // console.log({ elements: this.elems })
    return '[' + this.elems.map(e => e.pretty()).join(', ') + ']'
  }
  at(index) {
    return this.elems[index.value]; // || new Null()
  }
  put(index, value) {
    this.elems[index.value] = value
    return true
  }
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
    return new Int(this.elems.length);
  }
}

class Hash extends Primitive {
  constructor() {
    super({})
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
  constructor(val) {
    super(!!val)
  }
  pretty() {
    return this.value ? 'True' : 'False'
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
}
