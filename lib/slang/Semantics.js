const grammar = require('./Grammar');
const semantics = grammar.createSemantics();
const ast = require('./Ast');

semantics.addOperation('ast', ast)

const tree = (str) =>
    semantics(grammar.match(str)).ast()

module.exports = {
    tree,
};