# Kan extensions

I've *always* found this concept difficult to grasp, so I'm going to use a very particular (cumulative) approach here that'll hopefully help me understand them purely category-theoretically.

## review of limits

For every object $X \in \mathcal C$ induces a constant functor $\Delta_{\mathcal J}(X)\colon \mathcal J \to \mathcal C$ which sends every object in $\mathcal J$ to $X$ and every morphism to $1_X$.

*Remark.* $\Delta_{\mathcal J}\colon \mathcal C \to {\mathcal C}^{\mathcal J}$ is itself a functor called the *diagonal functor*.

The **limit** (a.k.a. projective limit, inverse limit) of a functor $F\colon \mathcal J \to \mathcal C$, $\underset \longleftarrow \lim F$ is a natural transformation $\pi\colon \Delta_{\mathcal J}(L) \Rightarrow F$ (a *cone*) such that for every other natural transformation $p\colon \Delta_{\mathcal J}(C) \Rightarrow F$, there exists a unique morphism $!\colon C \to L$ such that $\pi_X$, $p_X$, and $!$ commute for all $X$.

<!-- https://q.uiver.app/#q=WzAsMyxbMCwyLCJDIl0sWzIsMCwiRihYKSJdLFswLDAsIkwiXSxbMCwxLCJwX1giLDJdLFsyLDEsIlxccGlfWCIsMl0sWzAsMiwiISIsMCx7InN0eWxlIjp7ImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dXQ== -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsMyxbMCwyLCJDIl0sWzIsMCwiRihYKSJdLFswLDAsIkwiXSxbMCwxLCJwX1giLDJdLFsyLDEsIlxccGlfWCIsMl0sWzAsMiwiISIsMCx7InN0eWxlIjp7ImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dXQ==&embed" height="240" style="border-radius: 8px; border: none;"></iframe>

In other words, $L$ is a terminal object in the category of cones.

## right Kan extension

Generally one speaks of extending a functor $F\colon \mathcal C \to \mathcal E$ *along* another functor $K\colon \mathcal C \to \mathcal D$, to produce a functor with a universal property, $\mathrm{Ran}_K F\colon \mathcal D \to \mathcal E$ the **right Kan extension**. So in a sense we're "moving" the domain of $F$ to the codomain of $K$, or making up a functor that tries to "finish the job" that $K$ does by modeling $F$.

The universal property is that there is a universal natural transformation $\epsilon_X\colon \mathrm{Ran}_K F(K(X)) \to F(X)$ such that 

for any other candidate $G\colon \mathcal D \to \mathcal E$ with a natural transformation $\delta_X\colon G(K(X)) \to F(X)$,there exists a unique $!_X\colon G(X) \to \mathrm{Ran}_K F(X)$ such that $\delta$ commutes with $\epsilon$ after $!$.

<!-- https://q.uiver.app/#q=WzAsMyxbMCwyLCJHKEsoWCkpIl0sWzIsMCwiRihYKSJdLFswLDAsIlxcbWF0aHJte1Jhbn1fSyBGKEsoWCkpIl0sWzAsMSwiXFxkZWx0YV9YIiwyXSxbMiwxLCJcXGVwc2lsb25fWCIsMl0sWzAsMiwiIV97SyhYKX0iLDAseyJzdHlsZSI6eyJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XV0= -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsMyxbMCwyLCJHKEsoWCkpIl0sWzIsMCwiRihYKSJdLFswLDAsIlxcbWF0aHJte1Jhbn1fSyBGKEsoWCkpIl0sWzAsMSwiXFxkZWx0YV9YIiwyXSxbMiwxLCJcXGVwc2lsb25fWCIsMl0sWzAsMiwiIV97SyhYKX0iLDAseyJzdHlsZSI6eyJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XV0=&embed" height="240" style="border-radius: 8px; border: none;"></iframe>

Look familiar?

## a limit is a (right) Kan extension

