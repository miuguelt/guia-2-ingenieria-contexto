(() => {
  "use strict";

  const verificationByQuality = {
    Rendimiento: "Prueba de carga o rendimiento; registrar versión, entorno, volumen y percentiles.",
    Seguridad: "Revisión de controles y pruebas de autenticación, autorización, cifrado y auditoría según el alcance.",
    Disponibilidad: "Monitoreo acordado y prueba controlada de recuperación; registrar ventana y exclusiones.",
    "Usabilidad y accesibilidad": "Prueba de tareas con usuarios representativos y auditoría de accesibilidad con evidencia manual y automática.",
    Compatibilidad: "Matriz de dispositivos, navegadores o integraciones soportadas y ejecución de pruebas por combinación.",
    Mantenibilidad: "Revisión técnica de modularidad, pruebas, registros, documentación y tiempo de diagnóstico acordado."
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    const copied = document.execCommand("copy");
    helper.remove();
    if (!copied) throw new Error("No fue posible copiar el contenido.");
  };

  const announceCopy = (button, message, isError = false) => {
    const status = button.parentElement?.querySelector(".copy-status");
    if (!status) return;
    status.textContent = message;
    status.style.color = isError ? "var(--red)" : "";
    window.setTimeout(() => {
      status.textContent = "";
      status.style.color = "";
    }, 4500);
  };

  document.querySelectorAll(".copy-control [data-copy-target]").forEach((button) => {
    button.addEventListener("click", async () => {
      const target = document.getElementById(button.dataset.copyTarget || "");
      if (!target) return;

      try {
        await copyText(target.textContent.trim());
        announceCopy(button, "Contenido copiado.");
      } catch {
        announceCopy(button, "No se pudo copiar. Selecciona el texto manualmente.", true);
      }
    });
  });

  const form = document.getElementById("requirement-factory-form");
  const result = document.getElementById("factory-result");
  const resultText = document.getElementById("factory-result-text");
  const formStatus = document.getElementById("factory-form-status");

  if (!form || !result || !resultText || !formStatus) return;

  const requiredFields = [...form.querySelectorAll("[required]")];

  requiredFields.forEach((field) => {
    const clearError = () => {
      if (field.value.trim()) field.removeAttribute("aria-invalid");
      formStatus.textContent = "";
    };
    field.addEventListener("input", clearError);
    field.addEventListener("change", clearError);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    requiredFields.forEach((field) => field.removeAttribute("aria-invalid"));
    const emptyFields = requiredFields.filter((field) => !field.value.trim());

    if (emptyFields.length) {
      emptyFields.forEach((field) => field.setAttribute("aria-invalid", "true"));
      formStatus.textContent = "Completa todos los campos para generar el paquete.";
      emptyFields[0].focus();
      result.hidden = true;
      return;
    }

    const data = new FormData(form);
    const quality = data.get("quality");
    const verification = verificationByQuality[quality] || "Definir el método de verificación con el equipo.";
    const project = data.get("project");
    const sourceId = data.get("sourceId");
    const finding = data.get("finding");
    const actor = data.get("actor");
    const action = data.get("action");
    const benefit = data.get("benefit");
    const rule = data.get("rule");
    const condition = data.get("condition");
    const threshold = data.get("threshold");
    const priority = data.get("priority");

    resultText.textContent = `PAQUETE INICIAL DE ESPECIFICACIÓN\n\nPROYECTO\n${project}\n\nEVIDENCIA · ${sourceId}\n${finding}\nEstado: validada con las fuentes definidas por el equipo.\n\nCONTEXTO DE LA NECESIDAD · CTX-PROP-01\nActor/rol: ${actor}\nObjetivo: ${benefit}\nAlcance inicial: ${action}\nRegla, excepción o restricción conocida: ${rule}\nPreguntas abiertas: confirmar datos, permisos, alternativas y fuera de alcance.\n\nHISTORIA DE USUARIO · HU-PROP-01\nComo ${actor},\nquiero ${action}\npara ${benefit}.\nFuente: ${sourceId}\nPrioridad: ${priority}\nEstado: propuesto.\n\nREQUISITO FUNCIONAL · RF-PROP-01\nEl sistema debe permitir a ${actor} ${action} para ${benefit}.\nRegla relacionada: ${rule}\nFuente: HU-PROP-01, CTX-PROP-01 y ${sourceId}\nPrioridad: ${priority}\nEstado: propuesto.\n\nREQUISITO NO FUNCIONAL · RNF-PROP-01\nAtributo: ${quality}\nEn ${condition}, el sistema debe cumplir el siguiente umbral: ${threshold}.\nMétodo de verificación sugerido: ${verification}\nFuente: ${sourceId}\nEstado: propuesto.\n\nCRITERIOS BDD · CA-PROP-01\nEscenario: capacidad disponible bajo la condición acordada\nDado que ${actor} cuenta con autorización y se cumple el contexto “${condition}”\nCuando utiliza la capacidad para ${action}\nEntonces obtiene un resultado que permite ${benefit}\nY se aplica la regla “${rule}”\nY se verifica el umbral “${threshold}”\n\nPRUEBAS PROPUESTAS\nPF-PROP-01: comprobar el flujo exitoso, una entrada inválida, la regla y un permiso insuficiente.\nPNF-PROP-01: ${verification}\n\nENTRADA DE BACKLOG · BL-PROP-01\nTítulo: [HU-PROP-01 / RF-PROP-01] ${action}\nPrioridad: ${priority}\nFuente: ${sourceId}\nDescripción: implementar la historia HU-PROP-01 sin perder los vínculos con RF-PROP-01 y RNF-PROP-01.\nCriterios: CA-PROP-01 y escenarios alternativos por definir.\nPruebas: PF-PROP-01 y PNF-PROP-01.\n\nDEFINITION OF READY\n[ ] Hallazgo, contexto y fuente confirmados\n[ ] Historia valiosa, pequeña y negociable\n[ ] Regla de negocio y excepciones aclaradas\n[ ] RF singular y salida observable\n[ ] Métrica y umbral del RNF validados\n[ ] Datos y permisos definidos\n[ ] Criterios BDD revisados por pares\n[ ] Dependencias y riesgos visibles\n\nDECISIONES PENDIENTES\n- Confirmar identificadores y versión del catálogo.\n- Agregar al menos un escenario alternativo y uno de error.\n- Validar factibilidad, arquitectura y costo sin alterar la necesidad del negocio.\n\nSIGUIENTE INSTRUMENTO\nCompletar el lienzo de construcción para derivar conceptos persistentes, estados de interfaz, caso de uso, permisos, pruebas y un corte vertical. No crear tablas o endpoints hasta validar esas decisiones.`;

    result.hidden = false;
    formStatus.textContent = "";
    result.focus();
  });

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      requiredFields.forEach((field) => field.removeAttribute("aria-invalid"));
      formStatus.textContent = "";
      result.hidden = true;
      resultText.textContent = "";
    });
  });

  const constructionForm = document.getElementById("construction-canvas-form");
  const constructionResult = document.getElementById("construction-result");
  const constructionResultText = document.getElementById("construction-result-text");
  const constructionStatus = document.getElementById("construction-form-status");

  if (!constructionForm || !constructionResult || !constructionResultText || !constructionStatus) return;

  const constructionRequired = [...constructionForm.querySelectorAll("[required]")];

  constructionRequired.forEach((field) => {
    const clearConstructionError = () => {
      if (field.value.trim()) field.removeAttribute("aria-invalid");
      constructionStatus.textContent = "";
    };
    field.addEventListener("input", clearConstructionError);
    field.addEventListener("change", clearConstructionError);
  });

  constructionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    constructionRequired.forEach((field) => field.removeAttribute("aria-invalid"));
    const emptyFields = constructionRequired.filter((field) => !field.value.trim());

    if (emptyFields.length) {
      emptyFields.forEach((field) => field.setAttribute("aria-invalid", "true"));
      constructionStatus.textContent = "Completa los campos obligatorios para generar el mapa.";
      emptyFields[0].focus();
      constructionResult.hidden = true;
      return;
    }

    const data = new FormData(constructionForm);
    const concepts = String(data.get("concepts"))
      .split(",")
      .map((concept) => concept.trim())
      .filter(Boolean);
    const states = String(data.get("states"))
      .split(",")
      .map((state) => state.trim())
      .filter(Boolean);
    const integration = String(data.get("integration") || "").trim();

    if (concepts.length < 2) {
      const conceptsField = document.getElementById("construction-concepts");
      conceptsField?.setAttribute("aria-invalid", "true");
      constructionStatus.textContent = "Incluye al menos dos conceptos del dominio separados por comas.";
      conceptsField?.focus();
      constructionResult.hidden = true;
      return;
    }

    if (states.length < 3) {
      const statesField = document.getElementById("construction-states");
      statesField?.setAttribute("aria-invalid", "true");
      constructionStatus.textContent = "Incluye al menos tres estados de interfaz, por ejemplo: procesando, éxito y error.";
      statesField?.focus();
      constructionResult.hidden = true;
      return;
    }

    const conceptLines = concepts.map((concept) => `- ${concept}: definir identificador, atributos mínimos, ciclo de vida y necesidad de persistencia.`).join("\n");
    const stateLines = states.map((state) => `- ${state}: definir mensaje, acción disponible, foco y respuesta del sistema.`).join("\n");

    constructionResultText.textContent = `MAPA INICIAL DE CONSTRUCCIÓN\n\nPROYECTO\n${data.get("project")}\n\nTRAZABILIDAD\nHistoria: ${data.get("storyId")}\nActor: ${data.get("actor")}\nAcción o caso de uso: ${data.get("action")}\nRegla principal: ${data.get("rule")}\n\n1. LENGUAJE Y DATOS CANDIDATOS\n${conceptLines}\n\nPreguntas antes del modelo lógico:\n- ¿Qué concepto necesita persistir y cuál solo viaja en una solicitud?\n- ¿Cuál es el identificador estable y qué debe ser único?\n- ¿Qué relaciones son 1:1, 1:N o N:M?\n- ¿Qué estado requiere historial y quién puede modificarlo?\n- ¿Qué datos son sensibles y cuánto tiempo deben conservarse?\n\n2. APLICACIÓN Y REGLAS DE DOMINIO\nCaso de uso candidato: ${data.get("action")}\nActor autorizado: ${data.get("permission")}\nRegla que debe protegerse también en backend: ${data.get("rule")}\nResponsabilidades: validar entrada, comprobar permiso, ejecutar la regla, persistir el resultado y registrar evidencia sin secretos.\n\n3. INTERFAZ Y ESTADOS\n${stateLines}\n\nLa interfaz debe impedir doble envío, anunciar cambios relevantes y ofrecer recuperación o alternativa cuando la tarea no pueda completarse.\n\n4. SEGURIDAD Y CALIDAD\nPermiso mínimo: ${data.get("permission")}\nMedida vinculada: ${data.get("quality")}\nPruebas sugeridas: acceso permitido, permiso insuficiente, entrada inválida, regla incumplida y medición del RNF en el entorno acordado.\n\n5. INTEGRACIÓN\n${integration ? `Integración candidata: ${integration}. Definir contrato, fallos, tiempo de espera y datos intercambiados.` : "No se declaró integración externa. No agregues una hasta que un requisito la justifique."}\n\n6. CORTE VERTICAL INICIAL\nConstruir una versión mínima de “${data.get("action")}” que incluya una interfaz utilizable, el caso de uso, la regla principal, persistencia necesaria y pruebas de extremo a extremo.\n\nMantener fuera del corte: reportes, administración, analítica y mejoras que pertenezcan a otras historias.\n\nDEFINITION OF READY PARA CONSTRUIR\n[ ] RF, RNF, historia y BDD relacionados\n[ ] Conceptos y relaciones revisados con lenguaje del negocio\n[ ] Regla y permiso confirmados\n[ ] Estados de interfaz y errores definidos\n[ ] Privacidad, historial y conservación acordados\n[ ] Pruebas funcionales y de calidad identificadas\n[ ] Dependencias e integración con contrato visible\n[ ] Corte vertical pequeño y estimable\n\nESTADO\nDiseño candidato. Validar con interesado, instructor y equipo antes de crear tablas, endpoints o pantallas definitivas.`;

    constructionResult.hidden = false;
    constructionStatus.textContent = "";
    constructionResult.focus();
  });

  constructionForm.addEventListener("reset", () => {
    window.setTimeout(() => {
      constructionRequired.forEach((field) => field.removeAttribute("aria-invalid"));
      constructionStatus.textContent = "";
      constructionResult.hidden = true;
      constructionResultText.textContent = "";
    });
  });
})();
