# topoi

These notes are from chapter IV of *Sheaves in Geometry and Logic* by Mac Lane and Moerdijk.

## background

### subobject functor

In a category $\mathcal C$, there may exist a **subobject functor** $\operatorname{Sub}(X)\colon \mathcal C^{\mathrm{op}} \to \mathrm{Set}$ which takes $X$ into the set of subobjects of $X$ (equivalence classes of monomorphisms into $X$). It forms a functor in the sense that for all $f\colon X \to Y$ in $\mathcal C$, there exists a function $\operatorname{Sub}(f)\colon \operatorname{Sub}(Y) \to \operatorname{Sub}(X)$. 

A mono $m\colon S \rightarrowtail Y$ (an element of $\operatorname{Sub}(Y)$) can be pulled back along $f$ into a mono $m'\colon X \times_Y S \rightarrowtail X$ (an element of $\operatorname{Sub}(X)$) like this:

<!-- https://q.uiver.app/#q=WzAsNCxbMCwyLCJYIl0sWzIsMiwiWSJdLFsyLDAsIlMiXSxbMCwwLCJYIFxcdGltZXNfWSBTIl0sWzAsMSwiZiJdLFsyLDEsIm0iLDIseyJzdHlsZSI6eyJ0YWlsIjp7Im5hbWUiOiJtb25vIn19fV0sWzMsMCwiXFxleGlzdHMgbSciLDIseyJzdHlsZSI6eyJ0YWlsIjp7Im5hbWUiOiJtb25vIn0sImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dLFszLDJdXQ== -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMCwyLCJYIl0sWzIsMiwiWSJdLFsyLDAsIlMiXSxbMCwwLCJYIFxcdGltZXNfWSBTIl0sWzAsMSwiZiJdLFsyLDEsIm0iLDIseyJzdHlsZSI6eyJ0YWlsIjp7Im5hbWUiOiJtb25vIn19fV0sWzMsMCwiXFxleGlzdHMgbSciLDIseyJzdHlsZSI6eyJ0YWlsIjp7Im5hbWUiOiJtb25vIn0sImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dLFszLDJdXQ==&embed" height="240" style="border-radius: 8px; border: none;"></iframe>

I think of this like representing the subobject that describes the largest part of $X$ that maps through $f$ into the image of $m$.

This is the first of three ways to write a subobject: as an equivalence class of monics $m\colon S \rightarrowtail X$.

### subobject classifier

In a category $\mathcal C$, there may also exist a **subobject classifier**, or an object $\Omega$ and a mono $\mathrm{true}\colon 1 \rightarrowtail \Omega$ such that 

for any mono $m\colon S \rightarrowtail X$ there exists a unique **characteristic map** or **classifying map** $\phi\colon X \to \Omega$ (also written $\operatorname{char} S$ or $\operatorname{char} m$) such that this square forms a pullback:

<!-- https://q.uiver.app/#q=WzAsNCxbMCwyLCJYIl0sWzIsMiwiXFxPbWVnYSJdLFsyLDAsIjEiXSxbMCwwLCJTIl0sWzAsMSwiXFxleGlzdHMhXFxwaGkiLDAseyJzdHlsZSI6eyJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XSxbMiwxLCJcXG1hdGhybXt0cnVlfSIsMix7InN0eWxlIjp7InRhaWwiOnsibmFtZSI6Im1vbm8ifX19XSxbMywwLCJtIiwyLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoibW9ubyJ9fX1dLFszLDIsIiEiXV0= -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMCwyLCJYIl0sWzIsMiwiXFxPbWVnYSJdLFsyLDAsIjEiXSxbMCwwLCJTIl0sWzAsMSwiXFxleGlzdHMhXFxwaGkiLDAseyJzdHlsZSI6eyJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XSxbMiwxLCJcXG1hdGhybXt0cnVlfSIsMix7InN0eWxlIjp7InRhaWwiOnsibmFtZSI6Im1vbm8ifX19XSxbMywwLCJtIiwyLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoibW9ubyJ9fX1dLFszLDIsIiEiXV0=&embed" height="240" style="border-radius: 8px; border: none;"></iframe>

