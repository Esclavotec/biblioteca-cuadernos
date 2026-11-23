import json, sys
IMG = "books/cya-3-rosales/img/"
def d(src, pie, debajo, alt=None):
    o = {"src": IMG + src + ".svg", "pie": pie, "debajo": debajo}
    if alt: o["alt"] = alt
    return o

P = []
def texto(titulo, contenido, nota=None, dibujos=None):
    p = {"tipo": "texto", "titulo": titulo, "contenido": contenido.strip("\n")}
    if dibujos: p["dibujos"] = dibujos
    if nota: p["nota"] = nota if len(nota) > 1 else nota[0]
    P.append(p)

P.append({"tipo": "titulo", "titulo": "Cálculo y Análisis III",
          "subtitulo": "Prof. José Rosales · materia del **I parcial** (en progreso)",
          "nota": "Rojo: títulos · Azul: definiciones · Negro: notas · Lápiz: ejemplos y ejercicios."})

texto("Datos del curso", r"""
:::azul
**Rosales, José** — Doctor
:::

### Evaluación
- I Parcial — sábado 5 de septiembre · **25 %**
- II Parcial — sábado 17 de octubre · **25 %**
- III Parcial — sábado 28 de noviembre · **25 %**
- Trabajo cotidiano · **20 %**
- Cuaderno de ejercicios · **5 %**

**Total: 100 %**

### Consulta
Martes de 4 pm a 6 pm
""")

texto("Libros y software", r"""
### Libros
- Bartle
- Apostol
- Thomas — *Calculus*

### Software
- GeoGebra
- Claude
- Wolfram
""", nota=["Bartle: *Introducción al análisis matemático* (Bartle y Sherbert). Apostol: *Calculus*, vol. 2."])

texto("Programa", r"""
- $\mathbb{R}^n$, con $n = 2$ y $n = 3$ → operaciones algebraicas:
  - Producto interno
  - Producto vectorial
  - Operaciones algebraicas
  - Topología básica
- Curvas y superficies
- Diferenciación
  - Máximos y mínimos
- Integración
  - Integral doble o triple
- Integrales de línea
  - Teorema de Stokes
""")

texto("Espacio vectorial", r"""
$:=$ (se define)

:::azul
$$\mathbb{R}^n := \{(x_1, \dots, x_n) : x_i \in \mathbb{R}\}$$
:::

**Dato:** son $n$-tuplas; si $n = 1$ queda solo $x_1$.

**Convención:** $\vec{x} := (x_1, \dots, x_n)$
""", dibujos=[
    d("r2", r"$\mathbb{R}^2$", r"En $\mathbb{R}^2$ un punto es un par: $\vec{x} = (x_1, x_2)$. Las líneas rojas llevan el punto a cada eje."),
    d("r3", r"$\mathbb{R}^3$", r"En $\mathbb{R}^3$ se baja primero al plano $xy$ y de ahí a los ejes $x$ y $y$. La altura es $x_3$."),
], nota=["Ejes en ℝ³ (regla de la mano derecha): x hacia ti, y a la derecha, z hacia arriba."])

texto("Suma y producto escalar en ℝⁿ", r"""
:::azul
Sean $\vec{x}, \vec{y}$ en $\mathbb{R}^n$ y $\lambda \in \mathbb{R}$. Se observa que:

$$\begin{aligned} \vec{x} + \vec{y} &:= (x_1, \dots, x_n) + (y_1, \dots, y_n) \\ &= (x_1 + y_1, \dots, x_n + y_n) \end{aligned}$$
$$\lambda\vec{x} := \lambda(x_1, \dots, x_n) = (\lambda x_1, \dots, \lambda x_n)$$

Estas dos operaciones hacen de $\mathbb{R}^n$ un **espacio vectorial**.
:::

**Dato:**
- Neutro: $(0_1, \dots, 0_n) = \vec{0}$
- $\vec{x} - \vec{x} = \vec{0}$
""")

