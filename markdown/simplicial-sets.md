# simplicial sets

An **$n$-simplex** $[n]$ is a finite partial order 

$$ 0 \longrightarrow 1 \longrightarrow 2 \longrightarrow \ldots \longrightarrow n $$

(composites omitted)

for $n \geq 0$.

$[0]$ consists of just a $0$.

Recall that partial orders themselves are categories, so a functor $f\colon [n] \to [m]$ between simplices is called an **order-preserving map**.

The category of all $n$-simplices is called the simplex category $\Delta$, and it is a full subcategory of $\mathrm{Cat}$

## coface map

For example, a functor $f\colon [1] \to [2]$ describes one way to fit the category

$$ 0 \longrightarrow 1 $$

into

$$
\begin{array}{c}
0&\rightarrow&1\\
&\searrow&\downarrow\\
&&2
\end{array}
$$

There are three such ways to do so, so three functors. (Three arrows in the diagram).

To generalize, a functor $d^i\colon [n - 1] \to [n]$ is called a **coface map** and there are $n + 1$ of them, so there exist $d^i$ for $0 \leq i \leq n$. Grasping the ordering is necessary for this though, so examples:

$$ d^0(0 \rightarrow 1) = 1 \rightarrow 2 $$
$$ d^1(0 \rightarrow 1) = 0 \rightarrow 2 $$
$$ d^2(0 \rightarrow 1) = 0 \rightarrow 1 $$

So you're missing the $i$-th object in the codomain.

## codegeneracy map

In the other direction, we can consider a functor $f\colon [2] \to [1]$. The composition rule for a functor is that $f(g \circ h) = f(g) \circ f(h)$, or, in the context of partial orders, given $x \leq y$ and $y \leq z$, using transitivity on $f(x \leq y)$ and $f(y \leq z)$ must yield $f(x \leq z)$.

So let's map $ 0 \leq 1 $ to $ 0 \leq 1 $ and $ 1 \leq 2 $ to $ 1 \leq 1 $. This is one possibility.

Another is mapping $ 0 \leq 1 $ to $ 0 \leq 0 $ and $ 1 \leq 2 $ to $ 0 \leq 1 $.

Each of these functors $s^i\colon [n + 1] \to [n]$ is called a **codegeneracy map**. There are $n + 1$ of these, so they go from $0 \leq i \leq n$. 

Really this is about which nontrivial (noncomposite) morphism you're collapsing (the domain and codomain become the same object). So $s^0$ collapses $0 \leq 1$ in $[2]$ into $0 \leq 0$ in $[1]$. $s^1$ collapses $1 \leq 2$ into $1 \leq 1$. 

If you do this to a composite morphism, you violate transitivity and functors don't allow that.

Note that between $X_n$ and $X_{n+1}$ there are $n+1$ coface maps and $n$ codegeneracy maps.

## Category of simplicial sets

The category of simplicial sets $\mathrm{sSet}$ is the category of set-valued presheaves on the simplex category.

A simplicial set (a presheaf) $B$ works as follows:

With every simplex $[n]$ there is an associated set $X_n$ of $n$-simplicies, and with every order-preserving map $f\colon [n] \to [m]$ there is a function $X(f): X_m \to X_n$

$$
\begin{CD}
[n] @>{f}>> [m] @. @. X_n @<<{X(f)}< X_m
\end{CD}
$$

Since every order-preserving map is a coface map, codegeneracy map, or some composition of them, we have coface $d^i$ and codegeneracy $s^i$ maps in the simplex category, we get **face** $X(d^i)\colon X_n \to X_{n-1}$ and **degeneracy** $X(s^i)\colon X_n \to X_{n+1}$ maps/functions in $\mathrm{Set}$

### Intuition

The $0$-simplicies ($X_0$) are points, $1$-simplicies ($X_1$) edges, $2$-simplicies ($X_2$) "filled-in" triangles, $3$-simplicies ($X_3$) "filled-in" tetrahedra, etc.

I say filled in because you can have points and edges arranged in a triangle without being "filled in".

### Examples of face and degeneracy maps

#### Face maps

From the set of edges $X_1$ you have two face maps $d_0$ and $d_1$ to points $X_0$ corresponding to the start points and end points respectively.

For a triangle, there are three edges, etc.

#### Degeneracy maps

The degeneracy map behaves differently. It takes each point from $X_0$ and maps it to an uninteresting edge into $X_1$ where the start and end points are the same. A simplex that is uninteresting in this way is called a **degenerate simplex**, as in, it has a repeated vertex; it *looks* like a lower degree simplex.

