import grammar from './Grammar';

describe("Grammar", () => {
    it("parses arithmetic", () => {
        expect(grammar.match("1+2").succeeded()).toBe(true);
        expect(grammar.match("1+2*").succeeded()).toBe(false);
        expect(grammar.match("1+(2*3)").succeeded()).toBe(true);
        expect(grammar.match("1-2").succeeded()).toBe(true);
        expect(grammar.match("").succeeded()).toBe(false);
        expect(grammar.match("2^2").succeeded()).toBe(true);
        expect(grammar.match("pi*r^2").succeeded()).toBe(true);
    })

    it("parses a function call", () => {
        expect(grammar.match("fun(1,2)").succeeded()).toBe(true);
        expect(grammar.match("fun(1,)").succeeded()).toBe(false);
        expect(grammar.match("fun(a+b,etc())").succeeded()).toBe(true);
    })
})