const storageKey = "almacenVirtualDemo";

const defaultState = {
  warehouse: null,
  shelves: [],
  reports: [],
  selected: null
};

let currentView = "admin";
let state = loadState();

const els = {
  adminViewBtn: document.querySelector("#adminViewBtn"),
  operatorViewBtn: document.querySelector("#operatorViewBtn"),
  warehouseForm: document.querySelector("#warehouseForm"),
  adminSetup: document.querySelector("#adminSetup"),
  workbench: document.querySelector("#workbench"),
  detailGrid: document.querySelector("#detailGrid"),
  warehouseName: document.querySelector("#warehouseName"),
  warehouseArea: document.querySelector("#warehouseArea"),
  warehouseWidth: document.querySelector("#warehouseWidth"),
  warehouseLength: document.querySelector("#warehouseLength"),
  shelfForm: document.querySelector("#shelfForm"),
  shelfCode: document.querySelector("#shelfCode"),
  shelfWidth: document.querySelector("#shelfWidth"),
  shelfHeight: document.querySelector("#shelfHeight"),
  shelfColumns: document.querySelector("#shelfColumns"),
  shelfRows: document.querySelector("#shelfRows"),
  controls: document.querySelector(".controls"),
  adminPanel: document.querySelector("#adminPanel"),
  operatorPanel: document.querySelector("#operatorPanel"),
  mapHint: document.querySelector("#mapHint"),
  stockForm: document.querySelector("#stockForm"),
  itemCode: document.querySelector("#itemCode"),
  itemName: document.querySelector("#itemName"),
  itemQty: document.querySelector("#itemQty"),
  itemPhoto: document.querySelector("#itemPhoto"),
  movementForm: document.querySelector("#movementForm"),
  movementItem: document.querySelector("#movementItem"),
  movementType: document.querySelector("#movementType"),
  movementQty: document.querySelector("#movementQty"),
  movementNote: document.querySelector("#movementNote"),
  operatorSelection: document.querySelector("#operatorSelection"),
  restockList: document.querySelector("#restockList"),
  reportList: document.querySelector("#reportList"),
  warehouseMap: document.querySelector("#warehouseMap"),
  shelfFront: document.querySelector("#shelfFront"),
  frontTitle: document.querySelector("#frontTitle"),
  frontHint: document.querySelector("#frontHint"),
  stockList: document.querySelector("#stockList"),
  selectedTitle: document.querySelector("#selectedTitle"),
  selectedMeta: document.querySelector("#selectedMeta"),
  summaryName: document.querySelector("#summaryName"),
  summaryArea: document.querySelector("#summaryArea"),
  summaryShelves: document.querySelector("#summaryShelves"),
  summaryStock: document.querySelector("#summaryStock"),
  resetData: document.querySelector("#resetData")
};

els.adminViewBtn.addEventListener("click", () => setView("admin"));
els.operatorViewBtn.addEventListener("click", () => setView("operator"));

els.warehouseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  state.warehouse = {
    name: els.warehouseName.value.trim(),
    area: Number(els.warehouseArea.value),
    width: Number(els.warehouseWidth.value),
    length: Number(els.warehouseLength.value)
  };

  saveAndRender();
});

els.shelfForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!state.warehouse) {
    alert("Primero crea el almacen.");
    return;
  }

  const code = els.shelfCode.value.trim().toUpperCase();
  const exists = state.shelves.some((shelf) => shelf.code === code);

  if (exists) {
    alert("Ese codigo de estante ya existe.");
    return;
  }

  const columns = Number(els.shelfColumns.value);
  const rows = Number(els.shelfRows.value);

  state.shelves.push({
    code,
    width: Number(els.shelfWidth.value),
    height: Number(els.shelfHeight.value),
    columns,
    rows,
    position: defaultShelfPosition(state.shelves.length),
    sections: createShelfSections(code, rows, columns)
  });

  els.shelfForm.reset();
  saveAndRender();
});

els.stockForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (currentView !== "admin") return;

  const section = getSelectedSection();
  if (!section) return;

  const code = els.itemCode.value.trim().toUpperCase();
  const current = section.items.find((item) => item.code === code);
  const photo = await readSelectedPhoto();

  if (current) {
    current.qty += Number(els.itemQty.value);
    current.name = els.itemName.value.trim();
    if (photo) current.photo = photo;
  } else {
    section.items.push({
      code,
      name: els.itemName.value.trim(),
      qty: Number(els.itemQty.value),
      photo
    });
  }

  els.stockForm.reset();
  saveAndRender();
});

