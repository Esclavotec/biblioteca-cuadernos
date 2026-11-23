# ---------------- I parcial: límites y continuidad (fotos del 23/11, 8:05) ----------------

texto("Límites y continuidad en ℝⁿ", r"""
$[n = 2;\ n = 3]$

**Recuerde:** $f : \mathbb{R} \to \mathbb{R}$ tq $\displaystyle\lim_{x \to a} f(x) = L$
:::azul
$\forall\, \varepsilon > 0\ \exists\, \delta > 0$ tq $\forall x$ con $0 < |x - a| < \delta$ ent. $|f(x) - L| < \varepsilon$
:::

### Teorema
(No funciona en $n \ge 2$)
:::azul
$$\lim_{x \to a^+} f(x) = \lim_{x \to a^-} f(x) \iff \lim_{x \to a} f(x) = L$$
:::

∗ En el espacio hay **infinitas formas y direcciones** para acercarse a un punto.
""", nota=[r"En $\mathbb{R}$ solo hay dos lados para acercarse a $a$. En el plano hay infinitos caminos, y todos tienen que dar lo mismo para que el límite exista."])

texto("Límite en ℝ²", r"""
$f : \mathbb{R}^2 \to \mathbb{R}$ {azul|(campos escalares)}

### ¿Qué significa $\lim_{(x,y) \to (a,b)} f(x, y) = L$?
:::azul
$\forall\, \varepsilon > 0\ \exists\, \delta > 0$ tq $\forall (x, y)$ con
$$0 < \|(x, y) - (a, b)\| < \delta \Rightarrow |f(x, y) - L| < \varepsilon$$
:::
""", dibujos=[
    d("limite-r2", r"$\varepsilon$ y $\delta$", r"Para cualquier $\varepsilon$ (lo cerca que quiero estar de $L$) tiene que existir un disco de radio $\delta$ alrededor de $(a, b)$ que caiga entero dentro de $(L - \varepsilon, L + \varepsilon)$."),
], nota=[r"El $0 <$ quiere decir que no importa lo que pase justo en $(a, b)$: la función ni siquiera tiene que estar definida ahí."])

texto("Ejm: 3x − 2y → 0", r"""
### Ejm
:::lapiz
Pruebe que $\displaystyle\lim_{(x,y) \to (0,0)} (3x - 2y) = 0$

Tome $\varepsilon > 0$ arbitrario. Halle un $\delta > 0$ tq $\forall (x, y)$ cumple
$$\|\langle x, y \rangle - \langle 0, 0 \rangle\| < \delta \Rightarrow |3x - 2y - 0| < \varepsilon$$
$$\iff \sqrt{x^2 + y^2} < \delta \Rightarrow |3x - 2y| < \varepsilon$$

$$\begin{aligned} |3x - 2y - 0| = |3x - 2y| &\le 3|x| + 2|y| \\ &\le 3\sqrt{x^2 + y^2} + 2\sqrt{x^2 + y^2} \\ &= 5\sqrt{x^2 + y^2} < \varepsilon \end{aligned}$$
$$\Rightarrow \sqrt{x^2 + y^2} < \frac{\varepsilon}{5}$$

Tome $0 < \delta < \frac{\varepsilon}{5}$.
:::
""", nota=[r"Los dos pasos con $\le$: desigualdad triangular y el lema $|x| \le \sqrt{x^2 + y^2}$."])

texto("3x − 2y → 0: la prueba", r"""
:::lapiz
Sea $\varepsilon > 0$ y $0 < \delta < \frac{\varepsilon}{5}$.

Ent. $\forall \langle x, y \rangle$ tq $0 < \|\langle x, y \rangle - \langle 0, 0 \rangle\| < \delta$:
$$\begin{aligned} |3x - 2y| &\le 3|x| + 2|y| \\ &\le 5\sqrt{x^2 + y^2} \\ &< 5 \cdot \delta \\ &< 5 \cdot \frac{\varepsilon}{5} = \varepsilon \end{aligned}$$
:::
""", nota=[r"Así se escriben estas pruebas: primero, en borrador, se busca $\delta$ (la página anterior); después se escribe limpio, empezando por «sea $\varepsilon > 0$»."])

