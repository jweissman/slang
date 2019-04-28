// hello, slang!

p('hello slang')

math = { times: (x) => (y) => x * y }; p(math.times(2)(2))

double=math.times(2)

// function 'algebra'
square = (x) => math.times(x)(x)
twice = (f) => (x) => f(f(x))
thrice = (f) => (x) => f(f(f(x)))
quadruple = twice(double)
cube = (x) => thrice(math.times(x))(1)
inspect = (x) => p(x, double(x), quadruple(x), square(x), cube(x))
inspect(10)
inspect(200)
inspect(3000)
 
// hashes
h={greeting: 'hello world!'}
p(h.greeting)
p(h)

// fib!!!
// fib = (n) => n < 3 ? 1 : fib(n-2) + fib(n-1)
fib=(n)=>{n>1?(fib(n-1)+fib(n-2)):1;}
p(fib 2)
p(fib 3)
p(fib 4)
p(fib 5)
p(fib 6)

// need deeper conditional first-order logic ops? ||/&&?
p(fib 10);

// maps!!

times = (num, fn) => { t=()=>{ fn(); times(num-1, fn) }; num>0?t():'(times)' }
push=(a,e)=>a=[...a,e];
times 10, () => p 'hi there'

take = (f, n) => {
    res=[]
    times(n, () => res=push(res, -|f))
    res
}


hi = () => {
  |- 'hello'
  |- 'there'
  |- 'world'
  |* hi()
}

//hilots = () => times 50, |-&hi
p(take(&hi(), 10))

//
//iterate=(f)=>(x)=>{ |-x; iterate(f,f(x)) }

//take (iterate(fib)), 10


// we need to destructure arrays? [ first, ...rest ] = arr

//map=(f,a)=>{
//    res=[]
//    each(a,() => res = push(res, f(e))) //, (e) => res = push(res, f(e));
//    res;
//}

// guessing game??
model = {
    count: 0
}

engine = {
    kickstart: () => {
        p 'good to go', model.count
        model.count = model.count + 1
        p model.count
    }

}

game = {
    play: () => {
        p 'let us go somewhere'
        engine.kickstart()
    }
}

game.play()