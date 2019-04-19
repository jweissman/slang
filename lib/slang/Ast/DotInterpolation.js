const AstNode = require('./AstNode')
class DotInterpolation extends AstNode {
  constructor(e) {
    super({ e })
  }
  // evaluate(vm) {
  //   return this.elements.e.evaluate(vm)
  // }
}
module.exports = DotInterpolation
