const vm = require('./VM');
describe("VM", () => {
    it("stores and retrieves values", () => {
        vm.storeValue('a', 3);
        expect(vm.lookupValue('a')).toEqual(3);
        expect(vm.lookupValue('b')).toEqual(null);
    })
})