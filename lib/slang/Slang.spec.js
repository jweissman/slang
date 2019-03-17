import Slang from "./Slang";

describe("Slang", () => {
    let slang;

    beforeAll(() => {
        slang = new Slang();
    });

    it('performs arithmetic', () => {
        expect(slang.interpret("2+3")).toEqual(5);
        expect(slang.interpret("4-3")).toEqual(1);
        expect(slang.interpret("4-3+1")).toEqual(2);
        expect(slang.interpret("4*3+1")).toEqual(13);
        expect(slang.interpret("4/2")).toEqual(2);
        expect(slang.interpret("4*2+3*4")).toEqual(20);
        expect(slang.interpret("2/1")).toEqual(2);
        expect(slang.interpret("4*3+2/1")).toEqual(14);
    })

    xit('handles parentheses', () => {
        expect(slang.interpret('2*(3+4)')).toEqual(14);
    })
})