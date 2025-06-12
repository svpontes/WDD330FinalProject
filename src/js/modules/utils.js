import { load } from "flat-cache";
export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
    const htmlStrings = list.map(template);
    // if clear is true we need to clear out the contents of the parent.
    if (clear) {
      parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    if (callback) {
      callback(data);
    }
}


async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}



export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate('/src/templates/header.html');
    const footerTemplate = await loadTemplate('/src/templates/footer.html');

    const headerElement = document.querySelector('#main-header');
    const footerElement = document.querySelector('#main-footer');
   
    renderWithTemplate(headerTemplate, headerElement, null, initSearchForm);
    renderWithTemplate(footerTemplate, footerElement);
}

