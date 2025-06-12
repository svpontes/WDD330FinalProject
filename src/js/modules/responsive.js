// src/js/modules/responsive.js

export function adjustLayout() {
    const viewportWidth = window.innerWidth;

    if (viewportWidth < 768) {
        // Mobile layout adjustments
        document.body.classList.add('mobile');
        document.body.classList.remove('desktop');
    } else {
        // Desktop layout adjustments
        document.body.classList.add('desktop');
        document.body.classList.remove('mobile');
    }
}

export function initResponsive() {
    adjustLayout();
    window.addEventListener('resize', adjustLayout);
}