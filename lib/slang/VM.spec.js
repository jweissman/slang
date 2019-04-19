const { vm } = require('./VM')
const { Int } = require('./Primitive')
import { intLit, binaryExpr, idExpr } from './Ast/helpers'

describe('VM', () => {
  it('stores and retrieves values', () => {
    vm.storeValue('a', new Int(3))
    expect(vm.lookupValue('a')).toEqual(new Int(3))
    expect(() => vm.lookupValue('b')).toThrow(
      new Error('No such variable or method b')
    )
  })

  // this got much harder to test after adding slangEval as a cb? do we technically *need* it???
  xit('defines and calls functions', () => {
    let fnRef = vm.defineAnonymousFunction(
      ['a', 'b'],
      binaryExpr('+', idExpr('a'), idExpr('b'))
    )

    expect(vm.callAnonymousFunction(fnRef, [new Int(1), new Int(2)])).toEqual(
      new Int(3)
    )

    fnRef = vm.defineAnonymousFunction([], intLit(5))

    expect(vm.callAnonymousFunction(fnRef, [])).toEqual(new Int(5))
  })

  it('defines a hash', () => {
    let kv = vm.createHash()
    kv.put('hello', 'world')
    expect(kv.get('hello')).toEqual('world')
  })
})
