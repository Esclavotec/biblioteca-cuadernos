# ---------------- II parcial: cierre (fotos del 23/11, 8:53 y 8:56) ----------------

texto("Diferenciable en el origen: ∂f/∂y", r"""
:::lapiz
$$\frac{\partial f}{\partial y} = \begin{cases} \dfrac{2yx^4}{(x^2 + y^2)^2} & \text{si } \langle x, y \rangle \neq \langle 0, 0 \rangle \\ 0 & \text{si } \langle x, y \rangle = \langle 0, 0 \rangle \end{cases}$$

Para hay que probar:
$$\lim_{(x,y) \to (0,0)} \frac{\partial f}{\partial x}(x, y) = 0 \quad \text{y} \quad \lim_{(x,y) \to (0,0)} \frac{\partial f}{\partial y}(x, y) = 0$$
:::

:::rojo
**Ejercicio cuaderno** (ver foto de WhatsApp)
:::

:::lapiz
$\forall\, \varepsilon > 0$ debo hallar un $\delta > 0$ tq $\forall \langle x, y \rangle$ con $\|\langle x, y \rangle - \langle 0, 0 \rangle\| < \delta \Rightarrow |f\langle x, y \rangle - f\langle 0, 0 \rangle| < \varepsilon$:
$$\begin{aligned} \left|\frac{2xy^4}{(x^2 + y^2)^2}\right| &= \frac{2|x||y^4|}{(x^2 + y^2)^2} \le \frac{2\sqrt{x^2 + y^2}\left(\sqrt{x^2 + y^2}\right)^4}{(x^2 + y^2)^2} \\ &= 2\sqrt{x^2 + y^2} \le 2 \cdot \frac{\varepsilon}{2} = \varepsilon \end{aligned}$$
Tome $0 < \delta = \frac{\varepsilon}{2}$.
:::
""", nota=[r"Esa cuenta prueba que $\frac{\partial f}{\partial x} \to 0$; para $\frac{\partial f}{\partial y}$ es igual cambiando $x$ por $y$. Las dos parciales son continuas, así que $f$ es diferenciable en el origen."])

texto("Regla de la cadena", r"""
{rojo|23/09/2026}

### ¿Qué veremos hoy?
:::azul
1. Regla de la cadena: $(f \circ \alpha)'(t) = \ ?$
2. Derivada direccional en una curva
3. Plano tangente a una superficie
:::

{rojo|**Lista de ejercicios**} pág. 317, Apóstol: #1 → #12

### Teorema: regla de la cadena
:::azul
Sea $f$ un campo escalar con dominio un abierto en $\mathbb{R}^n$. Sea $\alpha$ una curva que va desde $I$ hasta $S$. Defina la composición $g = f \circ \alpha$ tq:
$$g(t) = (f \circ \alpha)(t) = f(\alpha(t))$$
:::
""", dibujos=[
    d("regla-cadena", r"$\mathbb{R} \xrightarrow{\ \alpha\ } \mathbb{R}^n \xrightarrow{\ f\ } \mathbb{R}$", r"$\alpha$ lleva el intervalo $I$ a la región $S$ y $f$ lleva $S$ a $\mathbb{R}$. La composición $f \circ \alpha$ va directo de $\mathbb{R}$ a $\mathbb{R}$: es una función de Cálculo I."),
])

texto("Regla de la cadena: enunciado", r"""
:::azul
Sea $t$ un punto tq $\exists\, \alpha'(t)$. Suponga que $f$ es diferenciable en $\alpha(t)$. Entonces $g : \mathbb{R} \to \mathbb{R}$ es derivable en $t$. Además:
$$g'(t) = (f \circ \alpha)'(t) = \nabla f(\alpha(t)) \cdot \alpha'(t)$$
:::

**Prueba:** {negro|Tip: use la diferenciabilidad de $f$.}
:::lapiz
Sea $t \in I$ y considere $\alpha(t) = \vec{a}$. Tome $h \neq 0$ tq $t + h \in I$ y $\alpha(t + h) \in B(\vec{a}; \varepsilon)$. Sea:
$$\vec{y} = \alpha(t + h) - \alpha(t) = \alpha(t + h) - \vec{a}$$
Tome $g(t) = f(\alpha(t)) \Rightarrow g(t + h) = f(\alpha(t + h))$. Ahora:
$$\begin{aligned} g(t + h) - g(t) &= f(\alpha(t + h)) - f(\alpha(t)) = f(\vec{a} + \vec{y}) - f(\vec{a}) \\ &= f(\vec{a} + \vec{y}) - f(\vec{a}) - T_{\vec{a}}(\vec{y}) + T_{\vec{a}}(\vec{y}) \end{aligned}$$
Además, $T_{\vec{a}}(\vec{y}) = \nabla f(\alpha(t)) \cdot \vec{y}$.
:::
""")

texto("Regla de la cadena: el límite", r"""
:::lapiz
Ent.
$$g(t + h) - g(t) = f(\vec{a} + \vec{y}) - f(\vec{a}) - \nabla f(\vec{a}) \cdot \vec{y} + \nabla f(\vec{a}) \cdot \vec{y}$$
Luego:
$$\begin{aligned} \frac{g(t + h) - g(t)}{h} &= \frac{f(\vec{a} + \vec{y}) - f(\vec{a}) - \nabla f(\vec{a}) \cdot \vec{y}}{h} + \frac{\nabla f(\vec{a}) \cdot \vec{y}}{h} \\ &\overset{\text{truco}}{=} \frac{f(\vec{a} + \vec{y}) - f(\vec{a}) - \nabla f(\vec{a}) \cdot \vec{y}}{\|\vec{y}\|} \cdot \frac{\|\vec{y}\|}{h} + \nabla f(\vec{a}) \cdot \frac{\alpha(t + h) - \alpha(t)}{h} \end{aligned}$$

Tome límite $h \to 0$:
$$g'(t) = 0 \cdot \|\alpha'(t)\| + \nabla f(\vec{a}) \cdot \alpha'(t) = \boxed{\nabla f(\vec{a}) \cdot \alpha'(t)}$$
$$\Rightarrow f(\alpha(t))' = \nabla f(\alpha(t)) \cdot \alpha'(t)$$
:::
""", nota=[r"Por qué el primer término se va a 0: como $\alpha$ es continua, $\vec{y} \to \vec{0}$ cuando $h \to 0$, y ese cociente es el de la diferenciabilidad. Mientras tanto $\frac{\|\vec{y}\|}{|h|} \to \|\alpha'(t)\|$, que es un número fijo."])

texto("Derivada direccional en una curva", r"""
:::azul
Sea $f : \mathbb{R}^n \to \mathbb{R}$ campo escalar diferenciable. Sea $\alpha : I \to \mathbb{R}^n$ derivable. La derivada direccional de $f$ en el punto $\alpha(t_0)$ a lo largo de la curva es:
$$D_{T(t_0)} f(\alpha(t_0)) = \nabla f(\alpha(t_0)) \cdot T(t_0)$$
:::

### Ejm
:::lapiz
Calcule la derivada direccional de $f(x, y, z) = x^2 + y^2 + z^2$ a lo largo de la curva
$$\mathcal{C} := \begin{cases} x^2 + y^2 + z^2 = 2z \\ x^2 + y^2 = z^2 \end{cases}$$
en el punto $(1, 0, 1) = \alpha(0)$; $\alpha(\theta) = \langle \cos\theta, \operatorname{sen}\theta, 1 \rangle$.

$$\begin{aligned} D_{T(0)} f(\alpha(0)) &= \nabla f(\alpha(0)) \cdot T(0) = \nabla f(1, 0, 1) \cdot T(0) \\ &= (2, 0, 2) \cdot (0, 1, 0) = 0 \end{aligned}$$
con $\nabla f(x, y, z) = \langle 2x, 2y, 2z \rangle$.

Observe que $f(x, y, z) = x^2 + y^2 + z^2$ en $\mathcal{C}$ es **constante**.
:::
""", nota=[r"$T(0) = \frac{\alpha'(0)}{\|\alpha'(0)\|}$ con $\alpha'(\theta) = (-\operatorname{sen}\theta, \cos\theta, 0)$, así que $T(0) = (0, 1, 0)$. Y en $\mathcal{C}$: $f = x^2 + y^2 + z^2 = 1 + 1 = 2$."])