Let's define the **point category** ($\bullet$) as a category with a single object and morphism.

A limit is a special case of a right Kan extension ($\epsilon_X \simeq \underset \longleftarrow \lim F$) when, you guessed it, $\mathcal D = \bullet$. In this case, $K$ has no choice but to be a constant functor $\Delta_{\mathcal J}(\bullet)$ for the only object in $\mathcal D$, and $\mathrm{Ran}_K F$ and $G$ designate singular objects in $\mathcal E$.

By abuse of notation, it might look something like this:

<!-- https://q.uiver.app/#q=WzAsMyxbMCwyLCJHIl0sWzIsMCwiRihYKSJdLFswLDAsIlxcbWF0aHJte1Jhbn1fSyBGIl0sWzAsMSwiXFxkZWx0YV9YIiwyXSxbMiwxLCJcXGVwc2lsb25fWCIsMl0sWzAsMiwiISIsMCx7InN0eWxlIjp7ImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dXQ== -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsMyxbMCwyLCJHIl0sWzIsMCwiRihYKSJdLFswLDAsIlxcbWF0aHJte1Jhbn1fSyBGIl0sWzAsMSwiXFxkZWx0YV9YIiwyXSxbMiwxLCJcXGVwc2lsb25fWCIsMl0sWzAsMiwiISIsMCx7InN0eWxlIjp7ImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dXQ==&embed" height="240" style="border-radius: 8px; border: none;"></iframe>

## adjoints are Kan extensions

Let's say you have a right adjoint $G\colon \mathcal D \to \mathcal C$. You can get the left adjoint using $\mathrm{Ran}_G 1_D$. In $\mathrm{Cat}$, this looks like

<!-- https://q.uiver.app/#q=WzAsMyxbMCwwLCJcXG1hdGhjYWwgRCJdLFsyLDAsIlxcbWF0aGNhbCBEIl0sWzEsMSwiXFxtYXRoY2FsIEMiXSxbMCwxLCIxX0QiXSxbMCwyLCJHIiwyXSxbMiwxLCJcXG1hdGhybXtSYW59X0cgMV9EIiwyXV0= -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsMyxbMCwwLCJcXG1hdGhjYWwgRCJdLFsyLDAsIlxcbWF0aGNhbCBEIl0sWzEsMSwiXFxtYXRoY2FsIEMiXSxbMCwxLCIxX0QiXSxbMCwyLCJHIiwyXSxbMiwxLCJcXG1hdGhybXtSYW59X0cgMV9EIiwyXV0=&embed" height="240" style="border-radius: 8px; border: none;"></iframe>

The natural transformations look like

<!-- https://q.uiver.app/#q=WzAsMyxbMCwyLCJUKEcoWCkpIl0sWzIsMCwiWCJdLFswLDAsIlxcbWF0aHJte1Jhbn1fRyAxX3tcXG1hdGhjYWwgRH0oRyhYKSkiXSxbMCwxLCJcXGRlbHRhX1giLDJdLFsyLDEsIlxcZXBzaWxvbl9YIiwyXSxbMCwyLCIhX3tHKFgpfSIsMCx7InN0eWxlIjp7ImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dXQ== -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsMyxbMCwyLCJUKEcoWCkpIl0sWzIsMCwiWCJdLFswLDAsIlxcbWF0aHJte1Jhbn1fRyAxX3tcXG1hdGhjYWwgRH0oRyhYKSkiXSxbMCwxLCJcXGRlbHRhX1giLDJdLFsyLDEsIlxcZXBzaWxvbl9YIiwyXSxbMCwyLCIhX3tHKFgpfSIsMCx7InN0eWxlIjp7ImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dXQ==&embed" height="240" style="border-radius: 8px; border: none;"></iframe>

(I renamed the candidate left adjoint to $T: \mathcal C \to \mathcal D$ here.)

This is only valid if the Kan extension exists and is absolute, meaning it's preserved across all functors. I won't go into detail about what preservation means here. 