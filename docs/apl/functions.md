# Functions

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
