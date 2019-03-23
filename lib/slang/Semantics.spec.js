import {
    tree,
} from './Semantics';
import {
    intLit,
    binaryExpr,
    funCall,
    argList,
    idExpr,
    assignment,
    defun,
    program as p,
} from './Ast';

describe("Semantics", () => {
    describe("parses, yielding an ast", () => {
        describe("binary expressions", () => {
            it("adds/subtracts", () => {
                let expected = p(binaryExpr('+', intLit('1'), intLit('2')));
                expect(tree('1+2')).toEqual(expected);

                expected = p(binaryExpr('-', intLit('3'), intLit('2')));
                expect(tree('3-2')).toEqual(expected);
            });

            it("multiplies/divides", () => {
                let expected = p(binaryExpr('*', intLit('4'), intLit('5')));
                expect(tree('4*5')).toEqual(expected);

                expected = p(binaryExpr('/', intLit('10'), intLit('2')));
                expect(tree('10/2')).toEqual(expected);
            });

            it("expontentiates", () => {
                let expected = p(binaryExpr('^', intLit('2'), intLit('8')));
                expect(tree('2^8')).toEqual(expected);
            });
        });

        describe("parentheses", () => {
            it("parses parenthetical expressions", () => {
                let expected = p(binaryExpr('+', intLit('4'), intLit('3')));
                expect(tree('(4+3)')).toEqual(expected);
            })
        });

        describe("funcalls", () => {
            it("parses function applications", () => {
                let expected = p(funCall(idExpr('foo'),
                    argList([intLit('2'), intLit('1'), funCall(idExpr('bar'))])
                ));
                expect(tree('foo(2,1,bar())')).toEqual(expected);

                expected = p(funCall(idExpr('foo'),
                    argList([intLit('2'), binaryExpr('+', intLit('1'), funCall(idExpr('bar')))])
                ));
                expect(tree('foo(2,1+bar())')).toEqual(expected);
            })
        });

        describe("values (assignment)", () => {
            it("parses assignments", () => {
                let expected = p(assignment(
                    idExpr('a'),
                    binaryExpr('+', idExpr('b'), idExpr('c'))
                ))
                expect(tree('a=b+c')).toEqual(expected)
            })
        });

        describe("defun", () => {
            it("parses a function definition", () => {
                let expected = p(defun(
                    argList([ idExpr('a'), idExpr('b') ]),
                    binaryExpr('+', idExpr('a'), idExpr('b'))
                ))
                expect(tree('(a,b)=>a+b')).toEqual(expected)
            })
        });
    });
});