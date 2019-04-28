times = (num, fn) => { p 'times', num; t=()=>{ fn(); times(num-1, fn) }; num>0?t():'(times)' }
push = (a,e)=>{ p 'push', e; [...a,e] }
take = (g, n) => { res=[]; times(n, () => res=push(res, -|g)); res }

iterate = (f,x) => { |- x; |* it(f, f(x)) }

// map = (f, a) => {  }
//index = (f,x) => { |- f(x); |* index(f, x+1) }


// stabby lambda for argless fns? ()=> can become -> ... ?
// simple argless def x -> x + 2 ?