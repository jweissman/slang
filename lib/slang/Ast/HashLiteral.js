const AstNode = require('./AstNode')

class HashLiteral extends AstNode {
  constructor(kvPairs) { super({ kvPairs }) }
}

module.exports = HashLiteral
