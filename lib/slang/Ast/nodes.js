const AstNode = require('./AstNode')
const Identifier = require('./Identifier')
const BinaryExpression = require('./BinaryExpression')
const FunCall = require('./FunCall')
const Compare = require('./Compare')
const HashLiteral = require('./HashLiteral')
const DotInterpolation = require('./DotInterpolation')
const Ternary = require('./Ternary')
const Assignment = require('./Assignment')
const ArrayLookup = require('./ArrayLookup')
const DotAccessor = require('./DotAccessor')
const Turnstile = require('./Turnstile')

class IntegerLiteral extends AstNode {
  constructor(e) {
    super({ e })
  }
  evaluate(vm) {
    return vm.createInt(Number(this.elements.e))
  }
}

class ArgList extends AstNode {
  constructor(args) {
    super({ args })
  }
  evaluate(vm) {
    return this.elements.args.map(arg => arg.evaluate(vm))
  }
}

class Defun extends AstNode {
  constructor(args, e) {
    super({ args, e })
  }
  evaluate(vm) {
    let { args, e } = this.elements
    let argNames = args.elements.args.map(id => id.ref)
    let fnRef = vm.defineAnonymousFunction(argNames, e)
    return fnRef
  }
}

class Program extends AstNode {
  constructor(stmts) {
    super({ stmts })
  }
  evaluate(vm) {
    let { stmts } = this.elements
    let result = null
    stmts.forEach(stmt => (result = stmt.evaluate(vm)))
    return result
  }
}

class StringLiteral extends AstNode {
  constructor(text) {
    super({ text })
  }
  evaluate(vm) {
    let { text } = this.elements
    return vm.createString(text)
  }
}

class ArrayLiteral extends AstNode {
  constructor(items) {
    super({ items })
  }
  evaluate(vm) {
    let { items } = this.elements
    let arr = vm.createList()
    items.forEach(it => {
      let value = it.evaluate(vm)
      if (it instanceof DotInterpolation) {
        arr.pushAll(value)
      } else {
        arr.push(value)
      }
    })
    return arr
  }
}

class NegatedExpr extends AstNode {
  constructor(e) {
    super({ e })
  }
  evaluate(vm) {
    let { e } = this.elements
    return e.evaluate(vm).negate()
  }
}

class KeyValuePair extends AstNode {
  constructor(k, v) {
    super({ k, v })
  }
  evaluate(vm) {
    let { k, v } = this.elements
    let key = k.ref
    let val = v.evaluate(vm)
    return [key, val]
  }
}

class Block extends AstNode {
  constructor(program) {
    super({ program })
  }
  evaluate(vm) {
    return this.elements.program.evaluate(vm)
  }
}

class Comment extends AstNode {
  constructor(message) {
    super({ message })
  }
  evaluate(_vm) {
    return null
  }
}

class LengthLiteral extends AstNode {
  constructor(e) { super({e}) }
  evaluate(vm) {
    let { e } = this.elements;
    return e.evaluate(vm).length;
  }
}

module.exports = {
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
}
