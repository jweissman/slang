const AstNode = require('./AstNode');
const Identifier = require('./Identifier');
const BinaryExpression = require('./BinaryExpression');
const FunCall = require('./FunCall')
const Compare = require('./Compare')
const HashLiteral = require('./HashLiteral')
const DotInterpolation = require('./DotInterpolation')
const Ternary = require('./Ternary')
const Assignment = require('./Assignment') 
const ArrayLookup = require('./ArrayLookup') 
const DotAccessor = require('./DotAccessor')

class IntegerLiteral extends AstNode {
    constructor(e) { super({ e }); }
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