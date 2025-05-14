
# review of adjunctions

A (free) functor $F\colon \mathcal C \to \mathcal D$ is left adjoint to a (forgetful) functor $G\colon \mathcal D \to \mathcal C$, (and $G$ is right adjoint to $F$) written $F \dashv G$ if,

## hom-set bijection

\- for every morphism $f: F(C) \to D$ there is a morphism $g: C \to G(D)$ and vice versa.

This "behaves well" (satisfies naturality) with functor-lifted morphisms.

### behaves well?

The universal property is that this bijection must also satisfy two natural isomorphisms between the hom functors $\operatorname{Hom}(F(-), D)$ and $\operatorname{Hom}(-, G(D))$ and the hom functors $\operatorname{Hom}(F(C), -)$ and $\operatorname{Hom}(C, G(-))$

The naturality conditions look like this (these diagrams commute each in two directions):

For $f\colon X \to Y$ in $\mathcal C$

$$\begin{CD}
\operatorname{Hom}(F(X), D) @= \operatorname{Hom}(X, G(D)) \\\\
@V\operatorname{Hom}(F(f), D)VV @VV\operatorname{Hom}(f, G(D))V \\\\
\operatorname{Hom}(F(Y), D) @= \operatorname{Hom}(Y, G(D))
\end{CD}$$

For $f\colon X \to Y$ in $\mathcal D$

$$\begin{CD}
\operatorname{Hom}(F(C), X) @= \operatorname{Hom}(C, G(X)) \\\\
@V\operatorname{Hom}(F(C), f)VV @VV\operatorname{Hom}(C, G(f))V \\\\
\operatorname{Hom}(F(C), Y) @= \operatorname{Hom}(C, G(Y))
\end{CD}$$

Take the equal signs to mean isomorphism here.

## unit and counit

\- there are natural transformations $\eta_C: C \to G(F(C))$ (unit) and $\epsilon_D: F(G(D)) \to D$ (counit) that satisfy the **triangle identities**:

<!-- https://q.uiver.app/#q=WzAsNixbMCwwLCJGKEMpIl0sWzEsMSwiRihDKSJdLFsxLDAsIkYoRyhGKEMpKSkiXSxbMywwLCJHKEYoRyhEKSkpIl0sWzMsMSwiRyhEKSJdLFsyLDAsIkcoRCkiXSxbNSw0XSxbMCwxXSxbMCwyLCJGKFxcZXRhX0MpIl0sWzUsMywiXFxldGFfe0coRCl9Il0sWzMsNCwiRyhcXGVwc2lsb25fRCkiXSxbMiwxLCJcXGVwc2lsb25fe0YoQyl9Il1d -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsNixbMCwwLCJGKEMpIl0sWzEsMSwiRihDKSJdLFsxLDAsIkYoRyhGKEMpKSkiXSxbMywwLCJHKEYoRyhEKSkpIl0sWzMsMSwiRyhEKSJdLFsyLDAsIkcoRCkiXSxbNSw0XSxbMCwxXSxbMCwyLCJGKFxcZXRhX0MpIl0sWzUsMywiXFxldGFfe0coRCl9Il0sWzMsNCwiRyhcXGVwc2lsb25fRCkiXSxbMiwxLCJcXGVwc2lsb25fe0YoQyl9Il1d&embed" height="240" style="border-radius: 8px; border: none;"></iframe>