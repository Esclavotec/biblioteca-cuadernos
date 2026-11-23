# ---------------- I parcial, segunda parte (fotos del 23/11) ----------------

texto("Planos: resumen", r"""
{rojo|14/08/26}

:::azul
$$ax + by + cz = d$$
:::

Tome $z = 0$; $y = 0$; $x = 0$:
""", dibujos=[
    d("planos-coordenados", "Planos coordenados", r"$z = 0$ es el plano $xy$ (el «piso»), $y = 0$ es el plano $xz$ y $x = 0$ es el plano $yz$."),
], nota=[r"Cada plano coordenado es lo que queda cuando una variable vale 0."])

texto("Planos: ejemplos", r"""
### Ejm
:::lapiz
$x + y + z = 1$

Si $x = 0 = y \Rightarrow z = 1$
:::

:::lapiz
Si $y = z \Rightarrow y - z = 0$
:::
""", dibujos=[
    d("plano-triangulo", r"$x + y + z = 1$", r"Igual con las otras: si $x = 0 = z$, entonces $y = 1$, y si $y = 0 = z$, entonces $x = 1$. Los tres cortes con los ejes bastan para dibujar el plano."),
    d("plano-y-z", r"$y = z$", r"$y - z = 0$ no tiene $x$: el plano contiene al eje $x$ y pasa por la diagonal entre $y$ y $z$."),
])

texto("Retomando cilindros", r"""
### Ejercicio cuaderno
:::azul
Tome $x = z$ y dibújelo en GeoGebra.
:::

### Retomando cilindros
:::azul
Se hace en dirección a la generatriz.
:::
""", dibujos=[
    d("cilindro-general", "Curva y generatriz", r"Por cada punto de la curva pasa una recta paralela a la generatriz $L$. Todas juntas forman el cilindro."),
], nota=[r"$x = z$ es como $y = z$ del ejemplo: no tiene $y$, así que el plano contiene al eje $y$."])

texto("Ecuación del cilindro", r"""
:::azul
La curva $\mathcal{C}$, por lo general, será la intersección de dos superficies:
$$\mathcal{C} \begin{cases} F(x, y, z) = 0 \\ G(x, y, z) = 0 \end{cases}$$

Y de $L$ interesa su **vector director**.
:::

### Ejm
:::lapiz
Encuentre la ecuación del cilindro que tiene por directriz a la curva
$$\mathcal{C} : \begin{cases} x^2 + y^2 + z^2 = 8 \\ x + y + z = 0 \end{cases}$$
y generatriz $L$ con vector director $\vec{v} = (0, 1, 1)$.
:::
""", dibujos=[
    d("cilindro-esfera-plano", "Esfera ∩ plano y generatrices", r"La directriz es el círculo donde el plano $x + y + z = 0$ corta la esfera de radio $\sqrt{8}$. Por cada punto pasa una recta con dirección $(0, 1, 1)$."),
])

texto("Cilindro: el sistema", r"""
:::lapiz
$$\begin{aligned} L : (x, y, z) &= (x_0, y_0, z_0) + \lambda\vec{v} \\ &= (x_0, y_0, z_0) + \lambda(0, 1, 1) \end{aligned}$$

$$\text{Cilindro} = \bigcup_{(x_0, y_0, z_0) \in \mathcal{C}} L^{\vec{v}}_{(x_0, y_0, z_0)}$$

∗ Debo hallar una ecuación solamente en las variables $x, y, z$.

Ahora se obtiene:
$$\begin{cases} x = x_0 & (1) \\ y = y_0 + \lambda & (2) \\ z = z_0 + \lambda & (3) \\ x_0^2 + y_0^2 + z_0^2 = 8 & (4) \\ x_0 + y_0 + z_0 = 0 & (5) \end{cases}$$
:::
""", nota=[r"La idea: despejar $x_0, y_0, z_0$ y $\lambda$ en términos de $x, y, z$, y meterlos en las ecuaciones de la curva."])

texto("Cilindro: despejar", r"""
:::lapiz
Ahora, sumando (1), (2) y (3):
$$\begin{aligned} x + y + z &= x_0 + y_0 + z_0 + 2\lambda \\ &= 0 + 2\lambda \quad \text{por (5)} \\ \Rightarrow\ \lambda &= \frac{x + y + z}{2} \end{aligned}$$

$$\begin{aligned} (1)\quad x_0 &= x \\ (2)\quad y_0 &= y - \lambda = \frac{y - x - z}{2} \\ (3)\quad z_0 &= z - \lambda = \frac{z - x - y}{2} \end{aligned}$$

En (4):
$$x^2 + \left(\frac{y - x - z}{2}\right)^2 + \left(\frac{z - x - y}{2}\right)^2 = 8$$
:::
""", nota=[r"Simplificando sale" + "\n\n" + r"$3x^2 + (y - z)^2 = 16$" + "\n\n" + r"Comprobación: $(0, 2, -2)$ está en la curva y cumple $0 + 16 = 16$ ✓"])

