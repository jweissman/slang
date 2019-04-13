const { Hash } = require('../VM');
const AstNode = require('./AstNode');
const Identifier = require('./Identifier');
const BinaryExpression = require('./BinaryExpression');
const FunCall = require('./FunCall')
const Compare = require('./Compare')
const HashLiteral = require('./HashLiteral')
const DotInterpolation = require('./DotInterpolation')
const Ternary = require('./Ternary')

class IntegerLiteral extends AstNode {
    constructor(e) {
        super({ e });
    }

    evaluate(vm) {
        return vm.createInt(Number(this.elements.e));
    }
}



class ArgList extends AstNode {
    constructor(args) { super({args}); }
    evaluate(vm) { 
        return this.elements.args.map(arg => arg.evaluate(vm));
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
        let arr = vm.createList();
        items.forEach(it => {
            let value = it.evaluate(vm);
            if (it instanceof DotInterpolation) {
                arr.pushAll(value);
            } else {
                arr.push(value);
            }
        })
        return arr;
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


class NegatedExpr extends AstNode {
    constructor(e) { super({e}) }
    evaluate(vm) {
        let { e } = this.elements;
        return e.evaluate(vm).negate();
    }
}



class KeyValuePair extends AstNode {
    constructor(k,v) { super({ k, v })}
    evaluate(vm) {
        let { k, v } = this.elements;
        let key = k.ref;
        let val = v.evaluate(vm);
        return [key,val];
    }
}

class DotAccessor extends AstNode {
    constructor(t,attr) { super({ t, attr }) }
    evaluate(vm) {
        let { t, attr } = this.elements;
        let target = t.evaluate(vm);
        let attribute = attr.ref;
        if (target instanceof Hash) {
            return target.get(attribute)
        } else {
            throw new Error("can only dot-access hashes")
        }
    }
}

class Block extends AstNode {
    constructor(program) { super({ program }); }
    evaluate(vm) {
        return this.elements.program.evaluate(vm);
    }
}

class Comment extends AstNode {
    constructor(message) { super({ message }); }
    evaluate(_vm) {
        return null;
    }
}


const helpers = {
  intLit: (v) => new IntegerLiteral(v),
  binaryExpr: (op, e1, e2) => new BinaryExpression(op, e1, e2),
  funCall: (id, args = new ArgList([])) => new FunCall(id, args),
  idExpr: (s) => new Identifier(s),
  argList: (args) => new ArgList(args),
  assignment: (id, e) => new Assignment(id, e),
  defun: (args, e) => new Defun(args, e),
  program: (stmts) => new Program(stmts),
  strLit: (txt) => new StringLiteral(txt),
  arrLit: (elems) => new ArrayLiteral(elems),
  arrLookup: (arr, index) => new ArrayLookup(arr, index),
  ellipsis: (e) => new DotInterpolation(e),
  negated: (e) => new NegatedExpr(e),
  hshLit: (pairs) => new HashLiteral(pairs),
  kvPair: (k,v) => new KeyValuePair(k,v),
  dotAccess: (t,a) => new DotAccessor(t,a),
  block: (p) => new Block(p),
  comment: (msg) => new Comment(msg),
  compare: (op, e1, e2) => new Compare(op, e1, e2),
  ternary: (cond, e1, e2) => new Ternary(cond, e1, e2),
}

module.exports = helpers;