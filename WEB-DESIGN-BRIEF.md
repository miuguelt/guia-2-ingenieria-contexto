# Contrato de diseño web — Guía 2

## Propósito

Ayudar al aprendiz ADSO a convertir la evidencia recolectada en una especificación que pueda orientar backlog, desarrollo y pruebas. La página debe mostrar una cadena completa y permitir construir una versión inicial con datos del proyecto propio.

## Usuario y trabajo principal

- Usuario primario: aprendiz SENA de ADSO en fase de análisis.
- Trabajo principal: convertir hallazgos en contexto, historias de usuario, RF, RNF, criterios BDD, prioridad, pruebas y decisiones de construcción relacionadas.
- Resultado observable: paquete de especificación y lienzo de construcción con datos, interfaz, lógica, seguridad y pruebas candidatas para un corte vertical.

## Dirección visual y de interacción

- Conservar la identidad visual, tema, navegación, simuladores y sección de arquitectura existentes.
- Dirección: técnica, clara, trazable y orientada a decisiones verificables.
- Ruta visible: **hallazgo → contexto → historia → RF → RNF → BDD → trazabilidad → prioridad/prueba → backlog → datos y componentes → corte vertical**.
- Controles nativos, etiquetas persistentes, foco visible, validación accesible y mensajes `aria-live`.
- Mobile-first desde 320 px, crecimiento progresivo con `minmax()` y tipografía fluida con `clamp()`.

## Contenido y datos

- Caso demostrativo ficticio: control de ingreso de equipos al centro de formación.
- Las métricas y decisiones son ejemplos didácticos; deben validarse con interesados y restricciones reales.
- No hay autenticación, servidor ni persistencia remota. La generación ocurre únicamente en el navegador.

## Criterios de éxito

- El aprendiz distingue hallazgo, contexto, historia de usuario, capacidad funcional, calidad medible, regla de negocio y restricción.
- Cada instrumento presenta un ejemplo diligenciado y una plantilla reutilizable.
- El taller genera una cadena progresiva y copiable desde la evidencia hasta una tarea de backlog, sin saltar directamente de un hallazgo a una solución técnica.
- Una historia priorizada se deriva en conceptos persistentes, relaciones, estados de interfaz, caso de uso, permisos y pruebas.
- La página no presenta una arquitectura o tecnología como solución antes de justificarla con requisitos.
- La documentación declara sus bases de referencia: ISO/IEC/IEEE 29148:2018 para ingeniería de requisitos, ISO/IEC 25010:2023 para calidad y Gherkin/BDD como práctica complementaria.
