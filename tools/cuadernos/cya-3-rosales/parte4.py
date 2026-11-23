# ---------------- II parcial: derivadas y diferenciabilidad (fotos del 23/11, 8:46) ----------------

P.append({"tipo": "titulo", "titulo": "II parcial", "subtitulo": "Derivadas, regla de la cadena, plano tangente, máximos y mínimos, Lagrange"})

texto("Corolario y producto de límites", r"""
### Corolario
:::azul
Si $f(x, y)$ es continua en $(a, b)$ y $g(x, y)$ es continua en $(a, b)$
$$\Rightarrow f(x, y) + g(x, y) \text{ es continua en } (a, b)$$
:::

### Teorema
:::azul
Sean $\displaystyle\lim_{(x,y) \to (a,b)} f(x, y) = L_1$ y $\displaystyle\lim_{(x,y) \to (a,b)} g(x, y) = L_2$ ent.
$$\lim_{(x,y) \to (a,b)} f(x, y)\, g(x, y) = L_1 L_2$$
:::
""", nota=[r"El corolario sale directo del álgebra de límites, usando $L_1 = f(a, b)$ y $L_2 = g(a, b)$."])

texto("Producto: la demostración", r"""
**Demostración:**
:::lapiz
Sea $\varepsilon > 0$ y halle $\delta > 0$ tq
$$\|(x, y) - (a, b)\| < \delta \Rightarrow |f g - L_1 L_2| < \varepsilon$$

$$\begin{aligned} |fg - L_1L_2| &= |fg - fL_2 + fL_2 - L_1L_2| \\ &\le |fg - fL_2| + |fL_2 - L_1L_2| \\ &= |f|\,|g - L_2| + |L_2|\,|f - L_1| \end{aligned}$$

Acotemos $|f(x, y)|$, donde por hip. $\exists\, \delta_1 > 0$ tq
$$\|(x, y) - (a, b)\| < \delta_1 \Rightarrow |f - L_1| < 1 \Rightarrow \big||f| - |L_1|\big| < 1 \Rightarrow |f| < 1 + |L_1|$$

Ahora, volviendo:
$$\begin{aligned} &< (1 + |L_1|) \cdot \frac{\varepsilon}{2(1 + |L_1|)} + \frac{\varepsilon}{2|L_2|}\,|L_2| \\ &< \frac{\varepsilon}{2} + \frac{\varepsilon}{2} = \varepsilon \end{aligned}$$
:::
""", nota=[r"El último paso pide $\delta_2$ con $|g - L_2| < \frac{\varepsilon}{2(1 + |L_1|)}$ y $\delta_3$ con $|f - L_1| < \frac{\varepsilon}{2|L_2|}$; se toma $\delta = \min\{\delta_1, \delta_2, \delta_3\}$. Si $L_2 = 0$, ese término ya vale 0."])

texto("Derivada direccional", r"""
{rojo|4/9/2026} · Pág. 301–302, *Calculus*, Apostol (topología)

:::azul
Sea $f(x, y)$ def. en $D$ abierto, campo escalar. Sea $\vec{a} = (a_1, a_2)$ tq: ¿cómo cambia $f(\vec{a})$ para valores que pasan por una línea?
$$D_{\vec{v}} f(\vec{a})$$
∗ Derivada direccional de $f(x, y)$ en $\vec{a}$ siguiendo la dirección de $\vec{v}$:
$$D_{\vec{v}} f(\vec{a}) = \lim_{t \to 0} \frac{f(\vec{a} + t\vec{v}) - f(\vec{a})}{t}$$
- $\|\vec{v}\| = 1$
:::
""", dibujos=[
    d("derivada-direccional", r"$\vec{a} + t\vec{v}$", r"Se mira $f$ solo sobre la recta que pasa por $\vec{a}$ con dirección $\vec{v}$. Así queda una función de una variable, $t$, y se deriva como en Cálculo I."),
])

texto("Derivadas direccionales: ejemplo", r"""
### Ejm
:::lapiz
$$f(x, y) = \begin{cases} \dfrac{xy^2}{x^2 + y^4} & \text{si } x \neq 0 \\ 0 & \text{si } x = 0 \end{cases}$$

1) $D_{\vec{\jmath}} f(0, 0)$: como $f(\langle 0,0 \rangle + t\langle 0,1 \rangle) = f(0, t) = 0$,
$$D_{\vec{\jmath}} f(0, 0) = \lim_{t \to 0} \frac{0 - 0}{t} = 0$$

2) $D_{\vec{\imath}} f(0, 0)$: como $f(\langle 0,0 \rangle + t\langle 1,0 \rangle) = f(t, 0) = 0$,
$$D_{\vec{\imath}} f(0, 0) = \lim_{t \to 0} \frac{f(t, 0) - 0}{t} = \lim_{t \to 0} \frac{\frac{t \cdot 0^2}{t^2 + 0^4}}{t} = 0$$

3) $f(x, y)$ no es continua en $(0, 0)$. Para saber si es continua se debe probar que
$$\lim_{(x,y) \to (0,0)} f(x, y) = f(0, 0) = 0$$
:::
""")

texto("Existen las derivadas, pero no es continua", r"""
:::lapiz
$A = \{(x, y) : y = \sqrt{x}\}$:
$$\lim_{\substack{(x,y) \to (0,0) \\ (x,y) \in A}} f(x, y) = \lim_{x \to 0} \frac{x(\sqrt{x})^2}{x^2 + (\sqrt{x})^4} = \lim_{x \to 0} \frac{x^2}{x^2 + x^2} = \frac{1}{2}$$
:::

### Notación
- Apóstol $= f'(\vec{a}; \vec{v})$
- Rosales $= D_{\vec{v}} f(\vec{a})$
""", dibujos=[
    d("camino-raiz", r"Por $y = \sqrt{x}$", r"En varias variables, que existan las derivadas parciales (o todas las direccionales) **no** garantiza que la función sea continua."),
])