texto("Conos", r"""
:::azul
Se define tq:
$$z = \pm\sqrt{x^2 + y^2}$$
:::

Necesitamos un **vértice** y una **curva**:
$$P = (a, b, c), \qquad \mathcal{C} := \begin{cases} F(x, y, z) = 0 \\ G(x, y, z) = 0 \end{cases}$$
""", dibujos=[
    d("cono-general", "Vértice y curva", r"Cada recta del cono va del vértice $P$ a un punto $(x_0, y_0, z_0)$ de la curva."),
])

texto("Cono: el sistema", r"""
La recta del vértice a un punto de la curva:
$$(x, y, z) = (a, b, c) + \lambda(x_0 - a,\ y_0 - b,\ z_0 - c)$$

$$\begin{cases} x = a + \lambda(x_0 - a) \\ y = b + \lambda(y_0 - b) \\ z = c + \lambda(z_0 - c) \\ F(x_0, y_0, z_0) = 0 \\ G(x_0, y_0, z_0) = 0 \end{cases}$$
""", nota=[r"Igual que con el cilindro: se despejan $x_0, y_0, z_0$ (y $\lambda$) y se sustituyen en $F$ y $G$. La diferencia es que aquí todas las rectas pasan por $P$."])

texto("Cono con vértice en el origen", r"""
### Ejm
:::lapiz
Encuentre la ecuación del cono que tiene por vértice a $P = (0, 0, 0)$ y por directriz
$$\mathcal{C} := \begin{cases} x^2 + y^2 = 1 \\ z = 1 \end{cases}$$

Sea $(x_0, y_0, z_0) \in \mathcal{C}$. Sea $P = (0, 0, 0)$ el vértice.

¿$L_{(x_0, y_0, z_0),\, P}$?
$$\begin{aligned} (x, y, z) &= (0, 0, 0) + \lambda(x_0 - 0,\ y_0 - 0,\ z_0 - 0) \\ &= (\lambda x_0,\ \lambda y_0,\ \lambda z_0) \end{aligned}$$
:::
""", dibujos=[
    d("cono-vertice", "Vértice y directriz", r"Las rectas salen del origen y pasan por el círculo de radio 1 a la altura $z = 1$."),
])

texto("Cono: despejar", r"""
:::lapiz
$$\begin{cases} x = \lambda x_0 \\ y = \lambda y_0 \\ z = \lambda z_0 \\ x_0^2 + y_0^2 = 1 \\ z_0 = 1 \end{cases}$$

Como $z_0 = 1 \ \wedge\ z = \lambda z_0 \Rightarrow z = \lambda$
$$x = z x_0 \Rightarrow \frac{x}{z} = x_0, \qquad y = z y_0 \Rightarrow \frac{y}{z} = y_0$$

Por último:
$$x_0^2 + y_0^2 = 1 \Rightarrow \left(\frac{x}{z}\right)^2 + \left(\frac{y}{z}\right)^2 = 1$$
:::
""", nota=[r"Multiplicando por $z^2$: $x^2 + y^2 = z^2$, el cono de dos ramas. (El vértice, $z = 0$, se agrega aparte.)"])

texto("Ejercicios: cilindro y cono", r"""
### Ejercicio cuaderno
:::azul
Encuentre el cilindro con directriz
$$\mathcal{C} := \begin{cases} x^2 + y^2 - z^2 = 1 \\ x^2 + y^2 = 2 \end{cases} ; \ z \ge 0$$
y generatriz la recta $x = y$; $x = z$.
:::

### Ejercicio cuaderno
:::azul
Halle el cono con directriz
$$\mathcal{C} := \begin{cases} z^2 = 2y \\ x = h \end{cases} ; \ h > 0$$
y vértice $P = (0, -a, 0)$.
:::
""", nota=[
    r"Para comprobar el 1: la directriz es el círculo $x^2 + y^2 = 2$, $z = 1$, y la dirección es $(1, 1, 1)$. Sale" + "\n\n" + r"$(x - z + 1)^2 + (y - z + 1)^2 = 2$",
    r"Para comprobar el 2:" + "\n\n" + r"$h^2 z^2 = 2hx(y + a) - 2a x^2$"])

texto("Parametrización de curvas", r"""
### Ejm
:::lapiz
$$\mathcal{C} := \begin{cases} x^2 + y^2 + z^2 = 2z & (1) \\ z^2 = x^2 + y^2 & (2) \end{cases}$$

$$z^2 + z^2 = 2z \Rightarrow z^2 - z = 0 \Rightarrow z = 0;\ z = 1$$

(2) con $z = 1$: $\ 1 = x^2 + y^2$
$$\Rightarrow x = \cos\theta, \quad y = \operatorname{sen}\theta$$
$$\therefore\ \alpha(\theta) = (\cos\theta,\ \operatorname{sen}\theta,\ 1), \quad \theta \in [0, 2\pi]$$
:::
""", dibujos=[
    d("curva-esfera-cono", "La curva del ejemplo", r"Es el mismo círculo rojo de antes: la esfera y el cono se cortan en $x^2 + y^2 = 1$ a la altura $z = 1$."),
], nota=[r"Ojo: $y = \operatorname{sen}\theta$, no $\cos\theta$: si no, $x^2 + y^2 \neq 1$."])

