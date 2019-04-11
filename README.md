# Slang

## About

A tiny toy for teaching/learning about PL implementation and design.

## Features
 - [x] arithmetic
 - [x] values
 - [x] function application
 - [x] function definition
 - [x] strings
 - [x] lists
 - [x] hashes
 - [x] blocks (multi-line fns)
 - [ ] classes
 - [ ] modules
 - [ ] load/import/require

    

## Syntax


### Arithmetic

We can do simple arithmetic with numbers and assign values to variables.
 
    2*3+4 # => 10
    pi = 3.1415926 # => pi

Create a simple lambda (the last value is returned implicitly):

    f = (x) => { b=x*2; x+b^2 }

For single-statement expressions the braces may be omitted:

    g = (x) => x+x^2+1

Invoke these functions with parens:

  g(3) # => 13

You can also omit parentheses if there are arguments:

  g 4

[Notes: If you emit `g` 'blindly' (without parens or args) it seems likely
you might be trying to use it in a higher-order fucntion, so Slang won't 
evaluate it on the spot but rather return the lambda as a value -- in the
repl this looks like.]

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

## Roadmap

'straw-person': modules

'clay-person' (0.1?): packages

'iron-person': web stack? 'engine'? (ffi? at least call into js???)

'steel-person': slanghub / running in the browser? standalone node-based interpreter environment? argots?