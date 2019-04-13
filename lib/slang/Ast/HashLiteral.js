const AstNode = require('./AstNode');
const DotInterpolation = require('./DotInterpolation')
const { Hash } = require('../Primitive')

class HashLiteral extends AstNode {
    constructor(kvPairs) { super({ kvPairs })}
    evaluate(vm) {
        let { kvPairs } = this.elements
        let hash = vm.createHash()
        kvPairs.map(p => p.evaluate(vm)).forEach(pair => {
            if (pair instanceof DotInterpolation) {
                pair.forEach((k,v) => hash.put(k,v))
            } else if (pair instanceof Hash) {
                pair.forEach(entry =>  {
                    let [k, v] = entry
                    hash.put(k, v)
                })
            } else {
                let [key, value]=pair;
                hash.put(key, value);
            }
        })
        return hash;
    }
}

module.exports = HashLiteral;