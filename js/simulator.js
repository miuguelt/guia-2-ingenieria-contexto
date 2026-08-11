/**
 * simulator.js
 * -------------
 * Núcleo pedagógico de la guía. Aquí se practica una idea importante:
 * una especificación no es solamente texto, también tiene una estructura que
 * se puede revisar de forma automática.
 *
 * No usamos innerHTML con datos escritos por el aprendiz. Los valores se
 * imprimen con textContent para mantener la salida segura y enseñar una buena
 * práctica de manipulación del DOM.
 */

(() => {
  "use strict";

  const storyRole = document.querySelector("#story-role");
  const storyAction = document.querySelector("#story-action");
  const storyBenefit = document.querySelector("#story-benefit");
  const storyPreview = document.querySelector("#story-preview");
  const storyFeedback = document.querySelector("#story-feedback");
  const bddDropzone = document.querySelector("#bdd-dropzone");
  const dropPlaceholder = document.querySelector("#drop-placeholder");
  const bddFeedback = document.querySelector("#bdd-feedback");
  const challengeFeedback = document.querySelector("#challenge-feedback");
  const approvalPanel = document.querySelector("#approval-panel");
  const evaluateChallengeButton = document.querySelector("#evaluate-challenge");
  const rawRequirement = document.querySelector("#raw-requirement");
  const analyzeRequirementButton = document.querySelector("#analyze-requirement");
  const analysisOutput = document.querySelector("#analysis-output");
  const useCaseForm = document.querySelector("#use-case-form");
  const useCaseResult = document.querySelector("#use-case-result");
  const useCaseResultText = document.querySelector("#use-case-result-text");
  const useCaseFormStatus = document.querySelector("#use-case-form-status");
  const loadStoryExampleButton = document.querySelector("#load-story-example");
  const loadUseCaseExampleButton = document.querySelector("#load-use-case-example");
  const clearAnalysisButton = document.querySelector("#clear-analysis");

  if (!storyRole || !storyAction || !storyBenefit || !bddDropzone) return;

  const storyFields = [storyRole, storyAction, storyBenefit];
  const bddBlocks = [];
  let draggedData = null;

  const kindLabels = {
    given: "Dado que",
    when: "Cuando",
    then: "Entonces",
  };

  /** Devuelve el texto visible de un bloque de la biblioteca. */
  function visibleBlockText(block) {
    if (block.dataset.blockText) return block.dataset.blockText;
    return [...block.querySelectorAll("span:not(.drag-handle)")]
      .map((span) => span.textContent.trim())
      .join(" ")
      .replace(/\s+/g, " ");
  }

  /** Normaliza strings para comparar sin que los espacios causen falsos errores. */
  function normalize(value) {
    return value.toLocaleLowerCase("es").replace(/\s+/g, " ").trim();
  }

  function setFeedback(element, type, message) {
    if (!element) return;

    element.className = `feedback feedback-${type}`;
    const icon = document.createElement("span");
    icon.className = "feedback-icon";
    icon.textContent = type === "success" ? "✓" : type === "error" ? "!" : "i";

    const text = document.createElement("span");
    text.textContent = message;
    element.replaceChildren(icon, text);
  }

  function setSelectedState(select) {
    select.classList.toggle("is-selected", Boolean(select.value));
  }

  function selectedLabel(select) {
    return select.selectedOptions?.[0]?.textContent?.trim() || select.value;
  }

  /**
   * Construye la vista previa de la Historia de Usuario usando nodos DOM.
   * Esto hace evidente qué fragmento pertenece a cada parte de la plantilla.
   */
  function updateStoryPreview() {
    storyFields.forEach(setSelectedState);
    storyPreview.replaceChildren();

    if (!storyRole.value && !storyAction.value && !storyBenefit.value) {
      const placeholder = document.createElement("span");
      placeholder.className = "placeholder";
      placeholder.textContent = "Como [rol], quiero [acción] para [beneficio].";
      storyPreview.append(placeholder);
      setFeedback(storyFeedback, "neutral", "Completa las tres piezas para validar la historia.");
      return;
    }

    const pieces = [
      ["Como ", storyRole],
      [", quiero ", storyAction],
      [" para ", storyBenefit],
    ];

    pieces.forEach(([connector, field]) => {
      const connectorNode = document.createElement("span");
      connectorNode.className = "story-label";
      connectorNode.textContent = connector;
      storyPreview.append(connectorNode);

      const valueNode = document.createElement("span");
      valueNode.className = field.value ? "story-value" : "placeholder";
      valueNode.textContent = field.value ? selectedLabel(field) : `[${field.id.replace("story-", "")}]`;
      storyPreview.append(valueNode);
    });

    storyPreview.append(document.createTextNode("."));
    validateStory();
  }

  /**
   * La Historia de Usuario es válida solamente si sus tres campos tienen un
   * valor que exista realmente en los <option> del formulario.
   */
  function validateStory() {
    const complete = storyFields.every((field) => Boolean(field.value));
    const valuesBelongToOptions = storyFields.every((field) =>
      [...field.options].some((option) => option.value === field.value),
    );

    if (!complete) {
      setFeedback(storyFeedback, "error", "La estructura está incompleta: faltan rol, acción o beneficio.");
      return { valid: false, complete: false };
    }

    if (!valuesBelongToOptions) {
      setFeedback(storyFeedback, "error", "Hay una pieza que no pertenece al vocabulario disponible.");
      return { valid: false, complete: true };
    }

    setFeedback(storyFeedback, "success", "Historia válida: identifica quién, qué necesita y para qué.");
    return { valid: true, complete: true };
  }

  storyFields.forEach((field) => field.addEventListener("change", updateStoryPreview));

  const libraryBlocks = [...document.querySelectorAll("[data-bdd-block]")];

  function inferBlockKind(block) {
    if (block.dataset.blockKind) return block.dataset.blockKind;
    if (block.classList.contains("given-block")) return "given";
    if (block.classList.contains("when-block")) return "when";
    return "then";
  }

  function getBlockData(block) {
    return {
      id: block.dataset.blockId || `block-${Date.now()}`,
      kind: inferBlockKind(block),
      text: visibleBlockText(block),
    };
  }

  /** Añade un bloque al estado y vuelve a dibujar el escenario. */
  function addBlock(block) {
    const blockData = getBlockData(block);

    if (bddBlocks.length >= 3) {
      setFeedback(bddFeedback, "error", "Un escenario básico debe tener exactamente tres bloques.");
      return;
    }

    bddBlocks.push(blockData);
    renderBDD();
  }

  function removeBlock(index) {
    bddBlocks.splice(index, 1);
    renderBDD();
  }

  /**
   * Dibuja tokens del escenario. Cada token se puede quitar con × o arrastrar
   * para practicar que el orden de los pasos también comunica lógica.
   */
  function renderBDD() {
    bddDropzone.replaceChildren();

    if (bddBlocks.length === 0) {
      bddDropzone.append(dropPlaceholder);
      setFeedback(bddFeedback, "neutral", "Aún no hay bloques en tu escenario.");
      return;
    }

    bddBlocks.forEach((block, index) => {
      const token = document.createElement("div");
      token.className = "scenario-token";
      token.draggable = true;
      token.dataset.kind = block.kind;
      token.dataset.index = String(index);
      token.title = "Usa ↑ y ↓, arrastra para cambiar el orden o pulsa × para quitar";

      const order = document.createElement("span");
      order.className = "token-order";
      order.textContent = String(index + 1).padStart(2, "0");

      const kind = document.createElement("span");
      kind.className = "token-kind";
      kind.textContent = kindLabels[block.kind] || "Paso";

      const text = document.createElement("span");
      text.textContent = block.text.replace(/^Dado que |^Cuando |^Entonces /i, "");

      const moveControls = document.createElement("span");
      moveControls.className = "scenario-move-controls";

      const moveUp = document.createElement("button");
      moveUp.type = "button";
      moveUp.className = "move-token";
      moveUp.textContent = "↑";
      moveUp.setAttribute("aria-label", `Mover bloque ${index + 1} arriba`);
      moveUp.disabled = index === 0;
      moveUp.addEventListener("click", () => moveBlock(index, -1));

      const moveDown = document.createElement("button");
      moveDown.type = "button";
      moveDown.className = "move-token";
      moveDown.textContent = "↓";
      moveDown.setAttribute("aria-label", `Mover bloque ${index + 1} abajo`);
      moveDown.disabled = index === bddBlocks.length - 1;
      moveDown.addEventListener("click", () => moveBlock(index, 1));

      moveControls.append(moveUp, moveDown);

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "remove-token";
      removeButton.setAttribute("aria-label", `Quitar bloque ${index + 1}`);
      removeButton.textContent = "×";
      removeButton.addEventListener("click", () => removeBlock(index));

      token.append(order, kind, text, moveControls, removeButton);
      token.addEventListener("dragstart", (event) => {
        draggedData = { source: "scenario", index };
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", "scenario-token");
      });
      token.addEventListener("dragend", () => { draggedData = null; });
      bddDropzone.append(token);
    });

    validateBDD();
  }

  function reorderBlock(fromIndex, toIndex) {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
    const [movedBlock] = bddBlocks.splice(fromIndex, 1);
    bddBlocks.splice(toIndex, 0, movedBlock);
    renderBDD();
  }

  function moveBlock(index, delta) {
    const targetIndex = index + delta;
    if (targetIndex < 0 || targetIndex >= bddBlocks.length) return;
    reorderBlock(index, targetIndex);
  }

  /**
   * Valida la gramática mínima de un escenario Gherkin en español:
   * exactamente un Given, un When y un Then, en ese orden, con descripción.
   */
  function validateBDD() {
    if (bddBlocks.length === 0) {
      setFeedback(bddFeedback, "neutral", "Aún no hay bloques en tu escenario.");
      return { valid: false, reason: "empty" };
    }

    if (bddBlocks.length !== 3) {
      setFeedback(bddFeedback, "error", `El escenario necesita 3 pasos y ahora tiene ${bddBlocks.length}.`);
      return { valid: false, reason: "length" };
    }

    const expectedKinds = ["given", "when", "then"];
    const actualKinds = bddBlocks.map((block) => block.kind);
    const ordered = actualKinds.every((kind, index) => kind === expectedKinds[index]);

    if (!ordered) {
      setFeedback(bddFeedback, "error", "Orden incorrecto: empieza con Dado que, sigue con Cuando y termina con Entonces.");
      return { valid: false, reason: "order" };
    }

    const validPrefixes = {
      given: /^Dado que\s+.+/i,
      when: /^Cuando\s+.+/i,
      then: /^Entonces\s+.+/i,
    };
    const hasValidText = bddBlocks.every((block) => validPrefixes[block.kind].test(block.text.trim()));

    if (!hasValidText) {
      setFeedback(bddFeedback, "error", "Cada paso debe conservar su palabra clave y una descripción concreta.");
      return { valid: false, reason: "syntax" };
    }

    setFeedback(bddFeedback, "success", "Escenario válido: condición inicial → acción → resultado observable.");
    return { valid: true, reason: "valid" };
  }

  libraryBlocks.forEach((block) => {
    block.addEventListener("click", () => addBlock(block));
    block.addEventListener("dragstart", (event) => {
      draggedData = { source: "library", block };
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setData("text/plain", block.dataset.blockId || "bdd-block");
    });
    block.addEventListener("dragend", () => { draggedData = null; });
  });

  bddDropzone.addEventListener("dragover", (event) => {
    event.preventDefault();
    bddDropzone.classList.add("is-over");
    event.dataTransfer.dropEffect = draggedData?.source === "scenario" ? "move" : "copy";
  });

  bddDropzone.addEventListener("dragleave", (event) => {
    if (!bddDropzone.contains(event.relatedTarget)) bddDropzone.classList.remove("is-over");
  });

  bddDropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    bddDropzone.classList.remove("is-over");
    if (!draggedData) return;

    if (draggedData.source === "library") {
      addBlock(draggedData.block);
      draggedData = null;
      return;
    }

    const targetToken = event.target.closest(".scenario-token");
    const targetIndex = targetToken ? Number(targetToken.dataset.index) : bddBlocks.length - 1;
    const targetRect = targetToken?.getBoundingClientRect();
    const placeAfter = targetRect && event.clientY > targetRect.top + targetRect.height / 2;
    const adjustedTarget = placeAfter ? targetIndex + 1 : targetIndex;
    const fromIndex = draggedData.index;
    const toIndex = adjustedTarget > fromIndex ? adjustedTarget - 1 : adjustedTarget;
    reorderBlock(fromIndex, toIndex);
    draggedData = null;
  });

  document.querySelector("#clear-bdd")?.addEventListener("click", () => {
    bddBlocks.length = 0;
    renderBDD();
  });

  document.querySelector("#validate-bdd")?.addEventListener("click", () => {
    const result = validateBDD();
    if (!result.valid) bddDropzone.focus();
  });

  /**
   * Genera una ficha de caso de uso a partir de decisiones conversadas.
   * La salida es deliberadamente texto plano: puede copiarse al documento de
   * análisis y deja claro qué partes todavía deben validarse con el cliente.
   */
  function buildUseCaseArtifact(event) {
    event.preventDefault();
    if (!useCaseForm || !useCaseResult || !useCaseResultText) return;

    const data = new FormData(useCaseForm);
    const fields = [
      "useCaseId",
      "useCaseName",
      "useCaseActor",
      "useCaseLinks",
      "useCaseGoal",
      "useCasePreconditions",
      "useCaseMainFlow",
      "useCaseAlternative",
      "useCasePostcondition",
    ];
    const emptyFields = fields.filter((field) => !String(data.get(field) || "").trim());
    const mainFlow = String(data.get("useCaseMainFlow") || "").trim();
    if (emptyFields.length > 0) {
      if (useCaseFormStatus) useCaseFormStatus.textContent = "Completa todos los campos para construir una ficha revisable.";
      const firstEmpty = useCaseForm.querySelector(`[name="${emptyFields[0]}"]`);
      firstEmpty?.focus();
      return;
    }

    if (mainFlow.split(/\n+/).filter(Boolean).length < 2) {
      if (useCaseFormStatus) useCaseFormStatus.textContent = "El flujo principal debe tener al menos dos pasos observables.";
      useCaseForm.querySelector('[name="useCaseMainFlow"]')?.focus();
      return;
    }

    const artifact = `FICHA DE CASO DE USO\n\nIDENTIFICADOR: ${data.get("useCaseId")}\nNOMBRE: ${data.get("useCaseName")}\nACTOR PRINCIPAL: ${data.get("useCaseActor")}\nHISTORIA DE USUARIO / REQUISITO FUNCIONAL RELACIONADOS: ${data.get("useCaseLinks")}\n\nOBJETIVO OBSERVABLE\n${data.get("useCaseGoal")}\n\nPRECONDICIONES\n${data.get("useCasePreconditions")}\n\nFLUJO PRINCIPAL\n${mainFlow}\n\nALTERNATIVA O ERROR\n${data.get("useCaseAlternative")}\n\nPOSTCONDICIÓN Y EVIDENCIA\n${data.get("useCasePostcondition")}\n\nREVISIÓN ANTES DE CONSTRUIR\n[ ] Cada paso expresa comportamiento y no una tecnología específica\n[ ] Los criterios de aceptación BDD cubren éxito, alternativa, error y permiso\n[ ] Los datos, estados y reglas tienen fuente o pregunta abierta\n[ ] El actor confirma el resultado observable\n[ ] La ficha se relaciona con Requisitos Funcionales, Requisitos No Funcionales, Historia de Usuario, pruebas y lista de trabajo pendiente`;

    useCaseResultText.textContent = artifact;
    useCaseResult.hidden = false;
    if (useCaseFormStatus) useCaseFormStatus.textContent = "Ficha generada: revísala con el interesado antes de pasar a diseño.";
    useCaseResult.focus();
  }

  useCaseForm?.addEventListener("submit", buildUseCaseArtifact);
  useCaseForm?.addEventListener("reset", () => {
    window.setTimeout(() => {
      if (useCaseResult) useCaseResult.hidden = true;
      if (useCaseFormStatus) useCaseFormStatus.textContent = "";
    }, 0);
  });

  loadStoryExampleButton?.addEventListener("click", () => {
    storyRole.value = "guarda";
    storyAction.value = "consultar-ingreso-qr";
    storyBenefit.value = "reducir-espera";
    updateStoryPreview();
    storyPreview?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  loadUseCaseExampleButton?.addEventListener("click", () => {
    if (!useCaseForm) return;
    const example = {
      useCaseId: "CU-03",
      useCaseName: "Consultar ingreso por QR",
      useCaseActor: "Guarda",
      useCaseLinks: "HU-03 · RF-03 · CA-03",
      useCaseGoal: "Permitir que el guarda decida si autoriza el ingreso con información vigente y autorizada.",
      useCasePreconditions: "Sesión activa; permiso de consulta; QR disponible; registro de ingreso creado.",
      useCaseMainFlow: "1. El guarda lee el código QR del visitante.\n2. El sistema verifica la vigencia y el permiso.\n3. El sistema muestra los datos autorizados y los equipos registrados.\n4. El guarda confirma o detiene el ingreso.\n5. El sistema registra la decisión.",
      useCaseAlternative: "Si el QR está vencido, no existe o el guarda no tiene permiso, el sistema no muestra datos sensibles, informa la causa y ofrece el flujo manual autorizado.",
      useCasePostcondition: "La decisión queda registrada con fecha, actor y resultado. Evidencia: respuesta visible y evento de auditoría."
    };

    Object.entries(example).forEach(([name, value]) => {
      const field = useCaseForm.elements.namedItem(name);
      if (field) field.value = value;
    });
    if (useCaseFormStatus) useCaseFormStatus.textContent = "Ejemplo cargado: revisa qué partes pertenecen a la evidencia y cuáles debes validar en tu proyecto.";
    useCaseForm.querySelector('[name="useCaseGoal"]')?.focus();
  });

  /**
   * Simulador de análisis rápido. No pretende reemplazar una entrevista de
   * requisitos: enseña a detectar señales que justifican hacer más preguntas.
   */
  function createAnalysisCheck(check) {
    const item = document.createElement("div");
    item.className = `analysis-check${check.good ? " is-good" : ""}`;

    const mark = document.createElement("b");
    mark.textContent = check.good ? "✓" : "!";

    const copy = document.createElement("span");
    const label = document.createElement("strong");
    label.textContent = `${check.label}: `;
    copy.append(label, document.createTextNode(check.detail));
    item.append(mark, copy);
    return item;
  }

  function renderAnalysis(text, checks, tip) {
    analysisOutput.replaceChildren();
    const goodCount = checks.filter((check) => check.good).length;
    const summary = document.createElement("div");
    summary.className = "analysis-summary";

    const summaryCopy = document.createElement("div");
    const title = document.createElement("h4");
    title.textContent = goodCount === checks.length ? "Buen nivel de especificidad" : "Todavía falta contexto";
    const description = document.createElement("p");
    description.textContent = `Se detectaron ${goodCount} de ${checks.length} señales útiles.`;
    summaryCopy.append(title, description);

    const score = document.createElement("span");
    score.className = `analysis-score${goodCount === checks.length ? " is-good" : ""}`;
    score.textContent = `${goodCount}/${checks.length}`;
    summary.append(summaryCopy, score);

    const checkList = document.createElement("div");
    checkList.className = "analysis-checks";
    checks.forEach((check) => checkList.append(createAnalysisCheck(check)));

    const tipNode = document.createElement("p");
    tipNode.className = "analysis-tip";
    tipNode.textContent = tip;

    const questions = document.createElement("div");
    questions.className = "analysis-questions";
    const questionsTitle = document.createElement("strong");
    questionsTitle.textContent = "Preguntas para validar con el interesado";
    questions.append(questionsTitle);
    const questionsList = document.createElement("ul");
    const pendingQuestions = checks.filter((check) => !check.good).map((check) => check.question);
    const questionsToShow = pendingQuestions.length > 0 ? pendingQuestions : [
      "¿Qué excepción o límite todavía no aparece en esta frase?",
      "¿Qué evidencia usaría el actor para confirmar que el resultado es correcto?",
    ];
    questionsToShow.forEach((question) => {
      const item = document.createElement("li");
      item.textContent = question;
      questionsList.append(item);
    });
    questions.append(questionsList);

    analysisOutput.append(summary, checkList, questions, tipNode);
    analysisOutput.dataset.analyzedText = text;
  }

  function showAnalysisEmpty(message = "El análisis aparecerá aquí.") {
    analysisOutput.replaceChildren();
    const empty = document.createElement("div");
    empty.className = "analysis-empty";
    const icon = document.createElement("span");
    icon.className = "scan-icon";
    icon.textContent = "⌁";
    const copy = document.createElement("p");
    copy.textContent = message;
    empty.append(icon, copy);
    analysisOutput.append(empty);
    analysisOutput.dataset.analyzedText = "";
  }

  function analyzeRequirement() {
    const text = rawRequirement?.value.trim() || "";
    if (!text) {
      showAnalysisEmpty("Escribe una frase antes de analizar.");
      rawRequirement?.focus();
      return;
    }

    const normalized = normalize(text);
    const hasActor = /\b(como|cliente|usuario|aprendiz|administrador|rol)\b/i.test(normalized);
    const ambiguousVerb = /\b(gestionar|manejar|optimizar|mejorar|automatizar|administrar)\b/i.test(normalized);
    const specificAction = /\b(comprar|consultar|iniciar|recuperar|generar|crear|actualizar|mostrar|registrar|enviar|confirmar|seleccionar|descargar)\b/i.test(normalized);
    const hasBenefit = /\b(para|con el fin|permitir|porque|beneficio)\b/i.test(normalized);
    const hasObservableRule = /\b(dado que|cuando|entonces|debe|podrá|menos de|máximo|mínimo)\b/i.test(normalized);

    const checks = [
      { label: "Actor", good: hasActor, detail: hasActor ? "está identificado." : "falta saber quién necesita la capacidad.", question: "¿Qué actor inicia la acción y quién recibe el resultado?" },
      { label: "Acción", good: specificAction && !ambiguousVerb, detail: ambiguousVerb ? "usa un verbo amplio; conviértelo en una acción observable." : specificAction ? "es concreta." : "falta un verbo que describa el comportamiento.", question: "¿Qué acción concreta puede observarse, medirse o probarse?" },
      { label: "Beneficio", good: hasBenefit, detail: hasBenefit ? "explica el para qué." : "falta el valor que obtiene el usuario.", question: "¿Qué resultado de negocio obtiene el actor y por qué importa?" },
      { label: "Verificación", good: hasObservableRule, detail: hasObservableRule ? "incluye una regla o condición comprobable." : "todavía no hay un resultado que se pueda comprobar.", question: "¿Qué condición, regla y resultado observable demostrarían que funciona?" },
    ];

    const tip = checks.every((check) => check.good)
      ? "Siguiente paso: traduce la frase a un escenario Given / When / Then y confirma el ejemplo con el cliente."
      : "Siguiente paso: pregunta por el actor, la acción concreta, el beneficio y el resultado que debería observarse.";
    renderAnalysis(text, checks, tip);
  }

  analyzeRequirementButton?.addEventListener("click", analyzeRequirement);
  rawRequirement?.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") analyzeRequirement();
  });
  document.querySelectorAll("[data-sample-requirement]").forEach((sampleButton) => {
    sampleButton.addEventListener("click", () => {
      rawRequirement.value = sampleButton.dataset.sampleRequirement || "";
      analyzeRequirement();
    });
  });
  clearAnalysisButton?.addEventListener("click", () => {
    if (rawRequirement) rawRequirement.value = "";
    showAnalysisEmpty();
    rawRequirement?.focus();
  });

  /**
   * El reto no solo revisa que haya una forma correcta: comprueba que el
   * aprendiz haya traducido el mensaje ambiguo al dominio planteado.
   */
  function evaluateChallenge() {
    const storyResult = validateStory();
    const bddResult = validateBDD();
    const issues = [];

    if (!storyResult.valid) issues.push("completa la Historia de Usuario");
    if (storyResult.valid) {
      if (normalize(storyRole.value) !== "guarda") issues.push("usa el rol guarda");
      if (normalize(storyAction.value) !== "consultar-ingreso-qr") issues.push("define la acción consultar un ingreso mediante su código QR");
      if (normalize(storyBenefit.value) !== "reducir-espera") issues.push("expresa el beneficio reducir la espera y tomar una decisión trazable");
    }

    if (!bddResult.valid) {
      issues.push("construye un escenario Given / When / Then válido");
    } else {
      const expectedIds = ["given-qr", "when-scan", "then-authorize"];
      const actualTexts = bddBlocks.map((block) => normalize(block.text));
      const expectedTexts = [
        "dado que el guarda está autorizado y el ingreso tiene un qr vigente",
        "cuando escanea el código qr del visitante",
        "entonces se muestran los datos autorizados y la decisión queda registrada",
      ];

      expectedIds.forEach((expectedId, index) => {
        const block = bddBlocks[index];
        const matchesText = actualTexts[index] === expectedTexts[index];
        if (block.id !== expectedId || !matchesText) {
          issues.push(`revisa el paso ${index + 1} del escenario`);
        }
      });
    }

    if (issues.length > 0) {
      challengeFeedback.className = "challenge-feedback is-error";
      challengeFeedback.textContent = `Aún puedes afinarlo: ${issues.join("; ")}.`;
      approvalPanel?.classList.remove("is-visible");
      approvalPanel?.setAttribute("aria-hidden", "true");
      return false;
    }

    challengeFeedback.className = "challenge-feedback is-success";
    challengeFeedback.textContent = "Primer corte validado: la historia y el escenario BDD conservan el vínculo con el caso guía y ya pueden alimentar el caso de uso, las pruebas y el prototipo.";
    approvalPanel?.classList.add("is-visible");
    approvalPanel?.setAttribute("aria-hidden", "false");
    evaluateChallengeButton.disabled = true;
    evaluateChallengeButton.textContent = "Requerimiento aprobado ✓";
    document.dispatchEvent(new CustomEvent("guide:completed"));
    approvalPanel?.scrollIntoView({ behavior: "smooth", block: "center" });
    return true;
  }

  evaluateChallengeButton?.addEventListener("click", evaluateChallenge);

  // Estado inicial del simulador: la zona de trabajo está vacía y la historia,
  // en modo plantilla. Las funciones anteriores se encargan de dibujar el DOM.
  updateStoryPreview();
})();
