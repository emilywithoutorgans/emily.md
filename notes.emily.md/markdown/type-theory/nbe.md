# normalization by evaluation (NbE)

These are my notes from reading this webpage: https://davidchristiansen.dk/tutorials/nbe/

The second section of this document (after "optimization") is sourced from here: https://github.com/AndrasKovacs/smalltt

The central problem within a dependent type system is that you need to determine when two types are the same. This is not a structural equality check like in normal type systems because types may contain programs, and those programs need to be evaluated to determine whether two types are truly the same.

## evaluating untyped $\lambda$-calculus

A computation occurs when a closure is applied to some other value.

Important thing of note here: an **abstraction** ($\lambda x.\,t$) is a syntactic construct. It's completely agnostic of any runtime state and lives in the grammar.

A **closure** is a semantic value. It's what you get when you evaluate an abstraction in an **environment** (marked by $\rho$). A closure is an abstraction + capture of the environment where it was born, i.e. a pairing $(\rho, \lambda x.\,t)$.

Note that closures don't store the parameter as a string like abstractions do. They're just a "symbol" concept.

The environment here will just be a list of pairs, with variable names in the first slot and "values" in the second.

**Extending** an environment just means adding a new name-value association.

### evaluation

We'll have two functions:

#### eval

`eval` takes an environment $\rho$ and an *expression* `e` and returns a value `v`.

If we're given an *abstraction*, we'll just a construct a closure with the environment we were given and return that.

If we're given a *variable name*, we'll perform a look up in the environment and return the value.

If we're given an *application*, then we'll call `apply` with the abstraction and the argument expression like so:

```ts
return apply(eval(ρ, abstraction), eval(ρ, argument_expr))
```

#### apply

`apply` takes a closure and an argument value. First we'll check that the closure is indeed a closure. Then we'll add a new entry into the environment, `(parameter_name, argument_value)`, then run `eval` on the abstraction body.

### definitions

In order to implement definitions, you basically just extend the environment with the `eval`ed definition body.

## generating fresh names

`freshen` takes a list of idents `used` and an ident `x` and returns a new ident with asterisks appended until it doesn't appear in `used`

## normalizing untyped $\lambda$-calculus

So the main idea is that if we want to tell if two expressions are the same, we'll have to *normalize* them before comparing them.

As they say, there is an "equational theory" for telling when two expressions mean the same thing.

The first rule is $\alpha$-equivalence. Renaming a parameter doesn't change the meaning of an expression.

The second rule is $\beta$-reduction, or that an function call is the same as its evaluation.

Equations that are equivalent through only $\alpha$ and $\beta$ steps are called $\alpha\beta$-equivalent.

Since $\alpha\beta$-equivalence is an equivalence relation, the author invites us to think about equivalence classes of expressions up to $\alpha\beta$-equivalence. **Normalization** is choosing one canonical expression in the class and having a procedure so that for any expression, we can convert to the canonical one in its class. The "canonical expression" is called the **normal form** of any other expression in the class. (This sounds a lot like a union-find.)

The author then says here that one choice of normal form is expressions that have no reducible expressions (redexes).

> Because $\alpha$-equivalence is easier to check than $\beta$-equivalence, most people consider normal forms with respect to the $\beta$-rule only, and then use $\alpha$-equivalence when comparing $\beta$-normal forms.

### finding normal forms

Here they roast direct syntactic $\beta$-reduction, where you attempt to do plain substitution directly in the syntax tree by syntactically copying the argument and replacing every parameter reference with it. You don't use an environment with this procedure. They list two problems:

- Maintaining $\alpha$-conversion is a nightmare, ex. $(\lambda x.\,\lambda y.\,x)\,y$
- In immutable contexts, you'd have to rebuild the syntax tree every time 

Alternatively, you can just reuse the evaluator we built in the last section and add a new function, `quote`, that turns a value back into an expression. In that function, we also take a list of used names, to avoid variable collisions.

Since NbE evaluates recursively, you need to be able to normalize expressions with "free" variables. These might actually be bound in some outer scope, but they have no definition other than being a parameter, for example.

