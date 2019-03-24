
twice = (f) => (x) => f(f(x))
thrice = (f) => (x) => f(f(f(x)))
times = (x) => (y) => x * y
double = times(2)
square = (x) => times(x)(x)
quadruple = twice(double)
cube = (x) => thrice(times(x))(1)
inspect = (x) => p(x, double(x), quadruple(x), square(x), cube(x))

inspect(10)
inspect(20)
inspect(30)

p(3+4, double(2))
p(3)
p(double(2), double(4), double(9))

z = 10
add = (x) => (y) => x + y
plusz = add(z)
x = 10
p(plusz(x))

h = {greeting: 'hello world!'}
p(h.greeting)
p(h)