els.movementForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selected = getSelectedSectionWithShelf();
  if (!selected) return;

  const item = selected.section.items.find((current) => current.code === els.movementItem.value);
  if (!item) return;

  const qty = Number(els.movementQty.value);
  const type = els.movementType.value;
  const previousQty = item.qty;

  item.qty = type === "in" ? item.qty + qty : Math.max(0, item.qty - qty);

  state.reports.unshift({
    id: crypto.randomUUID(),
    kind: "movement",
    createdAt: formatDate(),
    shelfCode: selected.shelf.code,
    sectionName: selected.section.name,
    itemCode: item.code,
    itemName: item.name,
    qty,
    type,
    previousQty,
    newQty: item.qty,
    note: els.movementNote.value.trim()
  });

  els.movementForm.reset();
  saveAndRender();
});

els.resetData.addEventListener("click", () => {
  if (!confirm("Esto borra el almacen de prueba. Queres continuar?")) return;
  state = structuredClone(defaultState);
  localStorage.removeItem(storageKey);
  render();
});

function setView(view) {
  currentView = view;
  render();
}

function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return structuredClone(defaultState);

  try {
    return normalizeState(JSON.parse(saved));
  } catch {
    return structuredClone(defaultState);
  }
}

function normalizeState(value) {
  const next = {
    warehouse: value?.warehouse ?? null,
    shelves: Array.isArray(value?.shelves) ? value.shelves : [],
    reports: Array.isArray(value?.reports) ? value.reports : [],
    selected: value?.selected ?? null
  };

  next.shelves = next.shelves.map((shelf, shelfIndex) => {
    const rows = Number(shelf.rows) || Number(shelf.sections?.length) || 1;
    const columns = Number(shelf.columns) || 1;
    const sections = Array.isArray(shelf.sections) ? shelf.sections : [];

    return {
      ...shelf,
      rows,
      columns,
      position: normalizePosition(shelf.position, shelfIndex),
      sections: sections.map((section, index) => ({
        ...section,
        row: Number(section.row) || Math.floor(index / columns) + 1,
        column: Number(section.column) || (index % columns) + 1,
        name: section.name || `Fila ${Math.floor(index / columns) + 1} - Columna ${(index % columns) + 1}`,
        items: Array.isArray(section.items) ? section.items : []
      }))
    };
  });

  return next;
}

function normalizePosition(position, index) {
  if (position && Number.isFinite(position.x) && Number.isFinite(position.y)) {
    return {
      x: clamp(position.x, 2, 84),
      y: clamp(position.y, 2, 84)
    };
  }

  return defaultShelfPosition(index);
}

function defaultShelfPosition(index) {
  return {
    x: 5 + (index % 4) * 22,
    y: 8 + Math.floor(index / 4) * 22
  };
}

function saveAndRender() {
  localStorage.setItem(storageKey, JSON.stringify(state));
  render();
}

function createShelfSections(code, rows, columns) {
  return Array.from({ length: rows * columns }, (_, index) => {
    const row = Math.floor(index / columns) + 1;
    const column = (index % columns) + 1;

    return {
      id: `${code}-F${row}-C${column}`,
      name: `Fila ${row} - Columna ${column}`,
      row,
      column,
      items: []
    };
  });
}

function render() {
  renderViewMode();
  renderWarehouseForm();
  renderSummary();
  renderMap();
  renderShelfFront();
  renderSelectedSection();
  renderOperatorPanel();
  renderReports();
}

function renderViewMode() {
  els.adminViewBtn.classList.toggle("active", currentView === "admin");
  els.operatorViewBtn.classList.toggle("active", currentView === "operator");
  els.controls.classList.toggle("hidden", currentView !== "admin");
  els.adminSetup.classList.toggle("hidden", currentView !== "admin");
  els.adminPanel.classList.toggle("hidden", currentView !== "admin");
  els.operatorPanel.classList.toggle("hidden", currentView !== "operator");
  els.workbench.classList.toggle("operator-map", currentView === "operator");
  els.detailGrid.classList.toggle("operator-only", currentView === "operator");
  els.mapHint.textContent = currentView === "admin"
    ? "Arrastra cada estante dentro del recuadro para marcar su posicion real."
    : "Vista de consulta. Selecciona estante y celda para reportar movimientos.";
}

