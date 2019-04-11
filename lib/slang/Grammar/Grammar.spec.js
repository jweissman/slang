import grammar from '.';

describe("Grammar", () => {
    it("fails empty strings", () => {
        expect(grammar.match("").succeeded()).toBe(true);
        expect(grammar.match("   ").succeeded()).toBe(true);
    })

    it("multiple statements with delimiter", () => {
        expect(grammar.match("10 20 30").succeeded()).toBe(false);
        expect(grammar.match("10;20;30").succeeded()).toBe(true);
        expect(grammar.match("10\n20\n30").succeeded()).toBe(true);
        expect(grammar.match(
            "p('hello world')\nmath = { times: (x) => (y) => x * y };"
        ).succeeded()).toBe(true)
    });

    it("arithmetic", () => {
        expect(grammar.match("1+2").succeeded()).toBe(true);
        expect(grammar.match("1+2*").succeeded()).toBe(false);
        expect(grammar.match("1+(2*3)").succeeded()).toBe(true);
        expect(grammar.match("1-2").succeeded()).toBe(true);
        expect(grammar.match("2^2").succeeded()).toBe(true);
        expect(grammar.match("pi*r^2").succeeded()).toBe(true);
    })

    it("function call", () => {
        expect(grammar.match("fun(1,2)").succeeded()).toBe(true);
        expect(grammar.match("fun(1,)").succeeded()).toBe(false);
        expect(grammar.match("fun(a+b,etc())").succeeded()).toBe(true);
        expect(grammar.match("fun(a+b,c+d())").succeeded()).toBe(true);
    })

    xit("function call without parens", () => {
        expect(grammar.match("fun a+b,etc()").succeeded()).toBe(true);
    })

    it("simple assignment", () => {
        expect(grammar.match("a=b+4").succeeded()).toBe(true);
        expect(grammar.match("a=b()+4").succeeded()).toBe(true);
        // assignments don't have to be expressions yet
        expect(grammar.match("a=b(c=4)+4").succeeded()).toBe(false);
    })

    it("defun", () => {
        expect(grammar.match('a=()=>4').succeeded()).toBe(true)
        expect(grammar.match('b=(c)=>a()+5*c').succeeded()).toBe(true)
        expect(grammar.match('c(()=>a+4)').succeeded()).toBe(true)
    })

    it("string literal", () => {
        expect(grammar.match("'hello world'").succeeded()).toBe(true)
        expect(grammar.match("x='hello world';x").succeeded()).toBe(true)
        expect(grammar.match("'hello world").succeeded()).toBe(false)
    })

    it("list", () => {
        expect(grammar.match("[1,2,3]").succeeded()).toBe(true)
        expect(grammar.match("[1,2,3").succeeded()).toBe(false)
        expect(grammar.match("a=[1,2+c,3+4,...b]").succeeded()).toBe(true)
        expect(grammar.match("x=[1,2,3];x[0]+x[1]").succeeded()).toBe(true)
        expect(grammar.match("x[3]=10").succeeded()).toBe(true)
    })

    it("hash", () => {
        expect(grammar.match("{hello:'world'}").succeeded()).toBe(true);
        expect(grammar.match("hi.there").succeeded()).toBe(true);
    })

    it("multiline fn", () => {
        expect(grammar.match("(a)=>{p(a);a}").succeeded()).toBe(true);
    })

    it("calls a fn inside of an object", () => {
        expect(grammar.match("math.times(2,2)").succeeded()).toBe(true);
        expect(grammar.match("std.math.pow(2,3)").succeeded()).toBe(true);
        expect(grammar.match("h={a:(x)=>x+y};h.a(3)").succeeded()).toBe(true);
    })

    it("comments", () => {
        expect(grammar.match("// hello there").succeeded()).toBe(true);
    })

    it("recognizes 'lambda' funcalls", () => {
        expect(grammar.match('foo 1, b, 2+3').succeeded()).toBe(true);
    })
})