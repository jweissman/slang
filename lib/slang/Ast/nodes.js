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
}

class ArgList extends AstNode {
  constructor(args) {
    super({ args })
  }
}

class Defun extends AstNode {
  constructor(args, e) {
    super({ args, e })
  }
}

class Program extends AstNode {
  constructor(stmts) {
    super({ stmts })
  }
}

class StringLiteral extends AstNode {
  constructor(text) {
    super({ text })
  }
}

class ArrayLiteral extends AstNode {
  constructor(items) {
    super({ items })
  }
}

class NegatedExpr extends AstNode {
  constructor(e) {
    super({ e })
  }
}

class KeyValuePair extends AstNode {
  constructor(k, v) {
    super({ k, v })
  }
}

class Block extends AstNode {
  constructor(program) {
    super({ program })
  }
}

class Comment extends AstNode {
  constructor(message) {
    super({ message })
  }
}

class LengthLiteral extends AstNode {
  constructor(e) { super({e}) }
}

class Parens extends AstNode {
  constructor(e) { super({e}) }
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
