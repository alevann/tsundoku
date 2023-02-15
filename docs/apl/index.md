# Re: APL

!> __Warning__ this page is a still draft

Welcome to the APL section of the website, here you can find random stuff about APL, a programming language for which I've grown an unhealthy interest.
Hidden in these pages there's a bunch of resources, explanations, and other things that I felt compelled to write about, all regarding APL.

If you're not familiar with APL, I suggest reading the following getting started section, otherwise use the sidebar to jump into some topic.

* [Re: APL (this page)](#re--apl)
* [Some history](#some-history)
* [Dialects](#dialects)
* [Getting started](#getting-started)
  * [Functions](#functions)

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

Quite intuitive if I do say so myself, regardless, let me quickly introduce _some_ of those hieroglyphics:

> __Note__ for simplicity's sake I am mixing monadic and dyadic descriptions in the same category depending on how they are used in the Fibonacci example above

| Symbol      | Name       | Function description              |
|-------------|------------|-----------------------------------|
| `←`         | left arrow | The usual assignment operator     |
| `{` and `}` | braces     | Function declaration / definition |
| `∊`         | epsilon    |                                   |
| `¨`         | each       | For each                          |

<sub>Part of the table was taken from [trying apl][1]</sub>

### Functions

Functions in APL can only be one of three types (this is a lie):

1. niladic
2. monadic
3. dyadic

Each type of function determines the number of arguments expected by the function.
Functions that behave differently based on the number of arguments are called **ambivalent**.

Function arguments have magic names that you can use to access them, kind of like how in bash you can use `$n`, in APL you can use the totally convenient `⍵` to reference the RHS and `⍺` to reference the LHS. No, `⍵` and `⍺` may not be replaced with `w` and `a`, and no, `⍵` and `⍺` cannot be changed in any way.

```apl
⍝ Increments a number: defaults to +1 when used as monadic,
⍝ but allows to specify a different value when used as dyadic 
increment ← {
  ⍺ ← 1         ⍝ This statement is skipped, if ⍺ is provided 
  ⍵ + ⍺
}

⍝ output: 6 (monadic call)
increment 5

⍝ output: 7 (dyadic call)
2 increment 5
```

[niladic]: https://aplwiki.com/wiki/Niladic_function

## Sources and references

* [trying apl][1]
* [APL Wiki][2]

[1]: https://github.com/vendethiel/trying.apl
[2]: https://aplwiki.com/wiki/Main_Page
