class AstNode {
    constructor(elements) {
        this.elements = elements;
    }
}

class Identifier extends AstNode {
    constructor(e) {
        super({ e });
    }

    get ref() {
        return this.elements.e;
    }

    evaluate(vm) {
        return vm.lookupValue(this.ref);
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
        let fnName = null;
        if (fn instanceof Identifier) {
            fnName = fn.elements.e;
        } else {
            fnName = fn.evaluate(vm)
        }
        let as = args.evaluate(vm);
        let ref = fnName.ctx ? fnName : vm.lookupValue(fnName);
        let result = null;
        if (ref) {
            result = vm.callAnonymousFunction(ref, as);
        } else if (vm.hasBuiltin(fnName)) {
            result = vm.builtin(fnName).call(null,as);
        } else {
            throw new Error(`Unknown function: ${fnName}`);
        }
        return result;
    }
}

class Assignment extends AstNode {
    constructor(id, e) {
        super({ id, e })
    }

    evaluate(vm) {
        let { id, e } = this.elements;
        let name = id.ref;
        let val = e.evaluate(vm);
        vm.storeValue(name, val);
        return name;
    }
}

class Defun extends AstNode {
    constructor(args, e) {
        super({ args, e })
    }
    evaluate(vm) {
        let { args, e } = this.elements;
        let argNames = args.elements.args.map(id => id.ref);
        let fnRef = vm.defineAnonymousFunction(argNames, e);
        return fnRef;
    }
}

class Program extends AstNode {
    constructor(stmts) { super({stmts}) }
    evaluate(vm) { 
        let { stmts } = this.elements;
        let result = null;
        stmts.forEach(stmt => result = stmt.evaluate(vm));
        return result;
    }
}

class StringLiteral extends AstNode {
    constructor(text) { super({text}) }
    evaluate(vm) {
        let { text } = this.elements;
        return text;
    }
}

const intLit = (v) => new IntegerLiteral(v);
const binaryExpr = (op, e1, e2) => new BinaryExpression(op, e1, e2);
const funCall = (id, args=new ArgList([])) => new FunCall(id, args);
const idExpr = (s) => new Identifier(s);
const argList = (args) => new ArgList(args);
const assignment = (id, e) => new Assignment(id, e);
const defun = (args, e) => new Defun(args, e);
const program = (...stmts) => new Program(stmts);
const strLit = (txt) => new StringLiteral(txt);

var ast = {
    Program(stmt, _ibr, stmts) {
        return program(
            stmt.ast(),
            ...(stmts.ast()),
        );
    },
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
    Funcall(id, as) {
        let name = id.ast()
        let args = as.ast();
        return funCall(name, args);
    },
    Arglist(_lp, as, _commas, a, _rp) {
        let args = as.ast()
        let lastArg = a.ast()
        return argList([...args, ...lastArg]);
    },
    Assignment(id, _eq, e) {
        return assignment(id.ast(), e.ast());
    },
    Defun(args, _arrow, e) {
        return defun(args.ast(), e.ast());
    },
    StrLit(_lq, chars, _rq) {
        return strLit(chars.sourceString);
    }
}

module.exports = {
    ast,
    intLit,
    binaryExpr,
    funCall,
    argList,
    idExpr,
    assignment,
    defun,
    program,
    strLit,
};