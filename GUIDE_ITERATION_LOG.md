# Registro de iteraciones de la guía


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

