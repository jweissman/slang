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
    debugger;
    // console.log("SET", {thisRef:this.ref,ref,newValue})
    if (ref) {
      if (ref instanceof Primitive) {
        ref.updateValue(newValue)
      } else if (ref instanceof Slot) {
        ref.entity = newValue
      }
    } else {
      vm.storeValue(this.ref, newValue)
      // throw new Error("Expected ref to be a primitive")
    }
  }
}

module.exports = Identifier
