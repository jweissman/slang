const { tree } = require('./Semantics')
const { vm, callAsyncFunction } = require('./VM')
const { Primitive, Boolean, Null, Stream, Hash } = require('./Primitive')
const {
    Identifier,
    BinaryExpression,
    FunCall,
    Comment,
    Compare,
    HashLiteral,
    DotInterpolation,
    DotAccessor,
    Defun,
    LengthLiteral,
    Ternary,
    Assignment,
    ArrayLiteral,
    ArrayLookup,
    Program,
    Turnstile,
    Block,
    ArgList,
    IntegerLiteral,
    KeyValuePair,
    StringLiteral,
    NegatedExpr,
} = require('./Ast/nodes')
// const AstNode = require('./Ast/AstNode')

function slangLog(...msgs) { console.debug(...msgs); }

function syncSlangEval(node) {
  let result = slangEval(node)
  return result.next().value
}

function* slangEval(node) {
  let result = null
  if (node instanceof Program) {
    let { stmts } = node.elements
    for (let stmt of stmts) {
      result = yield* slangEval(stmt)
    }
  } 
  else if (node instanceof Identifier) {
    result = vm.lookupValue(node.elements.e)
  }
  else if (node instanceof StringLiteral) {
    result = vm.createString(node.elements.text)
  }
  else if (node instanceof Defun) {
    let { args, e } = node.elements
    let argNames = args.elements.args.map(id => id.ref)
    let fnRef = vm.defineAnonymousFunction(argNames, e)
    result = fnRef
  }
  else if (node instanceof BinaryExpression) {
    let { op, e1, e2 } = node.elements
    let left = syncSlangEval(e1)
    let right = syncSlangEval(e2)
    result = BinaryExpression.compute(op, left, right)
  }
  else if (node instanceof Turnstile) {
    let { tack, e } = node.elements
    slangLog("TURNSTILE", { tack, e })
    if (tack === 'yield') {
      let val = syncSlangEval(e)
      slangLog("yield", val)
      yield val
    } else if (tack == 'stream') {
      let fn = syncSlangEval(e)
      let it = callAsyncFunction(vm, fn, [], slangEval)
      result = new Stream(it)
    } else if (tack == 'derive') {
      let stream = syncSlangEval(e)
      result = stream.nextValue()
      slangLog("derive'd", result)
    } else if (tack == 'bubble') {
      console.warn("BUBBLE BUBBLE")
      // okay, it's a funcall in e, not a lambda
      let funCall = e; //syncSlangEval(e)
      let { fn, args } = funCall.elements; // node.elements
      let fnName = null
      if (fn instanceof Identifier) {
        fnName = fn.elements.e
      } else {
        fnName = syncSlangEval(fn)
      }
      slangLog("would bubble", { fnName })
      let as = syncSlangEval(args)
      if (vm.hasBuiltin(fnName)) {
        throw new Error("can't bubble from builtins")
        // console.error
        // result = vm.builtin(fnName).call(null, as)
      } else if (fnName) {
        let fn = fnName.ctx ? fnName : vm.lookupValue(fnName)
        if (fn.ctx) {
          // debugger;
          let it = callAsyncFunction(vm, fn, [], slangEval)
          let stream = new Stream(it)
          // do forever??
          while(true) {
          let bubbled = stream.nextValue();
          yield bubbled;
          }
        } else {
          throw new Error(`could not find a function ${fnName}`)
        }
      }
    }
  }
  else if (node instanceof ArrayLookup) {
    let { index, arr } = node.elements
    result = syncSlangEval(arr).at(syncSlangEval(index))
  }
  else if (node instanceof DotInterpolation) {
    result = syncSlangEval(node.elements.e)
  }
  else if (node instanceof DotAccessor) {
    let t = syncSlangEval(node.target)
    if (t instanceof Hash) {
      result = t.get(node.attribute)
    } else {
      throw new Error('can only dot-access hashes')
    }
  }
  else if (node instanceof KeyValuePair) {
    let { k, v } = node.elements
    let key = k.ref
    let val = syncSlangEval(v)
    result = [key, val]
  }
  else if (node instanceof HashLiteral) {
    let { kvPairs } = node.elements
    let hash = vm.createHash()
    kvPairs
      .map(p => syncSlangEval(p))
      .forEach(pair => {
        if (pair instanceof DotInterpolation) {
          pair.forEach((k, v) => hash.put(k, v))
        } else if (pair instanceof Hash) {
          pair.forEach(entry => {
            let [k, v] = entry
            hash.put(k, v)
          })
        } else {
          let [key, value] = pair
          hash.put(key, value)
        }
      })
    result = hash
  }
  else if (node instanceof Compare) {
    let { op, e1, e2 } = node.elements
    let left = syncSlangEval(e1)
    let right = syncSlangEval(e2)
    result = new Boolean(Compare.comparator(op, left, right))
  }
  else if (node instanceof FunCall) {
    let { fn, args } = node.elements
    let fnName = null
    if (fn instanceof Identifier) {
      fnName = fn.elements.e
    } else {
      fnName = syncSlangEval(fn)
    }
    let as = syncSlangEval(args)
    if (vm.hasBuiltin(fnName)) {
      result = vm.builtin(fnName).call(null, as)
    } else if (fnName) {
      let ref = fnName.ctx ? fnName : vm.lookupValue(fnName)
      if (ref.ctx) {
        result = vm.callAnonymousFunction(ref, as, syncSlangEval)

        // result = callAsyncFunction(vm, fn, [], slangEval)
      } else {
        // hand back the value for repeated applications
        result = ref
      }
    }
  }
  else if (node instanceof IntegerLiteral) {
    result = vm.createInt(Number(node.elements.e))
  }
  else if (node instanceof LengthLiteral) {
    result = syncSlangEval(node.elements.e).length
  }
  else if (node instanceof Block) {
    result = yield* slangEval(node.elements.program)
  }
  else if (node instanceof Assignment) {
    let { id, e } = node.elements
    result = syncSlangEval(e)
    if (id instanceof Identifier) {
      id.set(result, vm);
    } else if (id instanceof ArrayLookup) {
      let { arr, index } = id.elements
      let list = syncSlangEval(arr)
      list.put(syncSlangEval(index), result)
    } else if (id instanceof DotAccessor) {
      // let { target, attr } = id.elements
      let tgt = syncSlangEval(id.target)
      tgt.put(id.attribute, result)
    } else {
      throw new Error('Assignment expected an id or arr but got', id)
    }
  }
  else if (node instanceof ArrayLiteral) {
    let { items } = node.elements
    result = vm.createList()
    for (let it of items) {
      let value = yield* slangEval(it)
      if (it instanceof DotInterpolation) {
        result.pushAll(value)
      } else {
        result.push(value)
      }
    }
  }
  else if (node instanceof Ternary) {
    const { cond, e1, e2 } = node.elements
    let condition = syncSlangEval(cond)
    if (condition.value == true) {
      result = syncSlangEval(e1);
    } else {
      result = syncSlangEval(e2);
    }
  }
  else if (node instanceof ArgList) {
    result = node.elements.args.map(arg => syncSlangEval(arg))
  }
  else if (node instanceof NegatedExpr) {
    result = syncSlangEval(node.elements.e).negate()
  }
  else if (node instanceof Comment) { }
  else {
    console.error("Slang eval not implemented for node", { node })
    throw new Error(`Slang eval not impl for node`)
  }
  return result
}


class Slang {
  interpret(input) {
    const program = tree(input)
    if (program) {
      let result = null
      slangLog("Slang#interpret", { program })
      result = syncSlangEval(program)
      if (result instanceof Primitive) {
        return result.pretty()
      } else {
        return null
      }
    } else {
      throw new Error('Could not parse program', input)
    }
  }
}

module.exports = Slang
