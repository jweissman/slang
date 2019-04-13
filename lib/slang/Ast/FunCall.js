const AstNode = require('./AstNode')
const Identifier = require('./Identifier')
class FunCall extends AstNode {
    constructor(fn, args) {
        super({
            fn,
            args
        })
    }

    evaluate(vm) {
        let { fn, args } = this.elements;
        let fnName = null;
        if (fn instanceof Identifier) {
            fnName = fn.elements.e;
        } else {
            fnName = fn.evaluate(vm)
        }
        let as = args.evaluate(vm);
        let result = null;
        if (vm.hasBuiltin(fnName)) {
            result = vm.builtin(fnName).call(null,as);
        } else if (fnName) {
            let ref = fnName.ctx ? fnName : vm.lookupValue(fnName);
            if (ref.ctx) {
                result = vm.callAnonymousFunction(ref, as);
            } else {
                // hand back the value for repeated applications
                result = ref;
            }
        }
        return result;
    }
}

module.exports = FunCall;