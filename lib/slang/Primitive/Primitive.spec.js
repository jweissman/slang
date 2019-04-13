import { Null, Int, String, Lambda, Boolean } from '.';

describe("primitive types", () => {
    it("null", () => {
        let n = new Null();
        expect(n.value).toBe(null);
    });

    it("ints", () => {
        let i = new Int(5);
        let j = new Int(6);
        expect(i.value).toBe(5);
        expect(i.compare(j)).toBe(-1);
        expect(i.compare(i)).toBe(0);
        expect(j.compare(i)).toBe(1);
    });

    it("strings", () => {
        let s = new String("hello world");
        expect(s.value).toBe("hello world");
        expect(s.pretty()).toBe("hello world");
    })

    it("lambdas", () => {
        let l = new Lambda('args', 'expr', 'ctx')
        expect(l.value).toEqual({ args: 'args', expr: 'expr', ctx: 'ctx', })
    })

    it("bools", () => {
        let b = new Boolean(true);
        expect(b.value).toEqual(true);
        expect(b.pretty()).toEqual('True');

        let b2 = new Boolean(false);
        expect(b2.value).toEqual(false);
        expect(b2.pretty()).toEqual('False');
    })
})