texto("Derivadas parciales", r"""
### Def
:::azul
Para $f(x, y)$ se define:

1) **Derivada parcial** de $f(x, y)$ en $\vec{a}$, con respecto a $x$:
$$\frac{\partial f}{\partial x}(a_1, a_2) := D_{\vec{\imath}} f(a_1, a_2)$$

2) **Derivada parcial** de $f(x, y)$ en $\vec{a}$, con respecto a $y$:
$$\frac{\partial f}{\partial y}(a_1, a_2) := D_{\vec{\jmath}} f(a_1, a_2)$$
:::

### Ejm
:::lapiz
Para la $f$ anterior:
$$\frac{\partial f}{\partial x}(0, 0) = D_{\vec{\imath}} f(0, 0) = 0, \qquad \frac{\partial f}{\partial y}(0, 0) = D_{\vec{\jmath}} f(0, 0) = 0$$
:::
""")

texto("Vector gradiente", r"""
### Definición
:::azul
Sea $f(x, y)$ «bonita» tq:
$$\nabla f(x, y) := \left(\frac{\partial f}{\partial x}(x, y),\ \frac{\partial f}{\partial y}(x, y)\right)$$
→ **Vector gradiente**
:::

### Derivada direccional: 3 variables
:::azul
$\vec{a} = \langle a_1, a_2, a_3 \rangle$, $\vec{v} = \langle v_1, v_2, v_3 \rangle$:
$$D_{\vec{v}} f(\vec{a}) = \lim_{t \to 0} \frac{f(a_1 + tv_1,\ a_2 + tv_2,\ a_3 + tv_3) - f(a_1, a_2, a_3)}{t}$$
:::
""", nota=[r"«Bonita»: que existan las dos derivadas parciales."])

texto("Def. derivada parcial", r"""
:::azul
Sea $f(x, y)$ un campo escalar tq:
$$\frac{\partial f}{\partial x}(a_1, a_2) := D_{(1,0)} f(a_1, a_2) = \lim_{t \to 0} \frac{f(a_1 + t, a_2) - f(a_1, a_2)}{t}$$
$$\frac{\partial f}{\partial y}(a_1, a_2) := D_{(0,1)} f(a_1, a_2) = \lim_{t \to 0} \frac{f(a_1, a_2 + t) - f(a_1, a_2)}{t}$$
:::

**Nota:**
:::azul
Calcular $\frac{\partial f}{\partial x}$ es derivar con respecto a «$x$» suponiendo «$y$» constante.
:::

### Ejm
:::lapiz
$$f(x, y) = x^2 + y^2 \Rightarrow \frac{\partial f}{\partial x}(x, y) = 2x + 0$$
:::
""")

texto("Parciales: ejemplos", r"""
### Ejm
:::lapiz
$f(x, y) = \operatorname{sen}(x^2 + y^2)$
$$\frac{\partial f}{\partial x}(x, y) = \cos(x^2 + y^2) \cdot (2x + 0) = 2x\cos(x^2 + y^2)$$
¿$\frac{\partial f}{\partial y}$?
:::

### Ejm
:::lapiz
$f(x, y) = x^y$
$$\frac{\partial f}{\partial x}(x, y) = y \cdot x^{y-1}$$
$$\frac{\partial f}{\partial y}(x, y) = \frac{\partial}{\partial y}\left(e^{y\ln x}\right) = e^{y\ln x} \cdot \ln x$$
:::
""", nota=[r"Respuesta: $\frac{\partial f}{\partial y} = 2y\cos(x^2 + y^2)$.", r"$e^{y \ln x} \ln x = x^y \ln x$: con $y$ como variable, $x^y$ es una exponencial."])

texto("Derivada direccional con Cálculo I", r"""
### Ejm
:::lapiz
$f(\vec{x}) = \|\vec{x}\|^2$. ¿$D_{\vec{v}} f(\vec{a})$?

Vamos a calcular usando Cálculo I:
$$g(t) = f(\vec{a} + t\vec{v}), \qquad g(0) = f(\vec{a})$$
:::

### Teorema
:::azul
Sea $g(t) = f(\vec{a} + t\vec{v})$, $\forall t \in [0, 1]$. Entonces si existe $g'(t)$, también existe $D_{\vec{v}} f(\vec{a} + t\vec{v})$, o viceversa. Y además:
$$g'(t) = D_{\vec{v}} f(\vec{a} + t\vec{v})$$
Además, si $t = 0$:
$$g'(0) = D_{\vec{v}} f(\vec{a})$$
:::
""")

texto("‖x‖²: la derivada direccional", r"""
### Ejm
:::lapiz
$f(\vec{x}) = \|\vec{x}\|^2$, ¿$D_{\vec{v}} f(\vec{x})$?

Sea
$$\begin{aligned} g(t) = f(\vec{x} + t\vec{v}) &= \|\vec{x} + t\vec{v}\|^2 \\ &= (\vec{x} + t\vec{v}) \cdot (\vec{x} + t\vec{v}) \\ &= \vec{x} \cdot \vec{x} + \vec{x} \cdot t\vec{v} + t\vec{v} \cdot \vec{x} + t\vec{v} \cdot t\vec{v} \\ &= \|\vec{x}\|^2 + 2t\,\vec{x} \cdot \vec{v} + t^2\|\vec{v}\|^2 \end{aligned}$$

Ahora:
$$g'(t) = 0 + 2\,\vec{x} \cdot \vec{v} + 2t\|\vec{v}\|^2$$
Y después tome $t = 0$:
$$g'(0) = 2\,\vec{x} \cdot \vec{v}$$
:::
""", nota=[r"Comprobación con el gradiente: $\nabla \|\vec{x}\|^2 = 2\vec{x}$, y $2\vec{x} \cdot \vec{v}$ ✓"])

