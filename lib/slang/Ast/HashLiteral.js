const AstNode = require('./AstNode')

class HashLiteral extends AstNode {
  constructor(kvPairs) { super({ kvPairs }) }
  get derive() {
    let { kvPairs } = this.elements;
    return "{" + kvPairs.map(p => p.derive).join(",") + "}";
  }
}

module.exports = HashLiteral
