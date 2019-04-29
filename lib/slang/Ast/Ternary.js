const AstNode = require('./AstNode')
class Ternary extends AstNode {
  constructor(cond, e1, e2) {
    super({ cond, e1, e2 })
  }
  get derive() {
    let { cond, e1, e2 } = this.elements;
    return [cond.derive,"?",e1.derive,":",e2.derive].join(" ");
  }
}
module.exports = Ternary
