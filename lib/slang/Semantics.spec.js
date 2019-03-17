import { tree, intLit, binaryExpr } from './Semantics';

describe("Semantics", () => {
    describe("parses, yielding an ast", () => {
        describe("binary expressions", () => {
            it("adds/subtracts", () => {
                let expected = binaryExpr('+', intLit('1'), intLit('2'))
                expect(tree('1+2')).toEqual(expected)

                expected = binaryExpr('-', intLit('3'), intLit('2'))
                expect(tree('3-2')).toEqual(expected)
            });

            it("multiplies/divides", () => {
                let expected = binaryExpr('*', intLit('4'), intLit('5'))
                expect(tree('4*5')).toEqual(expected)

                expected = binaryExpr('/', intLit('10'), intLit('2'))
                expect(tree('10/2')).toEqual(expected)
            });
        });

        test.todo("parentheses");
        test.todo("values");
        test.todo("funcalls");
    });
});