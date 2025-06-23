// Selector corto
/*export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// LocalStorage helpers
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Render helpers
export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  if (clear) parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) callback(data);
}

// Carga de templates para header/footer
async function loadTemplate(path) {
  const res = await fetch(path);
  return await res.text();
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/src/templates/header.html");
  const footerTemplate = await loadTemplate("/src/templates/footer.html");
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

// Mensaje de alerta
export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span class="close-button" style="cursor:pointer;">X</span>`;
  alert.addEventListener("click", function (e) {
    if (e.target.classList.contains("close-button")) alert.remove();
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  if (scroll) window.scrollTo(0, 0);
}
*/

// src/js/modules/utils.js
// Selector corto
export function qs(selector, parent = document) {
  return parent.querySelector(selector); // 
}

// LocalStorage helpers
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)); // 
}
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data)); // 
}

// Render helpers
export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template); // 
  if (clear) parentElement.innerHTML = ""; // 
  parentElement.insertAdjacentHTML(position, htmlStrings.join("")); // 
}
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template; // 
  if (callback) callback(data); // 
}

// Carga de templates para header/footer (não usados no seu HTML atual)
async function loadTemplate(path) {
  const res = await fetch(path); // 
  return await res.text(); // 
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/src/templates/header.html"); // 
  const footerTemplate = await loadTemplate("/src/templates/footer.html"); // 
  const headerElement = document.querySelector("#main-header"); // 
  const footerElement = document.querySelector("#main-footer"); // 
  // if (headerElement) renderWithTemplate(headerTemplate, headerElement); // Comentado pois o header está direto no HTML
  // if (footerElement) renderWithTemplate(footerTemplate, footerElement); // Comentado pois o footer está direto no HTML
}

// Mensaje de alerta
export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div"); // 
  alert.classList.add("alert"); // 
  alert.innerHTML = `<p>${message}</p><span class="close-button" style="cursor:pointer;">X</span>`; // 
  alert.addEventListener("click", function (e) {
    if (e.target.classList.contains("close-button")) alert.remove(); // 
  });
  const main = document.querySelector("main"); // 
  if (main) main.prepend(alert);
  if (scroll) window.scrollTo(0, 0); // 
}