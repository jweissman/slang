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

#### blocks

so what is the shape of our block notation? do we need a specialized
multiline lambda syntax... let's think about it

we have `() => ...` style definition, why not `() => { ...; ... }` style?

that would at least let us start testing local variable issues
quicker and see if we need to do renaming kind of things??

then we can at least now build dirt-simple "objects" with `{ meth: () => { ... } }` and not be so contrained? 

[one further/]a notation we could accept in a hash defn might be
a little short method defn `{ meth() {...}, methB() {...} }`

[one question here might be: are these expressions also available 'in the free'? can i just say `foo() {}` and now `foo()` is a funcall in that scope? is it an expression?? (probably not for now but..? it seems like we'll need it at least in the definition of the hash key-value tuple)]

#### destructuring

we should be able to use array ellipsis 'inversely' in method definitions to
do destructuring -- even more interesting would be able to decompose a hash
along this sort of structure (ie `meth({key}) { p(key) }`)

(just a point to contemplate: this kind of implies you should be able to destructure 'in the free' somehow, what might be a good notation for that?)

#### typing

we can play in dynamicland all day and have this trivial type system that only
explodes at the last minute, i guess that's fine not to really worry about it --
but we already do have a type system, i guess the question is whether we should
try to analyze anything around that -- it seems like we may have to defer the 
whole notion of type literal definitions (ie `type x = a | b ...` kind of thing)
but maybe there's something in between?


## garb, rune, ward

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