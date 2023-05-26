# Classes

Classes in JavaScript are an _absolute travesty_, users coming from **actual** OO languages like Java or C#
are misled into believing that JavaScript supports classes and is therefore an OO language, but that is **not** the case.
JavaScript was always based on `Prototype`s (which themselves are terrible), and **classes are nothing more than
syntactical sugar on top of prototypes**.

<!-- tabs:start -->

## **Class**

Here's what a normal class looks like in JavaScript:

```js
class Human {
  constructor (name, lang) {
    this.name = name
    this.lang = lang
  }

  greet (human) {
    return `Hi ${human.name}! I'm ${this.name}, and I speak ${this.lang}.`
  }
}
```

## **Prototype**

The class implementation is _exactly_ identical to this function implementation:

```js
function Human (name, lang) {
  this.name = name
  this.lang = lang
}

Human.prototype.greet = function (human) {
  return `Hi ${human.name}! I'm ${this.name}, and I speak ${this.lang}.`
}
```

<!-- tabs:end -->

If we were to execute the below code while swapping out `Human` between the class and the function implementation, the result would be identical:

```js
const bob = new Human('Bob', 'english')
const alice = new Human('Alice', 'spanish')

bob.greet(alice) // Hi Alice! I'm Bob, and I speak english.
alice.greet(bob) // Hi Bob! I'm Alice, and I speak spanish.
```

While this can seem fine at first, actually it's riddled with issues, most of which come from the `this` keyword,
and the fact that prototypes are terrible. Just... straight up, don't use them. Seriously.
Below are some examples of the problems I was talking about:

- The `this` keyword in general should be avoided whenever possible
  ```js
  bob.greet = bob.greet.bind(alice)
  bob.greet(alice) // Hi Alice! I'm Alice, and I speak spanish.
  ```

- The resulting object has no guarantees of shape nor type
  ```js
  // No guarantees of shape
  delete bob.lang
  alice.age = 27
  
  // No guarantees of type
  Object.setPrototypeOf(bob, Array.prototype)
  bob instanceof Human // false
  bob instanceof Array // true (bob is now an array ??)
  ```

- Prototypes can be changed at any point
  ```js
  Human.prototype.greet = function (human) {
    return `I don't like you, ${human.name}!`
  }
  
  alice.greet(bob) // I don't like you, Bob!
  bob.greet(alice) // Hi Alice! I'm Alice, and I speak spanish.
  ```

Notice how in the last example, the calls to `greet` produce different outputs.
That's because **prototypes are not classes**, and they don't work like classes.

When a `Human` object is created it has no `greet` function defined on it,
instead when `greet` is called JavaScript checks the properties of both the object and its prototype.
That's why `bob` did his own thing while `alice` respected the prototype,
because we assigned a value to `bob.greet`, while `alice.greet` is still undefined.

Hopefully by now you understand why I hate classes in JavaScript. Especially when there's a much better alternative,
here's how that same code could be written while avoiding all those issues:

```js
const Human = function (name, lang) {
  const greet = (human) => {
    return `Hi ${human.name}! I'm ${name}, and I speak ${lang}.`
  }
  return Object.freeze({ name, lang, greet })
}
```

Not only is that much shorter and more readable, it also has none of the issues mentioned previously.
The result of the function has a guaranteed shape because of `Object.freeze`,
and the behaviour cannot be altered with neither `this` or `Prototype` changes.

Inheritance can also be implemented in this way, through composition! Which is a lot better than inheritance too.

<!-- tabs:start -->

## **Class**

```js
class Shouter extends Human {
  greet (human) {
    return super.greet(human).toUpperCase()
  }
}
```

## **Function**

```js
const Shouter = (name, lang) => {
  const { greet, ...rest } = Human(name, lang)
  return Object.freeze({
    ...rest,
    greet: (human) => greet(human).toUpperCase()
  })
}
```
<!-- tabs:end -->
