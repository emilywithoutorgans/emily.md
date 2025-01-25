# fibrations

## Kan fibration

The Kan fibration is similar to the [Kan filler condition](./simplicial-sets.md) for Kan complexes. It is the simplicial realization of the Serre fibration.

Take two [simplicial sets](./simplicial-sets.html) $X$ and $Y$. Say there's a morphism $p\colon X \Rightarrow Y$. 

Also say there's an embedding of horns into $X$ and an embedding of $n$-simplices into $Y$ like this:

$$\begin{CD}
\Lambda^n_k @>>> X \\\\
@VVV @VVpV \\\\
\Delta^n @>>> Y
\end{CD}$$

Such that the diagram commutes

### commutes?

Now exactly what this means is special here because the left and bottom morphisms have a very specific meaning. The left morphism is an inclusion and the bottom morphism is simply a specific $n$-simplex in $Y$. This means that for some horns in $X$ there are accompanying complete simplices in $Y$.

So it can be thought that $p$ has an implicit mapping from certain horns in the simplicial set $X$ to complete simplices in $Y$.

### definition

So we'll say that $p$ is a **Kan fibration** if for every horn in $X$ that has an accompanying completion in $Y$, the completion of that horn exists in $X$.

In other words, a "lift" exists (similar to the one in the Kan filler condition) taking the completion of every one of those horns to $X$, and it maps through $p$ to $Y$ in a way that commutes with the embedding of the completion in $Y$.

So Kan fibrations take *some* horns to complete simplices that exist in both $X$ and $Y$.

#### inner fibration

$p$ is an **inner (Kan) fibration** if there is no lift for any horn $\Lambda^n_0$ or $\Lambda^n_n$.

## relation to Kan filler condition

A simplicial set $X$ is called a **Kan complex** if the morphism $p!\colon X \Rightarrow \Delta^0$ is a Kan fibration.

$$\begin{CD}
\Lambda^n_k @>>> X \\\\
@VVV @VVp!V \\\\
\Delta^n @>>!> \Delta^0
\end{CD}$$

(imagine a dotted arrow going from $\Delta^n$ to $X$)

Note that $\Delta^0$ is a terminal object in $\mathrm{sSet}$, so the morphisms marked with $!$ are unique.

Quasicategories can be defined in a similar way using inner fibrations.

