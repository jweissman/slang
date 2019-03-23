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

    it('can define higher-order functions', () => {
        expect(slang.interpret('times=(x)=>(y)=>x*y')).toEqual('times')
        expect(slang.interpret('double=times(2)')).toEqual('double')
        expect(slang.interpret('twice=(f)=>(x)=>f(f(x))')).toEqual('twice')
        expect(slang.interpret("twice(double)(4)")).toEqual(16);
        expect(slang.interpret('thrice=(f)=>(x)=>f(f(f(x)))')).toEqual('thrice')
        expect(slang.interpret('cube=(x)=>thrice(times(x))(1)')).toEqual('cube')
        expect(slang.interpret('cube(10)')).toEqual(1000)
    });

    it('can perform multiple operations in a single line', () => {
        expect(slang.interpret('a=5;b=a+4;c=3;a+b+c')).toEqual(17)
    })


    test.todo("negative numbers")
})