texto("Prueba: teorema anterior", r"""
:::lapiz
$$\frac{g(t + h) - g(t)}{h} = \frac{f(\vec{a} + (t + h)\vec{v}) - f(\vec{a} + t\vec{v})}{h}$$
$$\Rightarrow \frac{g(t + h) - g(t)}{h} = \frac{f(\vec{a} + t\vec{v} + h\vec{v}) - f(\vec{a} + t\vec{v})}{h}$$

Supongo $g'(t)$ existe:
$$\begin{aligned} g'(t) = \lim_{h \to 0} \frac{g(t + h) - g(t)}{h} &= \lim_{h \to 0} \frac{f(\vec{a} + t\vec{v} + h\vec{v}) - f(\vec{a} + t\vec{v})}{h} \\ &= D_{\vec{v}} f(\vec{a} + t\vec{v}) \end{aligned}$$
:::
""", nota=[r"El «viceversa» es la misma cuenta leída al revés: los dos cocientes son iguales para todo $h$, así que si un límite existe, el otro también."])

texto("Teorema del valor medio", r"""
:::azul
Sea $f : [a, b] \to \mathbb{R}$ continua y $f : \,]a, b[\, \to \mathbb{R}$ derivable. $\exists\, \theta \in \,]a, b[$ tq:
$$f'(\theta) = \frac{f(b) - f(a)}{b - a}$$
:::

{rojo|**Nota:**} es falso en varias variables.

### T.V.M. para campos escalares
:::azul
Suponga que $D_{\vec{v}} f(\vec{a} + t\vec{v})$ existe para cada $t \in [0, 1]$. Ent. existe $\theta \in \,]0, 1[$ tq:
$$f(\vec{a} + \vec{v}) - f(\vec{a}) = D_{\vec{v}} f(\vec{a} + \theta\vec{v})$$
:::
""", dibujos=[
    d("tvm", "Valor medio", r"Hay un punto $\theta$ donde la tangente es paralela a la recta que une $(a, f(a))$ y $(b, f(b))$."),
], nota=[r"Lo que falla en varias variables es la versión para funciones con valores **vectoriales**. Para campos escalares sí vale, sobre el segmento de $\vec{a}$ a $\vec{a} + \vec{v}$."])

texto("T.V.M.: demostración", r"""
**Dem:**
:::lapiz
Sea $g(t) = f(\vec{a} + t\vec{v})$. Por el teorema anterior: $g'(t)$ existe.

Ahora aplique T.V.M. a $g(t)$ en $[0, 1]$:
$$\Rightarrow g'(\theta) = \frac{g(1) - g(0)}{1 - 0}; \quad \theta \in \,]0, 1[$$
$$\Rightarrow f(\vec{a} + \vec{v}) - f(\vec{a}) = D_{\vec{v}} f(\vec{a} + \theta\vec{v})$$
:::
""", nota=[r"$g(1) = f(\vec{a} + \vec{v})$, $g(0) = f(\vec{a})$ y $g'(\theta) = D_{\vec{v}} f(\vec{a} + \theta\vec{v})$."])

texto("Parciales en 3 variables", r"""
### Respecto a 3 variables
:::azul
$f(x, y, z)$:
$$\frac{\partial f}{\partial x} := D_{(1,0,0)} f, \quad \frac{\partial f}{\partial y} := D_{(0,1,0)} f, \quad \frac{\partial f}{\partial z} := D_{(0,0,1)} f$$
:::

### Ejm
:::lapiz
- $f(x, y, z) = x^2 + y^2 + z^2 \Rightarrow \frac{\partial f}{\partial x}(x, y, z) = 2x + 0 + 0$
- $f(x, y, z) = x^{y+z} \Rightarrow \frac{\partial f}{\partial x}(x, y, z) = (y + z)\,x^{y+z-1}$
:::
""")

texto("Derivadas parciales: notaciones", r"""
:::azul
$$\frac{\partial^2 f}{\partial x^2}(x, y) := \frac{\partial}{\partial x}\left(\frac{\partial f}{\partial x}(x, y)\right), \qquad \frac{\partial^2 f}{\partial y^2}(x, y) := \frac{\partial}{\partial y}\left(\frac{\partial f}{\partial y}(x, y)\right)$$
:::

**Mixtas:**
:::azul
$$\frac{\partial^2 f}{\partial x \partial y}(x, y) = \frac{\partial}{\partial x}\left(\frac{\partial f}{\partial y}(x, y)\right), \qquad \frac{\partial^2 f}{\partial y \partial x}(x, y) = \frac{\partial}{\partial y}\left(\frac{\partial f}{\partial x}(x, y)\right)$$
:::

{negro|**Nota:**} {azul|las mixtas no son iguales a menos de que se cumpla el **teorema de Schwarz**.}

**En general:**
:::azul
$$\frac{\partial^m f(x, y)}{\partial x^p\, \partial y^q}; \quad m = p + q$$
:::

### Ejm
:::lapiz
$f(x, y) = x^2 + xy + y^2$, calcule $\frac{\partial^2 f(x, y)}{\partial x \partial y}$:
$$\frac{\partial f}{\partial y} = x + 2y, \qquad \frac{\partial f}{\partial x} = 2x + y$$
$$\frac{\partial}{\partial x}\left(\frac{\partial f}{\partial y}\right) = \frac{\partial}{\partial x}(2y + x) = 1, \qquad \frac{\partial}{\partial y}\left(\frac{\partial f}{\partial x}\right) = \frac{\partial}{\partial y}(2x + y) = 1$$
:::
""", nota=[r"Schwarz: si las derivadas mixtas son continuas cerca del punto, entonces son iguales."])