texto("Propiedades de ℝⁿ", r"""
{rojo|**Ejercicio:**} buscar y probar las propiedades de $\mathbb{R}^n$.
""", nota=[
    "Las 8 propiedades a probar:\n" + "\n".join([
        r"1. Conmutativa: $\vec{x}+\vec{y} = \vec{y}+\vec{x}$",
        r"2. Asociativa: $(\vec{x}+\vec{y})+\vec{z} = \vec{x}+(\vec{y}+\vec{z})$",
        r"3. Neutro: $\vec{x}+\vec{0} = \vec{x}$",
        r"4. Inverso: $\vec{x}+(-\vec{x}) = \vec{0}$",
        r"5. $\lambda(\vec{x}+\vec{y}) = \lambda\vec{x}+\lambda\vec{y}$",
        r"6. $(\lambda+\mu)\vec{x} = \lambda\vec{x}+\mu\vec{x}$",
        r"7. $\lambda(\mu\vec{x}) = (\lambda\mu)\vec{x}$",
        r"8. $1\vec{x} = \vec{x}$"]),
    "Se prueban coordenada a coordenada, usando que en ℝ ya valen."])

texto("Norma", r"""
:::azul
Sea $\vec{x} \in \mathbb{R}^n$. Entonces la norma se define como:

$$\|\vec{x}\| = \|(x_1, \dots, x_n)\| = \sqrt{x_1^2 + x_2^2 + \dots + x_n^2}$$

Y esta representa la **distancia del punto al origen**.
:::

### Ejm
:::lapiz
En $\mathbb{R}^4$:
$$\begin{aligned} \|(1, 3, 0, \sqrt{6})\| &= \sqrt{1^2 + 3^2 + 0^2 + (\sqrt{6})^2} \\ &= \sqrt{1 + 9 + 0 + 6} = \sqrt{16} = 4 \end{aligned}$$
:::
""", nota=[r"Todos los términos van al cuadrado, también $x_n^2$. Por eso la norma nunca es negativa."])

texto("Teorema: la norma es positiva", r"""
:::azul
Sean $\vec{x}, \vec{y} \in \mathbb{R}^n$ y $a \in \mathbb{R}$:
:::

**1)** $\|\vec{x}\| \ge 0$ ; $\|\vec{x}\| = 0 \iff \vec{x} = \vec{0}$

**Dem:** prueba por casos.

**1. Caso:** $\vec{x} = \vec{0}$
$$\begin{aligned} \|\vec{x}\| &= \|\vec{0}\| = \|(0, \dots, 0)\| \\ &= \sqrt{0^2 + \dots + 0^2} = 0 \end{aligned}$$

**2. Caso:** $\vec{x} \neq \vec{0} \Rightarrow (x_1, \dots, x_n) \neq (0, \dots, 0)$. Por lo anterior, $\exists\, x_i \neq 0$:
$$\begin{aligned} \|\vec{x}\| &= \sqrt{x_1^2 + \dots + x_i^2 + \dots + x_n^2} \\ &\ge \sqrt{x_i^2} = |x_i| > 0 \end{aligned}$$

$\therefore\ \|\vec{x}\| \ge 0$
""", nota=[r"$\|\vec{x}\|$ es un número: se iguala a $0$, no a $\vec{0}$."])

texto("Cauchy-Schwarz", r"""
:::azul
**2) Cauchy-Schwarz:**
$$|x_1 y_1 + x_2 y_2 + \dots + x_n y_n| \le \|\vec{x}\| \cdot \|\vec{y}\|$$
o, con sumatorias:
$$\Big|\sum_{i=1}^n x_i y_i\Big| \le \sqrt{\sum_{i=1}^n x_i^2} \cdot \sqrt{\sum_{i=1}^n y_i^2}$$
:::

**Dem:** prueba por casos.
""", nota=[r"La suma $\sum x_i y_i$ es el producto interno $\langle \vec{x}, \vec{y} \rangle$."])

