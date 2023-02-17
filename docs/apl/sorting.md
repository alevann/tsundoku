<!-- lazy:https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-apl.min.js -->

# Sorting in APL

I'm no programming guru, so this may be common in some other math heavy languages, but I've never seen anything quite like it.
Indeed, sorting in APL is... peculiar?

Let me start by saying that it's possible to use standard sorting algorithms in APL, such as [this quicksort][quicksort]:

```apl
⍝ A "terse rendition" of quicksort in APL
Q←{1≥≢⍵:⍵ ⋄ S←{⍺⌿⍨⍺ ⍺⍺ ⍵} ⋄ ⍵((∇<S)⍪=S⍪(∇>S))⍵⌷⍨?≢⍵}
```

Terse indeed, with such obvious code like that you may wonder: how else would you sort your array, if not with what looks like a chat between two teenagers from the early 00s?
Well, let me answer that for you: the solution is to use the **Grade** functions, namely `⍋` (or _Grade Up_) and `⍒` (or _Grade Down_). Pretty much you use it like this:

```apl
⍝ Sort ⍵ in ascending order
⍵[⍋⍵]
```

> __Note__ that's just `⍋`'s _monadic_ form, the _dyadic_ form only applies to strings (i.e. character array arguments).
> It's [not supported by all dialects][dyadic-grade], and generally out of the scope of this post.

Grade (both `⍋` and `⍒`) return a **permutation vector** whose length matches the input array's length, indexing in the input argument using the permutation vector gives the sorted array.
If you've ever studied math, or made even a basic 3D renderer that uses a projection matrix this should be quite intuitive, but if you didn't quite get it, let me give you a concrete example:

```apl
⍝ Initialize a vector with some numbers in it
⍝ The sorted output is [2, 18, 33, 54, 97]
a ← 33 18 97 2 54

⍝ Assign to 'b' the Grade Up permutation vector of 'a'
⍝ 'b' is now equal to [3, 1, 0, 4, 2]
b ← ⍋a

⍝ Assign to 'c' the value of indexing 'a' with 'b'
c <- a[b]
```

You know a concept is easy to grasp when all you need to explain it is a definition, an example code snippet, and another example code snippet this time in another, imperative language:

```python
# The equivalent of the previous APL code in python
a = [33, 18, 97, 2, 54]
b = GradeUp(a)
c = map(b, lambda i: => a[i])
```

To me this is quite an interesting approach to sorting, I find it fascinating.
As for **why** this is the way they decided to implement it like this... well...
If anyone knows, or figures out please tell me, open an issue on GitHub or something, I need to know. 

[quicksort]: https://www.dyalog.com/blog/2014/12/quicksort-in-apl/
[dyadic-grade]: https://aplwiki.com/wiki/Grade#:~:text=J%20does%20not%20implement%20dyadic%20grade%2C%20but%20provides%20Sort%20By%20as%20the%20dyadic%20counterparts%20of%20/%3A%20and%20%5C%3A%20instead.
