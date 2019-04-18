const AstNode = require('./AstNode')
class BinaryExpression extends AstNode {
  constructor(op, e1, e2) {
    super({
      op,
      e1,
      e2,
    })
  }

  static compute(op, left, right) {
    switch (op) {
      case '+':
        return left.add(right)
      case '-':
        return left.sub(right)
      case '*':
        return left.times(right)
      case '/':
        return left.div(right)
      case '^':
        return left.exp(right)
      default:
        throw new Error(
          `BinaryExpression#evaluate: Implement binary operation: ${op}`
        )
    }

  }

  evaluate(vm) {
    let { op, e1, e2 } = this.elements
    let left = e1.evaluate(vm)
    let right = e2.evaluate(vm)

    return BinaryExpression.compute(op, left, right)
      }
}

module.exports = BinaryExpression