texto("Cauchy-Schwarz: caso 1", r"""
**1. Caso:** $\vec{x} = a\vec{y} \Rightarrow \vec{x} = (ay_1, \dots, ay_n)$
$$\begin{aligned} |x_1y_1 + \dots + x_ny_n| &= \|\vec{x}\| \cdot \|\vec{y}\| \\ |ay_1^2 + \dots + ay_n^2| &= \|a\vec{y}\| \cdot \|\vec{y}\| \\ |a|(y_1^2 + \dots + y_n^2) &= |a|\,\|\vec{y}\| \cdot \|\vec{y}\| \\ |a|\,\|\vec{y}\|^2 &= |a|\,\|\vec{y}\|^2 \end{aligned}$$
""", nota=[
    r"Cada lado por separado da $|a|\,\|\vec{y}\|^2$: en este caso se cumple la igualdad."])

texto("Cauchy-Schwarz: caso 2", r"""
**2. Caso:** $\vec{x} \neq \lambda\vec{y}$, $\forall \lambda \in \mathbb{R}$. Considere $\lambda\vec{y} - \vec{x} \neq \vec{0}$.

Por def. de distancia:
$$\begin{aligned} 0 &< \|\lambda\vec{y} - \vec{x}\|^2 = \sum_{i=1}^n (\lambda y_i - x_i)^2 \\ &= \sum_{i=1}^n (\lambda^2 y_i^2 - 2\lambda y_i x_i + x_i^2) \\ &= \lambda^2 \sum y_i^2 - 2\lambda \sum y_i x_i + \sum x_i^2 \\ &= a\lambda^2 + b\lambda + c > 0 \end{aligned}$$
""", dibujos=[
    d("parabola-cs", r"$a\lambda^2 + b\lambda + c > 0$", r"Parábola siempre positiva: no tiene raíces reales y $\Delta < 0$. Aquí $a = \sum y_i^2$, $b = -2\sum y_i x_i$, $c = \sum x_i^2$."),
])

texto("Cauchy-Schwarz: el discriminante", r"""
De lo anterior, la parábola nunca toca el eje, así que:
$$\begin{aligned} \Delta = b^2 - 4ac &< 0 \\ 4\Big(\sum y_i x_i\Big)^2 &< 4\Big(\sum y_i^2\Big)\Big(\sum x_i^2\Big) \\ \Big(\sum y_i x_i\Big)^2 &< \Big(\sum y_i^2\Big)\Big(\sum x_i^2\Big) \\ \Big|\sum y_i x_i\Big| &< \|\vec{y}\| \cdot \|\vec{x}\| \end{aligned}$$
""", nota=[r"Con producto interno: $|\langle \vec{x}, \vec{y} \rangle| < \|\vec{x}\|\,\|\vec{y}\|$."])

texto("Desigualdad triangular", r"""
:::azul
**3) Desigualdad triangular:**
$$\|\vec{x} + \vec{y}\| \le \|\vec{x}\| + \|\vec{y}\|$$
:::

**Dem:**
$$\begin{aligned} \|\vec{x} + \vec{y}\|^2 &= \|(x_1 + y_1, \dots, x_n + y_n)\|^2 \\ &= (x_1 + y_1)^2 + \dots + (x_n + y_n)^2 \\ &= \sum_{i=1}^n (x_i^2 + 2x_iy_i + y_i^2) \\ &= \sum x_i^2 + 2\sum x_iy_i + \sum y_i^2 \\ &\le \|\vec{x}\|^2 + 2\|\vec{x}\|\|\vec{y}\| + \|\vec{y}\|^2 \\ &= (\|\vec{x}\| + \|\vec{y}\|)^2 \end{aligned}$$

$\therefore\ \|\vec{x} + \vec{y}\|^2 \le (\|\vec{x}\| + \|\vec{y}\|)^2$
""", nota=[r"El paso con $\le$ usa Cauchy-Schwarz: $\sum x_iy_i \le |\sum x_iy_i| \le \|\vec{x}\|\|\vec{y}\|$. Para terminar se saca raíz a ambos lados (los dos son $\ge 0$)."])

