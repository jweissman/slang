// hello, slang!

// let's greet the user.
p('hello slang')

fib=n=>n>1?(fib(n-1)+fib(n-2)):1
p(fib 10)

it = (f,x) => {
  |- x
  |* it(f, f(x))
}

index = (f,n) => {
    val = f(n)
    p 'index', f, n, val
    |- val
    |* index(f,n+1)
}


// map
// take

take = (f,n) => {
  res = n>1?take(f,n-1):[]
  val = f(n)
  p 'take', n, val
  res = [ ...res, val ]
  res
}

p take(fib, 10)
inc=(x)=>x+1
p take(inc, 10)

// need pop for this!! can we use derive/left-tack?
// okay, derive now shifts a list-valued entity!
// so it should work for streams too??
// map = (f,a) => {
//    x = -|a
//    v = f(x)
//    res=(#a>0)?map(f,a):[] 
//    res=[...res,v]
//    res
// }
// 
// p map(x=>x*2, [1,2,3])

// takes = (s,n) => {
//   res = n>1?takes(s,n-1):[]
//   // val = -| s
//   res = [ -| s, ...res ]
//   p 'takes', n, res
//   res   
// }
// 
// g = &index(fib,1)
// p -| g
// // p [-|g,-|g,-|g,-|g,-|g,-|g]
// p takes(g, 10)