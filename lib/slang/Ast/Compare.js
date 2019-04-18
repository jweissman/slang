const AstNode = require('./AstNode')
const { Boolean } = require('../Primitive')
class Compare extends AstNode {
  constructor(op, e1, e2) {
    super({ op, e1, e2 })
  }
  static comparator(op, left, right) {
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
    return result;
  }
  evaluate(vm) {
    let { op, e1, e2 } = this.elements
    let left = e1.evaluate(vm)
    let right = e2.evaluate(vm)
    return new Boolean(Compare.comparator(op, left, right))
  }
}
module.exports = Compare