texto("Producto interno", r"""
:::azul
Si $\vec{x}, \vec{y} \in \mathbb{R}^n$, entonces:
$$\vec{x} \cdot \vec{y} = \langle \vec{x}, \vec{y} \rangle := x_1y_1 + \dots + x_ny_n = \sum_{i=1}^n x_iy_i$$
:::

### Ejm
:::lapiz
En $\mathbb{R}^5$: $\vec{x} = (0, -1, 2, 3, 0)$ y $\vec{y} = (0, 6, 1, 1, 0)$
$$\begin{aligned} \langle \vec{x}, \vec{y} \rangle &= 0 \cdot 0 + (-1) \cdot 6 + 2 \cdot 1 \\ &\quad + 3 \cdot 1 + 0 \cdot 0 \\ &= 0 - 6 + 2 + 3 + 0 \\ &= -1 \end{aligned}$$
:::
""")

texto("Propiedades del producto interno", r"""
### Dato
:::azul
$$|\langle \vec{x}, \vec{y} \rangle| \le \|\vec{x}\| \cdot \|\vec{y}\|$$
$$\|\vec{x}\| = \sqrt{\langle \vec{x}, \vec{x} \rangle}$$
- $\langle \lambda\vec{x}, \vec{y} \rangle = \langle \vec{x}, \lambda\vec{y} \rangle = \lambda\langle \vec{x}, \vec{y} \rangle$
- $\langle \vec{x} + \vec{y}, \vec{z} \rangle = \langle \vec{x}, \vec{z} \rangle + \langle \vec{y}, \vec{z} \rangle$
- $\langle \vec{x}, \vec{y} + \vec{z} \rangle = \langle \vec{x}, \vec{y} \rangle + \langle \vec{x}, \vec{z} \rangle$
:::
""", nota=[r"La primera es Cauchy-Schwarz escrita con producto interno. Otra propiedad útil: $\langle \vec{x}, \vec{y} \rangle = \langle \vec{y}, \vec{x} \rangle$ (es conmutativo)."])

texto("Espacios", r"""
### Ejercicio
:::lapiz
$$\|\vec{x} - \vec{y}\|^2 + \|\vec{x} + \vec{y}\|^2 = 2\|\vec{x}\|^2 + 2\|\vec{y}\|^2$$
$r = \vec{x} + \vec{y}$, $d = \vec{x} - \vec{y}$

**Pista:** $\|\vec{x} + \vec{y}\|^2 = \langle \vec{x} + \vec{y}, \vec{x} + \vec{y} \rangle$
:::
""", dibujos=[
    d("espacios", "Métrico ⊃ Normado ⊃ Hilbert", r"Todo espacio de Hilbert es normado ($\|x\| = \sqrt{\langle x, x \rangle}$) y todo normado es métrico ($d(x, y) = \|x - y\|$). Al revés no siempre."),
    d("paralelogramo", "Ley del paralelogramo", r"Las dos diagonales son $\vec{x} + \vec{y}$ y $\vec{x} - \vec{y}$. La suma de sus cuadrados es igual a la suma de los cuadrados de los 4 lados."),
], nota=[r"Normado: tiene norma. Hilbert: tiene producto interno y es completo.", r"Para el ejercicio: desarrolla los dos productos internos y suma. Los términos $\pm 2\langle \vec{x}, \vec{y} \rangle$ se cancelan."])

texto("Cauchy-Schwarz y el ángulo", r"""
### Dato
Producto punto y norma: **conmutativos**.

### Cauchy-Schwarz
:::azul
Se cumple a partir de Cauchy-Schwarz:
$$\begin{aligned} &\frac{|\langle \vec{x}, \vec{y} \rangle|}{\|\vec{x}\|\,\|\vec{y}\|} \le 1 \\ \iff &\left|\frac{\langle \vec{x}, \vec{y} \rangle}{\|\vec{x}\|\,\|\vec{y}\|}\right| \le 1 \\ \iff -1 \le &\frac{\langle \vec{x}, \vec{y} \rangle}{\|\vec{x}\|\,\|\vec{y}\|} \le 1 \end{aligned}$$
:::
""", nota=[r"«Norma conmutativa» quiere decir $\|\vec{x} - \vec{y}\| = \|\vec{y} - \vec{x}\|$."])