texto("Parametrizar", r"""
:::azul
**Parametrizar** es construir una función de una sola variable (**parámetro**):
$$\alpha(\theta) = (x(\theta),\ y(\theta),\ z(\theta)), \quad \theta \in I$$
:::

Cuando observe:
$$x^2 + y^2 = a^2$$
Tome:
$$\left.\begin{aligned} x &= a\cos\theta \\ y &= a\operatorname{sen}\theta \end{aligned}\right\} \ \theta \in [0, 2\pi]$$

{rojo|**Objetivo:**} desparametrizar.
""", nota=[r"Funciona porque $\cos^2\theta + \operatorname{sen}^2\theta = 1$, así que $x^2 + y^2 = a^2$."])

texto("Desparametrizar", r"""
{rojo|19/08/26}

### Ejm
:::lapiz
$$\alpha(\theta) = (\cos\theta,\ \operatorname{sen}\theta,\ \cos\theta), \quad \theta \in [0, 2\pi]$$

$$\begin{cases} F(x, y, z) = 0 \\ G(x, y, z) = 0 \end{cases} \Rightarrow \begin{cases} x^2 + y^2 = 1 \\ x = z \end{cases}$$
:::
""", nota=[r"Desparametrizar es el camino de vuelta: quitar $\theta$ y quedarse con ecuaciones en $x, y, z$. Aquí $x^2 + y^2 = 1$ sale de $\cos^2 + \operatorname{sen}^2 = 1$, y $x = z$ porque las dos son $\cos\theta$."])

texto("Curvas en ℝ³", r"""
### Parametrización de una curva en $\mathbb{R}^3$
:::azul
Una curva se puede definir como:
$$\alpha(t) = (x(t),\ y(t),\ z(t))$$
:::

### Ejm
:::lapiz
$$\alpha(\theta) = (\cos\theta,\ \operatorname{sen}\theta,\ 2), \quad \theta \in [0, 2\pi]$$
- $\cos^2\theta + \operatorname{sen}^2\theta = 1$
:::
""", dibujos=[
    d("parametrizacion", r"De $\mathbb{R}$ a $\mathbb{R}^3$", r"El parámetro $t$ vive en la recta real; $\alpha$ lo manda a un punto del espacio. Al mover $t$, el punto dibuja la curva."),
    d("circulo-z2", r"$\alpha(\theta) = (\cos\theta, \operatorname{sen}\theta, 2)$", r"Círculo de radio 1 en el plano $z = 2$: la tercera coordenada no cambia."),
])

texto("Velocidad y aceleración", r"""
### Segunda notación
:::azul
$$\begin{aligned} \alpha'(t) &= \frac{d\alpha}{dt}(t) \\ &= (x'(t),\ y'(t),\ z'(t)) \end{aligned}$$
- $\alpha'(t)$ se le conoce como **vector velocidad**
:::

### Ejm
:::lapiz
$$\alpha(t) = (t,\ t^2,\ t^3) \Rightarrow \alpha'(t) = (1,\ 2t,\ 3t^2)$$
:::

### Dato
:::azul
$\alpha''(t)$ = la **aceleración**
:::
""", nota=[r"Se deriva coordenada a coordenada. Para la misma curva: $\alpha''(t) = (0,\ 2,\ 6t)$."])

texto("Triedro de Frenet", r"""
### Dato
:::azul
Toda curva posee **cinco objetos fundamentales**:
- 3 vectores
- 2 funciones
:::

### Elementos
**Vectores:**
- $T(t)$ → tangente unitario
- $N(t)$ → normal unitario
- $B(t)$ → binormal unitario

{azul|**Cálculos:**}
$$T(t) = \frac{\alpha'(t)}{\|\alpha'(t)\|}, \qquad B(t) = \frac{\alpha'(t) \times \alpha''(t)}{\|\alpha'(t) \times \alpha''(t)\|}$$
$$N(t) = B(t) \times T(t)$$
""", nota=[r"Las 2 funciones son la **curvatura** $\kappa(t)$ y la **torsión** $\tau(t)$ (más adelante)."])

texto("Triedro: ejemplo", r"""
### Ejm
:::lapiz
$$\begin{aligned} \alpha(t) &= (\cos t,\ \operatorname{sen} t,\ 2) \\ \alpha'(t) &= (-\operatorname{sen} t,\ \cos t,\ 0) \\ \alpha''(t) &= (-\cos t,\ -\operatorname{sen} t,\ 0) \end{aligned}$$

$$\alpha' \times \alpha'' = \begin{vmatrix} \hat{\imath} & \hat{\jmath} & \hat{k} \\ -\operatorname{sen} t & \cos t & 0 \\ -\cos t & -\operatorname{sen} t & 0 \end{vmatrix} = (0,\ 0,\ 1)$$
:::
""", nota=[r"Como $\|\alpha'\| = 1$ y $\|\alpha' \times \alpha''\| = 1$, aquí no hace falta dividir: $T = \alpha'$ y $B = \alpha' \times \alpha''$."])