texto("Ejercicios del Apóstol: #18", r"""
Pág. 313; #18:
:::azul
Sea $V(r, t) = t^n \cdot e^{-\frac{r^2}{4t}}$. Halle el valor de $n$ tq:
$$\frac{\partial V}{\partial t} = \frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2 \frac{\partial V}{\partial r}\right)$$
:::

**Sol:**
:::lapiz
① Calcular $\frac{\partial V}{\partial t}$:
$$\frac{\partial}{\partial t}\left(t^n e^{-\frac{r^2}{4t}}\right) = n t^{n-1} e^{-\frac{r^2}{4t}} + t^n e^{-\frac{r^2}{4t}} \cdot \frac{r^2}{4t^2}$$

② Calcular $\frac{\partial V}{\partial r}$:
$$t^n \cdot \frac{\partial}{\partial r}\left(e^{-\frac{r^2}{4t}}\right) = t^n e^{-\frac{r^2}{4t}} \cdot \frac{-r}{2t}$$

③ Calcular $r^2 \frac{\partial V}{\partial r}$:
$$r^2\left(t^n e^{-\frac{r^2}{4t}} \cdot \frac{-r}{2t}\right) = -t^n e^{-\frac{r^2}{4t}} \cdot \frac{r^3}{2t}$$
:::
""")

texto("#18: continuación", r"""
:::lapiz
④ Calcular $\frac{\partial}{\partial r}\left(r^2 \frac{\partial V}{\partial r}\right)$:
$$\begin{aligned} &= \frac{\partial}{\partial r}\left(-t^n e^{-\frac{r^2}{4t}} \cdot \frac{r^3}{2t}\right) = \frac{-t^{n-1}}{2} \cdot \frac{\partial}{\partial r}\left(e^{-\frac{r^2}{4t}} \cdot r^3\right) \\ &= \frac{-t^{n-1}}{2}\left(e^{-\frac{r^2}{4t}} \cdot \frac{-r}{2t} \cdot r^3 + e^{-\frac{r^2}{4t}} \cdot 3r^2\right) \\ &= \frac{t^{n-2}}{4} r^4 e^{-\frac{r^2}{4t}} - \frac{3}{2} t^{n-1} r^2 e^{-\frac{r^2}{4t}} \end{aligned}$$

⑤ Calcular $\frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2 \frac{\partial V}{\partial r}\right)$:
$$= \frac{t^{n-2}}{4} r^2 e^{-\frac{r^2}{4t}} - \frac{3}{2} t^{n-1} e^{-\frac{r^2}{4t}}$$

⑥ Igualar:
$$\begin{aligned} n t^{n-1} + \frac{t^{n-2}}{4} r^2 &= -\frac{3}{2} t^{n-1} + \frac{t^{n-2}}{4} r^2 \\ n t^{n-1} &= -\frac{3}{2} t^{n-1} \\ n &= -\frac{3}{2} \end{aligned}$$
:::
""", nota=[r"En ⑥ se divide todo entre $e^{-\frac{r^2}{4t}}$ (nunca vale 0), y el término con $r^2$ se cancela. Ojo: $t^n \cdot \frac{r^2}{4t^2} = \frac{t^{n-2}}{4} r^2$."])

texto("Ejercicios del Apóstol: #19", r"""
:::azul
$z = u(x, y)\, e^{ax + by}$. Si $\frac{\partial^2 u}{\partial x \partial y} = 0$, halle los valores de $a$ y $b$ tq:
$$\frac{\partial^2 z}{\partial x \partial y} - \frac{\partial z}{\partial x} - \frac{\partial z}{\partial y} + z = 0$$
:::

**Sol:**
:::lapiz
$$\frac{\partial z}{\partial x} = \frac{\partial u}{\partial x} e^{ax+by} + u\, e^{ax+by} \cdot a$$
$$\frac{\partial z}{\partial y} = \frac{\partial u}{\partial y} e^{ax+by} + u\, e^{ax+by} \cdot b$$
$$\begin{aligned} \frac{\partial^2 z}{\partial x \partial y} &= \frac{\partial}{\partial x}\left(u_y e^{ax+by} + u\, e^{ax+by} b\right) \\ &= u_{xy} e^{ax+by} + a\,u_y e^{ax+by} + b\,u_x e^{ax+by} + ab\,u\, e^{ax+by} \end{aligned}$$
:::
""", nota=[r"Sustituyendo, con $u_{xy} = 0$:" + "\n\n" + r"$e^{ax+by}\big[(a - 1)u_y + (b - 1)u_x + (a - 1)(b - 1)u\big] = 0$" + "\n\n" + r"Para que valga con cualquier $u$: $a = 1$ y $b = 1$."])

