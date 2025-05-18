# Yoneda lemma

The idea of the Yoneda lemma revolves around presheaf categories and "representable presheaves" of an object $X$ denoted by $\operatorname{Hom}(-, X)$.

Note that the functor

$$ Y\colon C \to \operatorname{Hom}(C^{\mathrm{op}}, \mathrm{Set}) $$
$$X \mapsto \operatorname{Hom}(-, X)$$ 

is often called the **Yoneda embedding**.

## context

The **presheaf category** of a category $C$ is the image of the Yoneda embedding, or the functor category $\operatorname{Hom}(C^{\mathrm{op}}, \mathrm{Set})$

**Representable presheaves** make up part of this category. The Yoneda embedding takes all objects $X \in C$ and sends them to their representable presheaves $\operatorname{Hom}(-, X)$. These presheaves represent *all morphisms* into $X$ (and, by the Yoneda lemma, as we'll see, thus $X$ itself).

In a sense these representable presheaves are "building blocks" of the presheaf category because every other presheaf is a colimit of representable presheaves.

In fact morphisms between representable presheaves (natural transformations, presheaf homomorphisms) are in direct correspondence to all morphisms in $C$. This is why the Yoneda embedding is called an embedding. It *embeds* $C$ into the presheaf category, without losing, adding, or mixing up objects or morphisms.

This is made precise by the following corollary:

**Corollary.** The Yoneda lemma implies that the Yoneda embedding is *full and faithful*, meaning there is a bijection between hom-sets

$$ \operatorname{Hom}(X, Y) \cong \operatorname{Hom}(\operatorname{Hom}(-, X), \operatorname{Hom}(-, Y)) $$

You can get this by assigning $P = \operatorname{Hom}(-, Y)$ in the Yoneda lemma.

### what does this mean?

This is the naturality square for a presheaf homomorphism $\alpha\colon \operatorname{Hom}(-, X) \Rightarrow \operatorname{Hom}(-, Y) $:

$$\begin{CD}
\operatorname{Hom}(A, X) @>\alpha_A>> \operatorname{Hom}(A, Y) \\\\
@VVV @VVV \\\\
\operatorname{Hom}(B, X) @>>\alpha_B> \operatorname{Hom}(B, Y)
\end{CD}$$

If we isolate the top, rename it to $Z$ just for aesthetics

$$\begin{CD}
\operatorname{Hom}(Z, X) @>\alpha_Z>> \operatorname{Hom}(Z, Y)
\end{CD}$$

We can inspect the diagram

$$\begin{CD}
Z @= Z \\\\
@VVfV @VVhV \\\\
X @>>{\Box g}> Y
\end{CD}$$

This means that given a morphism $f\colon Z \to X$, the only way to form a $h\colon Z \to Y$ is to encode a morphism $g\colon X \to Y$ into $\alpha_Z$. That way $\alpha_Z$ gets associated with that particular $g$. There are no other options. Pretty simple.

### segué

So we know what morphisms from representable presheaves to other representable presheaves look like, but what do morphisms from representable presheaves to any arbitrary presheaf look like?

## Yoneda lemma

Well the **Yoneda lemma** states that the morphisms from a presheaf representing $X$ to any other presheaf $P$ are in a bijective relationship with the set $P(X)$.

Formally, the statement is

$$ P(X) \simeq \operatorname{Hom}(\operatorname{Hom}(-, X), P)  $$

The natural transformation expressed has the signature 
$\alpha_Z\colon \operatorname{Hom}(Z, X) \to P(Z)$

So, by the same logic, given an $f\colon Z \to X$, the Yoneda lemma states that the only way to construct a $P(Z)$ is to lift $f$ into $P(f)\colon P(X) \to P(Z)$ and then encode a $x \in P(X)$ into $\alpha_Z$. There are no other options.

You might be thinking, why can't we just assume a $P(Z)$ and we don't have to use $f$? Yes, the principle is correct, just set $Z = X$ and the same logic applies. In this case, identity is a choice for $f$.