texto("f constante en una curva", r"""
### Teorema
:::azul
Sea $f : \mathbb{R}^n \to \mathbb{R}$ un campo escalar diferenciable y definido. Sea $\mathcal{C}$ una curva smooth en $\mathbb{R}^n$ en la cual $f$ está definida, y $f|_{\mathcal{C}} = f$ restringida a la curva, donde $f|_{\mathcal{C}}$ es constante tq $f(\vec{x}) = c$, $\forall \vec{x} \in \mathcal{C}$.

Ent. la derivada direccional de $f$ en cada punto de $\mathcal{C}$ a lo largo de $\mathcal{C}$ es cero.
:::

**Prueba:**
:::lapiz
$\boxed{\text{Tip: parametrizar } \mathcal{C}} \Rightarrow \alpha : I \to \mathbb{R}^n$ con dibujo $\mathcal{C}$.

Por hip.:
$$f \circ \alpha : I \to \mathbb{R}^n \to \mathbb{R} \Rightarrow f \circ \alpha : I \to \mathbb{R} \Rightarrow (f \circ \alpha)(t) = c, \ \forall t \in I$$

Calculemos la derivada de 2 formas:
$$\begin{aligned} [f(\alpha(t))]' = [c]' &\Rightarrow \nabla f(\alpha(t)) \cdot \alpha'(t) = 0 \\ &\Rightarrow \nabla f(\alpha(t)) \cdot \frac{\alpha'(t)}{\|\alpha'(t)\|} = 0 \\ &\Rightarrow \nabla f(\alpha(t)) \cdot T(t) = 0 \\ &\Rightarrow D_{T(t)} f(\alpha(t)) = 0 \end{aligned}$$
:::

:::rojo
**Cuaderno de ejercicio:** buscar $f(x, y, z)$ y $\mathcal{C}$ tq $f|_{\mathcal{C}}$ no es constante.
:::
""", nota=[r"Un ejemplo: $f(x, y, z) = x$ en el círculo $\alpha(t) = (\cos t, \operatorname{sen} t, 0)$. Ahí $f(\alpha(t)) = \cos t$ cambia, y $D_T f = -\operatorname{sen} t$ no es siempre 0."])

texto("Superficies de nivel", r"""
### Teorema
:::azul
Sea $S$ la superficie dada por $F(x, y, z) = k$. Ent. si consideramos $S$ como **superficie de nivel**: en cada punto $\vec{a}$ de $S$, $\nabla f(\vec{a}) \perp S$.
:::

### Ejm
:::lapiz
$x^2 + y^2 + z^2 = 1$, $f(x, y, z) = x^2 + y^2 + z^2$
$$\begin{aligned} S &= \{\langle x, y, z \rangle \in \mathbb{R}^3 : f(x, y, z) = 1\} \\ &= \{\langle x, y, z \rangle \in \mathbb{R}^3 : x^2 + y^2 + z^2 = 1\} \\ &= \text{esfera de centro } \langle 0, 0, 0 \rangle \text{ y radio } 1 \end{aligned}$$
:::

### Def: Superficie de nivel
:::azul
Sea $f : \mathbb{R}^n \to \mathbb{R}$ campo escalar. Sea $c \in \mathbb{R}$.
$$S_c = \{\vec{x} \in \mathbb{R}^n : f(\vec{x}) = c\}$$
se llama **superficie de nivel de altura $c$**.
:::

### Ejm
:::lapiz
El cono $z^2 = x^2 + y^2$ se puede ver como superficie de revolución, y también como superficie de nivel: $f\langle x, y, z \rangle = x^2 + y^2 - z^2$;
$$S_0 = \{\langle x, y, z \rangle : x^2 + y^2 - z^2 = 0\} = \{\langle x, y, z \rangle : x^2 + y^2 = z^2\}$$
:::
""", dibujos=[
    d("gradiente-normal", r"$\nabla F(\vec{a}) \perp S$", r"El gradiente sale perpendicular a la superficie; por eso es el vector normal del plano tangente en $\vec{a}$, y es perpendicular a la tangente $T$ de cualquier curva dentro de $S$."),
])

texto("Ejm: recta tangente a una curva intersección", r"""
:::lapiz
Ejercicio: $f(x, y) = (x^2 + y^2)^{n/2}$. Calcule
$$x^2 \frac{\partial^2 f}{\partial x^2} + 2xy \frac{\partial^2 f}{\partial x \partial y} + y^2 \frac{\partial^2 f}{\partial y^2}$$
:::

### Ejm
:::lapiz
$$\mathcal{L} : \begin{cases} y^2 + x^2z = z + 4 \\ xz^2 + y^2 = 5 \end{cases} \iff \begin{cases} F(x, y, z) = y^2 + x^2z - z - 4 \\ G(x, y, z) = xz^2 + y^2 - 5 \end{cases}$$
$$T(t) = \frac{\nabla F(\vec{a}) \times \nabla G(\vec{a})}{\|\nabla F(\vec{a}) \times \nabla G(\vec{a})\|}$$

Sea $L$ la línea que pasa por $\langle 1, 2, 1 \rangle$ con vector director al vector tangente a $\mathcal{L}$ en $\langle 1, 2, 1 \rangle$; encuentre $L \cap \{z^2 = x + y\}$.
$$\begin{aligned} \nabla F(x, y, z) = \langle 2xz,\ 2y,\ x^2 - 1 \rangle &\Rightarrow \nabla F\langle 1, 2, 1 \rangle = \langle 2, 4, 0 \rangle \\ \nabla G(x, y, z) = \langle z^2,\ 2y,\ 2xz \rangle &\Rightarrow \nabla G\langle 1, 2, 1 \rangle = \langle 1, 4, 2 \rangle \end{aligned}$$
$$\nabla F(1, 2, 1) \times \nabla G(1, 2, 1) = \langle 8, -4, 4 \rangle$$
:::
""", nota=[r"Para comprobar el ejercicio: $f$ es homogénea de grado $n$, y la expresión da $n(n - 1)\,f$.", r"La curva es la intersección de dos superficies de nivel; su tangente es perpendicular a los dos gradientes, por eso sale el producto cruz."])

texto("Recta tangente: la intersección", r"""
:::lapiz
$$L : \langle x, y, z \rangle = \langle 1, 2, 1 \rangle + \lambda\langle 8, -4, 4 \rangle = \langle 1 + 8\lambda,\ 2 - 4\lambda,\ 1 + 4\lambda \rangle$$

$L$ interseca a $z^2 = x + y$ sii:
$$\begin{aligned} (1 + 4\lambda)^2 &= 1 + 8\lambda + 2 - 4\lambda \\ 1 + 8\lambda + 16\lambda^2 &= 3 + 4\lambda \\ 8\lambda^2 + 2\lambda - 1 &= 0 \\ \lambda_1 = -\tfrac{1}{2} \quad &\text{o} \quad \lambda_2 = \tfrac{1}{4} \end{aligned}$$

$$\therefore\ \langle x, y, z \rangle = \langle 3, 1, 2 \rangle \ ; \ \langle x, y, z \rangle = \langle -3, 4, -1 \rangle$$
:::
""", nota=[r"Ojo con el signo: las raíces de $8\lambda^2 + 2\lambda - 1$ son $\frac{-2 \pm 6}{16}$, o sea $\frac{1}{4}$ y $-\frac{1}{2}$. Con $\frac{1}{4}$ sale $\langle 3, 1, 2 \rangle$ y con $-\frac{1}{2}$, $\langle -3, 4, -1 \rangle$. Los dos cumplen $z^2 = x + y$ ✓"])

texto("El gradiente es normal a la superficie", r"""
### Ejm
:::lapiz
$x^2 + y^2 + z^2 = 1$ es superficie de nivel de altura 0. Ent.:
$$F\langle x, y, z \rangle = 0 \Rightarrow x^2 + y^2 + z^2 - 1 = 0$$
:::

### Ejm
:::lapiz
$x^2 + y^2 + z^2 = 1$ es sup. de nivel de altura 2026. Necesito $F\langle x, y, z \rangle$ tq $F\langle x, y, z \rangle = 2026$ regrese la esfera $x^2 + y^2 + z^2 = 1$. Tome:
$$F\langle x, y, z \rangle = x^2 + y^2 + z^2 + 2025 \Rightarrow 2026 = x^2 + y^2 + z^2 + 2025 \Rightarrow 1 = x^2 + y^2 + z^2$$
:::

### Teorema
:::azul
Sea $S$ una sup. de nivel de altura $K$ tq $\exists\, F(x, y, z)$: $\{\langle x, y, z \rangle : F(x, y, z) = K\} = S$. Sea $r(t)$ una curva suave que vive en $S$ y que $r(t_0) = \vec{a}$. Ent.
$$\nabla F(\vec{a}) \perp T(t_0)$$
:::

**Dem:**
:::lapiz
Como $r(t)$ vive en $S$ y $S = \{\langle x, y, z \rangle : F(x, y, z) = K\}$, ent.
$$\begin{aligned} (F \circ r)(t) = F(r(t)) = K &\Rightarrow \tfrac{d}{dt}(F \circ r)(t) = 0 \\ &\Rightarrow \nabla F(r(t_0)) \cdot r'(t_0) = 0 \\ &\Rightarrow \nabla F(\vec{a}) \cdot T(t_0) = 0 \end{aligned}$$
:::
""", nota=[r"En la esfera, un ejemplo de curva $r(t)$ es un **gran círculo**, como $x^2 + y^2 = 1$ en $z = 0$."])

