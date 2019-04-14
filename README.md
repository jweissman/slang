# Slang

## About

A tiny toy for teaching/learning about PL implementation and design.

## Features
 - [x] arithmetic with variables
 - [x] shorthand and multi-line function definitions
 - [x] function application (parens optional)
 - [x] strings and lists
 - [x] blocks (multi-line fns)
 - [x] ternary conditionals
 - [x] hashes
 - [ ] classes
 - [ ] modules
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

```a=2;b=3;a>b # => false```

Switch based on a value:

```a>b?'bigger':'smaller' # => smaller``` 
```fib=(n)=>n>1?fib(n-1)+fib(n-2):1 # => lambda```
```fib 10 # => 89```

### Builtins

A few methods are provided as built-ins:

  - `p` to print (`p 1, 'hello' # => 1 'hello'`)
  - `iota` is an index space generator (`iota 3 # => [0,1,2]`). 
  - `min` and `max` (`max 10, 20 # => 20`)

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