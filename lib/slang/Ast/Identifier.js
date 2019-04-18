const AstNode = require('./AstNode')
const { Slot, Primitive } = require('../Primitive')

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

  set(newValue, vm) {
    let ref = vm.lookupReference(this.ref);
    if (ref) {
      if (ref instanceof Slot) {
        ref.entity = newValue
      } else {
        throw new Error("will only set values on ids that are pointing to slots!")
      }
    } else {
      vm.storeValue(this.ref, newValue)
    }
  }
}

module.exports = Identifier