texto("Triedro: resultado", r"""
:::lapiz
$$B \times T = \begin{vmatrix} \hat{\imath} & \hat{\jmath} & \hat{k} \\ 0 & 0 & 1 \\ -\operatorname{sen} t & \cos t & 0 \end{vmatrix} = (-\cos t,\ -\operatorname{sen} t,\ 0)$$

$$\begin{cases} T(t) = (-\operatorname{sen} t,\ \cos t,\ 0) \\ B(t) = (0,\ 0,\ 1) \\ N(t) = (-\cos t,\ -\operatorname{sen} t,\ 0) \end{cases}$$

Produce **otro sistema de coordenadas**.
:::
""", dibujos=[
    d("triedro-frenet", "T, N y B", r"$T$ apunta hacia donde avanza la curva, $N$ hacia el centro del círculo y $B$ es perpendicular a los dos (aquí, hacia arriba)."),
])

texto("Probar que una curva es un círculo", r"""
### Ejm
:::lapiz
$$\mathcal{C} := \begin{cases} 2x^2 + 11y^2 + z^2 = 1 \\ 3y = z \end{cases}$$
Pruebe que $\mathcal{C}$ es un círculo.
:::

**Prueba:**
$$(x - x_0)^2 + (y - y_0)^2 = r^2$$
$$\begin{cases} x - x_0 = r\cos\theta \\ y - y_0 = r\operatorname{sen}\theta \end{cases} \Rightarrow \begin{cases} x = r\cos\theta + x_0 \\ y = r\operatorname{sen}\theta + y_0 \end{cases}$$
Así se parametriza el círculo, $\theta \in [0, 2\pi]$.

**Elipse:**
$$\frac{(x - x_0)^2}{a^2} + \frac{(y - y_0)^2}{b^2} = 1 \Rightarrow \begin{cases} x = a\cos\theta + x_0 \\ y = b\operatorname{sen}\theta + y_0 \end{cases}$$
""")

texto("De regreso al ejemplo", r"""
:::lapiz
$$\begin{aligned} 2x^2 + 11y^2 + z^2 &= 1 \\ 2x^2 + 11y^2 + 9y^2 &= 1 \quad (z = 3y) \\ 2x^2 + 20y^2 &= 1 \\ \frac{x^2}{1/2} + \frac{y^2}{1/20} &= 1 \\ \left[\frac{x}{1/\sqrt{2}}\right]^2 + \left[\frac{y}{1/\sqrt{20}}\right]^2 &= 1 \end{aligned}$$
Es una elipse en $x, y$.

**Parametrizar:**
$$\begin{cases} x = \frac{1}{\sqrt{2}}\cos\theta \\ y = \frac{1}{\sqrt{20}}\operatorname{sen}\theta \\ z = \frac{3}{\sqrt{20}}\operatorname{sen}\theta \end{cases} \quad \theta \in [0, 2\pi]$$

La curva $\mathcal{C}$ es
$$\alpha(\theta) = \left(\tfrac{1}{\sqrt{2}}\cos\theta,\ \tfrac{1}{\sqrt{20}}\operatorname{sen}\theta,\ \tfrac{3}{\sqrt{20}}\operatorname{sen}\theta\right)$$
:::
""")

texto("¿Cómo sé que es un círculo?", r"""
:::lapiz
$$\begin{aligned} \|\alpha(\theta)\| &= \sqrt{\tfrac{1}{2}\cos^2\theta + \tfrac{1}{20}\operatorname{sen}^2\theta + \tfrac{9}{20}\operatorname{sen}^2\theta} \\ &= \sqrt{\tfrac{1}{2}} = \tfrac{1}{\sqrt{2}} \end{aligned}$$

$\therefore$ Todos los puntos de este objeto **equidistan del origen** $\frac{1}{\sqrt{2}}$ ⇒ **Círculo**:
- Centro: $(0, 0, 0)$
- Radio: $\frac{1}{\sqrt{2}}$
:::

Observar como tarea.
""", dibujos=[
    d("circulo-inclinado", r"Círculo en el plano $z = 3y$", r"Equidistar del origen no basta (eso es una esfera): además la curva está en el plano $z = 3y$, que pasa por el origen. Esfera ∩ plano por el centro = círculo. Y da $\frac{1}{2}$ porque $\frac{1}{20} + \frac{9}{20} = \frac{1}{2}$."),
])

texto("Curvatura y torsión", r"""
{rojo|21/08/26}

### La curvatura de α
:::azul
Se define la curvatura como:
$$\kappa(t) = \frac{\|\alpha'(t) \times \alpha''(t)\|}{\|\alpha'(t)\|^3}$$

Y la torsión de forma:
$$\tau(t) = \frac{\alpha'(t) \cdot \big(\alpha''(t) \times \alpha'''(t)\big)}{\|\alpha'(t) \times \alpha''(t)\|^2}$$
:::

### Ejercicio cuaderno
:::azul
Calcule la curvatura pero muestre:
$$\lim_{t \to +\infty} \kappa(t) = 0$$
:::
""", nota=[
    r"Ojo: en la torsión el denominador va **al cuadrado**. Para $\alpha(t) = (t, t^2, t^3)$:" + "\n\n" + r"$\kappa(t) = \frac{2\sqrt{9t^4 + 9t^2 + 1}}{(1 + 4t^2 + 9t^4)^{3/2}} \to 0$" + "\n\n" + r"(arriba crece como $t^2$; abajo, como $t^6$)."])