texto("Plano tangente a una superficie de nivel", r"""
### Def
:::azul
Sea $\vec{a} \in S$, sup. de nivel, ent.: el plano tangente a $S$ en el punto $\vec{a}$ es el plano que pasa por $\vec{a}$ y con vector normal $\nabla F(\vec{a})$.
:::

:::lapiz
$ax + by + cz = d \Rightarrow S \leftrightarrow F(x, y, z) = k$, $\ \boxed{\vec{a} \in S}$
$$\begin{aligned} \nabla F(\vec{a}) = (\alpha_1, \alpha_2, \alpha_3) &= (a, b, c) \\ \Rightarrow \alpha_1 x + \alpha_2 y + \alpha_3 z &= d \\ \Rightarrow \alpha_1 a_1 + \alpha_2 a_2 + \alpha_3 a_3 &= d \\ \Rightarrow \alpha_1 x + \alpha_2 y + \alpha_3 z &= \alpha_1 a_1 + \alpha_2 a_2 + \alpha_3 a_3 \end{aligned}$$
:::

### Ejm
:::lapiz
Sea $x^2 + y^2 + z^2 = 1$ la sup. $S$. Calcule el plano tangente a $S$ en el polo norte $= (0, 0, 1)$.

**Sol:**
$$F(x, y, z) = x^2 + y^2 + z^2 - 1, \quad \nabla F(x, y, z) = \langle 2x, 2y, 2z \rangle, \quad \nabla F(0, 0, 1) = \langle 0, 0, 2 \rangle$$

Plano tangente: $ax + by + cz = d \Rightarrow 2z = d$. Sustituyo el punto por donde pasa el P.T., $(0, 0, 1)$:
$$2 \cdot 1 = d \Rightarrow d = 2$$
Ent. $z = 1$.
:::
""")

texto("Derivada direccional con dos superficies", r"""
{rojo|30/09/26}

### Ejm
:::lapiz
$$\mathcal{C} := \begin{cases} x^2 + y^2 = 1 \\ z = y \end{cases} \qquad P(1, 0, 0), \quad f(x, y, z) = x^2 + yz$$

**Sol:**
- $\nabla f = \langle 2x, z, y \rangle$, $\ \nabla f(1, 0, 0) = \langle 2, 0, 0 \rangle$
- $D_{\vec{T}} f(1, 0, 0) = \nabla f(1, 0, 0) \cdot \vec{T}$

∗ Para hallar a $\vec{T}$ hay 2: parametrizar la curva, o **producto vectorial**.

$x^2 + y^2 = 1 \Rightarrow F(x, y, z) = x^2 + y^2 - 1$; $\quad z = y \Rightarrow G(x, y, z) = z - y$
$$\nabla F = \langle 2x, 2y, 0 \rangle, \ \nabla F(1, 0, 0) = \langle 2, 0, 0 \rangle; \qquad \nabla G = \langle 0, -1, 1 \rangle$$
$$\nabla F(1, 0, 0) \times \nabla G(1, 0, 0) = \langle 0, -2, -2 \rangle$$
$$\vec{T} = \left(0, -\tfrac{1}{\sqrt{2}}, -\tfrac{1}{\sqrt{2}}\right) \Rightarrow D_{\vec{T}} f(1, 0, 0) = \langle 2, 0, 0 \rangle \cdot \left\langle 0, -\tfrac{1}{\sqrt{2}}, -\tfrac{1}{\sqrt{2}} \right\rangle = 0$$
:::
""")

texto("Plano tangente: resumen y ejercicio", r"""
### Plano tangente: dibujo
:::azul
$F(x, y, z) = k$. Plano tangente a $S$ en $\vec{a}$:
1. Vector normal es $\nabla F(\vec{a})$
2. Punto $\vec{a}$
:::

### Ejm
:::lapiz
$$\mathcal{C} := \begin{cases} z = x^2 + y^2 \\ 2x + 2y - z = 1 \end{cases}$$
Encuentre un punto $P$ sobre $\mathcal{C}$ donde la d.d. de $f(x, y, z) = x^2 + y^2 - z - x$ en $P$ a lo largo de $\mathcal{C}$ sea cero.
:::

{rojo|**¡Cuaderno!**}
""", nota=[r"Para comprobar: en $\mathcal{C}$ vale $z = x^2 + y^2$, así que $f = -x$. La curva es el círculo $(x - 1)^2 + (y - 1)^2 = 1$ y la derivada es 0 donde $x$ es máximo o mínimo:" + "\n\n" + r"$P = (0, 1, 1)$ o $P = (2, 1, 5)$"])

texto("Plano tangente a una superficie de revolución", r"""
### Ejm
:::lapiz
$$\mathcal{C} := \begin{cases} x^2 - y^2 = -2 \\ x + z^2 = 1 \end{cases}$$
Al girar $\mathcal{C}$ alrededor del eje $z$ se obtiene $x^2 + y^2 = 2z^4 - 4z^2 + 4$. Halle el P.T. a la S.R. en $(1, 1, 1)$.

**Sol:** veamos la S.R. como una S.N. tq
$$F(x, y, z) = x^2 + y^2 - 2z^4 + 4z^2 - 4, \qquad \nabla F(x, y, z) = \langle 2x, 2y, -8z^3 + 8z \rangle$$
- El punto $(1, 1, 1)$ vive en la S.R. $\Rightarrow \nabla F(1, 1, 1) = \langle 2, 2, 0 \rangle = \langle a, b, c \rangle$

Observe que el P.T. es $ax + by + cz = d$:
$$2x + 2y = d \Rightarrow 2 + 2 = d \Rightarrow d = 4 \ \text{(punto } (1, 1, 1))$$
$$2x + 2y = 4 \Rightarrow x + y = 2$$
:::
""", nota=[r"S.R. = superficie de revolución; S.N. = superficie de nivel; P.T. = plano tangente.", r"De dónde sale la S.R.: $x = 1 - z^2$ y $y^2 = x^2 + 2$, así que $x^2 + y^2 = 2(1 - z^2)^2 + 2 = 2z^4 - 4z^2 + 4$."])

texto("Plano tangente perpendicular a un vector", r"""
### Ejm
:::lapiz
Encuentre el plano tangente al paraboloide $z = 6x^2 + 8y^2$ que cumple que es perpendicular al vector $(3, 2, 5)$.

**Sol:** sea $(x_0, y_0, z_0)$ en el paraboloide tq su plano allí es perpendicular a $\vec{v} = (3, 2, 5)$: $\ \pi \perp \vec{v} \iff \vec{n} = \lambda\vec{v}$.
$$F(x, y, z) = 6x^2 + 8y^2 - z, \qquad \nabla F(x, y, z) = \langle 12x, 16y, -1 \rangle$$
$$\Rightarrow \langle 12x_0, 16y_0, -1 \rangle = \lambda(3, 2, 5) \Rightarrow \begin{cases} 12x_0 = 3\lambda \\ 16y_0 = 2\lambda \\ -1 = 5\lambda \end{cases}$$
∗ No olvide que $z_0 = 6x_0^2 + 8y_0^2$.

Observe que $\lambda = -\frac{1}{5}$:
$$x_0 = \tfrac{1}{4}\lambda = -\tfrac{1}{20}, \qquad y_0 = \tfrac{1}{8}\lambda = -\tfrac{1}{40}$$
$$z_0 = 6\left(-\tfrac{1}{20}\right)^2 + 8\left(-\tfrac{1}{40}\right)^2 = \tfrac{1}{50}$$
$$\therefore\ \left(-\tfrac{1}{20}, -\tfrac{1}{40}, \tfrac{1}{50}\right)$$
:::
""", dibujos=[
    d("paraboloide-tangente", r"Normal $\parallel \vec{v}$", r"El plano es perpendicular a $\vec{v}$ cuando su normal $\nabla F$ es un múltiplo de $\vec{v}$."),
], nota=[r"Ojo: $y_0 = \frac{\lambda}{8}$ con $\lambda = -\frac{1}{5}$ da $-\frac{1}{40}$ (negativo). El plano queda $3x + 2y + 5z = -\frac{1}{10}$."])

