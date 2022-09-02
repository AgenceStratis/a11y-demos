class Tooltip {
    constructor(element) {
        this.element = element;
        this.tooltip = element.querySelector('[role=tooltip]');
        this.globalEscapeBound  = this.globalEscape.bind(this);
        this.bindEvents();
    }

    bindEvents() {
        this.element.addEventListener('mouseenter', this.open.bind(this));
        this.element.addEventListener('focus', this.open.bind(this));
        this.element.addEventListener('focusin', this.open.bind(this));
        this.element.addEventListener('mouseleave', this.close.bind(this));
        this.element.addEventListener('blur', this.close.bind(this));
        this.element.addEventListener('focusout', this.close.bind(this));
    }

    open() {
        this.showTooltip();
        this.attachGlobalListener();
    }

    close() {
        this.hideTooltip();
        this.removeGlobalListener();
    }

    attachGlobalListener() {
        document.addEventListener('keydown', this.globalEscapeBound);
    }

    removeGlobalListener() {
        document.removeEventListener('keydown', this.globalEscapeBound);
    }

    globalEscape(event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            this.close();
        }
    }

    showTooltip() {
        this.tooltip.classList.remove('sr-only');
    }

    hideTooltip() {
        this.tooltip.classList.add('sr-only');
    }
}

document.addEventListener("DOMContentLoaded", function ()  {
    Array.from(document.querySelectorAll('.tooltip-container')).forEach(element => new Tooltip(element));
});
