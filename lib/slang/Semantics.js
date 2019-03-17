const grammar = require('./Grammar');
const semantics = grammar.createSemantics();

class AstNode {
    constructor(elements) {
        this.elements = elements;
    }
}

class IntegerLiteral extends AstNode {
    constructor(e)  {
        super({
            kind: 'integer-literal',
            e
        })
    }

    evaluate() {
        return Number(this.elements.e);
    }
}

class BinaryExpression extends AstNode {
    constructor(op, e1, e2) {
        super({
            kind: 'binary-expression',
            op,
            e1,
            e2
        })
    }

    evaluate() {
        let { op, e1, e2 } = this.elements;
        let left = e1.evaluate();
        let right = e2.evaluate();
        // console.log("EVAL BINARY OP", { op, left, right });
        switch (op) {
            case '+': return left + right;
            case '-': return left - right;
            case '*': return left * right;
            case '/': return left / right;
            default: throw new Error(`BinaryExpression#evaluate: Implement binary operation: ${op}`)
        } 
    }
}

const intLit = (v) => new IntegerLiteral(v);
const binaryExpr = (op,e1,e2) => new BinaryExpression(op,e1,e2);

var ast = {
    number(e) { return intLit(this.sourceString) },
    AddExp_plus(e1,op,e2) { return binaryExpr('+',e1.ast(),e2.ast()) },
    AddExp_minus(e1,op,e2) { return binaryExpr('-',e1.ast(),e2.ast()) },
    MulExp_times(e1,op,e2) { return binaryExpr('*',e1.ast(),e2.ast()) },
    MulExp_divide(e1,op,e2) { return binaryExpr('/',e1.ast(),e2.ast()) },
}

semantics.addOperation('ast', ast)

const tree = (str) =>
    semantics(grammar.match(str)).ast()

module.exports = {
    tree,
    intLit,
    binaryExpr,
};
