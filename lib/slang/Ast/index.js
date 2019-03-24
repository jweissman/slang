const {
    intLit,
    binaryExpr,
    funCall,
    argList,
    idExpr,
    assignment,
    defun,
    strLit,
    arrLit,
    arrLookup,
    program,
} = require('./AstNode');

var ast = {
    Program(stmts) {
        return program(
            stmts.ast()
        );
    },
    ListOf(things) {
        return things.ast();
    },
    NonemptyListOf(thing,_sep,things) {
        return [thing.ast(), ...things.ast()];
    },
    EmptyListOf() { return []; },
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
    Arglist(_lp, as, _rp) {
        let args = as.ast()
        return argList(args)
    },
    Assignment(id, _eq, e) {
        return assignment(id.ast(), e.ast());
    },
    Defun(args, _arrow, e) {
        return defun(args.ast(), e.ast());
    },
    StrLit(_lq, chars, _rq) {
        return strLit(chars.sourceString);
    },
    ArrayLiteral(_lb, elems, _rb) {
        return arrLit(elems.ast());
    },
    ListIndex(list, _lb, index, _rb) {
        return arrLookup(list.ast(), index.ast());
    },
}

module.exports = ast;