function renderWarehouseForm() {
  els.warehouseForm.classList.toggle("hidden", currentView !== "admin");
  if (!state.warehouse) return;

  els.warehouseName.value = state.warehouse.name;
  els.warehouseArea.value = state.warehouse.area;
  els.warehouseWidth.value = state.warehouse.width;
  els.warehouseLength.value = state.warehouse.length;
}

function renderSummary() {
  const totalStock = state.shelves.reduce((sum, shelf) => {
    return sum + shelf.sections.reduce((sectionSum, section) => {
      return sectionSum + section.items.reduce((itemSum, item) => itemSum + item.qty, 0);
    }, 0);
  }, 0);

  els.summaryName.textContent = state.warehouse ? state.warehouse.name : "Sin crear";
  els.summaryArea.textContent = state.warehouse ? `${state.warehouse.area} m2` : "0 m2";
  els.summaryShelves.textContent = state.shelves.length;
  els.summaryStock.textContent = totalStock;
}

function renderMap() {
  els.warehouseMap.innerHTML = "";

  if (state.shelves.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Aca se dibujaran los estantes del almacen.";
    els.warehouseMap.appendChild(empty);
    return;
  }

  state.shelves.forEach((shelf) => {
    const shelfEl = document.createElement("button");
    const stockCount = getShelfStockCount(shelf);
    const widthPercent = clamp(shelf.width * 5, 12, 28);
    const heightPercent = clamp(shelf.height * 7, 10, 24);

    shelfEl.type = "button";
    shelfEl.className = `top-shelf ${currentView === "admin" ? "admin-mode" : "operator-mode"}`;
    shelfEl.style.left = `${shelf.position.x}%`;
    shelfEl.style.top = `${shelf.position.y}%`;
    shelfEl.style.width = `${widthPercent}%`;
    shelfEl.style.height = `${heightPercent}%`;
    if (state.selected?.shelfCode === shelf.code) shelfEl.classList.add("active");

    shelfEl.append(
      textElement("span", shelf.code),
      textElement("small", `${shelf.width} m ancho`),
      textElement("small", `${shelf.rows} filas x ${shelf.columns} columnas`),
      textElement("small", `${stockCount} unidades`)
    );

    attachShelfInteractions(shelfEl, shelf);
    els.warehouseMap.appendChild(shelfEl);
  });
}

function attachShelfInteractions(shelfEl, shelf) {
  let dragging = false;
  let moved = false;
  let offsetX = 0;
  let offsetY = 0;

  shelfEl.addEventListener("pointerdown", (event) => {
    if (currentView !== "admin") return;

    dragging = true;
    moved = false;
    const rect = shelfEl.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    shelfEl.setPointerCapture(event.pointerId);
  });

  shelfEl.addEventListener("pointermove", (event) => {
    if (!dragging || currentView !== "admin") return;

    const mapRect = els.warehouseMap.getBoundingClientRect();
    const shelfRect = shelfEl.getBoundingClientRect();
    const xPx = clamp(event.clientX - mapRect.left - offsetX, 0, mapRect.width - shelfRect.width);
    const yPx = clamp(event.clientY - mapRect.top - offsetY, 0, mapRect.height - shelfRect.height);

    shelf.position.x = (xPx / mapRect.width) * 100;
    shelf.position.y = (yPx / mapRect.height) * 100;
    shelfEl.style.left = `${shelf.position.x}%`;
    shelfEl.style.top = `${shelf.position.y}%`;
    moved = true;
  });

  shelfEl.addEventListener("pointerup", (event) => {
    if (dragging && currentView === "admin") {
      dragging = false;
      shelfEl.releasePointerCapture(event.pointerId);
      localStorage.setItem(storageKey, JSON.stringify(state));
    }
  });

  shelfEl.addEventListener("click", () => {
    if (moved) {
      moved = false;
      return;
    }

    state.selected = { shelfCode: shelf.code, sectionId: null };
    saveAndRender();
  });
}

