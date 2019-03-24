# Slang

## About

A tiny toy for teaching/learning about PL implementation and design.

...

## Ideas

    - "Jargon" or dialects you can project a 'metalang' into
    - Polymorphic/higher-kinded types
    - Components built into language (first-class 'componentiation' operator, function 'modulation' -- )
    - ...but let's start very simple, with:
        - arithmetic
        - values
        - function application
        - function definition
        - strings
        - blocks
        - lists
        - load/import/require

    - weird ideas: slanghub/dialect database/distributed slang; 
        chatter -- twitter clone

## Syntax

What do we have so far?

We can do simple arithmetic with numbers and assign values to variables.

These variables can also be functions; we have a shorthand lambda syntax, but it only works for one-liners:

    f = (x) => ...

This seems to work okay so far. I keep thinking it would be interesting to go ahead and permit partial application 'automatically' so that multiple args can be stepwise curried. 

---

Next steps: what would an interesting syntax look like for blocks? What seems important there?

Function-creating expression:

f(a,b) { ... }

This is now a named function `f` in the namespace it was created in.


Classes seem 'obvious':

class Http {
    get(path) { ... }
}

Modules feel similar:

module Web {
    class Page {
        get() { ... }
    }
}

Interesting other things -- things that aren't exactly a 'class' -- Aspects? Components? Interfaces? Models? -- 

Data structure notation:

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

---

site = google.com
body, _status = site.get


===

names for tools -- garb, rune, ward, ?