const AstNode = require("./AstNode")
const co = require('co')

class Turnstile extends AstNode {
  constructor(tack, e) { super({tack, e}) }
  get derive() {
    let { e, tack } = this.elements;
    return tack + ' ' + e.derive;
  }
}
module.exports = Turnstile