function renderShelfFront() {
  els.shelfFront.innerHTML = "";

  const shelf = getSelectedShelf();

  if (!shelf) {
    els.frontTitle.textContent = "Selecciona un estante";
    els.frontHint.textContent = "El estante seleccionado se vera con filas, columnas y fotos de productos.";
    const empty = document.createElement("div");
    empty.className = "front-empty";
    empty.textContent = "Elige un estante en el plano superior para abrir su vista frontal.";
    els.shelfFront.appendChild(empty);
    return;
  }

  els.frontTitle.textContent = `Estante ${shelf.code}`;
  els.frontHint.textContent = currentView === "admin"
    ? "Haz clic en una celda frontal para editar existencias y fotos."
    : "Haz clic en una celda frontal para consultar y reportar movimientos.";

  const rack = document.createElement("article");
  const header = document.createElement("header");
  const sections = document.createElement("div");

  rack.className = "front-rack";
  header.className = "front-rack-header";
  sections.className = "front-sections";
  sections.style.gridTemplateColumns = `repeat(${shelf.columns}, minmax(120px, 1fr))`;

  header.append(
    textElement("span", shelf.code),
    textElement("small", `${shelf.width} m ancho x ${shelf.height} m alto - ${shelf.rows} x ${shelf.columns}`)
  );

  shelf.sections.forEach((section) => {
    const count = getSectionStockCount(section);
    const button = document.createElement("button");
    const miniStock = document.createElement("div");

    button.type = "button";
    button.className = "section-cell";
    miniStock.className = "mini-stock";
    if (state.selected?.sectionId === section.id) button.classList.add("active");

    button.append(
      textElement("span", section.name),
      textElement("small", `${count} unidades`),
      miniStock
    );

    renderMiniStock(section, miniStock);

    button.addEventListener("click", () => {
      state.selected = { shelfCode: shelf.code, sectionId: section.id };
      saveAndRender();
    });

    sections.appendChild(button);
  });

  rack.append(header, sections);
  els.shelfFront.appendChild(rack);
}

function renderMiniStock(section, target) {
  if (section.items.length === 0) {
    target.appendChild(textElement("small", "Sin productos"));
    return;
  }

  section.items.slice(0, 3).forEach((item) => {
    const itemEl = document.createElement("div");
    const info = document.createElement("div");

    itemEl.className = "mini-stock-item";
    itemEl.append(createPhotoNode(item, "mini-photo"), info);
    info.append(
      textElement("strong", item.name),
      textElement("span", `${item.code} - ${item.qty}`)
    );
    target.appendChild(itemEl);
  });

  if (section.items.length > 3) {
    target.appendChild(textElement("small", `+${section.items.length - 3} productos mas`));
  }
}

function renderSelectedSection() {
  const selected = getSelectedSectionWithShelf();

  if (!selected) {
    const shelf = getSelectedShelf();
    els.selectedTitle.textContent = shelf ? `Estante ${shelf.code}` : "Selecciona una seccion";
    els.selectedMeta.textContent = shelf
      ? "Ahora elige una celda en la vista frontal para cargar existencias."
      : "Todavia no hay una ubicacion activa.";
    els.stockForm.classList.add("hidden");
    renderStockList(null);
    return;
  }

  els.selectedTitle.textContent = `${selected.shelf.code} / ${selected.section.name}`;
  els.selectedMeta.textContent = `Ubicacion frontal: fila ${selected.section.row}, columna ${selected.section.column}`;
  els.stockForm.classList.toggle("hidden", currentView !== "admin");
  renderStockList(selected.section);
}

function renderStockList(section) {
  els.stockList.innerHTML = "";

  if (!section) {
    els.stockList.appendChild(textElement("p", "El contenido de la seccion aparecera aca."));
    els.stockList.firstChild.className = "muted";
    return;
  }

  if (section.items.length === 0) {
    els.stockList.appendChild(textElement("p", "Esta seccion todavia no tiene existencias."));
    els.stockList.firstChild.className = "muted";
    return;
  }

  section.items.forEach((item) => {
    const row = document.createElement("div");
    const info = document.createElement("div");
    const qty = document.createElement("div");

    row.className = "stock-item";
    qty.className = "qty";
    qty.textContent = item.qty;

    info.append(
      textElement("strong", item.name),
      textElement("span", item.code)
    );
    row.append(createPhotoNode(item, "stock-photo"), info, qty);
    els.stockList.appendChild(row);
  });
}

