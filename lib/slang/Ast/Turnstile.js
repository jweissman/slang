const AstNode = require("./AstNode")
const co = require('co')

class Turnstile extends AstNode {
  constructor(tack, e) { super({tack, e}) }
}
module.exports = Turnstile