texto("Cabo suelto: diferenciable ⇒ continua", r"""
### «Cabo suelto»
:::azul
Si $f$ es diferenciable en $\vec{a}$, ent. $f$ es continua en $\vec{a}$.
:::

**Dem:**
:::lapiz
Que $f$ sea diferenciable en $\vec{a}$ significa que $\exists\, T_{\vec{a}} : \mathbb{R}^n \to \mathbb{R}$ de manera que:
$$\lim_{\vec{h} \to \vec{0}} \frac{f(\vec{a} + \vec{h}) - f(\vec{a}) - T_{\vec{a}}(\vec{h})}{\|\vec{h}\|} = 0$$
A $T_{\vec{a}}(\vec{y})$ le llamamos la diferencial de $f$ en $\vec{a}$: $\ T_{\vec{a}}(\vec{y}) = df_{\vec{a}}(\vec{y}) = \nabla f(\vec{a}) \cdot \vec{y}$.

Probemos que $f$ es una función continua en $\vec{a}$. Sea
$$E(\vec{h}) = \frac{f(\vec{a} + \vec{h}) - f(\vec{a}) - T_{\vec{a}}(\vec{h})}{\|\vec{h}\|}, \qquad * \lim_{\vec{h} \to \vec{0}} E(\vec{h}) = 0$$
$$\Rightarrow f(\vec{a} + \vec{h}) - f(\vec{a}) = \|\vec{h}\|\,E(\vec{h}) + T_{\vec{a}}(\vec{h})$$
Observe que:
$$|T_{\vec{a}}(\vec{h})| = |\nabla f(\vec{a}) \cdot \vec{h}| \le \|\nabla f(\vec{a})\|\,\|\vec{h}\| \to 0$$
Ent.
$$\lim_{\vec{h} \to \vec{0}} f(\vec{a} + \vec{h}) - f(\vec{a}) = 0 \iff \lim_{\vec{x} \to \vec{a}} f(\vec{x}) = f(\vec{a}), \ \vec{x} = \vec{a} + \vec{h}$$
:::
""", nota=[r"La desigualdad con $\|\nabla f(\vec{a})\|\,\|\vec{h}\|$ es Cauchy-Schwarz. Y $\|\vec{h}\|E(\vec{h}) \to 0 \cdot 0 = 0$."])

texto("Regla de la cadena: campos vectoriales", r"""
### Observe
:::azul
$g : \mathbb{R}^2 \to \mathbb{R}^2$; $\ F : \mathbb{R}^n \to \mathbb{R}^m$ (**campo vectorial**)

Diagrama: $\mathbb{R}^2 \xrightarrow{\ g\ } \mathbb{R}^2 \xrightarrow{\ f\ } \mathbb{R}$, y $f \circ g : \mathbb{R}^2 \to \mathbb{R}$.

Entonces buscamos la derivada tq:
$$d(f \circ g)_{\vec{a}} = df_{g(\vec{a})} \cdot dg_{\vec{a}}$$
:::

{rojo|∗ **Modo ingeniero:**} $z = f(x, y) = f(x(u, v), y(u, v))$

{rojo|**Ejm:**} $z = f(x, y) = f(r\cos\theta, r\operatorname{sen}\theta)$

### Diagrama molecular: Ejm
:::azul
$z = f(x, y)$, con $x = x(u, v)$ y $y = y(u, v)$. ¿Cómo calcular $\frac{\partial z}{\partial u}$, $\frac{\partial z}{\partial v}$?
$$\frac{\partial z}{\partial u} = \frac{\partial f}{\partial x} \cdot \frac{\partial x}{\partial u} + \frac{\partial f}{\partial y} \cdot \frac{\partial y}{\partial u}$$
$$\frac{\partial z}{\partial v} = \frac{\partial f}{\partial x} \cdot \frac{\partial x}{\partial v} + \frac{\partial f}{\partial y} \cdot \frac{\partial y}{\partial v}$$
:::
""", nota=[r"El diagrama molecular: de $z$ bajan flechas a $x$ y $y$, y de cada una a $u$ y $v$. Para $\frac{\partial z}{\partial u}$ se suman todos los caminos que llegan a $u$, multiplicando las derivadas de cada camino."])

texto("Diagrama con tres variables", r"""
### Ejm
:::lapiz
$w = f(x, y, z) = f(x(r, s, t);\ y(r, s, t);\ z(r, s, t))$
$$\frac{\partial w}{\partial r} = \frac{\partial f}{\partial x}\frac{\partial x}{\partial r} + \frac{\partial f}{\partial y}\frac{\partial y}{\partial r} + \frac{\partial f}{\partial z}\frac{\partial z}{\partial r}$$
$$\frac{\partial w}{\partial s} = \frac{\partial f}{\partial x}\frac{\partial x}{\partial s} + \frac{\partial f}{\partial y}\frac{\partial y}{\partial s} + \frac{\partial f}{\partial z}\frac{\partial z}{\partial s}$$
$$\frac{\partial w}{\partial t} = \frac{\partial f}{\partial x}\frac{\partial x}{\partial t} + \frac{\partial f}{\partial y}\frac{\partial y}{\partial t} + \frac{\partial f}{\partial z}\frac{\partial z}{\partial t}$$
:::

### Función homogénea
:::azul
Una función se llama **homogénea de grado $K$** si cumple:
$$f(tx, ty) = t^K f(x, y)$$
:::

### Ejm
:::lapiz
$f(x, y) = \dfrac{x^3 + y^3}{x + y}$ es homogénea de grado 2:
$$f(tx, ty) = \frac{(tx)^3 + (ty)^3}{tx + ty} = \frac{t^3(x^3 + y^3)}{t(x + y)} = t^2 \cdot \frac{x^3 + y^3}{x + y} = t^2 f(x, y)$$
:::
""")

texto("Lema de Euler", r"""
### Lema
:::azul
Si $f(x, y)$ es homogénea de grado $K$ entonces:
$$x \cdot \frac{\partial f}{\partial x} + y \cdot \frac{\partial f}{\partial y} = K f$$
:::

### Ejm
:::lapiz
$f(x, y) = x^3 + y^3$: $\ f(tx, ty) = t^3x^3 + t^3y^3 = t^3(x^3 + y^3) = t^3 f(x, y)$ $\ \therefore$ es grado 3.

Ahora: $\frac{\partial f}{\partial x} = 3x^2$, $\frac{\partial f}{\partial y} = 3y^2$
$$x(3x^2) + y(3y^2) = Kf \Rightarrow 3x^3 + 3y^3 = Kf \Rightarrow 3(x^3 + y^3) = Kf$$
:::

**Dem:**
:::lapiz
$f(x, y)$ es homogénea de grado $K$ ent. $f(tx, ty) = t^K f(x, y)$.

Sea $g(t) = t^K f(x, y) \Rightarrow \frac{dg}{dt} = K t^{K-1} f(x, y)$.

Diagrama molecular: $g(t) = f(tx, ty)$; $u = tx$, $v = ty$:
$$\frac{dg}{dt} = \frac{\partial f}{\partial u}\frac{\partial u}{\partial t} + \frac{\partial f}{\partial v}\frac{\partial v}{\partial t} = \frac{\partial f}{\partial u} \cdot x + \frac{\partial f}{\partial v} \cdot y$$
$$\Rightarrow K t^{K-1} f(x, y) = x\frac{\partial f}{\partial u} + y\frac{\partial f}{\partial v} \ \Rightarrow\ K f(x, y) = x\frac{\partial f}{\partial x} + y\frac{\partial f}{\partial y}, \quad t = 1$$
:::
""", nota=[r"Con $t = 1$ se tiene $u = x$ y $v = y$, por eso $\frac{\partial f}{\partial u}$ pasa a ser $\frac{\partial f}{\partial x}$."])

