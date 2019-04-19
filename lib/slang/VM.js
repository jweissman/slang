const { Slot, Int, Hash, String, List, Lambda, Null } = require('./Primitive')
const co = require('co')

const std = function(vm) {
  return {
  min: elems => new Int(Math.min(...elems.map(e => e.value))),
  max: elems => new Int(Math.max(...elems.map(e => e.value))),
  p: elems => {
    console.log(...elems.map(e => e.pretty()))
    return new Null()
  },
  iota: n => {
    let arr = []
    let max = n[0].value
    for (let i = 0; i < max; i++) {
      arr.push(new Int(i))
    }
    let res = new List(arr)
    return res
  },
  // note: implementing each here directly is disallowed here b/c it breaks encapsulation of slang eval!!!
  
}}

class VM {
  constructor() {
    this.contexts = [{}]
    this.debugging = false
    this.std = std(this)
  }

  debug(...args) {
    if (this.debugging) {
      console.log(...args)
    }
  }

  get context() {
    return this.contexts.slice().pop()
  }

  hasBuiltin(keyword) {
    return Object.keys(this.std).includes(keyword)
  }

  builtin(keyword) {
    return this.std[keyword]
  }

  createInt(value) {
    return new Int(value)
  }
  createString(text) {
    return new String(text)
  }
  createList(elems) {
    return new List(elems)
  }
  createHash() {
    return new Hash()
  }

  lookupReference(needle) {
    let hasRef = Object.keys(this.context).includes(needle)
    if (hasRef) { return this.context[needle]}
    return null;
  }

  storeValue(key, value) {
    this.context[key] = new Slot(value)
  }

  lookupValue(key) {
    let ref = this.lookupReference(key)
    if (ref) {
      let value = ref
      if (ref instanceof Slot) {
        value = ref.entity
      }
      return value
    } else {
      throw new Error(`No such variable or method ${key}`)
    }
  }

  defineAnonymousFunction(args, expr) {
    const lambda = new Lambda(args, expr, this.context)
    return lambda
  }

  callAnonymousFunction(fn, params, slangEval) {
    const { args, expr, ctx } = fn.value
    this._pushContext(ctx);
    args.forEach((arg, i) => this.storeValue(arg, params[i]))
    const result = slangEval(expr)
    this._popContext()
    return result
  }

  _pushContext(ctx) {
    let context = Object.assign({}, ctx)
    let current = Object.assign({}, this.context)
    let melded = Object.assign(current, context)
    this.contexts.push(melded)
  }

  _popContext() { this.contexts.pop() }
}

function *callAsyncFunction( vm, fn, params, slangEval ) {
    const { args, expr, ctx } = fn.value
    vm._pushContext(ctx);
    args.forEach((arg, i) => vm.storeValue(arg, params[i]))
    const result = yield *slangEval(expr)
    vm._popContext()
    return result
}

module.exports = {
  vm: new VM(),
  Int,
  Hash,
  callAsyncFunction,
}