The characteristic map sends those parts of $X$ in the image of $m$ to the image of $\mathrm{true}$ in the subobject classifier. 

This is the second way to write a subobject: as a characteristic map $\phi\colon X \to \Omega$ (a "predicate" of $X$).

By uniqueness this induces a bijection $ \operatorname{Sub}(X) \cong \operatorname{Hom}(X, \Omega) $.

### power object

In a category $\mathcal C$ with products and a subobject classifier, there may be a functor $P\colon\mathcal C^{\mathrm{op}} \to \mathcal C$ called the **power functor** sending objects $X$ to their **power objects** $P(X)$. These power objects function the same way as an exponential $\Omega^X$ would.

To express how this works on morphisms, we must also talk about how power objects each induce morphisms $\in_X\colon X \times P(X) \to \Omega$ such that for every $f\colon X \times Y \to \Omega$ there exists a unique $g\colon Y \to P(X)$ (the $P$-transpose of $f$) such that this triangle commutes:

<!-- https://q.uiver.app/#q=WzAsMyxbMCwxLCJYIFxcdGltZXMgWSJdLFsxLDEsIlxcT21lZ2EiXSxbMSwwLCJYIFxcdGltZXMgUChYKSJdLFswLDEsImYiLDJdLFsyLDEsIlxcaW5fWCJdLFswLDIsIigxX1gsIFxcZXhpc3RzICFnKSIsMCx7InN0eWxlIjp7ImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dXQ== -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsMyxbMCwxLCJYIFxcdGltZXMgWSJdLFsxLDEsIlxcT21lZ2EiXSxbMSwwLCJYIFxcdGltZXMgUChYKSJdLFswLDEsImYiLDJdLFsyLDEsIlxcaW5fWCJdLFswLDIsIigxX1gsIFxcZXhpc3RzICFnKSIsMCx7InN0eWxlIjp7ImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dXQ==&embed" height="240" style="border-radius: 8px; border: none;"></iframe>

Informally: $f$ is basically an uncurried $Y$-indexing of subobjects of $X$. By the product-hom adjunction, we know that $f$ has a corresponding $h\colon Y \to \operatorname{Hom}(X, \Omega)$. $\operatorname{Hom}(X, \Omega)$ can be viewed as isomorphic to $P(X)$.

This induces a bijection $ \operatorname{Hom}(X \times Y, \Omega) \cong \operatorname{Hom}(Y, P(X)) $.

Setting $Y$ to $1$ so $g$ describes a single subobject $s$ and viewing $f$ as a characteristic map $\phi$, the correspondence becomes clear:

<!-- https://q.uiver.app/#q=WzAsMyxbMSwwLCJYIFxcdGltZXMgUChYKSJdLFsxLDEsIlxcT21lZ2EiXSxbMCwxLCJYIl0sWzAsMSwiXFxpbl9YIl0sWzIsMSwiXFxwaGkiLDJdLFsyLDAsIigxX1gsIFxcZXhpc3RzISBzKSJdXQ== -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsMyxbMSwwLCJYIFxcdGltZXMgUChYKSJdLFsxLDEsIlxcT21lZ2EiXSxbMCwxLCJYIl0sWzAsMSwiXFxpbl9YIl0sWzIsMSwiXFxwaGkiLDJdLFsyLDAsIigxX1gsIFxcZXhpc3RzISBzKSJdXQ==&embed" height="240" style="border-radius: 8px; border: none;"></iframe>

So $\in_X$ essentially describes whether the first projection is in the image of the second projection (the subobject).

This is the third way to write a subobject: as a global element of a power object $s\colon 1 \to P(X)$.

#### morphisms? (not super important)

$P$ functions like a functor in the sense that for any $f\colon X \to Y$ there exists a $P(f)\colon P(Y) \to P(X)$ such that this diagram commutes:

