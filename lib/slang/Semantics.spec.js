import {
    tree,
} from './Semantics';
import {
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
    negated,
    ellipsis,
    hshLit,
    kvPair,
    dotAccess,
    block,
    comment,
} from './Ast/helpers';

const p = (...stmts) => program(stmts);

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

            it("negates", () => {
                let expected = p(
                    binaryExpr(
                        '+',
                        negated(binaryExpr('*', intLit('4'), intLit('2'))),
                        negated(intLit('4'))
                    )
                )
                expect(tree('-(4*2)+-4')).toEqual(expected)
            })
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

            it("parses iterated function applications (currying)", () => {
                let expected = p(
                    funCall(
                        funCall(idExpr('foo'), argList([idExpr('bar')])),
                        argList([idExpr('baz')])
                    )
                );
                expect(tree('foo(bar)(baz)')).toEqual(expected);

                // expected = p(funCall(idExpr('foo'),
                //     argList([intLit('2'), binaryExpr('+', intLit('1'), funCall(idExpr('bar')))])
                // ));
                // expect(tree('foo(2,1+bar())')).toEqual(expected);
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

        describe("string literals", () => {
            it("parses a string literal", () => {
                let expected = p(strLit("hello world"));
                expect(tree("'hello world'")).toEqual(expected)
            })
        })

        describe("list notation", () => {
            it("parses an array literal", () => {
                let expected = p(arrLit([intLit('1'),intLit('2'),intLit('3')]))
                expect(tree("[1,2,3]")).toEqual(expected)
            })
            it("parses array access notation", () => {
                let expected = p(arrLookup(idExpr('a'), intLit('5')))
                expect(tree("a[5]")).toEqual(expected)
            })
            it("parses ellipsis interpolation", () => {
                let expected = p(arrLit([intLit('5'), ellipsis(idExpr('a'))]))
                expect(tree("[5,...a]")).toEqual(expected)
            })
        })

        describe("hash notation", () => {
            it("parses a hash literal", () => {
                let expected = p(
                    hshLit(
                        [kvPair(idExpr('hello'), strLit('world'))]
                    )
                )
                expect(tree("{hello:'world'}")).toEqual(expected)
            })
            it("parses dot access notation", () => {
                let expected = p(
                    dotAccess(idExpr("item"), idExpr("attr"))
                )
                expect(tree("item.attr")).toEqual(expected)
            })

            it("parses nested dot notation", () => {
                let expected = p(
                    dotAccess(
                        dotAccess(idExpr("obj"), idExpr("item")),
                        idExpr("attr")
                    )
                )
                expect(tree("obj.item.attr")).toEqual(expected)

            })
        })

        describe("multiline fn", () => {
            it("parses block notation", () => {
                let expected = p(
                    defun(
                        argList([]),
                        block(p(intLit('1'), intLit('2')))
                    )
                );
                expect(tree("()=>{1; 2}")).toEqual(expected);
            });
        })

        describe("comments", () => {
            it("parses commentary", () => {
                let expected = p(comment("foo bar baz"))
                expect(tree("//foo bar baz")).toEqual(expected)
            })
        })
    });
});