texto("Superficies de revolución", r"""
### Por el método del globo de Monge
:::azul
Monge construyó dos objetos:
:::

**1. Esfera de Monge:** el eje de revolución será una recta $P + t\vec{v}$
$$P = (P_1, P_2, P_3), \qquad \vec{v} = (v_1, v_2, v_3)$$
:::azul
Construya una esfera de centro $P$ y radio hasta un punto $(x_0, y_0, z_0) \in \mathcal{C}$:
:::
$$(x - P_1)^2 + (y - P_2)^2 + (z - P_3)^2 = (x_0 - P_1)^2 + (y_0 - P_2)^2 + (z_0 - P_3)^2$$
""", dibujos=[
    d("globo-monge", "Globo de Monge", r"Al girar, el punto $(x_0, y_0, z_0)$ de la curva recorre un círculo: el corte de la esfera de Monge con el plano de Monge, que es perpendicular al eje."),
])

texto("La superficie de revolución", r"""
**2. Plano de Monge:**
:::azul
$$\begin{aligned} ax + by + cz &= d \\ v_1x + v_2y + v_3z &= d \\ v_1x + v_2y + v_3z &= v_1x_0 + v_2y_0 + v_3z_0 \end{aligned}$$
:::

:::azul
La superficie de revolución formada es:
$$\begin{cases} \|(x, y, z) - P\|^2 = \|(x_0, y_0, z_0) - P\|^2 \\ v_1x + v_2y + v_3z = v_1x_0 + v_2y_0 + v_3z_0 \\ F(x_0, y_0, z_0) = 0 \\ G(x_0, y_0, z_0) = 0 \end{cases}$$
:::

La primera ecuación es la esfera de Monge, escrita con la norma.
""", nota=[r"Gaspard Monge (1746–1818), creador de la geometría descriptiva. Igual que en cilindros y conos: se eliminan $x_0, y_0, z_0$."])

texto("¿Cómo genero el cono z² = x² + y²?", r"""
:::azul
Considere $\mathcal{C} := \begin{cases} z = x \\ y = 0 \end{cases}$ y el eje $z$ como eje de revolución.
:::

**Solución:** el eje $z$ lo debo ver como un eje de revolución:
$$(x, y, z) = \underbrace{(0, 0, 0)}_{P} + \lambda\underbrace{(0, 0, 1)}_{\vec{v}}$$

$$(x_0, y_0, z_0) \in \mathcal{C} \Rightarrow \begin{cases} z_0 = x_0 \\ y_0 = 0 \end{cases}$$
""", dibujos=[
    d("cono-revolucion", "La recta gira y forma el cono", r"La recta $z = x$ del plano $xz$ da una vuelta completa alrededor del eje $z$ y barre el cono de dos ramas."),
])

texto("Cono por revolución: cálculo", r"""
**Esfera de Monge:**
$$x^2 + y^2 + z^2 = x_0^2 + y_0^2 + z_0^2$$

**Plano de Monge:**
$$\begin{aligned} v_1x + v_2y + v_3z &= v_1x_0 + v_2y_0 + v_3z_0 \\ z &= z_0 \end{aligned}$$

**En resumen:**
$$\begin{cases} x^2 + y^2 + z^2 = x_0^2 + y_0^2 + z_0^2 \\ z = z_0 \\ z_0 = x_0 \\ y_0 = 0 \end{cases} \Rightarrow x^2 + y^2 + z^2 = z^2 + 0^2 + z^2$$

$$\Rightarrow\ x^2 + y^2 = z^2$$
""", nota=[r"Con $\vec{v} = (0, 0, 1)$ el plano de Monge queda $z = z_0$: planos horizontales, perpendiculares al eje $z$."])

texto("Campos escalares", r"""
:::azul
Toda función $f : \mathbb{R}^n \to \mathbb{R}$ se llamará **un campo escalar**.
:::

### Ejm
:::lapiz
- $f(x, y) = x^2 + y^2$
- $f(x, y, z) = x - y + e^z$
- $f(x, y) = \begin{cases} \dfrac{x - y}{x + y} & \text{si } x \neq -y \\ 0 & \text{si } x = -y \end{cases}$
:::
""", nota=[r"Escalar porque el resultado es **un solo número**. Si diera un vector (en $\mathbb{R}^m$), sería un campo vectorial."])

texto("Topología en ℝⁿ", r"""
:::azul
- Algebraica
- Diferencial
- Conjuntos
:::

### Ejm: lema
:::azul
Si $n = 2$ y $\vec{x} = (x, y) \in \mathbb{R}^2$, ent.
$$|x| \le \|\vec{x}\|, \quad |y| \le \|\vec{x}\|$$
$$\Rightarrow \|\vec{x}\| = \sqrt{x^2 + y^2}, \quad |y| \le \sqrt{x^2 + y^2}$$
:::
""", dibujos=[
    d("lema-r2", "Catetos e hipotenusa", r"$|x|$ y $|y|$ son los catetos y $\|\vec{x}\|$ la hipotenusa del triángulo rectángulo: ningún cateto es más largo que la hipotenusa."),
])