<!-- https://q.uiver.app/#q=WzAsNCxbMCwyLCJYIFxcdGltZXMgUChYKSJdLFsyLDIsIlxcT21lZ2EiXSxbMiwwLCJZIFxcdGltZXMgUChZKSJdLFswLDAsIlggXFx0aW1lcyBQKFkpIl0sWzAsMSwiXFxpbl9YIiwyXSxbMiwxLCJcXGluX1kiXSxbMywwLCIoMV9YLCBQKGYpKSIsMl0sWzMsMiwiKGYsIDFfe1AoWSl9KSJdXQ== -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMCwyLCJYIFxcdGltZXMgUChYKSJdLFsyLDIsIlxcT21lZ2EiXSxbMiwwLCJZIFxcdGltZXMgUChZKSJdLFswLDAsIlggXFx0aW1lcyBQKFkpIl0sWzAsMSwiXFxpbl9YIiwyXSxbMiwxLCJcXGluX1kiXSxbMywwLCIoMV9YLCBQKGYpKSIsMl0sWzMsMiwiKGYsIDFfe1AoWSl9KSJdXQ==&embed" height="240" style="border-radius: 8px; border: none;"></iframe>

## definition

A(n elementary) **topos** is a category $\mathcal T$ in which there exist 

- finite limits (formulable using either just pullbacks and a terminal object or just products and equalizers), 
- a subobject classifier $\Omega \in \mathcal T$, and 
- a power functor $P\colon \mathcal T^{\mathrm{op}} \to \mathcal T$

The bijections described in previous sections can be bundled into a single one through the fact that $\Omega \simeq P(1)$:

$$ \operatorname{Sub}(X \times Y) \cong \operatorname{Hom}(X, P(Y)) $$

From these three concepts you can construct *all exponentials* $A^B$ (relatively easy) and all *finite colimits* (ungodly difficulty).

## the "is singular" predicate

We can derive the "singleton arrow" $\{\cdot\}_X\colon X \to \mathcal P(X)$ as follows:

First, we can derive the **diagonal morphism** $\Delta_X\colon X \rightarrowtail X \times X$ as the universal morphism of this pullback (or product just as well):

<!-- https://q.uiver.app/#q=WzAsNSxbMSwxLCJYIFxcdGltZXNfWCBYIl0sWzIsMSwiWCJdLFsxLDIsIlgiXSxbMiwyLCJYIl0sWzAsMCwiWCJdLFswLDEsIlxccGlfMSJdLFswLDIsIlxccGlfMiIsMl0sWzIsMywiMV9YIiwyXSxbMSwzLCIxX1giXSxbNCwxLCIxX1giLDEseyJjdXJ2ZSI6LTJ9XSxbNCwwLCJcXERlbHRhX1giLDAseyJzdHlsZSI6eyJ0YWlsIjp7Im5hbWUiOiJtb25vIn0sImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dLFs0LDIsIjFfWCIsMSx7ImN1cnZlIjoyfV1d -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNSxbMSwxLCJYIFxcdGltZXNfWCBYIl0sWzIsMSwiWCJdLFsxLDIsIlgiXSxbMiwyLCJYIl0sWzAsMCwiWCJdLFswLDEsIlxccGlfMSJdLFswLDIsIlxccGlfMiIsMl0sWzIsMywiMV9YIiwyXSxbMSwzLCIxX1giXSxbNCwxLCIxX1giLDEseyJjdXJ2ZSI6LTJ9XSxbNCwwLCJcXERlbHRhX1giLDAseyJzdHlsZSI6eyJ0YWlsIjp7Im5hbWUiOiJtb25vIn0sImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dLFs0LDIsIjFfWCIsMSx7ImN1cnZlIjoyfV1d&embed" height="240" style="border-radius: 8px; border: none;"></iframe>

Now, we can derive the characteristic map of $\Delta_X$ since it is monic, resulting in this pullback:

