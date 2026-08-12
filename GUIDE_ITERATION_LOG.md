# Registro de iteraciones de la guía

## 2026-08-11 - trazabilidad explícita y lenguaje para principiantes

- Mejora aplicada: se aclaró que una Historia de Usuario expresa necesidad y valor, el Requisito Funcional expresa una capacidad del sistema y el criterio de aceptación explica cómo comprobarla.
- Trazabilidad: se dejaron explícitas las relaciones `deriva_de`, `afecta`, `verifica` e `implementa`; se eliminó la idea de que compartir un número demuestra una relación.
- Modelo de relación: una historia puede producir varios requisitos y un Requisito No Funcional puede afectar varias historias o ser transversal, conservando siempre su fuente, alcance y justificación.
- Comprensión inicial: se añadieron explicaciones en lenguaje cotidiano, un ejemplo de requisito transversal y campos de relación en las plantillas de historia, RF, RNF, BDD, trazabilidad y construcción.
- Revisión humana: el recorrido puede seguirse sin conocer previamente las siglas; cada relación técnica tiene una explicación breve antes de usarse en las plantillas.


## 2026-08-07 09:53 -05:00 - validated

- Iteración: adso-requisitos-guia-02-web-2026-20260807095302393
- Estándar: 2.0.0
- Resumen: Instrumentos web para RF, RNF, historias, BDD y trazabilidad, con cadena resuelta y fábrica de paquete desde evidencia hasta backlog.
- Evidencia: Test-DevBrainEducationalGuide -Strict: passed; Test-WebQuality: 0 errores; Validate-HtmlCodeBlocks: 0 issues; JavaScript --check: passed; HTTP local: index y workshop.js 200
- Retroalimentación: Separar capacidad funcional de atributo de calidad medible; Mantener fuente, prueba y prioridad visibles hasta el backlog
- Reglas candidatas: Toda especificación práctica debe mostrar trazabilidad desde evidencia hasta prueba y backlog

## 2026-08-10 - ampliación BDD y artefactos de análisis

- Resumen: Se explica el origen de BDD, la relación entre BDD, Gherkin y Cucumber, y el significado de Given / When / Then.
- Instrumentos añadidos: ruta de artefactos ADSO, misiones de práctica y simulador de ficha de caso de uso con salida copiable.
- Verificación: JavaScript `node --check` pasado; `guide.manifest.json` válido; `git diff --check` pasado; referencias de HTML/JS/CSS verificadas.
- Nota: La prueba interactiva en navegador local fue bloqueada por la política de URL del navegador; no se modificó la política ni se intentó rodearla.

## 2026-08-10 - reorganización progresiva de la especificación

- Secuencia pedagógica ajustada: evidencia → contexto → historia de usuario → RF → RNF → BDD → trazabilidad → backlog y construcción.
- Se reordenaron los instrumentos y ejercicios para construir cada artefacto a partir del anterior usando el caso “Control de ingreso de equipos”.
- El generador de paquetes ahora incluye contexto y regla conocida, y entrega la historia antes de RF/RNF.
- Bases de referencia visibles: ISO/IEC/IEEE 29148:2018 para ingeniería de requisitos, ISO/IEC 25010:2023 para calidad y Gherkin/BDD como práctica complementaria.
- Se aclaró que SOW, INVEST y MoSCoW son artefactos o heurísticas de trabajo y no sustituyen la especificación ni la validación con interesados.

## 2026-08-10 - cadena explícita de roles a modelo relacional

- Resumen: Se añadió una ruta didáctica de seis saltos: información recolectada → roles y permisos → historias de usuario → RF/RNF → implementación por historia → modelo relacional.
- Caso guía: “Control de ingreso de equipos”, con evidencia, roles Guarda/Administrador/Visitante, HU-03, RF-03, RNF-03 y relaciones candidatas para Visitante, Ingreso, Equipo, Usuario, Rol y Auditoría.
- Regla pedagógica: cada rol, requisito, componente o tabla debe poder señalar la evidencia o criterio que lo justifica; lo no validado se conserva como pregunta abierta.
- Actividad añadida: ejercicio de trazabilidad con respuesta razonada y pregunta abierta para evitar que el aprendiz salte de la necesidad directamente al diseño de tablas.

## 2026-08-10 - correcciones de cobertura del producto entregable (C1–C6)

- Análisis del Producto Entregable vs. cobertura de la guía web: 6 brechas identificadas (2 altas, 3 medias, 1 baja).
- C1 Instrumento I-00: Glosario del dominio y reglas de negocio — tabla ejemplo + plantillas GLOS y RN copiables.
- C2 Ejercicio de catálogo RF/RNF consolidado en I-02: tabla de 4 requisitos derivados de 2 historias + plantilla markdown.
- C3 Instrumento I-06: Plan de pruebas por historia — 4 tipos (aceptación, unidad, integración, carga) con ejemplo HU-03 resuelto + plantilla.
- C4 Instrumento I-07: Backlog de cortes verticales — tabla priorizada con DoR, tamaño, sprint y RF vinculados + plantilla + checklista DoR.
- C5 Instrumento I-08: Mini-guía de producción del diagrama de arquitectura en draw.io — 6 pasos + plantilla de etiqueta por bloque.
- C6 Portada institucional SENA: expandida con plantilla completa de campos (regional, ficha, programa, proyecto, aprendices, instructor, fecha).
- Verificación: `node --check` en app.js, simulator.js y workshop.js — todos pasados; index.html: 1668 líneas.