texto("Ángulo entre vectores", r"""

$\exists\, \theta \in [0, \pi]$ tq:
$$\cos\theta = \frac{\langle \vec{x}, \vec{y} \rangle}{\|\vec{x}\|\,\|\vec{y}\|}$$
""", dibujos=[
    d("angulo", r"$\theta$ entre $\vec{x}$ y $\vec{y}$", r"Como el cociente está entre $-1$ y $1$, siempre hay un ángulo $\theta$ con ese coseno. Si $\langle \vec{x}, \vec{y} \rangle = 0$, entonces $\theta = \pi/2$: son perpendiculares."),
], nota=[r"El ángulo solo tiene sentido si $\vec{x}, \vec{y} \neq \vec{0}$ (si no, se divide entre 0)."])

texto("Rectas en ℝⁿ", r"""
:::azul
La recta se define como:
:::
$$\begin{aligned} (x, y, z) &= (x_0, y_0, z_0) + \lambda \cdot \vec{v} \\ &= (x_0, y_0, z_0) + \lambda(v_1, v_2, v_3) \\ &= (x_0 + \lambda v_1,\ y_0 + \lambda v_2,\ z_0 + \lambda v_3) \end{aligned}$$

con $\lambda \in \mathbb{R}$.

### Ecuación paramétrica
:::azul
Se define como:
:::
$$\begin{cases} x = x_0 + \lambda v_1 \\ y = y_0 + \lambda v_2 \\ z = z_0 + \lambda v_3 \end{cases}$$
""", dibujos=[
    d("recta-r3", r"Recta $L$ por $A$ con dirección $\vec{v}$", r"$A = (x_0, y_0, z_0)$ es un punto fijo de la recta y $\vec{v}$ su dirección. Cada valor de $\lambda$ da otro punto, como $B = (x, y, z)$."),
])

texto("Esferas", r"""
### Esfera de centro ⟨0, 0, 0⟩ y radio 1
:::azul
La definición de esta esfera es:
:::
$$\begin{aligned} & x^2 + y^2 + z^2 = 1 \\ \iff & \|(x, y, z)\|^2 = 1 \\ \iff & \|(x, y, z)\| = 1 \end{aligned}$$
""", dibujos=[
    d("esfera-unitaria", r"$S^2$: centro $\vec{0}$, radio 1", r"Son todos los puntos a distancia 1 del origen. Se le llama $S^2$."),
])

texto("Esfera general", r"""
:::azul
La esfera general se define como:
$$(x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2 = r^2$$
:::

### Ejemplo
:::lapiz
- $(x - 1)^2 + y^2 + z^2 = 9$ → centro $\langle 1, 0, 0 \rangle$, radio $3$
- $(x + 2)^2 + (y - 1)^2 + (z + 5)^2 = 16$ → centro $\langle -2, 1, -5 \rangle$, radio $4$
:::
""", nota=[r"El centro es $(x_0, y_0, z_0)$ y el radio es $r$: son los puntos a distancia $r$ del centro.", r"Ojo con los signos: $(x + 2)^2 = (x - (-2))^2$, por eso el centro tiene $-2$."])

texto("Completar el cuadrado", r"""
:::lapiz
$x^2 + y^2 + z^2 = 2z$:
$$\begin{aligned} x^2 + y^2 + z^2 - 2z &= 0 \\ x^2 + y^2 + z^2 - 2z + 1 - 1 &= 0 \\ x^2 + y^2 + (z - 1)^2 &= 1 \end{aligned}$$

→ centro $\langle 0, 0, 1 \rangle$, radio $1$
:::
""", dibujos=[
    d("esfera-z1", r"$x^2 + y^2 + (z-1)^2 = 1$", r"El truco es **completar el cuadrado**: sumar y restar $1$ para formar $(z - 1)^2$. La esfera queda apoyada en el origen."),
])