<!-- https://q.uiver.app/#q=WzAsNCxbMCwwLCJYIl0sWzAsMiwiWFxcdGltZXMgWCJdLFsyLDIsIlxcT21lZ2EiXSxbMiwwLCIxIl0sWzAsMSwiXFxEZWx0YV9YIiwyLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoibW9ubyJ9fX1dLFsxLDIsIlxcZXhpc3RzXFxkZWx0YV9YPVxcb3BlcmF0b3JuYW1le2NoYXJ9IFxcRGVsdGFfWCIsMCx7InN0eWxlIjp7ImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dLFswLDMsIiEiXSxbMywyLCJcXG1hdGhybXt0cnVlfSIsMl1d -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMCwwLCJYIl0sWzAsMiwiWFxcdGltZXMgWCJdLFsyLDIsIlxcT21lZ2EiXSxbMiwwLCIxIl0sWzAsMSwiXFxEZWx0YV9YIiwyLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoibW9ubyJ9fX1dLFsxLDIsIlxcZXhpc3RzXFxkZWx0YV9YPVxcb3BlcmF0b3JuYW1le2NoYXJ9IFxcRGVsdGFfWCIsMCx7InN0eWxlIjp7ImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dLFswLDMsIiEiXSxbMywyLCJcXG1hdGhybXt0cnVlfSIsMl1d&embed" height="240" style="border-radius: 8px; border: none;"></iframe>

Taking the $\mathcal P$-transpose (currying) of that characteristic map gives us the map $\{\cdot\}_X\colon X \to \mathcal P(X)$.

But that map is obviously monic! So we can analyze the characteristic map of that transpose

<!-- https://q.uiver.app/#q=WzAsNCxbMCwwLCJYIl0sWzAsMiwiXFxtYXRoY2FsIFAoWCkiXSxbMiwyLCJcXE9tZWdhIl0sWzIsMCwiMSJdLFswLDEsIlxce1xcY2RvdFxcfV9YIiwyLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoibW9ubyJ9fX1dLFsxLDIsIlxcZXhpc3RzXFxzaWdtYV9YPVxcb3BlcmF0b3JuYW1le2NoYXJ9IFxce1xcY2RvdFxcfV9YIiwwLHsic3R5bGUiOnsiYm9keSI6eyJuYW1lIjoiZGFzaGVkIn19fV0sWzAsMywiISJdLFszLDIsIlxcbWF0aHJte3RydWV9IiwyXV0= -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMCwwLCJYIl0sWzAsMiwiXFxtYXRoY2FsIFAoWCkiXSxbMiwyLCJcXE9tZWdhIl0sWzIsMCwiMSJdLFswLDEsIlxce1xcY2RvdFxcfV9YIiwyLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoibW9ubyJ9fX1dLFsxLDIsIlxcZXhpc3RzXFxzaWdtYV9YPVxcb3BlcmF0b3JuYW1le2NoYXJ9IFxce1xcY2RvdFxcfV9YIiwwLHsic3R5bGUiOnsiYm9keSI6eyJuYW1lIjoiZGFzaGVkIn19fV0sWzAsMywiISJdLFszLDIsIlxcbWF0aHJte3RydWV9IiwyXV0=&embed" height="240" style="border-radius: 8px; border: none;"></iframe>

This $\sigma_X\colon \mathcal P(X) \to \Omega$ *tests* if the given subobject is singular. This will be crucial for the next section. 

## deriving exponentials from power objects

### graph of a function

In set theory, the **graph** of a function $f\colon X \to Y$ is defined as

$$ G_f = \{(x, f(x)) \mid x \in X\} $$

What we want to do is come up with a subobject of $X \times Y$ that describes graphs of functions. To do that, we need to find a way to *test* whether a subset of $X \times Y$ is a graph. This sounds like a characteristic map $\phi\colon X \times Y \to \Omega$.

Such a characteristic map (using $\mathrm{Set}$ terminology for the example) would function like, "we can just enumerate every $x \in X$ and check if the image of $x$ ($f[{x}] \in \mathcal P(Y)$) is a singular value $\{f(x)\}$".

### the procedure

So first, for any particular subobject $\mathcal P(X \times Y)$, we need a map $v_s\colon X \to \mathcal P(Y)$ that takes the domain to subobjects in the codomain. We can merge these two into a single universal map $v\colon X \times \mathcal P(X \times Y) \to \mathcal P(Y)$. We can derive this by taking the $\mathcal P$-transpose of $\in_{X \times Y}\colon X \times Y \times \mathcal P(X \times Y) \to \Omega$.

