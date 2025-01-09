# simplicial sets

Source: <https://emilyriehl.github.io/files/ssets.pdf>

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
type Functor<ℂ: Category, 𝔻: Category> = F: (ℂ -> 𝔻) & {
    fmap: ℂ.Hom(X, Y) -> 𝔻.Hom(F(X), F(Y)),
    idLaw: fmap(ℂ.id(X)) = 𝔻.id(F(X)), // n.b. both sides are morphisms
    compLaw: f: ℂ.Hom(A, B) -> g: ℂ.Hom(B, C) -> fmap(g * f) = fmap(g) * fmap(f)
};
```

### Contravariant functor

A **contravariant functor** is a functor but with `cmap` instead of `fmap`. That is, the direction of the morphisms are reversed.

```ts
type CFunctor<ℂ: Category, 𝔻: Category> = F: (ℂ -> 𝔻) & {
    cmap: ℂ.Hom(X, Y) -> 𝔻.Hom(F(Y), F(X)), // swapped
    idLaw: cmap(ℂ.id(X)) = 𝔻.id(F(X)),
    compLaw: f: ℂ.Hom(A, B) -> g: ℂ.Hom(B, C) -> cmap(g * f) = cmap(f) * cmap(g) // swapped
};
```

### Presheaf

A **presheaf** is a contravariant functor from a category to $\mathrm{Set}$.

```ts
type Presheaf<ℂ: Category> = CFunctor<ℂ, Set>;
```

Presheaves form their own category with "presheaf homomorphisms" (natural transformations) between them.

## Simplex category

```ts
type NSimplex<n: Nat> = m: Nat & { p: m <= n };

type Simplex = NSimplex<n: Nat!>;
// forward reference
// type Simplex = NSimplex<n> & { n: Nat }

// order preserving map
type OPM<A: Simplex<n: Nat>, B: Simplex<m: Nat>> = f: A -> B & { 
    // i, j: Simplex<n: Nat>
    p: i <= j -> f(i) <= f(j)
};

function *(g: B -> C, f: A -> B): A -> C
    = a |-> g(f(a))


type SimplexCategory: Category = Simplex & {
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

### Order-preserving maps

For any $n \geq 0$ there are $n+1$ injections and surjections.

The injections $d^i\colon [n-1] \to [n]$ are called coface maps, and the surjections $s^i\colon [n+1] \to [n]$ are called codegeneracy maps.

So for example imagine you have $[2] = \{0, 1, 2\}$ and $[3] = \{0, 1, 2, 3\}$. 

to go from $[2]$ to $[3]$ you'd use a coface map, and there are four: one for missing each element in the image, so like $d^3$ would take $0$ to $0$, $1$ to $1$, $2$ to $2$, and $3$ would be missed.

There are three codegeneracy maps here. What $s^1$ would do is send $0$ to $0$, $1$ to $1$, $2$ to $1$, and $3$ to $2$, so an $s^i$ sends $i$ and $i+1$ to the same element.

## Category of simplicial sets

The category of simplicial sets $\mathrm{sSet}$ is the category of presheaves on the simplex category.

A simplicial set (a presheaf) $B$ works as follows:

With every simplex $[n]$ there is an associated set $B_n$ of $n$-simplicies, and with every order-preserving map $f\colon [n] \to [m]$ there is a function $B(f): B_m \to B_n$

$$
\begin{CD}
[n] @>{f}>> [m] \\
@. @. \\
B_n @<<{B(f)}< B_m
\end{CD}
$$

Since we have coface $d^i$ and codegeneracy $s^i$ maps in the simplex category, we get face $B(d^i)\colon B_n \to B_{n-1}$ and degeneracy $B(s^i)\colon B_n \to B_{n+1}$ maps in $\mathrm{Set}$


Maps between simplicial sets are natural transformations $\alpha_n\colon X_n \to Y_n$ with the naturality condition that this diagram commutes, for any $f: [n] \to [m]$

$$
\begin{CD}
X_n @>{\alpha_n}>> Y_n \\
@A{X(f)}AA @AA{Y(f)}A \\
X_m @>>{\alpha_m}> Y_m
\end{CD}
$$