texto("Lema: prueba", r"""
**Prueba:**
:::lapiz
Asuma:
$$\begin{aligned} |x| \le \|\vec{x}\| &= \sqrt{x^2 + y^2} \\ \iff |x|^2 &\le \left(\sqrt{x^2 + y^2}\right)^2 \\ \iff |x|^2 &\le x^2 + y^2 \\ \iff 0 &\le y^2 \end{aligned}$$
De forma análoga: $|y| \le \sqrt{x^2 + y^2}$
:::

:::azul
Si $n = 3$ y $\vec{x} = (x, y, z) \in \mathbb{R}^3$, ent.
$$\begin{aligned} |x| &\le \sqrt{x^2 + y^2 + z^2} = \|\vec{x}\| \\ |y| &\le \sqrt{x^2 + y^2 + z^2} = \|\vec{x}\| \\ |z| &\le \sqrt{x^2 + y^2 + z^2} = \|\vec{x}\| \end{aligned}$$
:::
""", nota=[r"Como todo es $\iff$ y $0 \le y^2$ siempre es cierto, la primera desigualdad también lo es. (Se puede elevar al cuadrado porque ambos lados son $\ge 0$.)"])

texto("Subconjuntos de ℝ³", r"""
:::azul
En $\mathbb{R}^3$ estudiaremos ciertos subconjuntos $A \subseteq \mathbb{R}^3$:
- ¿$A$ es abierto?
- ¿$A$ es cerrado?
- $\mathring{A}$ = interior de $A$
- $\bar{A}$ = clausura de $A$
- $\operatorname{Fr}(A)$ = frontera de $A$
:::

### Def 1: Bola abierta (open ball)
:::azul
Sea $\vec{a} = (a_1, a_2, a_3) \in \mathbb{R}^3$. Sea $\varepsilon > 0$ tq:
$$B(\vec{a}; \varepsilon) = \{\vec{x} \in \mathbb{R}^3 : \|\vec{x} - \vec{a}\| < \varepsilon\}$$

∗ Bola abierta de centro $\vec{a}$ y radio $\varepsilon > 0$.
:::
""")

texto("Bola abierta", r"""
### ¿Cómo se observa?
:::azul
La **esfera** es la cáscara y la **bola** es su interior.
:::

### Ejm
:::lapiz
$\vec{a} = \langle 0, 0, 0 \rangle$, $\varepsilon = 1$:
$$\begin{aligned} B(\langle 0,0,0 \rangle; 1) &= \{\vec{x} \in \mathbb{R}^3 : \|\vec{x} - \langle 0,0,0 \rangle\| < 1\} \\ &= \{\vec{x} \in \mathbb{R}^3 : \sqrt{x_1^2 + x_2^2 + x_3^2} < 1\} \end{aligned}$$
:::
""", dibujos=[
    d("bola-abierta", r"$B(\vec{a}; \varepsilon)$", r"Con $<$ la cáscara queda fuera (por eso se dibuja punteada). Con $\le$ sería la bola cerrada."),
])

texto("Conjunto abierto", r"""
### Def 2: Conjunto abierto
:::azul
Un $A \subseteq \mathbb{R}^3$ se llama **abierto** si para cada $\vec{a} \in A$, $\exists\, \varepsilon > 0$ tq $B(\vec{a}, \varepsilon) \subset A$.
:::

:::azul
En $\mathbb{R}^2$ sea $\vec{a} = (a_1, a_2)$ y $\varepsilon > 0$:
$$B(\vec{a}; \varepsilon) = \{\vec{x} = (x_1, x_2) \in \mathbb{R}^2 : \|\vec{x} - \vec{a}\| < \varepsilon\}$$
:::

### Ejm
:::lapiz
$\vec{a} = (0, 0)$, $\varepsilon = 1$:
$$\begin{aligned} B(\langle 0, 0 \rangle, 1) &= \{(x, y) : \|\langle x, y \rangle - \langle 0, 0 \rangle\| < 1\} \\ &= \{(x, y) : \sqrt{x^2 + y^2} < 1\} \end{aligned}$$
:::
""", dibujos=[
    d("bola-r2", r"Bola en $\mathbb{R}^2$", r"En el plano, la bola abierta es un disco sin su circunferencia."),
])

texto("Def 3: conjunto abierto", r"""
:::azul
$A \subset \mathbb{R}^2$ se llama abierto $\iff \forall\, \vec{a} \in A,\ \exists\, \varepsilon > 0$ tq $B(\vec{a}; \varepsilon) \subset A$
:::

### Ejm
:::lapiz
Sea $A = \{\langle x, y \rangle \in \mathbb{R}^2 : x, y > 0\}$. ¿$A$ es abierto?

Para demostrar que $A$ es abierto se toma un elemento arbitrario $\vec{a} = \langle a_1, a_2 \rangle$ de $A$ y se halla un $\varepsilon > 0$ conveniente tq $B(\vec{a}, \varepsilon) \subset A$.

Tome $0 < \varepsilon < \min\{a_1, a_2\}$ y pruebe que se cumple $B(\vec{a}, \varepsilon) \subset A$.
:::
""", dibujos=[
    d("cuadrante-abierto", r"$x, y > 0$", r"El punto está a distancia $a_1$ del eje $y$ y $a_2$ del eje $x$. Con un radio menor que los dos, la bola no toca ningún eje."),
])