From $X_2$ to $X_3$, you take an edge and try to make a triangle in the shape of an edge, but assigning the last vertex to the start or end point are both options, so you have two degeneracy maps there.

## Standard $n$-simplex

The **standard $n$-simplex** $\Delta^n$ is the presheaf represented by $[n]$, or the hom functor $\operatorname{Hom}(-, [n])$. It has basically the same visual structure as the simplex itself, but represented/organized as a simplicial set, which is a more general/flexible structure.

So for $\Delta^2$ you have the same representation as a $2$-simplex. $\Delta^2_0$ represents the "vertices" of the triangle, while $\Delta^2_1$ represents the "edges" of the triangle. $\Delta^3_2$ represents the faces of a tetrahedron, which are triangles. 

### Face of a standard $n$-simplex

In the previous section, I said $\Delta^2_1$ "represents" the edges of the triangle, but the actual simplicial subset for the $i$-th edge of the triangle is written as $\partial_i \Delta^2$ and is called the **$i$-th face**. Another example is $\partial_i \Delta^3$ which represents the $i$-th triangle (face) of the tetrahedron. Note that $i$ starts at $0$.

#### Ordering of the faces

Going back to our $2$-simplex (that we're viewing as a simplicial set)

$$
\begin{array}{c}
0&\rightarrow&1\\
&\searrow&\downarrow\\
&&2
\end{array}
$$

The $0$-th face doesn't have $0$ as the start or end point. The $1$-st face is the "composite" morphism.

## Nerve of a category

Any category $\mathcal C$ has a **nerve**, or associated simplicial set $X$ such that

1. $X_0$ is isomorphic to the set of objects of $\mathcal C$
2. $X_1$ is isomorphic to the set of morphisms of $\mathcal C$
3. $X_2$ contains triangles where two edges are composable morphisms, and the third edge represents the composition
4. $X_3$ represents a sequence of three composable morphisms, and the rest of the edges represent various compositions
5. Continue the pattern of $X_2$ and $X_3$

This induces a functor (the nerve functor) from $\mathrm{Cat}$ to $\mathrm{sSet}$ as the left adjoint to the embedding from $\Delta$ to $\mathrm{Cat}$

## Skeletal filtration

The **skeletal filtration** $\mathrm{sk}_n$ is a way to write all simplicial sets using standard simplicies.

It's a cumulative sequence of simplicial sets, meaning you have

$$ \operatorname{sk}_0(X) \sube \operatorname{sk}_1(X) \sube \operatorname{sk}_2(X) \sube \ldots $$

The union of all of them is equal to $X$.

The defining feature of an $\operatorname{sk}_n(X)$ is that it's identical to $X$ until you get to $\operatorname{sk}_n(X)_{n+1}$, where you just get simplices generated by degenerate maps.

### Simplicial $n$-sphere

The **simplicial $n$-sphere** $\partial \Delta^n$ is the union of all faces of a standard $n$-simplex $\partial_i \Delta^n$.

## Horn of a simplicial set

The **$k$-th horn** $\Lambda^n_k$ of a standard $n$-simplex is the simplicial $n$-sphere minus the $k$-th face. You could also define it by unioning all faces except the $k$-th. Note that $k$ starts at $0$.

Take a triangle $\Delta^2$. $\Lambda^2_1$ is a simplicial set containing just two edges of the triangle, with one going into the other.

## Kan complex

A **Kan complex** is a simplicial set such that every horn is filled in. There may be multiple fillings, but what matters is that there's at least one. 

Connecting to category theory, if we think of two composable morphisms, there exists a third composition morphism between them. This composition morphism is an example of a filling, though notice that 
1. Kan complexes may have multiple "compositions".
2.  Kan complexes imply that for all diagrams of the form

$$
\begin{array}{c}
X&&Y\\
&\searrow&\downarrow\\
&&Z
\end{array}
$$

There exists a

$$
\begin{array}{c}
X&\rightarrow&Y\\
&\searrow&\downarrow\\
&&Z
\end{array}
$$

Since this doesn't seem very category-theoretic due to the morphisms not being composable, we'll narrow the definition:

## Quasicategory

A **quasicategory** or $\infty$-category is a simplicial set such that every horn that is not $\Lambda^n_0$ or $\Lambda^n_n$ is filled.

Any quasicategory with the property that every horn has a *unique* filling is isomorphic to the nerve of a category. Conversely, the nerve of any category is a quasicategory with this property.