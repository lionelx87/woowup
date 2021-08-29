# WoowUp - Challenge (Software Engineer)

Repositorio correspondiente al Challenge presentado por WoowUp para el puesto de Software Engineer

# Preguntas

¿Me contarías sobre algún libro o artículo técnico que leíste recientemente? ¿Por qué te gustó y por qué debería leerlo?

Actualmente estoy leyendo (por 2da vez) Clean Code de Robert Martin, si bien algunas de las prácticas que se mencionan en el mismo han tenido algún tipo de evolución u otras quedaron desfasadas, considero que constituyen una base muy sólida en la escritura de código limpio, reutilizable, mantenible y escalable. En mi caso, ha transmitido una responsabilidad mayor a la hora de desarrollar, agudizando mi ojo en los detalles de los mismos, creando un equilibrio entre los tiempos del mercado en estos años de experiencia y código que sea fácil de entender/extender por otro desarrollador que no escribió el mismo. 
También constantemente leo artículos en blog de desarrollo como medium, csstricks, consumo de cursos en video bajo demanda, lectura de documentación oficial, etc.

¿Qué feature de WoowUp te gustó mucho? ¿Por qué?

El análisis y uso inteligente de datos. Me parece un interesante desafío (en constante mejora) lograr predecir próximas compras con altos niveles de aciertos en aceptación por parte del usuario. Buscar patrones para afinar las ofertas que se le hagan a los clientes, resultando de real utilidad para estos últimos y que no los categoricen como spam.

# Ejecución de scripts

Ejercicio 1: Subir la escalera
Ejercicio 2: Reaprovisionamiento de productos
2.1. Extra

```
npm install
```
```
npm run woowup
```

Para el punto extra (2.1), la solución que emplee para que un valor atípico no me afecte el cálculo de la frecuencia de compra habitual, fue emplear la mediana en lugar del promedio. Aplicando esta herramienta del campo de la estadistica, puedo lograr que valores extremos y/o atípicos, no me afecte el cálculo buscado.

# Ejecución de test unitarios

```
npm test
```