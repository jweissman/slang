const AstNode = require('./AstNode')
const Identifier = require('./Identifier')
const ArrayLookup = require('./ArrayLookup')
const DotAccess = require('./DotAccessor')

class Assignment extends AstNode {
  constructor(id, e) {
    super({ id, e })
  }

  get derive() {
    let { id, e } = this.elements;
    return id.derive + "=" + e.derive;
  }
}
module.exports = Assignment
