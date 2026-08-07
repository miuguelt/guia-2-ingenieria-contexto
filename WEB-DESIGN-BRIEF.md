# Contrato de diseño web — Guía 2

## Propósito

Ayudar al aprendiz ADSO a convertir la evidencia recolectada en una especificación que pueda orientar backlog, desarrollo y pruebas. La página debe mostrar una cadena completa y permitir construir una versión inicial con datos del proyecto propio.

## Usuario y trabajo principal

- Usuario primario: aprendiz SENA de ADSO en fase de análisis.
- Trabajo principal: formular y relacionar RF, RNF, historia de usuario, criterios BDD, prioridad y prueba.
- Resultado observable: paquete de especificación y lienzo de construcción con datos, interfaz, lógica, seguridad y pruebas candidatas para un corte vertical.

## Dirección visual y de interacción

- Conservar la identidad visual, tema, navegación, simuladores y sección de arquitectura existentes.
- Dirección: técnica, clara, trazable y orientada a decisiones verificables.
- Ruta visible: **hallazgo → RF/RNF → historia → BDD → prioridad → prueba → backlog → datos y componentes → corte vertical**.
- Controles nativos, etiquetas persistentes, foco visible, validación accesible y mensajes `aria-live`.
- Mobile-first desde 320 px, crecimiento progresivo con `minmax()` y tipografía fluida con `clamp()`.

## Contenido y datos

- Caso demostrativo ficticio: control de ingreso de equipos al centro de formación.
- Las métricas y decisiones son ejemplos didácticos; deben validarse con interesados y restricciones reales.
- No hay autenticación, servidor ni persistencia remota. La generación ocurre únicamente en el navegador.

## Criterios de éxito

- El aprendiz distingue capacidad funcional, calidad medible, regla de negocio y restricción.
- Cada instrumento presenta un ejemplo diligenciado y una plantilla reutilizable.
- El taller genera una cadena coherente y copiable desde la evidencia hasta una tarea de backlog.
- Una historia priorizada se deriva en conceptos persistentes, relaciones, estados de interfaz, caso de uso, permisos y pruebas.
- La página no presenta una arquitectura o tecnología como solución antes de justificarla con requisitos.
