const AstNode = require('./AstNode')
class Ternary extends AstNode {
    constructor(cond, e1, e2) { super({ cond, e1, e2 }) }
    evaluate(vm) { 
        const { cond, e1, e2 } = this.elements;
        let result = cond.evaluate(vm)
        // console.log("Ternary#eval", { cond, result })
        if (result.value == true) {
            return e1.evaluate(vm);
        } else {
            return e2.evaluate(vm);
        }

    }
}
module.exports = Ternary