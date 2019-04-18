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
  // each: (elems) => {
  //   let arr = elems[0]
  //   let fn = elems[1]
  //   let len = arr.length.value
  //   for (let i = 0; i < len; i++) {
  //     let elem = arr.at(new Int(i));
  //     vm.callAnonymousFunction(fn, [elem])
  //   }
  //   return new Null()
  // }
}}

//class VMState {
//
//}



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
    this.debug('[slang-vm] store key-value pair', { key, value })
    this.context[key] = new Slot(value)
  }

  lookupValue(key) {
    let ref = this.lookupReference(key)
    if (ref) {
      let value = ref
      if (ref instanceof Slot) {
        value = ref.entity
      }
      this.debug('[slang-vm] lookup key', { key, value })
      return value
    } else {
      throw new Error(`No such variable or method ${key}`)
    }
  }

  defineAnonymousFunction(args, expr) {
    const lambda = new Lambda(args, expr, this.context)
    return lambda
  }

  setCurrentContinuation(cb) {
    this.cb = cb;
  }

  get cc() { return this.cb }
  // yield(val) { this.cc.produce(val) }

  callAnonymousFunction(fn, params, slangEval) {
    this.debug('[slang-vm] call anonymous function', { fn, params })
    const { args, expr, ctx } = fn.value
    let context = Object.assign({}, ctx)
    this.contexts.push(context)
    args.forEach((arg, i) => this.storeValue(arg, params[i]))

    const result = slangEval(expr) //expr.evaluate(this)

    this.contexts.pop()
    this.debug('[slang-vm] called function (by ref)', { fn, params, result })
    return result
  }
}

function *callAsyncFunction( vm, fn, params, slangEval ) {
  // this.debug('[slang-vm] call anonymous function', { fn, params })
    const { args, expr, ctx } = fn.value
    let context = Object.assign({}, ctx)
    vm.contexts.push(context)
    args.forEach((arg, i) => vm.storeValue(arg, params[i]))

    const result = yield *slangEval(expr) //expr.evaluate(this)

    vm.contexts.pop()
    // this.debug('[slang-vm] called function (by ref)', { fn, params, result })
    return result
}

class Command {}

// wrapper around vm that produces commands
class AbstractMachine {

}

module.exports = {
  vm: new VM(),
  Int,
  Hash,
  callAsyncFunction,
}
