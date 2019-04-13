const AstNode = require('./AstNode')
const { Boolean } = require('../Primitive')
class Compare extends AstNode {
  constructor(op, e1, e2) {
    super({ op, e1, e2 })
  }
  evaluate(vm) {
    let { op, e1, e2 } = this.elements
    // debugger;
    let left = e1.evaluate(vm)
    let right = e2.evaluate(vm)
    let value = left.compare(right)
    let result = null
    switch (op) {
      case '>':
        result = value == 1
        break
      case '<':
        result = value < 0
        break
      case '<=':
        result = value <= 0
        break
      case '>=':
        result = value >= 0
        break
      case '==':
        result = value === 0
        break
      default:
        throw new Error(`Compare: implement op: ${op}`)
    }

    return new Boolean(result)
  }
}
module.exports = Compare