texto("Proyección estereográfica", r"""
:::azul
Gauss definió una función entre $S^2$ y $\mathbb{R}^2$ tq:
$$\pi_N : S^2 \setminus \{N\} \longrightarrow \mathbb{R}^2$$
:::

La línea entre $(0, 0, 1)$ y $(x, y, z)$ es:
$$L := (0, 0, 1) + \lambda(x, y, z - 1), \quad \lambda \in \mathbb{R}$$
""", dibujos=[
    d("estereografica", r"$\pi_N(P)$", r"Desde el polo norte $N = (0, 0, 1)$ se traza la recta que pasa por $P$; donde corta el plano $z = 0$ está $\pi_N(P)$."),
], nota=[r"Se quita $N$ porque ahí $z = 1$ y se dividiría entre 0."])

texto("Proyección: el valor de λ", r"""
Busque para qué valor de $\lambda$ dicha línea corta el plano $z = 0$:
$$L = (\lambda x,\ \lambda y,\ 1 + \lambda(z - 1))$$

Solo interesa la tercera coordenada:
$$0 = 1 + \lambda(z - 1) \Rightarrow \lambda = \frac{1}{1 - z}$$
$$\Rightarrow\ \lambda x = \frac{x}{1 - z}, \qquad \lambda y = \frac{y}{1 - z}$$

$$\therefore\ \pi_N(x, y, z) = \left(\frac{x}{1 - z},\ \frac{y}{1 - z}\right)$$
""", nota=[
    r"Ojo con el signo: de $0 = 1 + \lambda(z - 1)$ sale $\lambda = -\frac{1}{z - 1} = \frac{1}{1 - z}$."])

texto("Cilindros", r"""
### Ejercicio
:::lapiz
Busque la función inversa de $\pi_N : S^2 \setminus \{N\} \to \mathbb{R}^2$ (cada punto del plano nos da uno de la esfera).
:::

### Cilindros
:::azul
En general: se parte de una curva (**directriz**) y una línea recta (**generatriz**), y se forma el cilindro.
:::
""", dibujos=[
    d("cilindros", "Ejemplos de cilindros", r"Cuando a la ecuación le falta una variable, es un cilindro paralelo a ese eje. Por ejemplo, $x^2 + z^2 = 1$ no tiene $y$: es un tubo a lo largo del eje $y$."),
    d("cilindro-general", "Directriz y generatrices", r"La directriz es la curva de abajo; las generatrices son las rectas paralelas que salen de cada punto de la curva."),
], nota=[r"Para comprobar el ejercicio, con $s = u^2 + v^2 + 1$:" + "\n\n" + r"$\pi_N^{-1}(u, v) = \left(\frac{2u}{s},\ \frac{2v}{s},\ \frac{s - 2}{s}\right)$"])

texto("Superficies", r"""
1. $(x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2 = r^2$ → **esfera**
2. $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} + \dfrac{z^2}{c^2} = 1$, con $a, b, c > 0$ → **elipsoide**
3. $\dfrac{z}{c} = \dfrac{x^2}{a^2} + \dfrac{y^2}{b^2}$, con $a, b, c > 0$ → **paraboloide elíptico**
4. $z^2 = x^2 + y^2$ → **cono de dos ramas**
""", dibujos=[
    d("elipsoide", "2. Elipsoide", r"Si $a = b = c = r$, el elipsoide es una esfera de radio $r$."),
    d("cono", "4. Cono de dos ramas", r"$z = \sqrt{x^2 + y^2}$ es la rama de arriba y $z = -\sqrt{x^2 + y^2}$, la de abajo."),
])