texto("Búsqueda de una derivada en ℝⁿ", r"""
Análogamente a la de CyA I:
:::lapiz
Sea
$$f'(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}$$
Considere:
$$* \ E(a, h) = \begin{cases} \dfrac{f(a + h) - f(a)}{h} - f'(a) & \text{si } h \neq 0 \\ 0 & \text{si } h = 0 \end{cases}$$
$$\lim_{h \to 0} E(a, h) = 0$$

Entonces reescribamos $*$:
$$\boxed{f(a + h) = f(a) + f'(a)h + h\,E(a, h)}$$
→ Taylor de primer orden.

$T_a h = f'(a)h \Rightarrow$ la **diferencial** de $f$ en $a$.
:::
""", nota=[r"La idea para $\mathbb{R}^n$: como no se puede dividir entre un vector $\vec{h}$, se pide que el error $f(\vec{a} + \vec{h}) - f(\vec{a}) - T(\vec{h})$ sea pequeño comparado con $\|\vec{h}\|$."])

texto("Función diferenciable", r"""
### Def: Función diferenciable
:::azul
Sea $f : \mathbb{R}^n \to \mathbb{R}$ y $\vec{a} \in \mathbb{R}^n$; $f$ es **diferenciable** $\iff \exists\, T_{\vec{a}} : \mathbb{R}^n \to \mathbb{R}$ lineal tq:
$$\lim_{\vec{h} \to \vec{0}} \frac{|f(\vec{a} + \vec{h}) - f(\vec{a}) - T_{\vec{a}}(\vec{h})|}{\|\vec{h}\|} = 0$$
:::

**Obs:** ¡la $T_{\vec{a}}$ es única!

**Dem:** por reducción al absurdo.
:::lapiz
Suponga que existe otra trans. lineal $L_{\vec{a}} : \mathbb{R}^n \to \mathbb{R}$ tq:
$$\lim_{\vec{h} \to \vec{0}} \frac{|f(\vec{a} + \vec{h}) - f(\vec{a}) - L_{\vec{a}}(\vec{h})|}{\|\vec{h}\|} = 0$$
Debemos mostrar que $T_{\vec{a}}(\vec{x}) = L_{\vec{a}}(\vec{x})$, $\forall \vec{x} \in \mathbb{R}^n$.
:::
""")

texto("Unicidad de la diferencial", r"""
:::lapiz
Si $\vec{x} = \vec{0}$:
$$T_{\vec{a}}(\vec{0}) = T_{\vec{a}}(\vec{0} + \vec{0}) = T_{\vec{a}}(\vec{0}) + T_{\vec{a}}(\vec{0}) \Rightarrow T_{\vec{a}}(\vec{0}) = 0$$
- $L_{\vec{a}}(\vec{0}) = 0$

Veamos que $T_{\vec{a}}(\vec{x}) = L_{\vec{a}}(\vec{x})$, $\forall \vec{x} \neq \vec{0}$ en $\mathbb{R}^n$. En efecto, sea
$$d(\vec{h}) := f(\vec{a} + \vec{h}) - f(\vec{a})$$
Ahora:
$$\begin{aligned} |T_{\vec{a}}(\vec{h}) - L_{\vec{a}}(\vec{h})| &= |T_{\vec{a}}(\vec{h}) - d(\vec{h}) + d(\vec{h}) - L_{\vec{a}}(\vec{h})| \\ &\le |T_{\vec{a}}(\vec{h}) - d(\vec{h})| + |d(\vec{h}) - L_{\vec{a}}(\vec{h})| \end{aligned}$$
Observe:
$$\lim_{\vec{h} \to \vec{0}} \frac{|T_{\vec{a}}(\vec{h}) - L_{\vec{a}}(\vec{h})|}{\|\vec{h}\|} \le 0 + 0 \ \therefore\ \lim_{\vec{h} \to \vec{0}} \frac{|T_{\vec{a}}(\vec{h}) - L_{\vec{a}}(\vec{h})|}{\|\vec{h}\|} = 0$$
:::
""")

texto("Unicidad: conclusión", r"""
:::lapiz
Sea $\vec{x} \in \mathbb{R}^n$, $\vec{x} \neq \vec{0}$. Suponga que $t \in \mathbb{R}$ tq $t \to 0 \Rightarrow t\vec{x} \to \vec{0}$:
$$\begin{aligned} 0 &= \lim_{t\vec{x} \to \vec{0}} \frac{|T_{\vec{a}}(t\vec{x}) - L_{\vec{a}}(t\vec{x})|}{\|t\vec{x}\|} \\ &= \lim_{t\vec{x} \to \vec{0}} \frac{|t|\,|T_{\vec{a}}(\vec{x}) - L_{\vec{a}}(\vec{x})|}{|t|\,\|\vec{x}\|} \\ &= \frac{|T_{\vec{a}}(\vec{x}) - L_{\vec{a}}(\vec{x})|}{\|\vec{x}\|} \end{aligned}$$

Ahora:
$$\frac{|T_{\vec{a}}(\vec{x}) - L_{\vec{a}}(\vec{x})|}{\|\vec{x}\|} = 0 \Rightarrow T_{\vec{a}}(\vec{x}) = L_{\vec{a}}(\vec{x})$$
:::
""", nota=[r"Clave: como $T$ y $L$ son lineales, $T(t\vec{x}) = t\,T(\vec{x})$; el $|t|$ se cancela y queda un número que no depende de $t$. Si su límite es 0, ese número es 0."])

texto("Diferencial y gradiente", r"""
:::azul
$$\nabla f(\vec{a}) = \left(\frac{\partial}{\partial x} f(\vec{a}),\ \frac{\partial}{\partial y} f(\vec{a})\right)$$
así, dependiendo de $n$ en $\mathbb{R}^n$.
:::

### Teorema
:::azul
$f : \mathbb{R}^n \to \mathbb{R}$ es diferenciable en $\vec{a}$. Ent.
$$T_{\vec{a}}(\vec{y}) = f'(\vec{a}; \vec{y}) \ \Rightarrow\ T_{\vec{a}}(\vec{y}) = \nabla f(\vec{a}) \cdot \vec{y}$$
:::
""")

