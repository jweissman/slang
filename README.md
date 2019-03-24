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
 - [ ] hashes
 - [ ] blocks
 - [ ] classes
 - [ ] modules
 - [ ] load/import/require

    

## Syntax

What do we have so far?

We can do simple arithmetic with numbers and assign values to variables.
 
    2*3+4 # => 10

Create a simple lambda:

    f = (x) => ...


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

---

Next steps: what would an interesting syntax look like for blocks? What seems important there?

Function-creating expression:

`f(a,b) { ... }`

This is now a named function `f` in the namespace it was created in.


Classes seem 'obvious':

```
class Http {
    get(path) { ... }
}
```

Modules feel similar:

```
module Web {
    class Page {
        get() { ... }
    }
}
```

(What about) other things -- things that aren't exactly a 'class' -- Aspects? Components? Interfaces? Models? -- 

Data structure notation:

```
(bread and butter)
list = [1,2,3,...otherList]
hash = { key: 'val', [computed]: 123, ...otherHash }

(more exotic things)
tree = <my><data/></my>
path = /usr/bin
uri = http://www.google.com
graph = {{
  a -> b
  b -> c
  c -> d
  d -> b
  c -> a
}}
pattern = /\w+/
---

site = google.com
body, _status = site.get
```

```
class Thing {}
class That extends Thing {}
class This extends Thing {}
interface Action {
  actor: Thing
  target: Thing
}
class Attack implements Action {
}
attack = Attack.new(actor: This.new, target: That.new)
```







### garb, rune, ward

garb could be like yarn, project management and dependency resolution (garb new/get/remove/run)
rune could be stylechecker
ward could be testing framework

`expect Slang to be awesome`

ward slang description 'jargon' (argot?)
```
# Slang.spec?
given/describe('I am using Slang', () => {
  when/context 'I solve a problem', () => {
    then/it 'is fun to have a language to express it simply in', () => {
      expect Slang to be_awesome
    }
  }
})

given 'I am using Slang', ->{
    before {

    }

    when 'I solve a problem with an argot', ->{
        then 'it is fun using new language dialects', ->{
            expect Slang to be_sweet
        }

        and {
          'i can see it from my house' -> expect house to be_visible
          'it is all working great' -> expect everything to be_working
        }
    }
}
```

argot -- dialect manager?  / package/gem(lib)??
rune -- metalang projector?


garb could be a makefile written in slang? a dialect for make-ish things optimized for building/running slang projects utilizing the graph notation?
`{* a->b b->c c->a *}.seek('b', 'b') # b,c,a,b`


speaker - big-picture ideas: slanghub/dialect database/distributed slang; 
        chatter -- twitter clone