texto("Paraboloide elíptico", r"""
:::lapiz
3. $\dfrac{z}{c} = \dfrac{x^2}{a^2} + \dfrac{y^2}{b^2}$
:::
""", dibujos=[
    d("paraboloide-arriba", "3⁺. Abre hacia arriba", r"Con $c > 0$ abre hacia arriba; su punto más bajo es el origen."),
    d("paraboloide-abajo", "3⁻. Abre hacia abajo", r"Con $c < 0$ abre hacia abajo; su punto más alto es el origen."),
], nota=[r"Cortes horizontales ($z$ constante): elipses. Cortes verticales: parábolas. De ahí el nombre.", "- 3⁺: $c > 0$\n- 3⁻: $c < 0$"])

texto("Ejm: z = 7 − x² − y²", r"""
:::lapiz
Se parte de los paraboloides conocidos:
- $z = x^2 + y^2$ → abre hacia arriba
- $z = -x^2 - y^2$ → abre hacia abajo
:::
""", dibujos=[
    d("ejm-7", r"$z = 7 - x^2 - y^2$", r"Es el paraboloide que abre hacia abajo, subido 7 unidades: su vértice está en $(0, 0, 7)$."),
], nota=[r"$z = 7 - x^2 - y^2$ es $z = -x^2 - y^2$ desplazado 7 hacia arriba: vértice en $(0, 0, 7)$. Corta el plano $z = 0$ en el círculo $x^2 + y^2 = 7$."])

texto("Hiperboloide de una hoja", r"""
:::azul
Se define tq:
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = 1$$
:::
""", dibujos=[
    d("hiperboloide-z", "Hiperboloide de una hoja", r"El signo menos va con $z$, así que el eje del hiperboloide es el eje $z$. Su «cintura» es la elipse $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ en $z = 0$."),
], nota=["El eje de la superficie es siempre la variable que lleva el signo distinto."])

texto("Superficies en otros ejes", r"""
:::lapiz
- $x = \sqrt{y^2 + z^2}$
- $y = x^2 + z^2$
:::
""", dibujos=[
    d("cono-x", r"$x = \sqrt{y^2 + z^2}$", r"Media rama de cono alrededor del eje $x$: como hay raíz, solo vale $x \ge 0$."),
    d("paraboloide-y", r"$y = x^2 + z^2$", r"Paraboloide alrededor del eje $y$: abre hacia las $y$ positivas."),
], nota=[r"Paraboloide o cono: el paraboloide tiene los lados curvos; el cono, rectos."])

texto("Hiperboloide en el eje x", r"""
:::lapiz
$$-\frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} = 1$$
:::
""", dibujos=[
    d("hiperboloide-x", "Hiperboloide en el eje x", r"Ahora el signo menos va con $x$: es un hiperboloide de una hoja alrededor del eje $x$."),
])

texto("Curvas", r"""
:::azul
Estas se producen por las **intersecciones** de las superficies.
:::

### Ejm
:::lapiz
$$C := \begin{cases} x^2 + y^2 + z^2 = 2z & (1) \\ z = \sqrt{x^2 + y^2} & (2) \end{cases}$$
:::
""", dibujos=[
    d("curva-esfera-cono", "Esfera ∩ cono", r"La esfera $x^2 + y^2 + (z-1)^2 = 1$ y el cono se cortan justo en el «ecuador» de la esfera, a la altura $z = 1$."),
], nota=["(1) es la esfera de centro (0, 0, 1) y radio 1 que vimos antes; (2) es la rama de arriba del cono."])

texto("Curvas: el cálculo", r"""
:::lapiz
**Cálculo:** de (2), $z^2 = x^2 + y^2$. En (1):
$$\begin{aligned} z^2 + z^2 &= 2z \\ z^2 - z &= 0 \\ z(z - 1) &= 0 \\ z = 0 \quad &\text{o} \quad z = 1 \end{aligned}$$

Tome $z = 1$: $\ 1 = x^2 + y^2$

$\therefore$ La curva roja es $x^2 + y^2 = 1$, $z = 1$: un **círculo de radio 1 en el plano $z = 1$**.
:::
""", nota=[r"La otra solución, $z = 0$, da $x^2 + y^2 = 0$: solo el origen $(0, 0, 0)$, un punto suelto donde también se tocan."])

