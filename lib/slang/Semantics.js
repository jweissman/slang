const grammar = require('./Grammar')
const semantics = grammar.createSemantics()
const ast = require('./Ast')

semantics.addOperation('ast', ast)
// semantics.addOperation('derive', {
//   Program: (stmts, _) => stmts.map(stmt => stmt.derive()).join(";\n"),

// })

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
// const derive = str => wrap

module.exports = {
  tree,
}
