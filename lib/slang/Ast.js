
class AstNode {
    constructor(elements) {
        this.elements = elements;
    }
}

class Identifier extends AstNode {
    constructor(e) {
        super({ e });
    }

    evaluate() {
        throw new Error("Identifier#evaluate not implemented!");
    }
}

class IntegerLiteral extends AstNode {
    constructor(e) {
        super({ e });
    }

    evaluate() {
        return Number(this.elements.e);
    }
}

class BinaryExpression extends AstNode {
    constructor(op, e1, e2) {
        super({
            op,
            e1,
            e2
        });
    }

    evaluate(vm) {
        let {
            op,
            e1,
            e2
        } = this.elements;
        let left = e1.evaluate(vm);
        let right = e2.evaluate(vm);
        switch (op) {
            case '+':
                return left + right;
            case '-':
                return left - right;
            case '*':
                return left * right;
            case '/':
                return left / right;
            case '^':
                return left ** right;
            default:
                throw new Error(`BinaryExpression#evaluate: Implement binary operation: ${op}`)
        }
    }
}

class ArgList extends AstNode {
    constructor(args) { super({args}); }
    evaluate(vm) { 
        return this.elements.args.map(arg => arg.evaluate(vm));
    }
}

class FunCall extends AstNode {
    constructor(fn, args) {
        super({
            fn,
            args
        })
    }

    evaluate(vm) {
        let { fn, args } = this.elements;
        let fnName = fn.elements.e;
        let as = args.evaluate(vm);
        if (vm.hasBuiltin(fnName)) {
            return vm.builtin(fnName).call(null,as);
        } else {
            throw new Error(`Unknown function: ${fnName}`);
        }
    }
}

const intLit = (v) => new IntegerLiteral(v);
const binaryExpr = (op, e1, e2) => new BinaryExpression(op, e1, e2);
const funCall = (id, args=new ArgList([])) => new FunCall(id, args);
const idExpr = (s) => new Identifier(s);
const argList = (args) => new ArgList(args);

var ast = {
    ident(_,_e) {
        return idExpr(this.sourceString)
    },
    number(_) {
        return intLit(this.sourceString)
    },
    AddExp_plus(e1, op, e2) {
        return binaryExpr('+', e1.ast(), e2.ast())
    },
    AddExp_minus(e1, op, e2) {
        return binaryExpr('-', e1.ast(), e2.ast())
    },
    MulExp_times(e1, op, e2) {
        return binaryExpr('*', e1.ast(), e2.ast())
    },
    MulExp_divide(e1, op, e2) {
        return binaryExpr('/', e1.ast(), e2.ast())
    },
    ExpExp_power(e1, op, e2) {
        return binaryExpr('^', e1.ast(), e2.ast())
    },
    PriExp_paren(_lprn, e, _rprn) {
        return e.ast();
    },
    Funcall(id, _lprn, as, _rprn) {
        let name = id.ast()
        let args = as.ast();
        return funCall(name, args[0]);
    },
    Arglist(as, _commas) {
        let args = as.ast()
        return argList(args);
    },
}

module.exports = {
    ast,
    intLit,
    binaryExpr,
    funCall,
    argList,
    idExpr,
};