texto("El primer cuadrante es abierto", r"""
**Prueba:**
:::lapiz
Sea $\vec{z} = \langle z_1, z_2 \rangle \in B(\vec{a}; \varepsilon)$
$$\begin{aligned} &\Rightarrow \|\vec{z} - \vec{a}\| < \varepsilon \\ &\Rightarrow \sqrt{(z_1 - a_1)^2 + (z_2 - a_2)^2} < \varepsilon \\ &\Rightarrow |z_1 - a_1| \le \sqrt{(z_1 - a_1)^2 + (z_2 - a_2)^2} < \varepsilon \le a_1 \\ &\Rightarrow |z_1 - a_1| < a_1 \\ &\Rightarrow -a_1 < z_1 - a_1 < a_1 \\ &\Rightarrow 0 < z_1 < 2a_1 \\ &\Rightarrow 0 < z_1 \end{aligned}$$

Análogamente $0 < z_2$.
:::
""", nota=[r"El tercer paso es el lema: $|z_1 - a_1| \le \|\vec{z} - \vec{a}\|$.", r"Como $z_1 > 0$ y $z_2 > 0$, $\vec{z} \in A$. Entonces $B(\vec{a}; \varepsilon) \subset A$, y $A$ es abierto."])

texto("Un conjunto que no es abierto", r"""
### Ejm
:::lapiz
$A = \{\langle x, y \rangle \in \mathbb{R}^2 : x, y \ge 0\}$. ¿Será $A$ abierto?

**No es abierto.**
:::
""", dibujos=[
    d("cuadrante-cerrado", r"$x, y \ge 0$", r"Basta un punto que falle: en el origen, toda bola (por chica que sea) tiene puntos con $x < 0$."),
])

texto("No es abierto: prueba", r"""
:::lapiz
**Prueba:** tome $\vec{a} = \langle 0, 0 \rangle$ y $\varepsilon > 0$, entonces $B(\langle 0, 0 \rangle; \varepsilon) \not\subset A$.

Observe que $\left(-\frac{\varepsilon}{2}, 0\right)$ posee una coordenada negativa, por lo que no vive en $A$. Entonces:
$$\begin{aligned} \left(-\tfrac{\varepsilon}{2}, 0\right) &\in B(\langle 0, 0 \rangle; \varepsilon) \\ \Rightarrow \left\|\left(-\tfrac{\varepsilon}{2}, 0\right) - (0, 0)\right\| &< \varepsilon \\ \Rightarrow \sqrt{\left(-\tfrac{\varepsilon}{2}\right)^2 + 0^2} &< \varepsilon \\ \Rightarrow \tfrac{\varepsilon}{2} &< \varepsilon \end{aligned}$$
:::
""", nota=[r"La última línea es cierta, así que $\left(-\frac{\varepsilon}{2}, 0\right)$ sí está en la bola pero no en $A$: la bola no cabe en $A$."])

texto("Interior de un conjunto", r"""
### Def 4: El interior de un conjunto
:::azul
Sea $A \subseteq \mathbb{R}^3$:
$$\mathring{A} = \{\vec{a} \in A : B(\vec{a}; \varepsilon) \subset A \text{ para algún } \varepsilon > 0\}$$
:::

### Ejm
:::lapiz
$A = \{\langle x, y \rangle \in \mathbb{R}^2 : x, y > 0\}$, $\quad \mathring{A} = A$
:::

### Ejm
:::lapiz
$B = \{\langle x, y \rangle \in \mathbb{R}^2 : x, y \ge 0\}$
$$\mathring{B} = \{\langle x, y \rangle \in \mathbb{R}^2 : x, y > 0\}$$
:::

**Nota:**
:::azul
$\mathring{A} \subseteq A$ siempre, pero si $A$ es abierto, $\mathring{A} = A$.
:::
""", nota=[r"El interior son los puntos que tienen «espacio alrededor» dentro del conjunto: a $B$ se le quitan los ejes."])

texto("Conjunto cerrado y bola cerrada", r"""
### Def 5: Conjunto cerrado
:::azul
Sea $A \subseteq \mathbb{R}^3$: $A$ es cerrado $\iff \mathbb{R}^3 - A$ es abierto $\iff A^c$ es abierto.
:::

### Def 6: Bola cerrada
:::azul
$$B[\vec{a}; r] = \{\vec{x} \in \mathbb{R}^3 : \|\vec{x} - \vec{a}\| \le r\}$$
:::

### Ejm
:::lapiz
$$\begin{aligned} B[\langle 0,0,0 \rangle; 1] &= \{\vec{x} : \|\vec{x} - \langle 0,0,0 \rangle\| \le 1\} \\ &= \{\vec{x} : \sqrt{x_1^2 + x_2^2 + x_3^2} \le 1\} \\ &= B(\langle 0,0,0 \rangle; 1) \cup S(\langle 0,0,0 \rangle; 1) \end{aligned}$$
:::
""", nota=[r"$S(\vec{a}; r)$ es la esfera (la cáscara): la bola cerrada es la abierta más su cáscara.", r"Ojo: «cerrado» no es lo contrario de «abierto». Hay conjuntos que no son ninguno de los dos."])

