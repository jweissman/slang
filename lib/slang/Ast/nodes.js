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

  get derive() { return this.elements.e; }
}

class ArgList extends AstNode {
  constructor(args) {
    super({ args })
  }
  
  get derive() {
    return this.elements.args.map(arg => arg.derive).join()
  }
}

class Defun extends AstNode {
  constructor(args, e) {
    super({ args, e })
  }

  get derive() {
    let { args, e } = this.elements;
    return args.derive + " => " + e.derive;
  }
}

class Program extends AstNode {
  constructor(stmts) {
    super({ stmts })
  }
  get derive() {
    return this.elements.stmts.map(stmt => stmt.derive).join("; ") + " [ program ]";
  }
}

class StringLiteral extends AstNode {
  constructor(text) {
    super({ text })
  }

  get derive() { return this.elements.text; }
}

class ArrayLiteral extends AstNode {
  constructor(items) {
    super({ items })
  }

  get derive() {
    return "[" + this.elements.items.map(it => it.derive).join(', ') + "]"
  }
}

class NegatedExpr extends AstNode {
  constructor(e) {
    super({ e })
  }

  get derive() {
    let { e } = this.elements;
    return "-" + e.derive;
  }
}

class KeyValuePair extends AstNode {
  constructor(k, v) {
    super({ k, v })
  }

  get derive() {
    let { k, v } = this.elements;
    return k.derive + ": " + v.derive;
  }
}

class Block extends AstNode {
  constructor(program) {
    super({ program })
  }
  
  get derive() {
    return "{" + this.elements.program.derive + "}"
  }
}

class Comment extends AstNode {
  constructor(message) {
    super({ message })
  }

  get derive() {
    return "[comment]";
  }
}

class LengthLiteral extends AstNode {
  constructor(e) { super({e}) }

  get derive() {
    return "#" + this.elements.e.derive;
  }
}

class Parens extends AstNode {
  constructor(e) { super({e}) }
  get derive() {
    return "(" + this.elements.e.derive + ")";
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
    Parens,
}
