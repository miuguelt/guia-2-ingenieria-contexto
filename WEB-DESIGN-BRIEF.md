# Contrato de diseño web — Guía 2

## Propósito

Ayudar al aprendiz del programa Análisis y Desarrollo de Software (ADSO), incluso si es su primer contacto con el tema, a convertir la evidencia recolectada en un documento de análisis de requerimientos que pueda orientar diseño, desarrollo y pruebas. La página debe mostrar una cadena completa y permitir construir una versión inicial con datos del proyecto propio.

## Usuario y trabajo principal

- Usuario primario: aprendiz del Servicio Nacional de Aprendizaje (SENA) en fase de análisis, sin conocimiento previo obligatorio de las siglas de ingeniería de requerimientos.
- Trabajo principal: producir, en orden, contexto y alcance; glosario, reglas y permisos; historias de usuario; Requisitos Funcionales (RF); Requisitos No Funcionales (RNF); criterios de aceptación con Desarrollo Guiado por Comportamiento (BDD); casos de uso; trazabilidad; pruebas; y decisiones iniciales de construcción.
- Resultado observable: paquete mínimo de especificación listo para construcción, centrado en un corte vertical trazable y con contexto, comportamiento, pruebas, datos, estados, responsabilidades, dependencias y una tarea que cumple la Definición de Listo para Iniciar.

## Dirección visual y de interacción

- Conservar la identidad visual, tema, navegación, simuladores y sección de arquitectura existentes.
- Dirección: técnica, clara, trazable y orientada a decisiones verificables.
- Ruta visible: **entrada Guía 1 → orientación y diccionario → hallazgo → contexto → historia priorizada → requisitos necesarios → criterios → trazabilidad y pruebas → datos, estados y responsabilidades → tarea lista para iniciar → evidencia final → transferencia a Guía 3**.
- Controles nativos, etiquetas persistentes, foco visible, validación accesible y mensajes `aria-live`.
- Mobile-first desde 320 px, crecimiento progresivo con `minmax()` y tipografía fluida con `clamp()`.

## Contenido y datos

- Caso demostrativo ficticio: control de ingreso de equipos al centro de formación.
- Las métricas y decisiones son ejemplos didácticos; deben validarse con interesados y restricciones reales.
- No hay autenticación, servidor ni persistencia remota. La generación ocurre únicamente en el navegador.
- La evidencia final es la práctica central de la guía: cinco incrementos reciben y transforman el producto anterior; los simuladores solo sirven como checkpoints y sus resultados se integran al documento.
- El diagrama de arquitectura es un apoyo opcional para aclarar responsabilidades o integraciones. No pertenece al producto mínimo y no sustituye la ficha de construcción.
- La cantidad de historias, requisitos y escenarios la determina el comportamiento del corte. La evidencia mínima exige una cadena completa y verificable, no un volumen arbitrario de formatos.

## Criterios de éxito

- El aprendiz distingue hallazgo, contexto, historia de usuario, capacidad funcional, calidad medible, regla de negocio y restricción.
- El aprendiz puede iniciar sin memorizar siglas: encuentra primero el nombre completo, una explicación en lenguaje claro, la sigla entre paréntesis y un ejemplo de código trazable.
- Cada instrumento presenta un ejemplo diligenciado y una plantilla reutilizable.
- El taller genera una cadena progresiva y copiable desde la evidencia hasta una tarea de la lista de trabajo pendiente, sin saltar directamente de un hallazgo a una solución técnica.
- Una historia priorizada se deriva en conceptos persistentes, relaciones, estados de interfaz, caso de uso, permisos y pruebas.
- Las relaciones entre Historia de Usuario, Requisito Funcional, Requisito No Funcional, criterio y prueba son explícitas; se admite que una historia produzca varios requisitos y que un Requisito No Funcional sea transversal.
- La página no presenta una arquitectura o tecnología como solución antes de justificarla con requisitos.
- Diseño, desarrollo y pruebas pueden identificar en el producto qué necesitan para continuar: estados de interfaz, reglas y dependencias, y criterios con datos y resultados esperados.
- El caso del cierre debe ser el mismo caso de control de ingreso usado en la cadena de derivación y debe dejar una línea completa `E-* → CTX-* → HU-* → RF/RNF-* → CA-* → PR-* → BL-*`.
- La salida de Guía 2 debe declarar los insumos mínimos que recibe de Guía 1 y el paquete reutilizable que entrega a Guía 3.
- La documentación explica los nombres de las organizaciones ISO, IEC e IEEE; usa sus referencias para requisitos y calidad; y diferencia BDD como práctica, Gherkin como sintaxis y Cucumber como herramienta.
