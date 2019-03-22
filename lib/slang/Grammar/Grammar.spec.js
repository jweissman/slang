import grammar from '.';

describe("Grammar", () => {
    it("does not parse empty strings", () => {
        expect(grammar.match("").succeeded()).toBe(false);
        expect(grammar.match("   ").succeeded()).toBe(false);
    })

    it("parses multiple statements with delimiter", () => {
        expect(grammar.match("10 20 30").succeeded()).toBe(false);
        expect(grammar.match("10;20;30").succeeded()).toBe(true);
        expect(grammar.match("10\n20\n30").succeeded()).toBe(true);
    });

    it("parses arithmetic", () => {
        expect(grammar.match("1+2").succeeded()).toBe(true);
        expect(grammar.match("1+2*").succeeded()).toBe(false);
        expect(grammar.match("1+(2*3)").succeeded()).toBe(true);
        expect(grammar.match("1-2").succeeded()).toBe(true);
        expect(grammar.match("2^2").succeeded()).toBe(true);
        expect(grammar.match("pi*r^2").succeeded()).toBe(true);
    })

    it("parses a function call", () => {
        expect(grammar.match("fun(1,2)").succeeded()).toBe(true);
        expect(grammar.match("fun(1,)").succeeded()).toBe(true);
        expect(grammar.match("fun(a+b,etc())").succeeded()).toBe(true);
        expect(grammar.match("fun(a+b,c+d())").succeeded()).toBe(true);
    })

    xit("parses a function call without parens", () => {
        expect(grammar.match("fun a+b,etc() ").succeeded()).toBe(true);
    })

    it("parses a simple assignment", () => {
        expect(grammar.match("a=b+4").succeeded()).toBe(true);
        expect(grammar.match("a=b()+4").succeeded()).toBe(true);
        // assignments don't have to be expressions yet
        expect(grammar.match("a=b(c=4)+4").succeeded()).toBe(false);
    })

    it("parses a defun", () => {
        expect(grammar.match('a=()=>4').succeeded()).toBe(true)
        expect(grammar.match('b=(c)=>a()+5*c').succeeded()).toBe(true)
        expect(grammar.match('c(()=>a+4)').succeeded()).toBe(true)
    })
})