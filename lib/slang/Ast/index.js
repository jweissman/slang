
const {
  program,
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
  ellipsis,
  negated,
  hshLit,
  kvPair,
  dotAccess,
  block,
  comment,
  compare,
  ternary,
  lenLit,
  turnstile,
} = require('./helpers')

var ast = {
  Program(stmts, _delims) {
    return program(stmts.ast())
  },

  ListOf(things) {
    return things.ast()
  },
  NonemptyListOf(thing, _sep, things) {
    return [thing.ast(), ...things.ast()]
  },
  nonemptyListOf(thing, _sep, things) {
    return [thing.ast(), ...things.ast()]
  },
  EmptyListOf() {
    return []
  },
  emptyListOf() {
    return []
  },
  ident(_, _e) {
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
    return e.ast()
  },
  PriExp_neg(_sgn, e) {
    return negated(e.ast())
  },
  PriExp_pos(_sgn, e) {
    return e.ast()
  },
  Funcall(id, _lp, as, _rp) {
    let name = id.ast()
    let args = as.ast()
    return funCall(name, argList(args))
  },
  ParamList(_lp, ps, _rp) {
    let params = ps.ast()
    return argList(params)
  },
  Assignment(id, _eq, e) {
    return assignment(id.ast(), e.ast())
  },
  Defun(args, _arrow, e) {
    return defun(args.ast(), e.ast())
  },
  StrLit(_lq, chars, _rq) {
    return strLit(chars.sourceString)
  },
  ArrayLiteral(_lb, elems, _rb) {
    let elements = elems.ast()
    return arrLit(elements)
  },
  ListIndex(list, _lb, index, _rb) {
    return arrLookup(list.ast(), index.ast())
  },
  Dots(_ellipsis, e) {
    return ellipsis(e.ast())
  },
  HashLit(_lb, pairs, _lp) {
    return hshLit(pairs.ast())
  },
  HashKeyVal(id, _col, e) {
    return kvPair(id.ast(), e.ast())
  },
  DotAccess(t, _dot, a) {
    return dotAccess(t.ast(), a.ast())
  },
  Block(_lb, prog, _rb) {
    return block(prog.ast())
  },
  Comment(_sl, msg, _esl) {
    return comment(msg.sourceString)
  },
  LambdaFuncall(method, _sp, args) {
    return funCall(method.ast(), argList(args.ast()))
  },
  Comparison_gt(e1, _gt, e2) {
    return compare('>', e1.ast(), e2.ast())
  },
  Comparison_gte(e1, _gt, e2) {
    return compare('>=', e1.ast(), e2.ast())
  },
  Comparison_lt(e1, _lt, e2) {
    return compare('<', e1.ast(), e2.ast())
  },
  Comparison_lte(e1, _gt, e2) {
    return compare('>=', e1.ast(), e2.ast())
  },
  Comparison_eq(e1, _eq, e2) {
    return compare('==', e1.ast(), e2.ast())
  },
  Ternary(cond, _q, e1, _cln, e2) {
    return ternary(cond.ast(), e1.ast(), e2.ast())
  },
  LenLit(_hash, e) {
    return lenLit(e.ast())
  },
  Turnstile_rtack(_rtack, e) {
    return turnstile("yield", e.ast());
  },
  Turnstile_ltack(_rtack, e) {
    return turnstile("derive", e.ast());
  },
  Turnstile_stream(_str, e) {
    return turnstile("stream", e.ast());
  },
  Turnstile_bubble(_bubble, e) {
    return turnstile("bubble", e.ast());
  }
}

module.exports = ast
