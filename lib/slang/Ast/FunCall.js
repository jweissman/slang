const AstNode = require('./AstNode')
class FunCall extends AstNode {
  constructor(fn, args) {
    super({
      fn,
      args,
    })
  }
}

module.exports = FunCall