texto("Ejm: xy → 0", r"""
### Ejm
:::lapiz
Pruebe que $\displaystyle\lim_{\langle x,y \rangle \to \langle 0,0 \rangle} xy = 0$

Tome $\varepsilon > 0$, halle $\delta > 0$ tq $\forall \langle x, y \rangle$ con
$$0 < \|\langle x, y \rangle - \langle 0, 0 \rangle\| < \delta \Rightarrow |xy - 0| < \varepsilon$$

Observe que:
$$\begin{aligned} |xy - 0| = |x||y| &\le \sqrt{x^2 + y^2} \cdot \sqrt{x^2 + y^2} \\ &= x^2 + y^2 \end{aligned}$$

¿Quién es $\delta$? Queremos $|xy - 0| \le x^2 + y^2 < \varepsilon$:
$$\sqrt{x^2 + y^2} < \delta \Rightarrow x^2 + y^2 < \delta^2 \Rightarrow 0 < \delta^2 < \varepsilon \Rightarrow 0 < \delta < \sqrt{\varepsilon}$$
:::
""")

texto("xy → 0: la prueba", r"""
:::lapiz
Sea $\varepsilon > 0$ y $0 < \delta < \sqrt{\varepsilon}$, ya que $\forall \langle x, y \rangle$ con $\|\langle x, y \rangle - \langle 0, 0 \rangle\| < \delta$ se tiene:
$$\begin{aligned} |xy - 0| = |x||y| &\le \sqrt{x^2 + y^2} \cdot \sqrt{x^2 + y^2} \\ &= x^2 + y^2 \\ &< \delta^2 \\ &< (\sqrt{\varepsilon})^2 = \varepsilon \end{aligned}$$
:::
""", nota=[r"Aquí $\delta$ depende de $\varepsilon$ con raíz, porque $xy$ es de grado 2: se va a 0 «más rápido» que $\|(x, y)\|$."])

texto("Prueba de la NO existencia de un límite", r"""
:::azul
$$\lim_{\langle x,y \rangle \to \langle 0,0 \rangle} \frac{x^2 - y^2}{x^2 + y^2} \ \text{¡no existe!}$$
:::

**Demostración:** $A = \{(x, y) : y = 0\}$, $\ B = \{(x, y) : x = 0\}$
:::lapiz
$$\lim_{\substack{(x,y) \to (0,0) \\ (x,y) \in A}} \frac{x^2 - y^2}{x^2 + y^2} = \lim_{x \to 0} \frac{x^2 - 0}{x^2 + 0} = \lim_{x \to 0} 1 = 1$$
$$\lim_{\substack{(x,y) \to (0,0) \\ (x,y) \in B}} \frac{x^2 - y^2}{x^2 + y^2} = \lim_{y \to 0} \frac{0^2 - y^2}{0^2 + y^2} = \lim_{y \to 0} (-1) = -1$$
:::
""", dibujos=[
    d("caminos-ejes", "Dos caminos, dos resultados", r"Si dos caminos hacia el punto dan resultados distintos, el límite no existe. Basta con encontrar dos."),
])

texto("Las rectas no bastan", r"""
### Ejm
:::lapiz
$$\lim_{(x,y) \to (0,0)} \frac{x^2 y}{x^4 + y^2}$$

$A = \{(x, y) : y = mx\}$:
$$\lim_{\substack{(x,y) \to (0,0) \\ (x,y) \in A}} \frac{x^2 y}{x^4 + y^2} = \lim_{x \to 0} \frac{x^2(mx)}{x^4 + (mx)^2} = \lim_{x \to 0} \frac{mx}{x^2 + m^2} = 0$$

$x = 0$:
$$\lim_{y \to 0} \frac{0^2 y}{0^4 + y^2} = \lim_{y \to 0} 0 = 0$$

El límite en cuestión es 0 para cualquier recta que pasa por el origen, **pero el límite no existe**.
:::
""", nota=[r"Al simplificar por $x^2$: $\frac{m x^3}{x^4 + m^2x^2} = \frac{mx}{x^2 + m^2}$."])

texto("Por la parábola", r"""
:::lapiz
$B = \{(x, y) : y = x^2\}$:
$$\lim_{\substack{(x,y) \to (0,0) \\ (x,y) \in B}} \frac{x^2 y}{x^4 + y^2} = \lim_{x \to 0} \frac{x^4}{2x^4} = \frac{1}{2}$$
:::
""", dibujos=[
    d("caminos-parabola", "Rectas contra parábola", r"Que todas las rectas den lo mismo no prueba que el límite exista: la parábola $y = x^2$ da $\frac{1}{2} \neq 0$."),
])

