const grammar = require('./Grammar');
const semantics = grammar.createSemantics();
const ast = require('./Ast');
const vm = require('./VM');

semantics.addOperation('ast', ast)

semantics.addOperation('tree', ast)
// semantics.addOperation('derive', { });

semantics.addOperation('evaluate', {
    Program: (stmts, _br) => {
        console.log("tree", stmts.tree());
        // we can migrate gradually away from the tree objects?
        return stmts.tree().evaluate(vm);
    }
    // what are the things we can properly eval? stmt, expr?
})

const wrap = (str) => {
    let match = grammar.match(str)
    if (match.succeeded()) {
        let wrapper = semantics(match)
        return wrapper
    } else {
        throw new Error(`Parse failed: ${match.message}`)
    }
}

const tree = (str) => wrap(str).ast()
// const derive = (str) => wrap(str).derive()

module.exports = {
    tree,
};