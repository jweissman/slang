const AstNode = require("./AstNode")
const co = require('co')

class Turnstile extends AstNode {
  constructor(tack, e) { super({tack, e}) }
  // get kind() { return 'turnstile' }
  //evaluate(vm, ccCb) {
  //  let { tack, e } = this.elements;
  //  //console.log("TURNSTILE", { tack })
  //  if (tack === 'yield') { //rt |-
  //    let yieldVal = e.evaluate(vm)
  //    console.log("YIELDING", { e, yieldVal })
  //    yield 
  //    // we need to return a callback that continues from the current
  //    // point -- this seems like 'callcc'-ish, it does seem like we want a co
  //    // okay, so -- a coroutine that yields the thing and then continues the calc
  //    // i think the deriver has to build it, and we return just the value here
  //    // but we also have to pipe it into the vm somehow...
  //    //return co(function*() {
  //    //})

  //    // debugger;
  //    // vm.cc(yieldVal)

  //  } else if (tack === 'derive') { // lt -|
  //      console.log("DERIVING", { e })
  //      let fn = e.evaluate(vm);
  //      let genVal;
  //      vm.setCurrentContinuation((v) => {
  //         genVal = v
  //         console.log("CC!!", { v });
  //      })
  //      genVal = vm.callAnonymousFunction(fn, [])
  //      // debugger;
  //      return genVal;
  //  }

  //  return null;
  //}
}
module.exports = Turnstile