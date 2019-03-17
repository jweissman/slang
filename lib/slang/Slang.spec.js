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
        expect(slang.interpret("4^3")).toEqual(64);
    })

    it('handles parentheses', () => {
        expect(slang.interpret('2*(3+4)')).toEqual(14);
        expect(slang.interpret('(10+5)*3')).toEqual(45);
        expect(slang.interpret('(10+5)*(3+7)')).toEqual(150);
    })

    it('can call built-ins', () => {
        expect(slang.interpret('max(1,2)')).toEqual(2);
        expect(slang.interpret('min(1,2)')).toEqual(1);
        expect(slang.interpret('max(4,3)')).toEqual(4);
        expect(slang.interpret('min(3,4)')).toEqual(3);
        expect(slang.interpret('max(1,2,3)')).toEqual(3);
        expect(slang.interpret('max(1,2,3,4)')).toEqual(4);
        expect(slang.interpret('min(1,2,3,4)')).toEqual(1);
        expect(slang.interpret('min(1,2,3,0)')).toEqual(0);
        expect(slang.interpret('max(1,2,min(50,100))')).toEqual(50);
        expect(slang.interpret('max(1,2,1+min(50,100))')).toEqual(51);
    })

    it('can remember values', () => {
        expect(slang.interpret('a=15')).toEqual('a')
        expect(slang.interpret('a+50')).toEqual(65)
        expect(slang.interpret('b=25')).toEqual('b')
        expect(slang.interpret('a+b')).toEqual(40)
    })

    it('can define new functions', () => {
        expect(slang.interpret('a=()=>4')).toEqual('a')
        expect(slang.interpret('a()+5')).toEqual(9)
        expect(slang.interpret('b=(c,d)=>c+d*2')).toEqual('b')
        expect(slang.interpret('b(a()+4,10)')).toEqual(28)
    });
})