texto("Límite en ℝ³", r"""
$f : \mathbb{R}^3 \to \mathbb{R}$

### ¿Qué significa que $\lim_{(x,y,z) \to (a,b,c)} f(x, y, z) = L$?
:::azul
$\forall\, \varepsilon > 0\ \exists\, \delta > 0$ tq $\forall (x, y, z)$ con
$$0 < \|(x, y, z) - (a, b, c)\| < \delta \Rightarrow |f(x, y, z) - L| < \varepsilon$$
:::

### Ejm
:::lapiz
$$\lim_{(x,y,z) \to (0,0,0)} \frac{xyz}{x + y + z}$$

Sea $A = \{(x, y, z) : y = z = 0\}$:
$$\lim_{\substack{(x,y,z) \to (0,0,0) \\ y = z = 0}} \frac{xyz}{x + y + z} = \lim_{x \to 0} \frac{x \cdot 0 \cdot 0}{x + 0 + 0} = \lim_{x \to 0} \frac{0}{x} = 0$$
:::
""")

texto("Límite en ℝ³: otro camino", r"""
:::lapiz
Considere $B = \{(x, y, z) : y = x,\ z = x^3 - 2x\}$:
$$\begin{aligned} \lim_{\substack{(x,y,z) \to (0,0,0) \\ (x,y,z) \in B}} \frac{xyz}{x + y + z} &= \lim_{x \to 0} \frac{x \cdot x \cdot (x^3 - 2x)}{x + x + x^3 - 2x} \\ &= \lim_{x \to 0} \frac{x^5 - 2x^3}{x^3} \\ &= \lim_{x \to 0} (x^2 - 2) = -2 \end{aligned}$$
:::
""", dibujos=[
    d("caminos-r3", "Dos caminos en ℝ³", r"La curva $B$ está elegida para que el denominador sea $x^3$: así sobrevive un número distinto de 0. Como $0 \neq -2$, el límite no existe."),
])

texto("Ejm: xyz / (x² + y² + z²)", r"""
### Ejm
:::lapiz
$$\lim_{(x,y,z) \to (0,0,0)} \frac{xyz}{x^2 + y^2 + z^2} = 0$$

Sea $\varepsilon > 0$ y halle $\delta > 0$ tq $\forall (x, y, z)$ con
$$0 < \|(x, y, z) - (0, 0, 0)\| < \delta \Rightarrow \left|\frac{xyz}{x^2 + y^2 + z^2}\right| < \varepsilon$$

En efecto:
$$\begin{aligned} \left|\frac{xyz}{x^2 + y^2 + z^2}\right| &= \frac{|x||y||z|}{x^2 + y^2 + z^2} \\ &\le \frac{\left(\sqrt{x^2 + y^2 + z^2}\right)^3}{x^2 + y^2 + z^2} \\ &= \sqrt{x^2 + y^2 + z^2} < \delta < \varepsilon \end{aligned}$$

Tome $0 < \delta < \varepsilon$.
:::
""", nota=[r"Corroboración: con $0 < \delta < \varepsilon$, si $0 < \|(x, y, z)\| < \delta$, la cadena da $|f| \le \|(x, y, z)\| < \delta < \varepsilon$ ✓ (cada $|x|, |y|, |z|$ se acota por la norma)."])

texto("sen(1/x) no existe", r"""
:::azul
$\displaystyle\lim_{x \to 0} \operatorname{sen}\left(\frac{1}{x}\right)$ no existe. Uno puede usar **sucesiones** para demostrarlo.
:::

**Demostración:**
:::lapiz
$$x_n = \frac{1}{\frac{\pi}{2} + 2n\pi} \xrightarrow[n \to \infty]{} 0, \qquad y_n = \frac{1}{\frac{3\pi}{2} + 2n\pi} \xrightarrow[n \to \infty]{} 0$$

Estudiando:
$$\lim_{n \to \infty} \operatorname{sen}\left(\tfrac{1}{x_n}\right) = \lim_{n \to \infty} \operatorname{sen}\left(\tfrac{\pi}{2} + 2n\pi\right) = \operatorname{sen}\left(\tfrac{\pi}{2}\right) = 1$$
$$\lim_{n \to \infty} \operatorname{sen}\left(\tfrac{1}{y_n}\right) = \lim_{n \to \infty} \operatorname{sen}\left(\tfrac{3\pi}{2} + 2n\pi\right) = \operatorname{sen}\left(\tfrac{3\pi}{2}\right) = -1$$
:::
""", dibujos=[
    d("sen-1x", r"$\operatorname{sen}(1/x)$", r"Las dos sucesiones van a 0, pero en una la función vale siempre 1 y en la otra $-1$. Es la misma idea que los caminos en $\mathbb{R}^2$."),
])