texto("Plano", r"""
:::azul
Un plano se define tq:
$$ax + by + cz = d$$
:::
""", dibujos=[
    d("plano-normal", r"Plano y normal $\vec{n}$", r"Los coeficientes $(a, b, c)$ forman el vector normal: es perpendicular al plano."),
], nota=[r"Forma rápida: con un punto $(x_0, y_0, z_0)$ y la normal $(a, b, c)$, el plano es:" + "\n\n" + r"$a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$"])

texto("Plano con punto y normal", r"""
:::lapiz
Halle la ecuación del plano que pasa por $(1, 2, 3)$ y tiene vector normal $\vec{n} = (1, 1, 1)$.

**Dato:** $ax + by + cz = d \Rightarrow x + y + z = d$

**Desarrollo:** el punto pertenece al plano, ent.
$$1 + 2 + 3 = d \Rightarrow d = 6$$

$\therefore$ Plano: $x + y + z = 6$
:::
""", nota=[r"Comprobación: $(1, 2, 3)$ cumple $1 + 2 + 3 = 6$ ✓"])

texto("Plano por tres puntos", r"""
:::lapiz
Halle la ecuación del plano que pasa por los puntos:
- $P = (1, -1, 0)$
- $Q = (0, 1, -1)$
- $R = (-1, 0, 1)$


Tome $P$ y $\vec{n} = \overrightarrow{PQ} \times \overrightarrow{PR}$
:::
""", dibujos=[
    d("plano-pqr", "Plano por P, Q y R", r"$\overrightarrow{PQ}$ y $\overrightarrow{PR}$ están dentro del plano; su producto cruz es perpendicular a los dos, así que sirve de normal."),
])

texto("Producto cruz", r"""
:::lapiz
$$\overrightarrow{PQ} = (u, v, w), \quad \overrightarrow{PR} = (\tilde{u}, \tilde{v}, \tilde{w})$$
$$\overrightarrow{PQ} \times \overrightarrow{PR} = \begin{vmatrix} \hat{\imath} & \hat{\jmath} & \hat{k} \\ u & v & w \\ \tilde{u} & \tilde{v} & \tilde{w} \end{vmatrix}$$

$\therefore$ Plano: $x + y + z = 0$
:::
""", nota=[
    "Cálculo:\n" + "\n".join([
        r"- $\overrightarrow{PQ} = (-1, 2, -1)$",
        r"- $\overrightarrow{PR} = (-2, 1, 1)$",
        r"- $\overrightarrow{PQ} \times \overrightarrow{PR} = (3, 3, 3)$"]),
    r"Con $P$:" + "\n\n" + r"$3(x - 1) + 3(y + 1) + 3z = 0$" + "\n\n" + r"$\Rightarrow x + y + z = 0$ ✓"])

exec(open(__file__.replace("cya3.py", "parte2.py"), encoding="utf-8").read())
exec(open(__file__.replace("cya3.py", "parte3.py"), encoding="utf-8").read())
exec(open(__file__.replace("cya3.py", "parte4.py"), encoding="utf-8").read())
exec(open(__file__.replace("cya3.py", "parte5.py"), encoding="utf-8").read())

book = {
  "id": "cya-3-rosales", "titulo": "Cálculo y Análisis III", "curso": "Prof. Rosales",
  "subtitulo": "I y II parcial completos", "color": "#6b4f7a", "papel": "blanco",
  "tintas": True, "fecha": "2026-11-20", "paginas": P,
}
with open(sys.argv[1], "w", encoding="utf-8") as fh:
    json.dump(book, fh, ensure_ascii=False, indent=2); fh.write("\n")
print(len(P), "páginas")
