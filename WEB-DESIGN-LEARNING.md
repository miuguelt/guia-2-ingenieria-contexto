# Aprendizaje de diseño web — Guía 2

## Evidencia de partida

- Fuente: `WEB-DESIGN-BRIEF.md`, `GUIDE_ITERATION_LOG.md` y `guide.manifest.json`.
- Verificación registrada: calidad web, validación HTML y JavaScript; la cadena de especificación fue reorganizada y ampliada con BDD, caso de uso y modelo relacional candidato.

## Patrones aplicados

- `progressive-route-from-evidence-to-transfer` (`verified-in-series`): se añadió una orientación inicial y un mapa de ocho artefactos antes de la cadena hallazgo → contexto → historia → requisitos → criterios → pruebas → construcción → documento final. Beneficio esperado: el aprendiz sabe qué produce y cuál es su siguiente paso. Riesgo controlado: la ruta no presenta las decisiones técnicas candidatas como aprobadas.
- `example-template-application-transfer` (`verified-in-series`): cada concepto clave conserva ejemplo diligenciado, plantilla copiable, pregunta de revisión y ubicación en el documento final. Beneficio esperado: pasar de leer definiciones a producir evidencia transferible. Riesgo controlado: el caso demostrativo permanece rotulado como ficticio.
- `traceability-visible-across-artifacts` (`verified-in-series`): los códigos se explican y conservan la relación fuente → historia → requisito → criterio → prueba → componente. Beneficio esperado: poder defender el origen de cada decisión. Riesgo controlado: un vínculo no se presenta como aprobación del interesado.
- `explicit-many-to-many-traceability` (`verified-in-series`): las plantillas nombran la relación (`deriva_de`, `afecta`, `verifica`, `implementa`) y explican que una historia puede producir varios requisitos y que un Requisito No Funcional puede ser transversal. Beneficio esperado: evitar el falso supuesto de una relación uno a uno y facilitar la generación consistente del documento.

## Observación candidata de esta iteración

- `full-term-before-acronym` (`candidate`): una sigla aislada bloquea al aprendiz de primera vez aunque el artefacto esté explicado más adelante. La página ahora presenta nombre completo → sigla → definición → ejemplo, incluye un diccionario inicial y explica cómo leer códigos como `HU-03` o `RF-03`.
- Fuente: retroalimentación explícita del usuario del 2026-08-11 y auditoría de primeras apariciones en `index.html`.
- Beneficio esperado: reducir prerrequisitos ocultos y permitir lectura autónoma.
- Riesgo: repetir demasiado los nombres puede alargar la página; se mitiga conservando siglas solo después de la explicación y usando un diccionario desplegable.
- Decisión: no se promueve al catálogo global todavía; requiere validación con un aprendiz de primera vez o repetición en otra guía.

## Lección reutilizable

La página enseña mejor cuando no salta desde una necesidad a una solución técnica y tampoco supone un vocabulario que el aprendiz aún no ha visto: cada artefacto debe explicar qué significa, qué recibe, qué transforma y qué evidencia entrega.

## Recorrido de primera vez y evidencia

- Revisión estructural desde la perspectiva de un aprendiz nuevo —no sustituye una prueba con una persona—: la primera vista declara fase, entrada, producto y siguiente acción; la sección siguiente explica cuatro palabras base, muestra los ocho artefactos y abre el diccionario de siglas.
- Auditoría automática de primeras apariciones: 39 siglas y formas abreviadas verificadas con la regla `nombre completo antes de forma corta`; ninguna quedó iniciando un concepto sin explicación.
- Recuperación: el diccionario permanece al inicio, los códigos de trazabilidad tienen una guía de lectura y las plantillas usan “identificador” en vez de depender de `ID` sin contexto.
- Transferencia: la lista final sigue el mapa inicial e incluye contexto, lenguaje, historia priorizada, requisitos necesarios, aceptación, trazabilidad, pruebas, ficha de construcción y tarea lista para iniciar. La arquitectura gráfica queda como apoyo opcional, no como requisito del producto.
- Comprensión de relaciones: se añadió una regla en lenguaje cotidiano —“la historia dice qué necesita una persona; el requisito dice qué debe hacer el sistema; el criterio dice cómo comprobarlo”— y un ejemplo de requisito transversal para lectores que comienzan desde cero.
- Verificación técnica del 2026-08-11: contrato educativo estricto aprobado sin errores ni advertencias; calidad web con 0 errores; bloques de código HTML con 0 hallazgos; JavaScript válido; identificadores, anclas, etiquetas y archivos internos sin faltantes; recursos principales respondieron con estado HTTP 200 en servidor local.
- No se promueve el patrón candidato ni se afirma validación de usabilidad hasta observar a un aprendiz de primera vez completar el recorrido.

## Estado

Patrones confirmados dentro de la serie ADSO; las decisiones técnicas siguen siendo candidatas hasta validarse con interesados.

## Aprendizaje de continuidad entre guías

- `handoff-contract-between-guides` (`candidate`): la entrada de una guía debe declarar campos mínimos, estado y destino de cada insumo; nombrar solo la siguiente guía no garantiza transferencia.
- `final-evidence-as-incremental-practice` (`candidate`): la evidencia final debe ser la práctica principal de la guía, con incrementos que reciban el producto anterior y una salida reutilizable; los simuladores son checkpoints, no el producto evaluable completo.
- `minimum-buildable-evidence-over-artifact-count` (`candidate`): el producto debe exigir una cadena pequeña y completa que permita diseñar, desarrollar y probar; cantidades fijas de artefactos se reemplazan por cobertura del comportamiento, excepciones y riesgos del corte.
- `same-case-through-the-route` (`candidate`): el caso interactivo de cierre debe ser el mismo caso guía usado en las secciones de análisis y en la guía anterior. Cambiar a compras u otro dominio rompe la trazabilidad aunque el ejercicio sea técnicamente correcto.
- Beneficio esperado: el aprendiz puede explicar qué recibe, qué transforma y qué entrega cada guía, y conserva una primera vertical del software sin saltar directamente a código.
- Validación pendiente: observar a un aprendiz de primera vez completar la evidencia final y confirmar con instructor que la cadena mínima cabe en 32 horas y entrega suficiente información para comenzar un corte de software.
