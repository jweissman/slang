const AstNode = require('./AstNode')
class ArrayLookup extends AstNode {
  constructor(arr, index) {
    super({ arr, index })
  }
  // evaluate(vm) {
  //   let val = this.arr(vm).at(this.index(vm))
  //   return val
  // }

  // arr(vm) {
  //   return this.elements.arr.evaluate(vm)
  // }
  // index(vm) {
  //   return this.elements.index.evaluate(vm)
  // }
}
module.exports = ArrayLookup
