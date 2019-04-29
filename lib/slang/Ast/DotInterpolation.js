const AstNode = require('./AstNode')
class DotInterpolation extends AstNode {
  constructor(e) {
    super({ e })
  }
  get derive() {
    return "..." + this.elements.e.derive;
  }
}
module.exports = DotInterpolation
