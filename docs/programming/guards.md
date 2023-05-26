<!-- lazy:https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-swift.min.js -->
<!-- lazy:https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-haskell.min.js -->

# Re: Guards

Guards are statements that control the flow of execution of code, generally placed at the top of a scope, to _guard_ the rest of the code from bad state.
Guards statements also have the excellent property of producing code that is easier to read, compared to an equivalent solution that doesn't use guards.
<sup>[source][source]</sup>

[source]: https://www.youtube.com/watch?v=iOVbAmknKUk

> __Note__ the post is written in JavaScript but the concept applies to any language

For the sake of this explanation let's imagine a `login` function, which does some input validation, performs the login request, then returns `true` if the login is successful.

```js
async function login (username, password) {
  if (username !== null && username.length > 0) {
    if (password !== null && password.length > 0) {
      const response = await doLogin(username, password)
      return response.code === 200
    } else {
      console.warn('password cannot be null or empty')
    }
  } else {
    console.warn('username cannot be null or empty')
  }
  return false
}
```

While the function above is not particularly complicated, it still requires the reader to jump around trying to follow the various flow of logic.
Now compare the previous function with the following implementation using guards:

```js
async function login (username, password) {
  if (username === null || username.length === 0) {
    console.warn('username cannot be null')
    return false
  }
  if (password === null || password.length === 0) {
    console.warn('password cannot be null')
    return false
  }

  const response = await doLogin(username, password)
  return response.code === 200
}
```

Here the logic flows **straight downwards**, and each branch ends before the following begins.
The function starts with a bunch of validation and all the unhappy paths, while the happy path sits at the end of the function.

It may be easy to think that "guards" is just a name for if statements at the top of a scope, but **they are not**.
Guards are meant to be _short and easy to read_ at a glance, and most importantly they _terminate the execution of the scope early_.

```js
async function save (credentials, store) {
  // This is not a guard
  if (!store) {
    store = getDefaultStore()
  }

  return await saveLoginCredentials(credentials, store)
}
```

> __Note__ while guards can technically appear in the middle of a function, it's generally an indicator that the function you're writing does too many things.
> Instead, split the function into multiple, smaller functions.

Finally, here are some more examples of guard statements in other languages.

<!-- tabs:start -->

## **Swift**

Swift quite literally contains a `guard` keyword, it takes a condition and is always followed by an `else` clause which must either:

* call a function that never returns or,
* transfer program control outside the guard's statement enclosing scope

```swift
func login (username u: String?, password p: String?) -> Bool {
  guard u?.count ?? 0 > 0 && p?.count ?? 0 > 0 else { return false }

  /* Omitted for brevity */
  return response.code === 200
}
```

Check out the docs about the guard statement [here][swift-docs].

[swift-docs]: https://docs.swift.org/swift-book/ReferenceManual/Statements.html#grammar_guard-statement

## **Haskell**

As always, functional languages do things differently.
In Haskell (as in many other functional languages) guard clauses are called **pattern guards**, and instead of having explicit checks at the start of a function, it's overloaded once per pattern.
If a call doesn't match any overload, a compilation error is thrown.

```hs
holeScore :: Int -> Int -> String
holeScore strokes par
 | score < 0 = show (abs score) ++ " under par"
 | score == 0 = "level par"
 | otherwise = show(score) ++ " over par"
 where score = strokes-par
```

Read more about pattern guards in Haskell [here][haskell-docs]. Example taken from [here][haskell-pattern-guard-example].

[haskell-docs]: https://wiki.haskell.org/Pattern_guard
[haskell-pattern-guard-example]: https://www.futurelearn.com/info/courses/functional-programming-haskell/0/steps/27226

<!-- tabs:end -->