texto("Funciones continuas", r"""
### Funciones continuas en un punto en $\mathbb{R}^2$ y $\mathbb{R}^3$
:::azul
Sea $f : \mathbb{R}^2 \to \mathbb{R}$ una función definida en $(a, b)$. $f(x, y)$ es **continua** en $(a, b)$ si:
$$\lim_{(x,y) \to (a,b)} f(x, y) = f(a, b)$$
:::

**Mutatis mutandis:**
:::azul
$$\lim_{(x,y,z) \to (a,b,c)} f(x, y, z) = f(a, b, c)$$
:::

:::azul
Sea $f : D \subset \mathbb{R}^2 \to \mathbb{R}$: $f(x, y)$ es continua en $D$ si es continua en cada punto $(a, b) \in D$.
:::
""", nota=[r"Continua en un punto pide tres cosas: que $f(a, b)$ exista, que el límite exista y que los dos sean iguales.", r"«Mutatis mutandis»: cambiando lo que haya que cambiar (aquí, pasar a tres variables)."])

texto("Ejercicio: continuidad y signo", r"""
### Ejercicio
:::lapiz
Sea $f : \mathbb{R}^3 \to \mathbb{R}$ continua en $(a, b, c)$ con $f(a, b, c) > 0$. Pruebe que existe $B((a, b, c), r)$ tq
$$f(x, y, z) > 0 \quad \forall (x, y, z) \in B((a, b, c), r)$$
:::

Por la continuidad: $\forall\, \varepsilon > 0\ \exists\, \delta > 0$ tq $\forall (x, y)$ con
$$\boxed{0 < \|(x, y) - (a, b)\| < \delta} \Rightarrow |f(x, y) - f(a, b)| < \varepsilon$$

El recuadro dice $(x, y) \in B((a, b), \delta)$, y entonces $f(x, y) \in \left]f(a, b) - \varepsilon,\ f(a, b) + \varepsilon\right[$.
""", dibujos=[
    d("continua-positiva", r"Un intervalo de ancho $2\varepsilon$", r"Tome $\varepsilon = \frac{f(a, b, c)}{2}$: el intervalo empieza en $\frac{f(a, b, c)}{2} > 0$, así que dentro de la bola $f$ es positiva, con $r = \delta$."),
], nota=[r"Hace falta suponer $f(a, b, c) > 0$; si no, el enunciado no se cumple."])

texto("Álgebra de funciones continuas", r"""
:::azul
Si $\displaystyle\lim_{(x,y) \to (a,b)} f(x, y) = L_1$ y $\displaystyle\lim_{(x,y) \to (a,b)} g(x, y) = L_2$:
$$\Rightarrow \lim_{(x,y) \to (a,b)} \big(f(x, y) + g(x, y)\big) = L_1 + L_2$$
:::

""", nota=[r"El truco del $\frac{\varepsilon}{2}$: se pide la mitad a cada función para que la suma quede menor que $\varepsilon$."])

texto("Álgebra: la demostración", r"""
**Dem:**
:::lapiz
Sea $\varepsilon > 0$; hallemos $\delta > 0$ tq $\forall (x, y)$ con $\|(x, y) - (a, b)\| < \delta$:
$$|f + g - (L_1 + L_2)| < \varepsilon$$

Por hip., $\exists\, \delta_1 > 0$ y $\delta_2 > 0$ tq:
$$\|(x, y) - (a, b)\| < \delta_1 \Rightarrow |f(x, y) - L_1| < \tfrac{\varepsilon}{2}$$
$$\|(x, y) - (a, b)\| < \delta_2 \Rightarrow |g(x, y) - L_2| < \tfrac{\varepsilon}{2}$$

Tome $0 < \delta < \min\{\delta_1, \delta_2\}$. $\forall (x, y)$ con $\|(x, y) - (a, b)\| < \delta$:
$$\begin{aligned} |f + g - (L_1 + L_2)| &= |f - L_1 + g - L_2| \\ &\le |f - L_1| + |g - L_2| \\ &< \tfrac{\varepsilon}{2} + \tfrac{\varepsilon}{2} = \varepsilon \end{aligned}$$
:::
""")
