const AstNode = require('./AstNode')
const { Hash } = require('../Primitive')

class DotAccessor extends AstNode {
  constructor(target, attr) {
    super({ target, attr })
  }

  get target() { 
    return this.elements.target
  }

  get attribute() {
    return this.elements.attr.ref
  }

  get derive() {
    return this.target.derive + "." + this.attribute.derive;
  }
}

module.exports = DotAccessor
