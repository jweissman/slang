const grammar = require('./Grammar')
const semantics = grammar.createSemantics()
const ast = require('./Ast')

semantics.addOperation('ast', ast)

const wrap = str => {
  let match = grammar.match(str)
  if (match.succeeded()) {
    let wrapper = semantics(match)
    return wrapper
  } else {
    throw new Error(`Parse failed: ${match.message}`)
  }
}

const tree = str => wrap(str).ast()

module.exports = {
  tree,
}
