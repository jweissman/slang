const AstNode = require('./AstNode')
const { Hash } = require('../Primitive')

class DotAccessor extends AstNode {
  constructor(t, attr) {
    super({ t, attr })
  }

  target(vm) {
    return this.elements.t.evaluate(vm)
  }

  get attribute() {
    return this.elements.attr.ref
  }

  evaluate(vm) {
    let target = this.target(vm)
    if (target instanceof Hash) {
      return target.get(this.attribute)
    } else {
      throw new Error('can only dot-access hashes')
    }
  }
}

module.exports = DotAccessor
