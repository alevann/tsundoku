# Re: Guards

Guards are statements that control the flow of execution of code, generally placed at the top of a scope, to _guard_ the rest of the code from bad state.
Guards statements also have the excellent property of producing code that is easier to read, compared to an equivalent solution that doesn't use guards.
<sup>[source][source]</sup>

[source]: https://www.youtube.com/watch?v=iOVbAmknKUk

For the sake of this explanation let's imagine a `login` function, which does some input validation, performs the login, then returns `true` if the login is successful.

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

While it may be easy to think that "guards" is just a name for if statements at the top of a scope, **they are not**.
Guards are meant to be _short and easy to read_ at a glance, and most importantly they _terminate the execution of the scope early_.

The following example further illustrates how to differentiate a guard against an if statement.

```js
async function login (username, password) {
  // These are guards
  if (username === null || username.length === 0) {
    return console.warn('username cannot be null')
  }
  if (password === null || password.length === 0) {
    return console.warn('password cannot be null')
  }

  let response = await doLogin(username, password)
  
  // This is also a guard
  if (response.code > 399) {
    console.warn('Login request failed', response)
    return moveToErrorScreen()
  }
  
  // This is not a guard (does not quit the function early)
  if (response.code > 299) {
    response = await followRedirect(response)
  }
  
  const didSaveCredentials = await saveLoginCredentials(username, password)

  // This is not a guard (it's at the end of the function)
  if (didSaveCredentials) {
    moveToNextScreen()
  } else {
    moveToErrorScreen()
  }
}
```

Finally, here are some more examples of guard statements in other languages.
Notice that while each language does its own thing, guard clauses all protect the code following

<!-- tabs:start -->

## **Swift**

Swift quite literally contains a `guard` keyword, it takes a condition and is always followed by an `else` clause which must either:

* call a function that never returns or,
* transfer program control outside the guard's statement enclosing scope

```swift
func login (username u: String?, password p: String?) -> Bool {
  guard u?.count ?? 0 > 0 && p?.count ?? 0 > 0 else { return false }
  return true
}
```

Check out the docs about the guard statement [here][swift-docs].

[swift-docs]: https://docs.swift.org/swift-book/ReferenceManual/Statements.html#grammar_guard-statement

## **Haskell**

Haskell has an interesting approach to guard clauses, instead of having an explicit check at the start of a function, Haskell uses guards to overload the same function.
If a call doesn't match any overload, a compilation error is thrown.

> __Note__ it appears this is a common pattern in functional languages, since Erlang has a similar concept

```hs
explainReturnCodes :: Int -> Int -> String
explainReturnCodes x y
  | z == 0 = "Both programs succeeded"
  | z >= 2 = "Both programs failed"
  | otherwise = "Only one program failed"
  where z = x + y
```

Read more about pattern guards in Haskell [here][haskell-docs].

[haskell-docs]: https://wiki.haskell.org/Pattern_guard

<!-- tabs:end -->