texto("Segunda derivada en polares", r"""
### Ejm
:::lapiz
Sea $z = f(x, y) = f(r\cos\theta, r\operatorname{sen}\theta)$. ¿$\frac{\partial^2 z}{\partial r^2}$?
$$\begin{aligned} \frac{\partial^2 z}{\partial r^2} &= \frac{\partial}{\partial r}\left(\frac{\partial z}{\partial r}\right) = \frac{\partial}{\partial r}\left(\frac{\partial f}{\partial x}\frac{\partial x}{\partial r} + \frac{\partial f}{\partial y}\frac{\partial y}{\partial r}\right) \\ &= \frac{\partial}{\partial r}\left(\frac{\partial f}{\partial x}\cos\theta + \frac{\partial f}{\partial y}\operatorname{sen}\theta\right) \\ &= \frac{\partial}{\partial r}\left(\frac{\partial f}{\partial x}\right)\cos\theta + \frac{\partial}{\partial r}\left(\frac{\partial f}{\partial y}\right)\operatorname{sen}\theta \\ &= \left(\frac{\partial^2 f}{\partial x^2}\frac{\partial x}{\partial r} + \frac{\partial^2 f}{\partial y \partial x}\frac{\partial y}{\partial r}\right)\cos\theta + \left(\frac{\partial^2 f}{\partial y^2}\frac{\partial y}{\partial r} + \frac{\partial^2 f}{\partial x \partial y}\frac{\partial x}{\partial r}\right)\operatorname{sen}\theta \\ &= \left(\frac{\partial^2 f}{\partial x^2}\cos\theta + \frac{\partial^2 f}{\partial y \partial x}\operatorname{sen}\theta\right)\cos\theta + \left(\frac{\partial^2 f}{\partial y^2}\operatorname{sen}\theta + \frac{\partial^2 f}{\partial x \partial y}\cos\theta\right)\operatorname{sen}\theta \end{aligned}$$
:::
""", nota=[r"∗ $\frac{\partial f}{\partial x}$ y $\frac{\partial f}{\partial y}$ también dependen de $r$ y $\theta$ a través de $x$ y $y$: tienen su propio diagrama molecular.", r"Con Schwarz (mixtas iguales) queda:" + "\n\n" + r"$f_{xx}\cos^2\theta + 2f_{xy}\operatorname{sen}\theta\cos\theta + f_{yy}\operatorname{sen}^2\theta$"])

texto("Ejercicios: tangentes y φ(x² − y²)", r"""
:::rojo
**Cuaderno:**
:::
:::azul
Sean $z = x^2 + 3y$; $r(t) = (t, 2 - t, t^2)$. Sea $(a, b, c)$ punto común a la superficie y a la curva.
- Verifique si la recta tangente a la curva $r(t)$ en $(a, b, c)$ vive o no en el plano tangente a $S$ en $(a, b, c)$.
:::

### Ejercicio
:::azul
Sea $u(x, y) = \phi(x^2 - y^2)$, donde $\phi$ es una función de CyA I dos veces derivable. Compruebe:
$$y^2\frac{\partial^2 u}{\partial x^2} + x^2\frac{\partial^2 u}{\partial y^2} + 2xy\frac{\partial^2 u}{\partial y \partial x} + y\frac{\partial u}{\partial y} + x\frac{\partial u}{\partial x} = 0$$
:::
""", nota=[r"Para comprobar el primero: $t^2 = t^2 + 3(2 - t)$ da $t = 2$, el punto $(2, 0, 4)$. La tangente $r'(2) = (1, -1, 4)$ y la normal $\nabla F = (4, 3, -1)$ dan $4 - 3 - 4 = -3 \neq 0$: la recta **no** vive en el plano tangente."])

texto("φ(x² − y²): la solución", r"""
**Sol:**
:::lapiz
$t = x^2 - y^2 \Rightarrow u(x, y) = \phi(x^2 - y^2)$
$$\frac{\partial u}{\partial y} = \phi' \frac{\partial t}{\partial y} = -2y\phi', \qquad \frac{\partial u}{\partial x} = \phi' \frac{\partial t}{\partial x} = 2x\phi'$$
$$\frac{\partial^2 u}{\partial y^2} = \frac{\partial}{\partial y}(-2y\phi') = -2y\,\phi''\,(-2y) - 2\phi' = 4y^2\phi'' - 2\phi'$$
$$\frac{\partial^2 u}{\partial x^2} = \frac{\partial}{\partial x}(2x\phi') = 4x^2\phi'' + 2\phi', \qquad \frac{\partial^2 u}{\partial y \partial x} = \frac{\partial}{\partial y}(2x\phi') = -4xy\phi''$$

Ahora:
$$\begin{aligned} &y^2(4x^2\phi'' + 2\phi') + x^2(4y^2\phi'' - 2\phi') + 2xy(-4xy\phi'') + y(-2y\phi') + x(2x\phi') \\ = &\ 4x^2y^2\phi'' + 2y^2\phi' + 4x^2y^2\phi'' - 2x^2\phi' - 8x^2y^2\phi'' - 2y^2\phi' + 2x^2\phi' \\ = &\ 8x^2y^2\phi'' - 8x^2y^2\phi'' = 0 \end{aligned}$$
:::
""")

texto("Derivación implícita", r"""
### Ejercicio
:::lapiz
Calcule $\frac{\partial z}{\partial x}$ de $x^2 + y^2 + z^2 = 1$.

**Sol:** $z^2 = 1 - x^2 - y^2 \Rightarrow z = \pm\sqrt{1 - x^2 - y^2}$
$$\frac{\partial z}{\partial x} = \pm\left(\tfrac{1}{2}[1 - x^2 - y^2]^{-1/2}\right) \cdot (-2x) = \mp\frac{x}{\sqrt{1 - x^2 - y^2}}$$
:::

### Ejercicio
:::lapiz
Calcule $\frac{\partial z}{\partial x}$ de $e^{x+y+z} + \tan(z^2) + \ln(x^2 + y^2 + z^2) = 0$.
:::

### Def: Derivación implícita
:::azul
Sea $F(x, y, z) = 0$ una relación entre las variables $x, y, z$. Diremos que $z$ está definida implícitamente en términos de «$x$» e «$y$» si $z = \phi(x, y)$.
:::
""", nota=[r"En los dos signos el resultado es $\frac{\partial z}{\partial x} = -\frac{x}{z}$.", r"Para el segundo (derivando y despejando):" + "\n\n" + r"$\frac{\partial z}{\partial x} = -\dfrac{e^{x+y+z} + \frac{2x}{x^2+y^2+z^2}}{e^{x+y+z} + 2z\sec^2(z^2) + \frac{2z}{x^2+y^2+z^2}}$"])

texto("Derivación implícita: ejemplos", r"""
### Ejm (Patito)
:::lapiz
Suponga que $x^2 + y^2 + z^2 = 1$ define implícitamente a $z$ como función de «$x$» e «$y$». Calcule $\frac{\partial z}{\partial x}$ y $\frac{\partial z}{\partial y}$:
$$\begin{aligned} \tfrac{\partial}{\partial x}(x^2 + y^2 + z^2) &= \tfrac{\partial}{\partial x}(1) & \tfrac{\partial}{\partial y}(x^2 + y^2 + z^2) &= \tfrac{\partial}{\partial y}(1) \\ 2x + 0 + 2z\tfrac{\partial z}{\partial x} &= 0 & 2y + 2z\tfrac{\partial z}{\partial y} &= 0 \\ \tfrac{\partial z}{\partial x} &= -\tfrac{x}{z} & \tfrac{\partial z}{\partial y} &= -\tfrac{y}{z} \end{aligned}$$
:::

### Ejm
:::lapiz
Suponga que $F\left(\frac{x}{y},\ \frac{y}{x} + z,\ \frac{x}{z}\right) = 0$ define $z$ como una función implícita de «$x$» e «$y$». Calcule $\frac{\partial z}{\partial x}$.

Observe: $g(x, y) = F(u, v, w) = 0$; $\ u = \frac{x}{y}$, $v = \frac{y}{x} + z$, $w = \frac{x}{z}$. Calculemos $\frac{\partial g}{\partial x} = 0$:
$$\begin{aligned} &\frac{\partial F}{\partial u}\frac{\partial u}{\partial x} + \frac{\partial F}{\partial v}\frac{\partial v}{\partial x} + \frac{\partial F}{\partial w}\frac{\partial w}{\partial x} = 0 \\ \Rightarrow\ &\frac{1}{y}\frac{\partial F}{\partial u} + \frac{\partial F}{\partial v}\left(-\frac{y}{x^2} + \frac{\partial z}{\partial x}\right) + \frac{\partial F}{\partial w}\left(\frac{z - x\frac{\partial z}{\partial x}}{z^2}\right) = 0 \end{aligned}$$
:::
""", nota=[r"Despejando:" + "\n\n" + r"$\frac{\partial z}{\partial x} = -\dfrac{\frac{1}{y}F_u - \frac{y}{x^2}F_v + \frac{1}{z}F_w}{F_v - \frac{x}{z^2}F_w}$"])

