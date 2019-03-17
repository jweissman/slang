const vm = require('./VM');
import {
    intLit,
    binaryExpr,
    funCall,
    argList,
    idExpr,
    assignment,
    defun,
} from './Ast';
describe("VM", () => {
    it("stores and retrieves values", () => {
        vm.storeValue('a', 3);
        expect(vm.lookupValue('a')).toEqual(3);
        expect(vm.lookupValue('b')).toEqual(null);
    })

    it("defines and calls functions", () => {
        let fnRef = vm.defineAnonymousFunction(
            ['a','b'],
            binaryExpr('+', idExpr('a'), idExpr('b'))
        );

        expect(
            vm.callFunction(fnRef, [ 1, 2 ])
        ).toEqual(3)

        fnRef = vm.defineAnonymousFunction(
            [],
            intLit(5)
        );

        expect(
            vm.callFunction(fnRef, [])
        ).toEqual(5)
    });
})