Unevaluable expressions are called neutral. There are neutral variables and neutral applications.

#### quote

The problem with writing `quote` is that, when quoting a closure, there is no way to convert the parameter "symbol" back into a string. 

However, what we can do is add the symbol into the environment with a fresh variable as its "neutral" value, evaluate the body, then `quote` the result, and now we can wrap it in an abstraction with that fresh variable as the parameter name.

#### apply

The only thing we're changing here is forming a neutral application when the given function is not a closure.

#### norm

This is just `eval`ing, then `quote`ing.

## bidirectional type-checking

> Sometimes, [...] an algorithm can be read directly from the rules that define the type system. This typically occurs when at most one rule applies in any-given situation. Because the syntax of the program and the type determine which choice to take, this property is called being syntax-directed.

Bidirectional type checking is a technique for making type systems syntax-directed.

Here's a single rule from the simply-typed $\lambda$-calculus they mention which renders it not syntax-directed.

$$\frac{
 \Gamma, x : t_1 \vdash e : t_2
}{
 \Gamma \vdash \lambda x . e : t_1 \to t_2
}$$

If you have the bottom, then there's nowhere to get $t_1$ from. You have a single unannotated parameter that doesn't tell you its type. It's just, "whatever works so that $e : t_2$".

### how it works

You have two modes. You can *check* whether an expression has a type you supply, and you can *synthesize* a type from an expression.

It is possible to check that $e$ has type $t$: $\Gamma \vdash e \Leftarrow t$

It is possible to synthesize type $t$ from $e$: $\Gamma \vdash e \Rightarrow t$


Usually, you use checking for introduction forms. 

You need annotations when a introduction form (like a lambda) is used in a place where the system is expecting to synthesize a type, e.g. $(\lambda x.\,x)\,y$. The type system needs to figure out the type of $\lambda x.\,x$ before applying it.

This case is rare because most systems default to checking lambdas rather than trying to synthesize them.

> When reading bidirectional type systems, start below the line. If the conclusion is synthesis, then the rule applies when the expression matches. If the conclusion is checking, then the rule applies when both the expression and the type match the rule.

> Having discovered that a rule matches, next check the premises above the line from left to right and from top to bottom

> In general, introduction forms require type checking, not synthesis, although it is possible to implement Nat using synthesis because its constructors are so simple. But lists, for example, do not have an explicit indication of the type of entries in the list, so checking them against a known list type allows that information to be extracted and propagated.

## typed NbE

We're going to add a new judgement $\Gamma \vdash e_1 = e_2 : A$ that expresses that $e_1$ and $e_2$ both have type $A$ and they are considered to be equal.

Then we can express:

1. $\eta$-conversion: $(\lambda x.\,f\,x) = f$

2. Abstractions with equal bodies are equal

3. $\beta$-reduction

### quote

In typed NbE, a value is quoted *with* its type as an additional parameter. The type must be correct, and the function actually recurses on that instead of the value itself.

For example, if you run into a function type $A \to B$, then you quote the value into an abstraction. You `apply` the value with a neutral variable $x$ typed with the domain type $A$. Then you `quote` the result with type $B$.

### convert

`convert` takes two values, a type that represents both of them, and checks whether they are convertible, i.e. they're $\alpha$-equivalent when `quote`d.

## metavariables

(These are my own notes not sourced from anywhere in particular.)

Metavariables are holes, or semantic placeholders for terms that aren't yet known, but are to be solved during evaluation or unification (think "term to be discovered"). They live in the meta-level, not runtime.

Usually written `?x` where `x` is a unique ID. NbE treats them as neutral (stuck) until solved.

They can be solved by unification or explicit assignment, and once solved, they're quoted back into the syntax. 

You use an **occurs check** to avoid cyclic solutions. If you want to unify a metavariable `?x` with some term `t`, you need to check that `?x` doesn't appear in `t`. 

```
?x := ?x -> Nat
```

This will lead to an infinite loop.

If you really want to use recursive types, then use something like isorecursive types.

