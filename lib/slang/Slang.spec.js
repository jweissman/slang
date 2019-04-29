import Slang from './Slang'

describe('Slang', () => {
  let slang

  beforeEach(() => {
    slang = new Slang()
  })

  it('calculates arithmetic', () => {
    expect(slang.interpret('2+3')    ).toEqual('5')
    expect(slang.interpret('4-3')    ).toEqual('1')
    expect(slang.interpret('4-3+1')  ).toEqual('2')
    expect(slang.interpret('4*3+1')  ).toEqual('13')
    expect(slang.interpret('4/2')    ).toEqual('2')
    expect(slang.interpret('4*2+3*4')).toEqual('20')
    expect(slang.interpret('2/1')    ).toEqual('2')
    expect(slang.interpret('4*3+2/1')).toEqual('14')
    expect(slang.interpret('4^3')    ).toEqual('64')
  })

  it('parentheses', () => {
    expect(slang.interpret('2*(3+4)')).toEqual('14')
    expect(slang.interpret('(10+5)*3')).toEqual('45')
    expect(slang.interpret('(10+5)*(3+7)')).toEqual('150')
  })

  it('negative numbers', () => {
    expect(slang.interpret('-5+10')).toEqual('5')
  })

  test.todo('floating-point literals')

  it('handles built-ins', () => {
    expect(slang.interpret('max(1,2)')).toEqual('2')
    expect(slang.interpret('min(1,2)')).toEqual('1')
    expect(slang.interpret('max(4,3)')).toEqual('4')
    expect(slang.interpret('min(3,4)')).toEqual('3')
    expect(slang.interpret('max(1,2,3)')).toEqual('3')
    expect(slang.interpret('max(1,2,3,4)')).toEqual('4')
    expect(slang.interpret('min(1,2,3,4)')).toEqual('1')
    expect(slang.interpret('min(1,2,3,0)')).toEqual('0')
    expect(slang.interpret('max(1,2,min(50,100))')).toEqual('50')
    expect(slang.interpret('max(1,2,1+min(50,100))')).toEqual('51')
  })

  it('assignment', () => {
    expect(slang.interpret('a=15')).toEqual('15')
    expect(slang.interpret('a+50')).toEqual('65')
    expect(slang.interpret('b=25')).toEqual('25')
    expect(slang.interpret('a+b') ).toEqual('40')
  })

  it('defines functions', () => {
    expect(slang.interpret('a=()=>4')).toEqual('=>4')
    expect(slang.interpret('a()+5')).toEqual('9')
    expect(slang.interpret('b=(c,d)=>c+d*2')).toEqual('c, d=>c+d*2')
    expect(slang.interpret('b(a()+4,10)')).toEqual('28')
  })

  it('can define higher-order functions', () => {
    expect(slang.interpret('times=(x)=>(y)=>x*y')).toEqual('x=>y => x*y')
    expect(slang.interpret('double=times(2)')).toEqual('y=>x*y') //lambda') //=>times(2)')
    expect(slang.interpret('twice=(f)=>(x)=>f(f(x))')).toEqual('f=>x => f(f(x))')
    expect(slang.interpret('twice(double)(4)')).toEqual('16')
    expect(slang.interpret('thrice=(f)=>(x)=>f(f(f(x)))')).toEqual('f=>x => f(f(f(x)))')
    expect(slang.interpret('cube=(x)=>thrice(times(x))(1)')).toEqual('x=>thrice(times(x))(1)')
    expect(slang.interpret('cube(10)')).toEqual('1000')
  })

  it('can perform multiple operations in a single line', () => {
    expect(slang.interpret('a=5;b=a+4;c=3;a+b+c')).toEqual('17')
    expect(slang.interpret('1+2;3;4')).toEqual('4')
  })

  it('strings', () => {
    expect(slang.interpret("x='hello world'; x")).toEqual('hello world')
  })

  it('lists', () => {
    expect(slang.interpret('a=[1,2,3+4];a[0]+a[2]')).toEqual('8')
    expect(slang.interpret('b=[0,5];b[0]=1;b[0]')).toEqual('1')
  })

  it('interpolates lists', () => {
    expect(slang.interpret('a=[1,2,3,4];c=[5,6,...a];c[0]+c[2]')).toEqual('6')
  })

  it('hashes', () => {
    expect(slang.interpret("h={greeting:'hello'};h.greeting")).toEqual('hello')
    expect(
      slang.interpret(
        "y={subject:'world',...h}; y.greeting+' there '+y.subject"
      )
    ).toEqual('hello there world')
  })

  it('hash assignment', () => {
    expect(
      slang.interpret("y.greeting = 'hi'; y.greeting+' '+y.subject")
    ).toEqual('hi world')
  })

  it('defs multiline functions', () => {
    expect(slang.interpret('h=(x)=>{y=2;x+y};h(3)')).toEqual('5')

    expect(slang.interpret('g=(x)=>{y=4\nx+y};g(3)')).toEqual('7')
  })

  it('defs simple pseudo-objects', () => {
    expect(
      slang.interpret('math = { times: (x) => (y) => x * y }; math.times(2)(2)')
    ).toEqual('4')
  })

  it('ignores comments', () => {
    expect(slang.interpret('// hello there')).toEqual(null)
  })

  it('calls functions without parens', () => {
    expect(slang.interpret('foo=(x)=>2*x;foo 2')).toEqual('4')
  })

  it('conditional logic', () => {
    expect(slang.interpret('a=2;b=3;a>b')).toEqual('False')
    expect(slang.interpret('n=3;n>2')).toEqual('True')
    expect(slang.interpret('j=25;j<20')).toEqual('False')
    expect(slang.interpret('i=25;j==i')).toEqual('True')
    expect(slang.interpret('i>=j')).toEqual('True')
    expect(slang.interpret('a<=j')).toEqual('False')
    expect(slang.interpret('a<=2')).toEqual('True')
    expect(slang.interpret("a=2;b=3;a>b ?'bigger':'smaller'")).toEqual(
      'smaller'
    )
  });

  it("fibs", () => {
    expect(
      slang.interpret('fib=(n)=>n>1?(fib(n-1)+fib(n-2)):1; fib 2')
    ).toEqual('2')
  })

  it('index spaces', () => {
    expect(slang.interpret('iota 3')).toEqual('[0, 1, 2]')
    expect(slang.interpret('iota 5')).toEqual('[0, 1, 2, 3, 4]')
  })

  it('cardinality literal', () => {
      expect(slang.interpret('#[1,2,3,4]')).toEqual('4')
      expect(slang.interpret("#'hello'")).toEqual('5')
  })

  it('promises', () => {
    expect(
      slang.interpret("f=()=>{p 'before';|-1;p 'after';|-2;|-3;|-4;|-5;};g=&f();[-|g,-|g]")
    ).toEqual("[1, 2]")
    slang.interpret("times = (num, fn) => { t=()=>{ fn(); times(num-1, fn) }; num>0?t():'(times)' } ")
    slang.interpret("push=(a,e)=>[...a,e];")
    slang.interpret("take = (g, n) => { res=[]; times(n, () => res=push(res, -|g)); res }");
    expect(
      slang.interpret("welcome=()=>{|-'hello';|-'there';|-'world'};take &welcome(), 3")
    ).toEqual("[hello, there, world]")
  })

  it('bubbles promises', () => {
    slang.interpret("times = (num, fn) => { t=()=>{ fn(); times(num-1, fn) }; num>0?t():'(times)' } ")
    slang.interpret("push=(a,e)=>[...a,e];")
    slang.interpret("take = (g, n) => { res=[]; times(n, () => res=push(res, -|g)); res }");
     expect(
       slang.interpret("hi=()=>{|-'hi';|*hi()};take &hi(), 5")
     ).toEqual("[hi, hi, hi, hi, hi]")
  });

  it("bubbles iteratively", () => {
    slang.interpret("it = (f,x) => { |- x; |* it(f, f(x)) }")
    slang.interpret("inc=(x)=>x+1")
    //why doesn't this work?? -> slang.interpret("g=&it(inc, 1)")
    //slang.interpret("g=&it((x) => x+1, 1)")
    slang.interpret("g=&it(inc, 1)")
    expect(
      slang.interpret("-|g")
    ).toEqual("1")
    expect(
      slang.interpret("-|g")
    ).toEqual("2")
    expect(
      slang.interpret("[-|g, -|g, -|g, -|g]")
    ).toEqual("[3, 4, 5, 6]")
  })

  it('fibonaccis', () => {
    slang.interpret("index = (f,x) => { |- f(x); |* index(f, x+1) }")
    slang.interpret("fib = (n) => n < 2 ? 1 : fib(n-1) + fib(n-2)")

    expect(
      slang.interpret("g=&index(fib,0); [-|g,-|g,-|g,-|g,-|g,-|g]") // //take g, 6")
    ).toEqual("[1, 1, 2, 3, 5, 8]")
  })

  // xit("bubbles lists/array literals", () => {
  //   slang.interpret("times = (num, fn) => { p 'times'; t=()=>{ p 'times (inner)'; fn(); times(num-1, fn) }; num>0?t():'(times)' } ")
  //   slang.interpret("push=(a,e)=>a=[...a,e];")
  //   slang.interpret("take = (g, n) => { p 'take'; res=[]; times(n, () => res=push(res, -|g)); p 'take over', res; res }");
  //   expect(
  //     // slang.interpret("it=()=>{|*(iota(10)); take &it, 3")
  //     slang.interpret("it=()=>|*[1,2,3,4,5]; take &it, 3")
  //   ).toEqual("[1, 2, 3]")
  // })
})
