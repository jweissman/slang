double = (x) => 2*x
twice = (f) => (x) => f(f(x))
times = (x) => (y) => x * y
square = (x) => times(x)(x)
quadruple = twice(double)
inspect = (x) => p(double(x), quadruple(x), square(x))
inspect(10)
inspect(20)
inspect(30)

p(3+4, double(2))
p(3)
p(double(2), double(4), double(9))