Sometimes you need to perform **zonking**, or a term walk applying all known variables to detect mutual recursion, like so:

```
?y := ?x
?x := ?y -> Nat
```

zonk

```
?x := ?x -> Nat
```

occurs check fail

### contextual metavariables

Contextual metavariables abstract over the entire environment it's created in.

In smalltt, they give the following example:

```
id2 : (A : U) → A → A
 = λ A x. id _ x
```

The `_` denotes a hole to fill with a metavariable. If the programmer were to explicitly annotate, they would have put `A` instead of `_`.

The elaborator replaces `_` with `(?0 A x)`, as in, a function call to `?0` (a fresh metavariable) with `A` and `x`, the entire environment, as arguments, then it adds the following a top-level definition:

```
?0 = λ A x. A
```

> Smalltt's particular flavor of contextual metavariables puts metas in mutual top-level blocks in the elaboration output. Other setups are possible, including elaborating solved metas to local let-definitions, but those are significantly more complicated to implement.

The elaborator is really just a unification engine that's integrated with NbE. Smalltt uses *pattern unification* to produce solutions.

### meta freezing

In pattern unification, terms are classified as "rigid" (the outer leaf is a constant) or "flexible" (the outer leaf is a metavariable).

Generally, you want to prioritize rigid-rigid equations and delay solving flexible-flexible ones (`?F(...) = ?G(...)`). When the latter is encountered, both metavariables are frozen until more information is available. More on this later.

### metacontext

A meta context maps meta IDs to their context, their status (frozen/unfrozen/solved), and their solution.

## optimizations

### glued evaluation

The problem is that you have two conflicting goals: you want fast evaluation in conversion checking while you also want minimal output during quoting, so it's user friendly and performant.

If you don't unfold in the conversion checker, though, it plain doesn't work. You need that, so what you do is you glue both the folded and unfolded versions together, so `quote` can work with the folded version and the conversion checker with the unfolded version.

### strict vs. lazy evaluation

Laziness is expensive. If you're lazy everywhere, you're gonna die from indirection and cache-misses.

> Smalltt has the following approach:
>- Top-level and local definitions are lazy.
>- We instantiate Pi types during elaboration with lazy values.
>- Applications headed by top-level variables are lazy.
>- Any other function application is call-by-value during evaluation.

In glued evaluation, top-level spines (e.g. the `map` in `map id xs`) must be lazily evaluated in glued evaluation because you need to preserve both the syntactic head + arguments (for minimal quoting) and the semantic result (for conversion checking). The entire point of glued evaluation collapses if you eagerly reduce top-level application chains.

### approximate conversion checking

> If I [...] have `oneMillion` as a definition, checking that `oneMillion` is convertible to itself should immediately return with success, without unfolding the numeral.

> An important property here is whether a system permits approximate meta solutions. For example, if I unify `f ?0 = f ?1` where `f` is a defined function, I might skip computing the `f` application, and pretend that `f` is injective, solving `?0` with `?1`. But if `f` is actually a constant function, this causes `?0` and `?1` to be unnecessarily equated. AFAIK Coq and Lean both permit approximate solutions, and Agda does not.

> Another property is how **optimistic** the approximation algorithm is. A very optimistic algorithm might do the following: if we have identical defined head symbols on sides, first we try to unify spines, and if that fails we retry with unfolding. This algorithm expects that unifiable values are nearby, i.e. reachable after few reductions. The downside of unbounded optimism is that recursive backtracking can cause massive slowdown when unifiable values are not in fact near.

#### examples

Taken directly from the README.md

We unify `cons oneMillion (cons oneMillion nil)` with itself. Assume that `cons` and `nil` are rigid term formers for lists. We start in rigid mode, which recurses under the `cons`-es, and tries to unify `oneMillion` with itself twice. Both cases succeed speculatively, because head symbols match and `oneMillion` is applied to zero arguments.

We unify `const true true` with `const true false`, where `const` is a top-level definition. We start in rigid mode, and since we have `const` head on both sides, we try to unify spines in flex mode. This fails, since `true /= false`. So we unfold the `const`-s, and unify sides in full mode.