texto("Lo que sigue", r"""
:::rojo
1. Máximos y mínimos
2. Teorema de Taylor
3. Matriz Hessiana
4. Criterio de Gulden Finger
5. Multiplicadores de Lagrange
:::
""", nota=[r"El criterio de «Gulden Finger» es el de los **menores principales** de la Hessiana (también llamado de Sylvester)."])

texto("Máximos y mínimos", r"""
### Ejm
:::lapiz
$z = x^2 + y^2$ (paraboloide). $f(x, y) = x^2 + y^2$; se observa que $f$ posee un mínimo en $(0, 0)$.
:::

### Def: Mínimo
:::azul
Sea $f : S \subset \mathbb{R}^2 \to \mathbb{R}$ una función de dos variables. Diremos que $f$ posee un **mínimo** en el punto $(a, b)$ si y solo si
$$f(a, b) \le f(x, y), \quad \forall (x, y) \in S$$
:::

### Def: Máximo
:::azul
Sea $f : S \subset \mathbb{R}^2 \to \mathbb{R}$ una función de dos variables. Diremos que $f$ posee un **máximo** en el punto $(c, d)$ si y solo si
$$f(c, d) \ge f(x, y), \quad \forall (x, y) \in S$$
:::

**Nota:**
:::azul
Existen mínimos y máximos relativos de $f$ tq: $(a, b)$ es un punto máximo relativo si $\exists\, B(\vec{a}; r) \subset S$ donde $f(a, b)$ es máximo absoluto.

∗ Análogamente sucede con el mínimo absoluto.
:::
""", dibujos=[
    d("paraboloide-arriba", r"$z = x^2 + y^2$", r"El punto más bajo del paraboloide es el origen: ahí $f$ tiene su mínimo."),
], nota=[r"«Relativo» = solo se compara con los puntos cercanos (dentro de una bola). «Absoluto» = con todos los puntos de $S$."])

texto("Extremos: el gradiente se anula", r"""
### Teorema
:::azul
Suponga que en $(a, b)$ la función $f(x, y)$ es diferenciable. Suponga que $(a, b)$ es un **punto extremo** relativo de $f(x, y)$. Ent.
$$\nabla f(a, b) = (0, 0)$$
:::

**Máximo relativo:** $f(a, b) \ge f(a + h, b + k)$, para algunos $h, k \in \mathbb{R}$.

**Dem:**
:::lapiz
Suponga que en $(a, b)$ se alcanza el máximo: $f(a, b) \ge f(a + h, b + k)$. Observe la siguiente función:
$$g(t) = f(a + t, b)$$
Su derivada:
$$g'(t) = \frac{\partial f}{\partial x}(a + t, b) \cdot 1$$
Tome $t = 0$:
$$g'(0) = \frac{\partial f}{\partial x}(a, b) = 0; \quad \text{por CyA I}$$
Pero observe: $g(0) = f(a, b) \Rightarrow f(a, b) \ge g(t)$.
:::
""", nota=[r"«Por CyA I»: $g$ es de una variable y tiene un máximo en $t = 0$, así que $g'(0) = 0$."])

texto("Puntos críticos y puntos de silla", r"""
:::lapiz
Ahora si hacemos $g(t) = f(a, b + t)$. Tomando $t = 0$:
$$g(0) = f(a, b) \ge f(a, b + t)$$
Tomando su derivada:
$$g'(t) = \frac{\partial f}{\partial y}(a, b + t) \cdot 1 \Rightarrow g'(0) = \frac{\partial f}{\partial y}(a, b) = 0$$
:::

### Pregunta
:::azul
¿Dónde será pertinente ir a buscar los $(a, b)$ candidatos a máximos o mínimos de $f(x, y)$?
:::

∗ Se debe buscar los $(x, y)$ tq:
$$\nabla f(x, y) = (0, 0) \longrightarrow \begin{cases} \frac{\partial f}{\partial x}(x, y) = 0 \\ \frac{\partial f}{\partial y}(x, y) = 0 \end{cases}$$

### Def: Puntos de silla
:::azul
Puntos en $f$ que no se definen como máximos ni mínimos.
:::

∗ **Nota:** casi siempre obtenemos sistemas no lineales.
""", nota=[r"Los puntos donde $\nabla f = (0, 0)$ se llaman **puntos críticos**. Un punto de silla es un punto crítico que no es ni máximo ni mínimo (como el centro de una silla de montar, $z = x^2 - y^2$)."])

texto("Ejm: puntos críticos", r"""
### Ejm
:::lapiz
$f(x, y) = x^3 + y^2 - yx^2 - xy$. ¿$\nabla f(x, y) = (0, 0)$?
$$\nabla f(x, y) = (3x^2 - 2xy - y,\ 2y - x^2 - x) = (0, 0)$$
$$\Rightarrow \begin{cases} 3x^2 - 2xy - y = 0 & ① \\ 2y - x^2 - x = 0 & ② \end{cases}$$

② $2y = x^2 + x \Rightarrow y = \frac{x^2 + x}{2}$. En ①:
$$\begin{aligned} 3x^2 - 2x\left(\tfrac{x^2 + x}{2}\right) - \left(\tfrac{x^2 + x}{2}\right) &= 0 \\ 6x^2 - 2x^3 - 2x^2 - x^2 - x &= 0 \\ 3x^2 - 2x^3 - x &= 0 \\ x(3x - 2x^2 - 1) &= 0 \\ x = 0 \ \vee\ 2x^2 - 3x + 1 &= 0 \\ x = 0 \ \vee\ x = 1 \ \vee\ x &= \tfrac{1}{2} \end{aligned}$$

$\therefore$ $(0, 0)$, $(1, 1)$ y $\left(\frac{1}{2}, \frac{3}{8}\right)$ son candidatos a un máximo o mínimo.
:::

### Pregunta
:::azul
¿Cómo saber entre los puntos críticos quién es quién?
:::
""")

texto("Taylor de primer orden", r"""
:::lapiz
$f$ es dif. en $(a, b) \iff$
$$\lim_{\vec{h} \to \vec{0}} \frac{f((a, b) + \vec{h}) - f(a, b) - \nabla f(a, b) \cdot \vec{h}}{\|\vec{h}\|} = 0$$

Sea $E(\vec{h})$ tq:
$$E(\vec{h}) = \frac{f((a, b) + \vec{h}) - f(a, b) - \nabla f(a, b) \cdot \vec{h}}{\|\vec{h}\|}$$
$$\boxed{\Rightarrow E(\vec{h})\|\vec{h}\| + f(a, b) + \nabla f(a, b) \cdot \vec{h} = f((a, b) + \vec{h})}$$
→ Desarrollo de Taylor de primer orden.

Si $(a, b)$ es punto crítico ($\nabla f(a, b) = \vec{0}$), entonces Taylor se reduce:
$$f(a + h_1, b + h_2) - f(a, b) = \|\vec{h}\|\,E(\vec{h})$$
- Si $f(a + h_1, b + h_2) - f(a, b) \ge 0 \Rightarrow f(a + h_1, b + h_2) \ge f(a, b) \Rightarrow (a, b)$ es **mínimo**
- Si $f(a + h_1, b + h_2) - f(a, b) \le 0 \Rightarrow f(a + h_1, b + h_2) \le f(a, b) \Rightarrow (a, b)$ es **máximo**
:::
""", nota=[r"Problema: $E(\vec{h})$ no dice nada de su signo. Por eso se necesita Taylor de **segundo** orden, con la Hessiana."])

texto("Matriz Hessiana", r"""
### Def: Matriz Hessiana, $n = 2$
:::azul
$$\nabla f(x, y) = \left(\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}\right)$$
$$H_f(x, y) = \begin{bmatrix} \dfrac{\partial^2 f}{\partial x^2} & \dfrac{\partial^2 f}{\partial x \partial y} \\[2mm] \dfrac{\partial^2 f}{\partial y \partial x} & \dfrac{\partial^2 f}{\partial y^2} \end{bmatrix}_{2 \times 2}; \quad \text{es simétrica}$$
:::

:::rojo
**Ejercicios cuaderno:**
:::
:::lapiz
$$(h_1, h_2)_{1 \times 2} \begin{bmatrix} \dfrac{\partial^2 f}{\partial x^2} & \dfrac{\partial^2 f}{\partial x \partial y} \\[2mm] \dfrac{\partial^2 f}{\partial y \partial x} & \dfrac{\partial^2 f}{\partial y^2} \end{bmatrix}_{2 \times 2} \begin{bmatrix} h_1 \\ h_2 \end{bmatrix}_{2 \times 1}$$
:::
""", nota=[r"Es simétrica por Schwarz. Para comprobar el ejercicio, el producto da un número:" + "\n\n" + r"$f_{xx}h_1^2 + 2f_{xy}h_1h_2 + f_{yy}h_2^2$"])