texto("Ejm: (x³ + y³)/(x² + y²)", r"""
{rojo|16/09/26}

### Ejm
:::lapiz
$$\lim_{\langle x,y \rangle \to \langle 0,0 \rangle} \frac{x^3 + y^3}{x^2 + y^2}$$

**Sol:** $y = mx$:
$$\lim_{x \to 0} \frac{x^3 + m^3x^3}{x^2 + m^2x^2} = 0$$

Sea $\varepsilon > 0$, debo hallar $\delta > 0$ tq $\forall \langle x, y \rangle$ con $0 < \|\langle x, y \rangle - \langle 0, 0 \rangle\| < \delta \Rightarrow |f(x, y) - 0| < \varepsilon$:
$$\begin{aligned} \left|\frac{x^3 + y^3}{x^2 + y^2}\right| &\le \frac{|x|^3 + |y|^3}{x^2 + y^2} \le \frac{\left(\sqrt{x^2 + y^2}\right)^3 + \left(\sqrt{x^2 + y^2}\right)^3}{x^2 + y^2} \\ &= 2\sqrt{x^2 + y^2} < 2 \cdot \frac{\varepsilon}{2} = \varepsilon \end{aligned}$$
Tome $\delta < \frac{\varepsilon}{2}$.
:::
""", nota=[r"Las rectas solo sugieren el valor (0); lo que lo prueba es el $\varepsilon$-$\delta$."])

texto("Ejm: |x|^y", r"""
### Ejm
:::lapiz
Estudie
$$\lim_{\langle x,y \rangle \to \langle 0,0 \rangle} |x|^y = \lim_{\langle x,y \rangle \to \langle 0,0 \rangle} e^{y \ln|x|}$$
**¡No existe!**

$A = \{\langle x, y \rangle : y = x\}$:
$$\lim_{x \to 0} |x|^x = \lim_{x \to 0} e^{x \ln|x|} = 1$$
porque
$$\lim_{x \to 0^+} x\ln x \ (0 \cdot -\infty) \overset{\text{L'H}}{=} \lim_{x \to 0^+} \frac{1/x}{-1/x^2} = \lim_{x \to 0^+} (-x) = 0$$

$B = \{\langle x, y \rangle : y = \tfrac{1}{\ln|x|}\}$:
$$\lim_{x \to 0} |x|^{\frac{1}{\ln|x|}} = \lim_{x \to 0} e^{\frac{1}{\ln|x|} \cdot \ln|x|} = e$$
:::
""", nota=[r"Como $1 \neq e$, el límite no existe. La curva $B$ sí llega al origen: $\frac{1}{\ln|x|} \to 0$ cuando $x \to 0$."])

texto("¿Cómo calcular la diferencial?", r"""
### f es diferenciable en $\vec{a}$
:::azul
Si existe $T_{\vec{a}} : \mathbb{R}^n \to \mathbb{R}$ tq:
$$\lim_{\vec{h} \to \vec{0}} \frac{f(\vec{a} + \vec{h}) - f(\vec{a}) - T_{\vec{a}}(\vec{h})}{\|\vec{h}\|} = 0$$
∗ $T_{\vec{a}}$ es única.
:::

### ¿Cómo calcular $T_{\vec{a}}$?
:::azul
$$D_{\vec{v}} f(\vec{a}) = \lim_{t \to 0} \frac{f(\vec{a} + t\vec{v}) - f(\vec{a})}{t}; \quad \|\vec{v}\| = 1$$
$$f'(\vec{a}; \vec{y}) = \lim_{t \to 0} \frac{f(\vec{a} + t\vec{y}) - f(\vec{a})}{t}$$
:::

### Teorema
:::azul
Sea $f : \mathbb{R}^n \to \mathbb{R}$ diferenciable en $\vec{a}$. Entonces $T_{\vec{a}}(\vec{y}) = f'(\vec{a}; \vec{y})$, $\forall \vec{y} \in \mathbb{R}^n$. Además:
$$T_{\vec{a}}(\vec{y}) = \nabla f(\vec{a}) \cdot \vec{y}$$
:::
""", nota=[r"Diferencia: $D_{\vec{v}}$ pide $\|\vec{v}\| = 1$; $f'(\vec{a}; \vec{y})$ acepta cualquier vector $\vec{y}$."])

texto("Ejm: la diferencial de x² + y²", r"""
### Ejm
:::lapiz
Suponiendo que $f\langle x, y \rangle = x^2 + y^2$ es diferenciable en $\vec{a} = \langle 1, 1 \rangle$, calcule la diferencial en $\vec{a} = \langle 1, 1 \rangle$.

$$\nabla f(x, y) = \left\langle \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \right\rangle = \langle 2x, 2y \rangle$$

¿$T_{\vec{a}} : \mathbb{R}^2 \to \mathbb{R}$?
$$\begin{aligned} T_{\langle 1,1 \rangle}\langle y_1, y_2 \rangle &= \nabla f\langle 1, 1 \rangle \cdot \vec{y} \\ &= \langle 2, 2 \rangle \cdot \langle y_1, y_2 \rangle = 2y_1 + 2y_2 \end{aligned}$$
:::
""")

