const AstNode = require('./AstNode')

class Identifier extends AstNode {
  constructor(e) {
    super({ e })
  }

  get ref() {
    return this.elements.e
  }

  evaluate(vm) {
    return vm.lookupValue(this.ref)
  }
}

module.exports = Identifier