texto("Taylor de orden 2", r"""
### Def: Taylor de orden 2
:::azul
$$f(a + h_1, b + h_2) = f(a, b) + \nabla f(a, b) \cdot \vec{h} + \tfrac{1}{2}(h_1, h_2)\,H_f(a, b)\binom{h_1}{h_2} + \|\vec{h}\|^2 E_2((a, b), \vec{h})$$
:::

∗ **Nota:** $\displaystyle\lim_{\vec{h} \to \vec{0}} E_2((a, b), \vec{h}) = 0$

:::lapiz
¡$(a, b)$ es crítico! $\Rightarrow \nabla f(a, b) = (0, 0)$:
$$\boxed{f(a + h_1, b + h_2) - f(a, b)} = \tfrac{1}{2}\vec{h}\,H_f(a, b)\binom{h_1}{h_2} + \|\vec{h}\|^2 E_2((a, b), \vec{h})$$
- $\ge 0$: **mínimo**
- $\le 0$: **máximo**
:::

### Taylor para 3 variables
:::azul
Si $(a, b, c) \in \mathbb{R}^3$:
$$f(a + h_1, b + h_2, c + h_3) = f(a, b, c) + \nabla f(a, b, c) \cdot \vec{h} + \|\vec{h}\|\,E(\vec{h})$$
Igual que si $\nabla f(a, b, c) = (0, 0, 0)$: $\ f(a + h_1, b + h_2, c + h_3) = f(a, b, c) + \|\vec{h}\|\,E(\vec{h})$

¡Taylor de orden 2!
$$f(\vec{a} + \vec{h}) = f(a, b, c) + \vec{h} \cdot \nabla f(a, b, c) + \tfrac{1}{2}\vec{h}\,H_f(a, b, c)\begin{pmatrix} h_1 \\ h_2 \\ h_3 \end{pmatrix} + \|\vec{h}\|^2 E_2((a, b, c); \vec{h})$$
:::
""", nota=[r"Cerca del punto crítico manda el término de la Hessiana (el error $\|\vec{h}\|^2 E_2$ es más chico). Su signo decide si es máximo o mínimo."])

texto("Algoritmo: máximos, mínimos y sillas", r"""
### Algoritmo
:::azul
Cálculo de máximos, mínimos y puntos de silla de $f(x, y, z)$:

1. Calcular $\nabla f(x, y, z) = (0, 0, 0)$: $\ \begin{cases} \frac{\partial f}{\partial x} = 0 \\ \frac{\partial f}{\partial y} = 0 \\ \frac{\partial f}{\partial z} = 0 \end{cases}$
2. Para cada $(a, b, c)$ encontrado en (1) estudie el signo de
$$\tfrac{1}{2} \cdot \vec{h} \cdot H_f(a, b, c) \cdot \begin{pmatrix} h_1 \\ h_2 \\ h_3 \end{pmatrix}$$
:::

### Ejm
:::lapiz
$f(x, y) = x^2 + y^2$

1) $\nabla f(x, y) = (2x, 2y)$: $\ \begin{cases} 2x = 0 \\ 2y = 0 \end{cases}$

2) $H_f(x, y) = \begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix}$
$$\begin{aligned} \tfrac{1}{2}(h_1, h_2)\,H_f(x, y)\binom{h_1}{h_2} &= \tfrac{1}{2}(h_1, h_2)\begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix}\binom{h_1}{h_2} = \tfrac{1}{2}[2h_1, 2h_2]\binom{h_1}{h_2} \\ &= \tfrac{1}{2}(2h_1^2 + 2h_2^2) = h_1^2 + h_2^2 > 0 \end{aligned}$$
:::
""", nota=[r"Conclusión: el único punto crítico es $(0, 0)$ y ahí la forma es positiva para todo $\vec{h} \neq \vec{0}$: es un **mínimo**."])

texto("Criterio de Gulden Finger", r"""
:::azul
$$H_f(x, y, z) = \begin{bmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{bmatrix}$$
En un punto crítico:
- Si $a_{11} > 0$, $\begin{vmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{vmatrix} > 0$, $\det H_f > 0$ $\Rightarrow$ **hay mínimo**
- Si $a_{11} < 0$, $\begin{vmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{vmatrix} > 0$, $\det H_f < 0$ $\Rightarrow$ **hay máximo**

∗ En otro caso, excepto $\det H_f = 0$, es **punto silla**.
:::

:::lapiz
$\boxed{\det H_f = 0}$: no se puede definir nada.
:::
""", nota=[r"Regla para recordar: mínimo = todos los menores positivos $(+, +, +)$; máximo = signos alternados empezando en negativo $(-, +, -)$.", r"En dos variables: $\Delta_2 = f_{xx}f_{yy} - f_{xy}^2$. Si $\Delta_2 > 0$, el signo de $f_{xx}$ decide; si $\Delta_2 < 0$, es silla."])

texto("Ejm: f = x + y", r"""
### Ejm
:::lapiz
$f(x, y) = x + y$. ¿Tiene máximo?

Si su máximo $f$ es $M$, es decir, $f(x_0, y_0) = M$ y $M \ge f(x, y)$, $\forall (x, y)$. Tome $(x_0 + 1, y_0 + 1)$ tq:
$$f(x_0 + 1, y_0 + 1) = x_0 + 1 + y_0 + 1 = M + 2 > M \ ↯$$
:::

:::rojo
∗ **Ejercicio cuaderno**
:::

### ¿Y si restringimos?
:::lapiz
$f(x, y) = x + y$ con la restricción $x^2 + y^2 = 1$.

**1° enfoque:** parametrizando, $\alpha(\theta) = (\cos\theta, \operatorname{sen}\theta)$
$$\Rightarrow f(\cos\theta, \operatorname{sen}\theta) = \cos\theta + \operatorname{sen}\theta \Rightarrow g(\theta) = \cos\theta + \operatorname{sen}\theta$$
$$\Rightarrow g'(\theta) = \cos\theta - \operatorname{sen}\theta$$
$$g'(\theta) = 0 \iff \operatorname{sen}\theta = \cos\theta \iff \tan\theta = 1 \Rightarrow \theta = \tfrac{\pi}{4},\ \tfrac{5\pi}{4}$$
:::
""", nota=[r"Sin restricción, $\nabla f = (1, 1)$ nunca es $(0, 0)$: no hay puntos críticos, y por eso no hay máximo ni mínimo."])

texto("Restricción: análisis", r"""
:::lapiz
Analice:
$$g''(\theta) = -\cos\theta - \operatorname{sen}\theta$$
$$g''\left(\tfrac{\pi}{4}\right) = -\sqrt{2} < 0, \qquad g''\left(\tfrac{5\pi}{4}\right) = \sqrt{2} > 0$$

Comparamos con los extremos del intervalo $[0, 2\pi]$:
$$g(0) = g(2\pi) = 1, \qquad g\left(\tfrac{\pi}{4}\right) = \sqrt{2}, \qquad g\left(\tfrac{5\pi}{4}\right) = -\sqrt{2}$$

- Cuando $\theta = \frac{\pi}{4}$ es **máximo** $\Rightarrow (x, y) = \left(\frac{\sqrt{2}}{2}, \frac{\sqrt{2}}{2}\right)$, $f = \sqrt{2}$
- Cuando $\theta = \frac{5\pi}{4}$ es **mínimo** $\Rightarrow (x, y) = \left(-\frac{\sqrt{2}}{2}, -\frac{\sqrt{2}}{2}\right)$, $f = -\sqrt{2}$
:::

### Def: Multiplicadores de Lagrange
:::azul
Sea $f(x, y)$ una función diferenciable. Sea $(a, b)$ un punto extremo de $f$ sujeto a la ligadura $g(x, y) = 0$. Ent. $\exists\, \lambda \in \mathbb{R}$ (**multiplicador de Lagrange**) tq:
$$\nabla f(a, b) = \lambda\nabla g(a, b)$$
:::

∗ **Nota:** al tener $f(x, y)$ y $g(x, y) = 0$, ent. $\begin{cases} \nabla f(x, y) = \lambda\nabla g(x, y) \\ g(x, y) = 0 \end{cases}$
""", nota=[r"Ojo con el signo: de $\cos\theta - \operatorname{sen}\theta = 0$ sale $\tan\theta = 1$ (no $-1$). En $\frac{3\pi}{4}$ y $\frac{7\pi}{4}$ la función vale 0, que no es extremo. La hoja siguiente lo confirma con Lagrange: máx $\sqrt{2}$, mín $-\sqrt{2}$."])

