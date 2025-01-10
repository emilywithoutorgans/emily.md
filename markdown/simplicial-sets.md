# simplicial sets

An **$n$-simplex** $[n]$ is a finite partial order 

$$ 0 \longrightarrow 1 \longrightarrow 2 \longrightarrow \ldots \longrightarrow n $$

(composites omitted)

for $n \geq 0$.

$[0]$ consists of just a $0$.

A functor $f\colon [n] \to [m]$ between simplices is called an **order-preserving map**.

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

There are three such ways to do so. (Three arrows in the diagram).

More generally, a functor $d^i\colon [n-1] \to [n]$ is called a **coface map** and there are $n + 1$ of them, so there exist $d^i$ for $1 \leq i \leq n + 1$.

A functor $f\colon [2] \to [1]$ involves principally a mapping of objects, so since we're mapping three objects to two objects here, it describes which object we're leaving out, so there are, again, three options here:

$$ 0 \longrightarrow 2 $$
$$ 0 \longrightarrow 1 $$
$$ 1 \longrightarrow 2 $$

Each of these functors $s^i\colon [n] \to [n-1]$ is called a **codegeneracy map**.

### Order-preserving maps

For any $n \geq 0$ there are $n+1$ injections and surjections.

The injections $d^i\colon [n-1] \to [n]$ are called coface maps, and the surjections $s^i\colon [n+1] \to [n]$ are called codegeneracy maps.

## Category of simplicial sets

The category of simplicial sets $\mathrm{sSet}$ is the category of set-valued presheaves on the simplex category.

A simplicial set (a presheaf) $B$ works as follows:

With every simplex $[n]$ there is an associated set $B_n$ of $n$-simplicies, and with every order-preserving map $f\colon [n] \to [m]$ there is a function $B(f): B_m \to B_n$

$$
\begin{CD}
[n] @>{f}>> [m] 
@. @. 
B_n @<<{B(f)}< B_m
\end{CD}
$$

### Intuition

The $0$-simplicies ($B_0$) are points, $1$-simplicies ($B_1$) edges, $2$-simplicies ($B_2$) triangles, $3$-simplicies ($B_3$) tetrahedra, etc.

### Generally

Since we have coface $d^i$ and codegeneracy $s^i$ maps in the simplex category, we get **face** $B(d^i)\colon B_n \to B_{n-1}$ and **degeneracy** $B(s^i)\colon B_n \to B_{n+1}$ maps in $\mathrm{Set}$

## Standard $n$-simplex

The **standard $n$-simplex** $\Delta^n$ is the presheaf represented by $[n]$, or the hom functor $\operatorname{Hom}(-, [n])$. It has basically the same structure as the simplex itself, but represented as a simplicial set, which is a more general/flexible structure.

So for $\Delta^2$ you have the same representation as a $2$-simplex. $\Delta^2_0$ represents the "vertices" of the triangle, while $\Delta^2_1$ represents the "edges" of the triangle. $\Delta^2_3$ represents the faces of a tetrahedron, which are triangles. 