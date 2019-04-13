const AstNode = require('./AstNode');
const Identifier = require('./Identifier');
const ArrayLookup = require('./ArrayLookup');
const DotAccess = require('./DotAccessor')

class Assignment extends AstNode {
    constructor(id, e) {
        super({ id, e })
    }

    evaluate(vm) {
        let { id, e } = this.elements;
        let val = e.evaluate(vm);

        if (id instanceof Identifier) {
            let name = id.ref;
            vm.storeValue(name, val);
        } else if (id instanceof ArrayLookup) {
            let arr = id.arr(vm);
            arr.put(id.index(vm), val);
        } else if (id instanceof DotAccess) {
            let tgt = id.target(vm)
            tgt.put(id.attribute, val);
        } else {
            throw new Error("Assignment expected an id or arr but got", id) 
        }

        return val;
    }
}
module.exports = Assignment;