## 2026-08-11 16:32 -05:00 - validated

- Iteración: adso-requisitos-guia-02-web-2026-20260811163200355
- Estándar: 2.0.0
- Resumen: Reestructuración integral para aprendices de primera vez: orientación, mapa de artefactos, diccionario de siglas, nombres completos antes de abreviaturas y producto final ordenado para la fase de análisis de requerimientos.
- Evidencia: Test-DevBrainEducationalGuide -Strict: passed sin errores ni advertencias; Test-WebQuality: 0 errores; Validate-HtmlCodeBlocks: 0 hallazgos; node --check app.js, simulator.js y workshop.js: passed; Auditoría de 39 primeras apariciones: nombre completo antes de sigla; HTML: 153 identificadores únicos, sin anclas, archivos ni etiquetas faltantes; HTTP local: index, CSS y JavaScript 200
- Retroalimentación: Las siglas aisladas creaban prerrequisitos ocultos para el aprendiz nuevo; El producto final debe crecer en el mismo orden que la ruta de aprendizaje
- Reglas candidatas: Presentar nombre completo, sigla, definición y ejemplo antes de reutilizar una abreviatura técnica en una guía para principiantes

## 2026-08-11 - auditoría de continuidad y evidencia final

- Auditoría: se contrastó la entrada declarada por la Guía 1, el caso guía de la Guía 2, los simuladores, la entrega PDF y la transferencia prevista a la Guía 3.
- Brecha corregida: el reto final usaba un caso de compras desconectado del caso “Control de ingreso de equipos”. El laboratorio y el checkpoint final ahora usan el hallazgo de observación, el rol guarda, la consulta por QR y el resultado de auditoría del mismo caso.
- Mejora aplicada: se formalizó el contrato Guía 1 → Guía 2 con campos mínimos, estados y transformaciones; se conserva la regla de que un candidato no es un requisito aprobado.
- Evidencia final: se reorganizó como práctica integradora de cinco incrementos: retomar evidencia, organizar dominio, especificar comportamiento, comprobar coherencia y preparar construcción/transferencia.
- Resultado esperado: una cadena completa `E-* → CTX-* → HU-* → RF/RNF-* → CA-* → PR-* → BL-*`, con un primer corte vertical documentado y un paquete reutilizable por la Guía 3.
- Decisión pedagógica: el checkpoint interactivo valida solo el incremento 03; la evaluación de la evidencia final corresponde al documento consolidado y a la revisión del instructor, pares o interesado.

## 2026-08-11 - producto mínimo listo para construcción

- Problema corregido: el diagrama de arquitectura aparecía como requisito del PDF aunque no siempre aporta información adicional para iniciar el corte; además, las cantidades fijas de historias y requisitos privilegiaban volumen sobre coherencia.
- Apoyo A-01: la guía del diagrama ahora parte de una historia priorizada, reglas, datos, criterios y dependencias; modela responsabilidades y flujo, distingue decisiones validadas de candidatas e incluye ejemplo y control de calidad. Se declara opcional.
- Producto reformulado: paquete mínimo de especificación centrado en un corte vertical con contexto, lenguaje, comportamiento, trazabilidad, pruebas, ficha de construcción, tarea con Definición de Listo para Iniciar y registro de validación.
- Regla de suficiencia: una cadena `E → HU → RF/RNF → CA → PR → BL` completa y verificable reemplaza los mínimos arbitrarios de tres historias, tres RF y dos RNF. Se documentan tantos elementos como el comportamiento y sus riesgos necesiten.
- Prueba de utilidad: el cierre explicita qué información reutilizan diseño, desarrollo y pruebas, enlaza cada parte del producto con la sección e instrumento que permite producirla e incluye una estructura completa y copiable del PDF.
- Verificación: contrato educativo estricto aprobado sin errores ni advertencias; calidad web con 0 errores; bloques de código HTML con 0 hallazgos; JSON y JavaScript válidos; 166 identificadores únicos y 13 anclas internas resueltas; HTML, CSS y JavaScript respondieron HTTP 200.

## 2026-08-12 - ruta esencial y responsabilidad humano–IA

- Orientación: Se separó la ruta esencial obligatoria de la profundización profesional para que un aprendiz de primera vez pueda completar un corte vertical sin perderse en artefactos opcionales.
- Trazabilidad de serie: Se hizo visible la cadena `E → H → CTX → HU → RF/RNF → CA → PR → UI → VAL → BL`, que G2 inicia y las guías siguientes extienden.
- Evidencia: El PDF incorpora una bitácora humano–IA con declaración de uso o no uso, protección de datos, verificación, riesgos, decisión humana y responsable.
- Regla profesional: Una salida de IA puede iniciar una pregunta o variante, pero nunca adquiere estado de requisito aprobado sin contrastarse con evidencia y personas autorizadas.