texto("x² + y²: comprobación", r"""
:::lapiz
$$\lim_{\vec{h} \to \langle 0,0 \rangle} \frac{f(\langle 1,1 \rangle + \langle h_1, h_2 \rangle) - f(1, 1) - T_{\langle 1,1 \rangle}(h_1, h_2)}{\|\vec{h}\|} = 0$$
$$\begin{aligned} &\lim_{\vec{h} \to \vec{0}} \frac{(1 + h_1)^2 + (1 + h_2)^2 - 2 - 2h_1 - 2h_2}{\sqrt{h_1^2 + h_2^2}} \\ = &\lim_{\vec{h} \to \vec{0}} \frac{h_1^2 + h_2^2}{\sqrt{h_1^2 + h_2^2}} = \lim_{\vec{h} \to \vec{0}} \sqrt{h_1^2 + h_2^2} = 0 \end{aligned}$$

Sea $\varepsilon > 0$, debo hallar $\delta > 0$ tq $\forall (h_1, h_2)$ con $\|\langle h_1, h_2 \rangle - \langle 0, 0 \rangle\| < \delta$:
$$\Rightarrow \left|\sqrt{h_1^2 + h_2^2} - 0\right| < \varepsilon \Rightarrow \sqrt{h_1^2 + h_2^2} < \varepsilon$$
Tome $\delta \le \varepsilon$.
:::
""")

texto("Demostración: T(y) = ∇f(a) · y", r"""
**Demostración:** primero probaremos la parte final.
:::lapiz
Suponga que $T_{\vec{a}}(\vec{y}) = f'(\vec{a}; \vec{y})$, $\forall \vec{y} \in \mathbb{R}^n$. Recuerde la base canónica de $\mathbb{R}^n$:
$$\vec{e}_1 = \langle 1, 0, \dots, 0 \rangle, \ \vec{e}_2 = \langle 0, 1, 0, \dots, 0 \rangle, \ \dots, \ \vec{e}_n = \langle 0, \dots, 0, 1 \rangle$$

No olvide que:
$$f'(\vec{a}; \vec{e}_k) = \lim_{t \to 0} \frac{f(\vec{a} + t\vec{e}_k) - f(\vec{a})}{t} = \frac{\partial f}{\partial x_k}(\vec{a})$$

Por álgebra lineal, si $\vec{y} \in \mathbb{R}^n$: $\vec{y} = \sum_{k=1}^n y_k \vec{e}_k$. Por último:
$$\begin{aligned} T_{\vec{a}}(\vec{y}) &= T_{\vec{a}}\Big(\sum_{k=1}^n y_k \vec{e}_k\Big) = \sum_{k=1}^n T_{\vec{a}}(y_k \vec{e}_k) = \sum_{k=1}^n y_k\, T_{\vec{a}}(\vec{e}_k) \\ &= \sum_{k=1}^n y_k\, f'(\vec{a}; \vec{e}_k) = \sum_{k=1}^n y_k \frac{\partial f}{\partial x_k}(\vec{a}) \\ &= y_1 \frac{\partial f}{\partial x_1}(\vec{a}) + y_2 \frac{\partial f}{\partial x_2}(\vec{a}) + \dots + y_n \frac{\partial f}{\partial x_n}(\vec{a}) \\ &= \Big(\frac{\partial f}{\partial x_1}(\vec{a}), \dots, \frac{\partial f}{\partial x_n}(\vec{a})\Big) \cdot \langle y_1, \dots, y_n \rangle = \nabla f(\vec{a}) \cdot \vec{y} \end{aligned}$$
:::
""")

texto("Prueba de T(y) = f′(a; y)", r"""
:::lapiz
**Caso 1:** $\vec{y} = \vec{0}$
$$T_{\vec{a}}(\vec{0}) = 0, \qquad f'(\vec{a}; \vec{0}) = \lim_{t \to 0} \frac{f(\vec{a} + t\vec{0}) - f(\vec{a})}{t} = \lim_{t \to 0} \frac{f(\vec{a}) - f(\vec{a})}{t} = 0$$

**Caso 2:** $\vec{y} \neq \vec{0}$. Sea $\vec{h} = t\vec{y}$.

Observe que si $\vec{h}$ tiene un valor menor, entonces $t$ también, y viceversa: $\|\vec{h}\| < \varepsilon$.
:::

:::rojo
**Ejercicio cuaderno:** $\vec{h}$ es menor a $\varepsilon \Rightarrow \|\vec{h}\| < \varepsilon$.
:::

:::lapiz
Sea $\varepsilon > 0 \Rightarrow \|\vec{h}\| = \|t\vec{y}\| = |t|\,\|\vec{y}\|$
$$\Rightarrow |t| = \frac{\|\vec{h}\|}{\|\vec{y}\|} < \frac{1}{\|\vec{y}\|} \cdot \varepsilon\|\vec{y}\|$$

$$\begin{aligned} \frac{f(\vec{a} + t\vec{y}) - f(\vec{a})}{t} &= \frac{f(\vec{a} + t\vec{y}) - f(\vec{a}) - T_{\vec{a}}(t\vec{y}) + T_{\vec{a}}(t\vec{y})}{t} \\ &= \frac{f(\vec{a} + t\vec{y}) - f(\vec{a}) - T_{\vec{a}}(t\vec{y})}{t} + T_{\vec{a}}(\vec{y}) \end{aligned}$$
:::
""")