texto("Ejemplo de conjunto cerrado", r"""
### Ejm
:::lapiz
Sea
$$A = \{\langle x, y \rangle \in \mathbb{R}^2 : (x \le 0, y \ge 0) \vee (x \le 0, y \le 0) \vee (x \ge 0, y \le 0)\}$$
- $A$ es cerrado.

En efecto,
$$\mathbb{R}^2 - A = \{\langle x, y \rangle \in \mathbb{R}^2 : x > 0,\ y > 0\}$$
:::
""", dibujos=[
    d("tres-cuadrantes", "Tres cuadrantes", r"El complemento es el primer cuadrante abierto, que ya probamos que es abierto. Por la Def 5, $A$ es cerrado."),
])

texto("La bola cerrada es cerrada", r"""
### Ejm
:::lapiz
$B[\langle 0,0 \rangle; 1]$ es cerrada.

Sea $\vec{a}$ fuera de la bola y $d = \|\vec{a}\| - 1$. Entonces observe que:
$$\varepsilon = \frac{\|\vec{a}\| - 1}{2} > 0$$

Vamos a probar que:
$$B\left(\langle a_1, a_2 \rangle, \tfrac{\|\vec{a}\| - 1}{2}\right) \subset \mathbb{R}^2 - B[\langle 0,0 \rangle; 1]$$
:::
""", dibujos=[
    d("bola-cerrada", r"$B[0; 1]$ y su complemento", r"$d$ es lo que le falta a $\vec{a}$ para llegar al borde. Con la mitad de esa distancia como radio, la bola alrededor de $\vec{a}$ no toca la bola cerrada."),
])

texto("Bola cerrada: prueba", r"""
**Prueba:**
:::lapiz
Sea $\vec{z} = \langle z_1, z_2 \rangle \in B\left(\vec{a}, \frac{\|\vec{a}\| - 1}{2}\right)$. Debemos probar:
$$\|\langle z_1, z_2 \rangle - \langle 0, 0 \rangle\| > 1 \iff \sqrt{z_1^2 + z_2^2} > 1$$

Recuerde que:
$$\|\vec{z} - \vec{a}\| = \sqrt{(z_1 - a_1)^2 + (z_2 - a_2)^2} < \frac{\|\vec{a}\| - 1}{2}$$

Suponga $\|\vec{z}\| \le 1$:
$$\begin{aligned} \|\vec{a}\| = \|\vec{a} - \vec{z} + \vec{z}\| &\le \|\vec{a} - \vec{z}\| + \|\vec{z}\| \\ &< \frac{\|\vec{a}\| - 1}{2} + 1 = \frac{\|\vec{a}\| + 1}{2} \end{aligned}$$

Ent.
$$\|\vec{a}\| < \frac{\|\vec{a}\| + 1}{2} \Rightarrow 2\|\vec{a}\| < \|\vec{a}\| + 1 \Rightarrow \|\vec{a}\| < 1 \ ↯$$

Es absurdo: al inicio $\|\vec{a}\| > 1$, porque $\vec{a} \notin B[\langle 0,0 \rangle; 1]$.
:::
""", nota=[r"Prueba por contradicción, usando la desigualdad triangular. Así el complemento es abierto, y la bola cerrada es cerrada."])

texto("Frontera de un conjunto", r"""
### Def 7: Frontera de un conjunto
:::azul
Sea $A \subset \mathbb{R}^2$. Diremos que $\vec{x}$ es un **punto frontera** de $A$ $\iff$ $B(\vec{x}, r)$, $\forall\, r > 0$, contiene puntos de $A$ y de $\mathbb{R}^2 - A$.

$\operatorname{Fr}(A)$ = el conjunto de puntos frontera de $A$.
:::

{rojo|**Nota:**} un punto frontera de $A$ puede o no pertenecer a $A$.
""", nota=[r"Dicho fácil: un punto frontera está «en el borde»; por cerca que mires, ves puntos de adentro y de afuera."])

texto("Frontera: ejemplo", r"""
### Ejm
:::lapiz
Sea $A = \{\langle x, y \rangle \in \mathbb{R}^2 : x > 2\}$. En este caso:
$$\operatorname{Fr}(A) = \{\langle x, y \rangle \in \mathbb{R}^2 : x = 2\}$$
Sea $\langle x, y \rangle \in \operatorname{Fr}(A)$, ent. $B(\langle x, y \rangle; r)$ posee puntos en $A$ y en $\mathbb{R}^2 - A$, $\forall\, r > 0$.
:::
""", dibujos=[
    d("frontera", r"$\operatorname{Fr}(A)$: la recta $x = 2$", r"Aquí ningún punto de la frontera está en $A$ (porque $x > 2$ es estricto). Si fuera $x \ge 2$, la frontera sería la misma, pero estaría dentro de $A$."),
])