Good. Step two is to *test* whether the image of that $\mathcal P(Y)$ we got is a singular element. We can do this by using that $\sigma_Y$ we derived earlier. So composing $\sigma_Y$ after $v$ gives us a $w\colon X \times \mathcal P(X \times Y) \to \Omega$ sending whatever in $X$ to $\mathrm{true}$ that has a singular image (e.g. in $\mathrm{Set}$ there is only one $(x, -)$).

Step three is to obtain all the $X$ (a subobject $\mathcal P(X)$) such that $w$ is sent to $\mathrm{true}$. We can do this using yet another $\mathcal P$-transpose on $w$, yielding us a map $u\colon \mathcal P(X \times Y) \to \mathcal P(X)$. 

Now we want to define the subobject $Y^X$ containing all graphs. It is the subobject $\mathcal P(X \times Y)$ such that $u$ maps to the "trivial" subobject of $X$, which is $X$ itself.

Now we need to derive a characteristic map $\phi\colon X \to \Omega$ that sends everything to $\mathrm{true}$. There are several ways, but the simplest is to take the composition of the unique terminal map $!\colon X \to 1$ and then take $\mathrm{true}\colon 1 \to \Omega$. Then we can take the $\mathcal P$-transpose of that to get a global element $\mathrm{trivial}\colon 1 \to \mathcal P(X)$

Now we can define $Y^X$ as the pullback

<!-- https://q.uiver.app/#q=WzAsNCxbMCwwLCJZXlgiXSxbMCwyLCJcXG1hdGhjYWwgUChYIFxcdGltZXMgWSkiXSxbMiwyLCJcXG1hdGhjYWwgUChYKSJdLFsyLDAsIjEiXSxbMCwxLCJtIiwyLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoibW9ubyJ9LCJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XSxbMSwyLCJ1Il0sWzAsMywiISJdLFszLDIsIlxcbWF0aHJte3RyaXZpYWx9IiwyLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoibW9ubyJ9fX1dXQ== -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMCwwLCJZXlgiXSxbMCwyLCJcXG1hdGhjYWwgUChYIFxcdGltZXMgWSkiXSxbMiwyLCJcXG1hdGhjYWwgUChYKSJdLFsyLDAsIjEiXSxbMCwxLCJtIiwyLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoibW9ubyJ9LCJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XSxbMSwyLCJ1Il0sWzAsMywiISJdLFszLDIsIlxcbWF0aHJte3RyaXZpYWx9IiwyLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoibW9ubyJ9fX1dXQ==&embed" height="240" style="border-radius: 8px; border: none;"></iframe>

Yay, let's celebrate! 

But we're not done yet. 

### the evaluation map

For every exponential $Y^X$ there must be a corresponding **evaluation map** $\mathrm{ev}\colon X \times Y^X \to Y$. Thinking of this in terms of graphs, it's simply the singular element that the given $x \in X$ maps to. This calls for, you guessed it, another pullback

<!-- https://q.uiver.app/#q=WzAsNCxbMCwwLCJYIFxcdGltZXMgWV5YIl0sWzAsMiwiWCBcXHRpbWVzIFxcbWF0aGNhbCBQKFggXFx0aW1lcyBZKSJdLFsyLDIsIlxcbWF0aGNhbCBQKFkpIl0sWzIsMCwiWSJdLFswLDEsIigxX1gsIG0pIiwyLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoibW9ubyJ9fX1dLFsxLDIsInYiXSxbMCwzLCJcXG1hdGhybXtldn0iLDAseyJzdHlsZSI6eyJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XSxbMywyLCJcXHtcXGNkb3RcXH0iLDIseyJzdHlsZSI6eyJ0YWlsIjp7Im5hbWUiOiJtb25vIn19fV1d -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNCxbMCwwLCJYIFxcdGltZXMgWV5YIl0sWzAsMiwiWCBcXHRpbWVzIFxcbWF0aGNhbCBQKFggXFx0aW1lcyBZKSJdLFsyLDIsIlxcbWF0aGNhbCBQKFkpIl0sWzIsMCwiWSJdLFswLDEsIigxX1gsIG0pIiwyLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoibW9ubyJ9fX1dLFsxLDIsInYiXSxbMCwzLCJcXG1hdGhybXtldn0iLDAseyJzdHlsZSI6eyJib2R5Ijp7Im5hbWUiOiJkYXNoZWQifX19XSxbMywyLCJcXHtcXGNkb3RcXH0iLDIseyJzdHlsZSI6eyJ0YWlsIjp7Im5hbWUiOiJtb25vIn19fV1d&embed" height="240" style="border-radius: 8px; border: none;"></iframe>