texto("Lagrange: ejemplo", r"""
:::rojo
∗ **Ejercicio cuaderno**
:::

### Ejm
:::lapiz
$$\begin{cases} f(x, y) = x + y \\ x^2 + y^2 = 1 \end{cases} \Rightarrow \begin{cases} f(x, y) = x + y \\ g(x, y) = x^2 + y^2 - 1 \end{cases}$$

**Sol:** $\nabla f(x, y) = \langle 1, 1 \rangle$, $\ \nabla g(x, y) = \langle 2x, 2y \rangle$
$$\nabla f = \lambda\nabla g \Rightarrow \langle 1, 1 \rangle = \lambda\langle 2x, 2y \rangle$$
Y debemos resolver:
$$\begin{cases} 1 = 2x\lambda \\ 1 = 2y\lambda \\ 1 = x^2 + y^2 \end{cases}; \ \lambda \neq 0 \Rightarrow \begin{cases} \frac{1}{2\lambda} = x \\ \frac{1}{2\lambda} = y \\ 1 = \frac{1}{4\lambda^2} + \frac{1}{4\lambda^2} \end{cases} \Rightarrow \begin{cases} x = \pm\frac{\sqrt{2}}{2} \\ y = \pm\frac{\sqrt{2}}{2} \\ \lambda = \pm\frac{1}{\sqrt{2}} \end{cases}$$

$\therefore f\left(\frac{\sqrt{2}}{2}, \frac{\sqrt{2}}{2}\right) = \sqrt{2}$ **máximo**

$\therefore f\left(-\frac{\sqrt{2}}{2}, -\frac{\sqrt{2}}{2}\right) = -\sqrt{2}$ **mínimo**
:::
""", dibujos=[
    d("lagrange-circulo", r"$\nabla f \parallel \nabla g$", r"Las rectas $x + y = c$ son las curvas de nivel de $f$. El máximo y el mínimo están donde una de esas rectas toca el círculo sin cortarlo: ahí los dos gradientes son paralelos."),
], nota=[r"$\lambda \neq 0$ porque si $\lambda = 0$ quedaría $1 = 0$. Y $x = y$ en los dos casos, porque los dos son $\frac{1}{2\lambda}$."])

texto("Conjunto compacto", r"""
### Def: Conjunto compacto
{negro|Solo funciona en dimensión finita.}
:::azul
Un $A \subset \mathbb{R}^n$ se dice ser **compacto** sii:
1. $A$ es cerrado
2. $A$ es acotado
:::

∗ Acotado: alcanza en una bola centrada en el origen de radio finito.

### Ejm
:::lapiz
$(x - x_0)^2 + (y - y_0)^2 = r^2$
:::

### Teorema
:::azul
Sea $f : A \subset \mathbb{R}^2 \to \mathbb{R}$ continua y $A$ compacto. Ent.
$$\exists\, (x_0, y_0) \in A \text{ tq: } f(x_0, y_0) = \max f$$
$$\exists\, (x_1, y_1) \in A \text{ tq: } f(x_1, y_1) = \min f$$
:::
""", nota=[r"El círculo es compacto: es cerrado (contiene su borde) y cabe en una bola de radio finito. Por eso $x + y$ sí alcanza máximo y mínimo en él, aunque en todo $\mathbb{R}^2$ no.", r"El teorema es el de **Weierstrass** (valores extremos)."])

texto("Ejm: máximos en una elipse", r"""
### Ejm
:::lapiz
$f(x, y) = e^{x^2 + y^2}$; restricción $x^2 + xy + y^2 \le 1$. ∗ Es una elipse y su interior.

**Sol:** debemos trabajar el interior y en el borde.

**1)** $x^2 + xy + y^2 < 1$ (abierto)
$$\nabla f(x, y) = \left\langle 2xe^{x^2+y^2},\ 2ye^{x^2+y^2} \right\rangle$$
$$\nabla f(x, y) = (0, 0) \Rightarrow \begin{cases} 2xe^{x^2+y^2} = 0 \\ 2ye^{x^2+y^2} = 0 \end{cases} \Rightarrow \begin{cases} x = 0 \\ y = 0 \end{cases}$$

**2)** $x^2 + xy + y^2 = 1$. Debemos hallar $f(x, y) = e^{x^2+y^2}$ sujeto a $x^2 + xy + y^2 = 1$.

Multiplicador de Lagrange:
$$\nabla f(x, y) = \left(2xe^{x^2+y^2},\ 2ye^{x^2+y^2}\right) = \lambda(2x + y,\ 2y + x)$$
$$\Rightarrow \begin{cases} 2xe^{x^2+y^2} = 2\lambda x + y\lambda & ① \\ 2ye^{x^2+y^2} = 2\lambda y + x\lambda & ② \\ x^2 + xy + y^2 = 1 & ③ \end{cases}$$
Restando ① − ②:
$$\begin{aligned} 2xe^{x^2+y^2} - 2ye^{x^2+y^2} &= 2\lambda x + \lambda y - 2\lambda y - x\lambda \\ 2e^{x^2+y^2}(x - y) &= \lambda(x - y) \\ (x - y)\left(2e^{x^2+y^2} - \lambda\right) &= 0 \\ \Rightarrow\ x = y \quad &\text{o} \quad 2e^{x^2+y^2} = \lambda \end{aligned}$$
:::
""", dibujos=[
    d("elipse-restriccion", r"$x^2 + xy + y^2 \le 1$", r"La región es compacta (cerrada y acotada), así que por Weierstrass hay máximo y mínimo: o en el interior (donde $\nabla f = 0$) o en el borde (con Lagrange)."),
])

texto("Elipse: los dos casos", r"""
:::lapiz
**Caso 1:** $x = y$
$$\begin{cases} 2xe^{2x^2} = 3x\lambda \\ 2xe^{2x^2} = 3x\lambda \\ 3x^2 = 1 \end{cases} \Rightarrow \begin{cases} 2xe^{2x^2} = 3x\lambda \\ x^2 = \frac{1}{3} \end{cases}$$
$$\therefore\ x = \pm\tfrac{1}{\sqrt{3}} \Rightarrow \left(\tfrac{1}{\sqrt{3}}, \tfrac{1}{\sqrt{3}}\right) \ \text{o} \ \left(-\tfrac{1}{\sqrt{3}}, -\tfrac{1}{\sqrt{3}}\right)$$

**Caso 2:** $\lambda = 2e^{x^2+y^2}$
$$\begin{cases} 2xe^{x^2+y^2} = (2x + y)\left(2e^{x^2+y^2}\right) \\ 2ye^{x^2+y^2} = (2y + x)\left(2e^{x^2+y^2}\right) \\ x^2 + xy + y^2 = 1 \end{cases} \Rightarrow \begin{cases} x = 2x + y \\ y = 2y + x \\ x^2 + xy + y^2 = 1 \end{cases} \Rightarrow \begin{cases} 0 = x + y \\ 0 = y + x \\ 1 = x^2 + xy + y^2 \end{cases}$$
$$\Rightarrow \begin{cases} -y = x \\ 1 = x^2 - x^2 + x^2 \end{cases} \Rightarrow \begin{cases} -y = x \\ \pm 1 = x \end{cases}$$
$$\therefore\ x = \pm 1 \Rightarrow (1, -1) \ \text{o} \ (-1, 1) \ \text{o} \ (0, 0)$$
:::
""", nota=[r"Evaluando $f = e^{x^2 + y^2}$ en los candidatos:" + "\n" + "\n".join([
    r"- $(0, 0)$: $f = 1$ → **mínimo**",
    r"- $\left(\pm\frac{1}{\sqrt{3}}, \pm\frac{1}{\sqrt{3}}\right)$: $f = e^{2/3}$",
    r"- $(1, -1)$ y $(-1, 1)$: $f = e^2$ → **máximo**"])])

