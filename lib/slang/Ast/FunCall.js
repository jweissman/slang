const AstNode = require('./AstNode')
class FunCall extends AstNode {
  constructor(fn, args) {
    super({
      fn,
      args,
    })
  }

  get derive() {
    let { fn, args } = this.elements;
    return fn.derive + "(" + args.derive + ")";
  }
}

module.exports = FunCall