function renderOperatorPanel() {
  if (currentView !== "operator") return;

  const selected = getSelectedSectionWithShelf();
  els.movementItem.innerHTML = "";
  els.restockList.innerHTML = "";

  if (!selected) {
    els.operatorSelection.textContent = "Selecciona una celda con productos para registrar una entrada o salida.";
    els.movementForm.classList.add("hidden");
    els.restockList.appendChild(emptyText("Selecciona una ubicacion para pedir reposicion de sus productos."));
    return;
  }

  els.operatorSelection.textContent = `${selected.shelf.code} / ${selected.section.name}`;

  if (selected.section.items.length === 0) {
    els.movementForm.classList.add("hidden");
    els.restockList.appendChild(emptyText("Esta ubicacion no tiene productos cargados."));
    return;
  }

  els.movementForm.classList.remove("hidden");
  selected.section.items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.code;
    option.textContent = `${item.code} - ${item.name} (${item.qty})`;
    els.movementItem.appendChild(option);
    els.restockList.appendChild(createRestockCard(item, selected));
  });
}

function createRestockCard(item, selected) {
  const card = document.createElement("div");
  const info = document.createElement("div");
  const button = document.createElement("button");

  card.className = "restock-card";
  button.type = "button";
  button.textContent = "Pedir";

  info.append(
    textElement("strong", item.name),
    textElement("span", `${item.code} - stock actual ${item.qty}`)
  );

  button.addEventListener("click", () => {
    state.reports.unshift({
      id: crypto.randomUUID(),
      kind: "restock",
      createdAt: formatDate(),
      shelfCode: selected.shelf.code,
      sectionName: selected.section.name,
      itemCode: item.code,
      itemName: item.name,
      currentQty: item.qty
    });
    saveAndRender();
  });

  card.append(createPhotoNode(item, "mini-photo"), info, button);
  return card;
}

function renderReports() {
  els.reportList.innerHTML = "";

  if (state.reports.length === 0) {
    els.reportList.appendChild(emptyText("Todavia no hay reportes operarios."));
    return;
  }

  state.reports.slice(0, 12).forEach((report) => {
    const item = document.createElement("article");
    item.className = "report-item";

    if (report.kind === "movement") {
      const label = report.type === "in" ? "Abastecimiento" : "Salida";
      item.append(
        textElement("strong", `${label}: ${report.itemName}`),
        textElement("span", `${report.shelfCode} / ${report.sectionName}`),
        textElement("span", `Cantidad ${report.qty}. Stock ${report.previousQty} -> ${report.newQty}`),
        textElement("span", report.note ? `Nota: ${report.note}` : "Sin observacion"),
        textElement("span", report.createdAt)
      );
    } else {
      item.append(
        textElement("strong", `Reabastecer: ${report.itemName}`),
        textElement("span", `${report.shelfCode} / ${report.sectionName}`),
        textElement("span", `Stock actual ${report.currentQty}`),
        textElement("span", report.createdAt)
      );
    }

    els.reportList.appendChild(item);
  });
}

function createPhotoNode(item, className) {
  if (item.photo) {
    const image = document.createElement("img");
    image.className = className;
    image.src = item.photo;
    image.alt = `Foto de ${item.name}`;
    return image;
  }

  const placeholder = document.createElement("div");
  placeholder.className = className === "stock-photo" ? "stock-photo photo-placeholder" : "photo-placeholder";
  placeholder.textContent = item.name.slice(0, 1).toUpperCase();
  return placeholder;
}

function textElement(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

function emptyText(text) {
  const element = textElement("p", text);
  element.className = "muted";
  return element;
}

function readSelectedPhoto() {
  const file = els.itemPhoto.files?.[0];
  if (!file) return Promise.resolve("");

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

function formatDate() {
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date());
}

function getSelectedSection() {
  return getSelectedSectionWithShelf()?.section ?? null;
}

function getSelectedShelf() {
  if (!state.selected?.shelfCode) return null;
  return state.shelves.find((current) => current.code === state.selected.shelfCode) ?? null;
}

function getSelectedSectionWithShelf() {
  if (!state.selected?.sectionId) return null;

  const shelf = state.shelves.find((current) => current.code === state.selected.shelfCode);
  if (!shelf) return null;

  const section = shelf.sections.find((current) => current.id === state.selected.sectionId);
  if (!section) return null;

  return { shelf, section };
}

function getShelfStockCount(shelf) {
  return shelf.sections.reduce((sum, section) => sum + getSectionStockCount(section), 0);
}

function getSectionStockCount(section) {
  return section.items.reduce((sum, item) => sum + item.qty, 0);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

render();