In the text there is an additional proof you have to make that this evaluation map has an "adjoint" relationship with products but I am too lazy to write this down.

## monads and monadicity (extra stuff)

A **monad** is an endofunctor $T\colon \mathcal C \to \mathcal C$ with natural transformations $\eta_X\colon X \to T(X)$ (unit) and $\mu_X\colon T(T(X)) \to T(X)$ (multiplication) such that these diagrams commute:

<!-- https://q.uiver.app/#q=WzAsOCxbMCwwLCJUKFQoVChYKSkpIl0sWzEsMCwiVChUKFgpKSJdLFsxLDEsIlQoWCkiXSxbMCwxLCJUKFQoWCkpIl0sWzIsMCwiVChYKSJdLFszLDAsIlQoVChYKSkiXSxbMiwxLCJUKFQoWCkpIl0sWzMsMSwiVChYKSJdLFswLDEsIlxcbXVfe1QoWCl9Il0sWzEsMiwiXFxtdV9YIl0sWzAsMywiVChcXG11X1gpIiwyXSxbMywyLCJcXG11X1giLDJdLFs0LDUsIlxcZXRhX3tUKFgpfSJdLFs0LDYsIlQoXFxldGFfWCkiLDJdLFs2LDcsIlxcbXVfWCIsMl0sWzUsNywiXFxtdV9YIl0sWzQsNywiIiwxLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoiYXJyb3doZWFkIn19fV1d -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsOCxbMCwwLCJUKFQoVChYKSkpIl0sWzEsMCwiVChUKFgpKSJdLFsxLDEsIlQoWCkiXSxbMCwxLCJUKFQoWCkpIl0sWzIsMCwiVChYKSJdLFszLDAsIlQoVChYKSkiXSxbMiwxLCJUKFQoWCkpIl0sWzMsMSwiVChYKSJdLFswLDEsIlxcbXVfe1QoWCl9Il0sWzEsMiwiXFxtdV9YIl0sWzAsMywiVChcXG11X1gpIiwyXSxbMywyLCJcXG11X1giLDJdLFs0LDUsIlxcZXRhX3tUKFgpfSJdLFs0LDYsIlQoXFxldGFfWCkiLDJdLFs2LDcsIlxcbXVfWCIsMl0sWzUsNywiXFxtdV9YIl0sWzQsNywiIiwxLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoiYXJyb3doZWFkIn19fV1d&embed" height="240" style="border-radius: 8px; border: none;"></iframe>

It's a monoid in the category of endofunctors.

### adjunctions and monads

All [adjunctions](./adjunctions.md) $F \vdash G$ induce a monad $G \circ F\colon \mathcal C \to \mathcal C$ with the unit $\eta_C: C \to G(F(C))$. 

Multiplication is a bit harder to derive, but we're looking for a $\mu_C\colon G(F(G(F(C)))) \to G(F(C))$ given an $\epsilon_D: F(G(D)) \to D$. 

Setting $D$ to $F(C)$ we get $\epsilon_{F(C)}: F(G(F(C))) \to F(C)$ and we can lift that morphism through $G$ to yield the multiplication $\mu_C = G(\epsilon_{F(C)})\colon G(F(G(F(C)))) \to G(F(C))$

## another way to look at the power functor

The power functor $\mathcal P\colon \mathcal T^{\mathrm{op}} \to \mathcal T$ has a *left adjoint*, the opposite functor $\mathcal P^{\mathrm{op}}\colon \mathcal T \to \mathcal T^{\mathrm{op}}$, meaning there are natural transformations $\eta_X: X \to \mathcal P(\mathcal P^{\mathrm{op}}(X))$ (unit) and $\epsilon_X: \mathcal P^{\mathrm{op}}(\mathcal P(X)) \to X$ (counit) satisfying [the triangle inequalities](./adjunctions.md).

## deriving the initial object

