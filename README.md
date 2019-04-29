# Slang


## About

Slang is a tiny programming language, written to learn and hopefully to teach others about programming language design and implementation! 

Slang is designed to be user-friendly and concise: to take a small amount of input and do a lot of work. It's not supposed to be concatenative and 'absolutely' minimal, but some elements of those languages (apl, golflangs) are definitely up for consideration in the design space.

## Synopsis

Slang is close in spirit at this point to scripting languages like ruby, lua, javascript (our host language and interpreter environment).

We are starting to have some elements reminiscent of functional programming languages -- 'lambda-style' evaluation without parens in some cases, with functions as more or less first-class entities in the ecosystem, and some support for functional idioms...

The overall goal for Slang is to be a lightweight interpreted language suitable for adapting and extending to 
form an environment in which expressing the solution to problems is 'close' to expressing the problem directly.
This suggests a system of argots or fundamental language extensions which provide additional support for
different domain data and control structures.

### Turnstiles

One of Slang's minor syntax innovations is a shorthand notation for shallow coroutines (functional control flow with yield/generator semantics). The syntactical metaphor is a *turnstile* or *tack*. Depending on the orientation of the turnstile (or which way the point of 'tack' is facing) you should envision either:

  - 'pushing' (values) past the turnstile bar (`|-`, pronounced 'yield' or 'right-tack')
  - or 'pulling' (values) through the turnstile bar (`-|`, pronounced 'derive' or 'left-tack')

You can also imagine another instance in which the turnstile is rotating or spinning freely, allowing everything to pass (`|*`, 'bubble', 'bar-star', or maybe 'star-tack'). A companion piece of syntax is ampersand (`&`), which 'ties together' a function that pushes values up with right-tacks (yields) and creates a generator from an invocation of that function.  

## Features
 - [x] arithmetic with variables
 - [x] shorthand and multi-line function definitions
 - [x] function application (parens optional)
 - [x] strings and lists
 - [x] blocks (multi-line fns)
 - [x] hashes
 - [x] ternary conditionals with simple comparisons
 - [x] promise notation (yield/await with turnstile/left and right tacks `|-` and `-|`)
 - [ ] boolean logic operators (`||` and `&&`)
 - [ ] classes and modules with formal member function notation (`f() { ... }`)
 - [ ] load/import/require

    

## Syntax


### Arithmetic

We can do simple arithmetic with numbers and assign values to variables.
 
    2*3+4 # => 10
    a=10+3^2 # => 19
    a+1 # => 20

### Functions

Create a simple lambda (the last value is returned implicitly):

    f = (x) => { b=x*2; x+b^2 }

For single-statement expressions the braces may be omitted:

    g = (x) => x+x^2+1

Invoke these functions with parens:

    g(3) # => 13

You can also omit parentheses if there are arguments:

    g 4 # => 21

Just `g` is the lambda itself; that is, without parens or args, you might be
trying to use `g` as a function-valued variable, so Slang won't evaluate it
on the spot, but rather return the lambda as a value. In the repl this
return value looks like "`lambda`" when inspected.

### Strings

Create a string literal:

```
    greeting = 'hello world'
    p(greeting) # => 'hello world' prints!
```

Get the length of a string:

```
  #'hi' #=> 3
  #greeting #=> 11
```

### Lists

Create a new list:

```
   a = [1,2,3] #=> [1,2,3]
   a[0] # => 1
   a[0] = 4
   a # => [4,2,3]
```

Interpolate lists:
```
   b = [...a,4,5] # => [4,2,3,4,5]
```

Get the length of a list:

```
  #[1,2,3] #=> 3
  #b #=> 5
```



### Hashes

Create a new hash:

```
  h = { hello: 'hi', val: 123 } 
  h.hello + 'world' # => 'hi world'
```

You can interpolate hashes too:

```
  h2 = { ...h, person: 'you' }
  h.hello + h.person # => 'hi you'
```

### Conditions

Compare two values:

```a=2;b=3;a>b # => False```
```a=='hello' # => False```
```a==2 # => True```

Switch based on a value:

```a>b?'bigger':'smaller' # => smaller``` 
```fib=(n)=>n>1?fib(n-1)+fib(n-2):1 # => lambda```
```fib 10 # => 89```

### Shallow coroutines

Use the turnstile operators (`-|`, `|-`) and `&` to build and manipulate
streams. Simple stream composition with `|*` is provided to do
more advanced control flow.

  `|- [value]`: yield a value
  `&[fn]`: create a stream
  `-|[stream]`: extract an element from a stream
  `|*[fn]`: bubble up yields

`f=() => |- 1` defines a function `f` that yields the value 1.
`g=&f` defines a stream that produces values.
`e=-|g` extracts an element `e` from the stream `g`.
`|*f` bubbles yields from within `f`

Here is a simple iterator written with turnstile operators:

```
it = (f,x) => {
  |- x
  |* it(f, f(x))
}

g = &it((x) => x+1, 1)

-| g // => 1
-| g // => 2
-| g // => 3
```

### Builtins

A few methods are provided as built-ins:

  - `p` to print (`p 1, 'hello' # => 1 'hello'`)
  - `iota` is an index space generator (`iota 3 # => [0,1,2]`). 
  - `min` and `max` (`max 10, 20 # => 20`)
  - `each` iterates a list (`each arr, (elem) => ...`)

## Roadmap

### straw-person

- modules
- multi-line comments
- path literals
- template strings

### clay-person (0.1?)

- packages
- graph literals
- linter

### iron-person

- web stack
- 'engine'
- ffi (at least call into js)
- uri literals
- tree literals
- language extension points

### steel-person (1.0)

- slanghub
- running in the browser
- standalone node-based interpreter agent/service
- argots (components, cqrs/microservices, lang-dev, game)