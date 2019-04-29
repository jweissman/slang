const AstNode = require('./AstNode')

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

  get derive() {
    let { op, e1, e2 } = this.elements;
    return e1.derive + op + e2.derive;
  }
}
module.exports = Compare