In short, smalltt unification backtracks at most once on any path leading to a subterm ("sub-value" actually, since we recurse on values).

### paired values

During inference or checking, you don't carry one value, but you carry two: a least-reduced form, and a most-reduced form. They're convertible, but the former (least-reduced) is optimized for quoting, printing, and meta solutions, while the latter (most-reduced) is optimized for checking pi types, unification, and conversion checking. 

When we do checking, we often have to weak-head normalize (normalize until the first rigid head), but we don't want to throw away the result of the normalization, so we include it as the most-reduced form.

### $\eta$-short meta solutions

> $\eta$-expansion increases code size and makes evaluation of code slower.

In a standard syntax-directed $\eta$-conversion checker, the routine goes:

If you have lambdas on both sides, recurse.

If you have a lambda on only one side, (e.g. $\lambda x.\, t_1 \stackrel ? = t_2$) then pick a fresh variable $y$, build $t_2\,y$, then recurse on $t_1 \stackrel ? = t_2\, y$.

Then, only attempt solving metavariables after checking the above two cases.

However, the problem here is that if we unify `?0 = f` where `f` is defined as `λ x. t`, then this routine would only solve after the second case, where you get `?0 = λ x. t`. This is unnecessary, since we could have just had `?0 = f`.

Thus, smalltt adds a sort of "fast path" where if one side is a metavariable, then you unify right away so that you don't have to make a new metavariable and you get an $\eta$-short solution right away.

However, this fast path might fail due to occurs check, so you'll have to fallback anyways in very rare cases.

There is also an additional $\eta$-contraction in the pattern unifier in the case where it's unifying something like `?0 x y z = ?1 x y z`. You can contract to `?0 = ?1` if:

- The arguments are all distinct variables
- Bound linearly (once)
- Applied in the same order to both sides

### quoting modes

In pattern unification, you're attempting to unify `?m x₁ x₂ ... xₙ = rhs`

First constraint is scoping. `rhs` may not refer to any variables other than `xᵢ`. Since values use De Bruijn levels, you can map them to De Bruijn indices in the solution term via a renaming structure (closure renamer/substitution environment/quoting context).

Second constraint is occurs check.

The naive way to quote would be to fully $\beta$-normalize `rhs` when quoting, but in practice this explodes the term with, e.g., abstractions that just rename.

What smalltt does is quote `rhs` without unfolding top-level defs or any previously solved meta. Problem is, you still have to check that lhs is convertible to rhs up to $\beta$-equivalence.

Quoting has three modes: `rigidQuote`, `flexQuote`, and `fullCheck`.

#### rigidQuote

It's the default mode. If you hit a variable that's nt in scope, throw an error. If you hit an unfoldable definition, `flexQuote` its spine, then `fullCheck` it. Then return to rigid quoting.

#### flexQuote

Flex quoting might produce broken terms. It's used when quoting terms under unfoldings, inside meta heads, or spines that may not be valid. 

It returns an expression and a boolean flag signifying definite validity or possible invalidity.

If you hit a var that's out of scope, you return an `Irrelevant` expression and flag it as invalid. If `Irrelevant` is semantically unused, then we're good.

#### fullCheck

This just checks a term for scoping validity. Throws an error on invalid free vars. It's for checking if a `flexQuote`d term is actually valid, if flex returned a possibly-invalid flag.

### meta freezing

If metavariables are unable to be solved within the top-level definition that it appears in, then it's frozen and cannot be solved within another definition. Otherwise, you might have solutions that don't respect scope.

Meta freezing is also useful because you can just ignore frozen metas in occurs checks. During an occurs check you visit each active meta that appears in your term only once by using a set.

Thus, this example checks fast:

```hs
dup : {A} → A → Pair A A
 = ...

pairTest =
  let x0  = dup U ;
  let x1  = dup x0;
  let x2  = dup x1;
  ...
  x20
```

### more resources

https://github.com/rocq-prover/rocq/issues/12526