# $\infty$-topos semantics

Source: <https://emilyriehl.github.io/files/semantics.pdf>

## Review

I omitted some kind parameters for clarity. Hope free variables can be inferred okay

### Set

A **set** is a proof irrelevant type (all proofs are identical)

```ts
type Set = A: * & {
    trunc: p, q: (x = y) -> p = q
}
```

### Category

A **category** is a type of objects, a set of morphisms, composition, unitality, associativity

```ts
type Category = ℂ: * & {
    Hom: X: ℂ -> Y: ℂ -> Set,
    id: X: ℂ -> Hom(X, X),
    *: Hom(B, C) -> Hom(A, B) -> Hom(A, C),
    uniL: f: Hom(A, B) -> f = id(B) * f,
    uniR: f: Hom(A, B) -> f = f * id(A),
    assoc: f: Hom(A, B) -> g: Hom(B, C) -> h: Hom(C, D) -> h * (g * f) = (h * g) * f
}
```

### Functor

A **functor** is a mapping `F` of objects (of a category) into another category and also a mapping `fmap` of morphisms (between objects)

```ts
type Functor<A: Category, B: Category> = F: (A -> B) & {
    fmap: A.Hom(X, Y) -> B.Hom(F(X), F(Y)),
    idLaw: fmap(A.id(X)) = B.id(F(X)), // n.b. both sides are morphisms
    compLaw: f: A.Hom(A, B) -> g: A.Hom(B, C) -> fmap(g * f) = fmap(g) * fmap(f)
};
```

### Presheaf

A **presheaf** is a functor but with `pmap` instead of `fmap`. That is, the direction of the morphisms are reversed

```ts
type Presheaf<A: Category, B: Category> = P: (A -> B) & {
    pmap: A.Hom(X, Y) -> B.Hom(P(Y), P(X)), // swapped
    idLaw: pmap(A.id(X)) = B.id(P(X)),
    compLaw: f: A.Hom(A, B) -> g: A.Hom(B, C) -> pmap(g * f) = pmap(f) * pmap(g) // swapped
};
```

## Simplex category

```ts
type NSimplex<n: Nat> = m: Nat & { p: m <= n };

type Simplex = NSimplex<n: Nat!>;
// forward reference
// type Simplex = NSimplex<n> & { n: Nat }

type OPM<A: Simplex<n: Nat>, B: Simplex<m: Nat>> = f: A -> B & { 
    // i, j: Simplex<n: Nat>
    p: i <= j -> f(i) <= f(j)
};

function *(g: B -> C, f: A -> B): A -> C
    = a |-> g(f(a))


// order preserving map
const SimplexCategory: Category = Simplex & {
    Hom(A, B): OPM<A, B>,
    id: (x |-> x) & { p: i,j,p |-> p },

    // need to prove g(f(i)) <= g(f(j))
    // i <= j
    // therefore, f(i) <= f(j)
    // set x = f(i), y = f(j)
    // x <= y
    // therefore, g(x) <= g(y)
    *(g,f) = g*f & { p: i,j |-> p |-> g.p(f(i), f(j), f.p(i, j, p)) },

    // need to prove f = id(B) * f
    // function part:
    // f = a |-> (x |-> x)(f(a))
    // f = a |-> f(a)
    // judgementally equal, so `refl(f)` suffices
    // proof part:
    // f.p = i,j |-> p |-> (i,j,p |-> p)(f(i), f(j), f.p(i, j, p))
    // f.p = i,j |-> p |-> f.p(i, j, p)
    // judgementally equal, so `refl(f.p)` suffices
    uniL(f) = refl(f) & { p: refl(f.p) },
    uniR(f) = refl(f) & { p: refl(f.p) },

    // too lazy
    assoc(f, g, h) = ?
};
```

