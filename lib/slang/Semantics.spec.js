import {
    tree,
    intLit,
    binaryExpr,
    funCall
} from './Semantics';

describe("Semantics", () => {
    describe("parses, yielding an ast", () => {
        describe("binary expressions", () => {
            it("adds/subtracts", () => {
                let expected = binaryExpr('+', intLit('1'), intLit('2'));
                expect(tree('1+2')).toEqual(expected);

                expected = binaryExpr('-', intLit('3'), intLit('2'));
                expect(tree('3-2')).toEqual(expected);
            });

            it("multiplies/divides", () => {
                let expected = binaryExpr('*', intLit('4'), intLit('5'));
                expect(tree('4*5')).toEqual(expected);

                expected = binaryExpr('/', intLit('10'), intLit('2'));
                expect(tree('10/2')).toEqual(expected);
            });

            it("expontentiates", () => {
                let expected = binaryExpr('^', intLit('2'), intLit('8'));
                expect(tree('2^8')).toEqual(expected);
            });
        });

        describe("parentheses", () => {
            it("parses parenthetical expressions", () => {
                let expected = binaryExpr('+', intLit('4'), intLit('3'));
                expect(tree('(4+3)')).toEqual(expected);
            })
        });

        describe("funcalls", () => {
            it("parses function applications", () => {
                let expected = funCall('foo',
                    [intLit('2'), binaryExpr('+', intLit('1'), funCall('bar'))]
                );
            })
        });

        test.todo("values (assignment)");
        test.todo("defun");
    });
});