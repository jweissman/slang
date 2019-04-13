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
inspect(20)
inspect(30)
 
// hashes
h={greeting: 'hello world!'}
p(h.greeting)
p(h)

// fib!!!
// fib = (n) => n < 3 ? 1 : fib(n-2) + fib(n-1)
fib=(n)=>n>1?fib(n-1)+fib(n-2):1;
p(fib 2)
p(fib 3)
p(fib 4)
p(fib 5)
p(fib 6)