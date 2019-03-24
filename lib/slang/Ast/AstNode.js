class AstNode {
    constructor(elements) {
        this.elements = elements;
    }

    // get elements() { return this.elements }
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

    evaluate(vm) {
        return vm.createInt(Number(this.elements.e));
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
                return left.add(right);
            case '-':
                return left.sub(right);
            case '*':
                return left.times(right);
            case '/':
                return left.div(right);
            case '^':
                return left.exp(right);
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
        let result = null;
        if (vm.hasBuiltin(fnName)) {
            result = vm.builtin(fnName).call(null,as);
        } else if (fnName) {
            let ref = fnName.ctx ? fnName : vm.lookupValue(fnName);
            result = vm.callAnonymousFunction(ref, as);
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
        let val = e.evaluate(vm);

        if (id instanceof Identifier) {
            let name = id.ref;
            vm.storeValue(name, val);
        } else if (id instanceof ArrayLookup) {
            let arr = id.arr(vm);
            arr.put(id.index(vm), val);
        } else {
            throw new Error("Assignment expected an id or arr but got", id) 
        }

        return val;
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
        return vm.createString(text);
    }
}

class ArrayLiteral extends AstNode {
    constructor(items) { super({items}); }
    evaluate(vm) {
        let { items } = this.elements;
        return vm.createList(items.map(it => it.evaluate(vm)));
    }
}

class ArrayLookup extends AstNode {
    constructor(arr, index) { super({arr, index}); }
    evaluate(vm) {
        let val =this.arr(vm).at(this.index(vm));
        return val;
    }

    arr(vm) { return this.elements.arr.evaluate(vm); }
    index(vm) { return this.elements.index.evaluate(vm); }
}

const intLit = (v) => new IntegerLiteral(v);
const binaryExpr = (op, e1, e2) => new BinaryExpression(op, e1, e2);
const funCall = (id, args=new ArgList([])) => new FunCall(id, args);
const idExpr = (s) => new Identifier(s);
const argList = (args) => new ArgList(args);
const assignment = (id, e) => new Assignment(id, e);
const defun = (args, e) => new Defun(args, e);
const program = (stmts) => new Program(stmts);
const strLit = (txt) => new StringLiteral(txt);
const arrLit = (elems) => new ArrayLiteral(elems);
const arrLookup = (arr, index) => new ArrayLookup(arr, index);

module.exports = {
    intLit,
    binaryExpr,
    funCall,
    argList,
    idExpr,
    assignment,
    defun,
    program,
    strLit,
    arrLit,
    arrLookup,
};