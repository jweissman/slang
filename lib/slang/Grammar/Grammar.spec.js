import grammar from '.';

describe("Grammar", () => {
    // it("does not parse empty strings")
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
        expect(grammar.match("fun(1,)").succeeded()).toBe(true);
        expect(grammar.match("fun(a+b,etc())").succeeded()).toBe(true);
        expect(grammar.match("fun(a+b,c+d())").succeeded()).toBe(true);
        // expect(grammar.match("fun a+b,etc() ").succeeded()).toBe(true);
    })

    it("parses a simple assignment", () => {
        expect(grammar.match("a=b+4").succeeded()).toBe(true);
        expect(grammar.match("a=b()+4").succeeded()).toBe(true);
        // assignments don't have to be expressions yet
        expect(grammar.match("a=b(c=4)+4").succeeded()).toBe(false);
    })
})