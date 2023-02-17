<!-- lazy:https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-apl.min.js -->

# Re: APL

!> __Warning__ this page is a still draft

Welcome to the APL section of the website, here you can find random stuff about APL, a programming language for which I've grown an unhealthy interest.
Hidden in these pages there's a bunch of resources, explanations, and other things that I felt compelled to write about, all regarding APL.

If you're not familiar with APL, I suggest reading the following getting started section, otherwise use the sidebar to jump into some topic.

## Some history

APL was developed in the 1960s by Kenneth E. Iverson, a canadian computer scientist famous for creating a programming language.

## Dialects

APL has multiple dialects (or implementations) some of which include:

* Dyalog
* APLX
* J
* BQN

Moving forward, unless otherwise specified, I'll be referencing Dyalog APL.

## Getting started

APL is a programming language based on mathematical notation; as you can imagine that means APL is extremely intuitive, even to the untrained eye.
For example, a simple hello world in APL looks like the following:

```apl
'Hello world!'
```

Neat right? By default, when given an expression APL prints it to the console.
Now if you'll allow, let me introduce to you: **Doctors' Handwriting: Code Edition**.

```apl
⍝ A stack-recursive fibonacci
⍝ Yes, amogus denotes a comment
fibonacci ← {
  ⍵∊0 1:⍵
  +/∇¨⍵-1 2
}
```

Quite intuitive if I do say so myself.

##

## Sources and references

* [trying apl][1]
* [APL Wiki][2]

[1]: https://github.com/vendethiel/trying.apl
[2]: https://aplwiki.com/wiki/Main_Page