texto("Prueba: conclusión", r"""
:::lapiz
$$\begin{aligned} &= \frac{f(\vec{a} + t\vec{y}) - f(\vec{a}) - T_{\vec{a}}(t\vec{y})}{t\,\|\vec{y}\|}\,\|\vec{y}\| + T_{\vec{a}}(\vec{y}) \\ &= \frac{f(\vec{a} + t\vec{y}) - f(\vec{a}) - T_{\vec{a}}(t\vec{y})}{\|t\vec{y}\|}\,\|\vec{y}\| + T_{\vec{a}}(\vec{y}) \end{aligned}$$
:::
""", nota=[r"Para cerrar: el primer término es el cociente de la definición con $\vec{h} = t\vec{y}$ (salvo el signo de $t$), que tiende a 0 cuando $t \to 0$. Así $f'(\vec{a}; \vec{y}) = T_{\vec{a}}(\vec{y})$."])

texto("Temas del II parcial", r"""
{rojo|18/09/26}

### II parcial: 3 ejercicios
1. Curva
2. Parametrizar (2.1, 2.2)
3. Bola abierta
4. Continuidad
""")

texto("Ejm: no diferenciable en el origen", r"""
### Ejm
:::lapiz
$f : \mathbb{R}^2 \to \mathbb{R}$
$$f(x, y) = \begin{cases} \dfrac{x^3 y}{x^4 + y^2} & \text{si } \langle x, y \rangle \neq \langle 0, 0 \rangle \\ 0 & \text{si } \langle x, y \rangle = \langle 0, 0 \rangle \end{cases}$$
Pruebe que $f(x, y)$ no es diferenciable en $\langle 0, 0 \rangle$.

**Sol:** ¡Niéguelo! Suponga que $f(x, y)$ sí es diferenciable en $\langle 0, 0 \rangle$:
$$\exists\, T_{\langle 0,0 \rangle} : \mathbb{R}^2 \to \mathbb{R} \text{ tq } \lim_{\vec{h} \to \vec{0}} \frac{f(\langle 0,0 \rangle + \vec{h}) - f(0, 0) - T_{\langle 0,0 \rangle}(\vec{h})}{\|\vec{h}\|} = 0$$

Recuerde: $T_{\langle 0,0 \rangle}(\vec{h}) = \nabla f(0, 0) \cdot \vec{h}$
$$\frac{\partial f}{\partial x} = \lim_{t \to 0} \frac{f(t, 0) - f(0, 0)}{t} = 0, \qquad \frac{\partial f}{\partial y} = \lim_{t \to 0} \frac{f(0, t) - f(0, 0)}{t} = 0$$
$$\therefore\ T_{\vec{0}}(\vec{h}) = 0$$
:::
""", nota=[r"La función es de dos variables, así que $f : \mathbb{R}^2 \to \mathbb{R}$."])

texto("No diferenciable: la contradicción", r"""
:::lapiz
Valiendo:
$$\lim_{\vec{h} \to \vec{0}} \frac{f(\vec{h}) - f(0, 0)}{\|\vec{h}\|} = 0 \Rightarrow \lim_{\vec{h} \to \vec{0}} \frac{h_1^3 h_2}{(h_1^4 + h_2^2)\sqrt{h_1^2 + h_2^2}} = 0$$

Tome $A = \{\langle h_1, h_2 \rangle : h_2 = h_1^2\}$:
$$\lim_{h_1 \to 0} \frac{h_1^3 \cdot h_1^2}{(h_1^4 + h_1^4)\sqrt{h_1^2 + h_1^4}} = \lim_{h_1 \to 0} \frac{h_1^5}{2h_1^4\sqrt{h_1^2 + h_1^4}} = \frac{1}{2} \ \Rightarrow\!\Leftarrow$$
:::

### Teorema
:::azul
Sea $f : \mathbb{R}^n \to \mathbb{R}$. Si $\frac{\partial f}{\partial x}$ y $\frac{\partial f}{\partial y}$ son continuas en $B(\vec{a}; r)$, ent. $f$ es diferenciable en $\vec{a}$.
:::
""", nota=[r"Simplificando: $\frac{h_1}{2|h_1|\sqrt{1 + h_1^2}}$, que da $\frac{1}{2}$ por la derecha y $-\frac{1}{2}$ por la izquierda. En ningún caso 0: contradicción."])

texto("Ejm: diferenciable en el origen", r"""
### Ejm
:::lapiz
$$f\langle x, y \rangle = \begin{cases} \dfrac{x^2 y^2}{x^2 + y^2} & \text{si } \langle x, y \rangle \neq \langle 0, 0 \rangle \\ 0 & \text{si } \langle x, y \rangle = \langle 0, 0 \rangle \end{cases}$$
Pruebe que $f$ es diferenciable en $\langle 0, 0 \rangle$.

$$\frac{\partial f}{\partial x}(x, y) = \frac{\partial}{\partial x}\left(\frac{x^2y^2}{x^2 + y^2}\right) = \frac{2xy^2(x^2 + y^2) - x^2y^2 \cdot 2x}{(x^2 + y^2)^2} = \frac{2xy^4}{(x^2 + y^2)^2}$$

$$\frac{\partial f}{\partial x}(0, 0) = \lim_{t \to 0} \frac{f(t, 0) - f(0, 0)}{t} = 0$$

$$\frac{\partial f}{\partial x}(x, y) = \begin{cases} \dfrac{2xy^4}{(x^2 + y^2)^2} & \text{si } \langle x, y \rangle \neq \langle 0, 0 \rangle \\ 0 & \text{si } \langle x, y \rangle = \langle 0, 0 \rangle \end{cases}$$
:::
""", nota=[r"Para terminar con el teorema: $\left|\frac{2xy^4}{(x^2 + y^2)^2}\right| \le 2|x| \to 0$, así que $\frac{\partial f}{\partial x}$ es continua; por simetría $\frac{\partial f}{\partial y} = \frac{2x^4y}{(x^2 + y^2)^2}$ también. Entonces $f$ es diferenciable en el origen."])
