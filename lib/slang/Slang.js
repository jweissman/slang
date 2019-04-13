const { tree } = require('./Semantics')
const { vm } = require('./VM')
const { Primitive } = require('./Primitive')

class Slang {
  interpret(input) {
    const program = tree(input)
    if (program) {
      let result = null
      result = program.evaluate(vm)
      if (result instanceof Primitive) {
        return result.pretty()
      } else {
        return null
      }
    } else {
      throw new Error('Could not parse program', input)
    }
  }
}

module.exports = Slang
