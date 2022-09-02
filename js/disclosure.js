class disclosure {
    constructor(domNode) {
        this.rootEl = domNode;
        this.buttonEl = this.rootEl.querySelector('.disclosure__trigger');
        this.contentEl = this.rootEl.querySelector('.disclosure__content');
        this.statusEl = this.rootEl.querySelector('.status-text') || null;
        this.statusCloseText = this.buttonEl.getAttribute('data-trigger-close') || null;
        this.statusOpenText = this.buttonEl.getAttribute('data-trigger-open') || null;
        this.focusFirstElement = this.rootEl.hasAttribute('data-focus-first-element');
        this.focusableElements = this.contentEl.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        this.open = this.rootEl.classList.contains('--open') === true;

        // add event listeners
        this.buttonEl.addEventListener('click', this.onButtonClick.bind(this));
    }

    onButtonClick() {
        this.toggle(!this.open);
    }

    toggle(open) {
        // update the internal state
        this.open = open;

        // handle DOM updates
        // if ARIA is used
        if (this.buttonEl.getAttribute('aria-expanded')) {
            this.buttonEl.setAttribute('aria-expanded', `${open}`);
        }

        if (open) {
            this.contentEl.removeAttribute('hidden');
            this.rootEl.classList.add('--open');
            // if ARIA is not used
            if (this.statusEl && this.statusOpenText) {
                this.statusEl.textContent = this.statusCloseText;
            }
            // move the focus on the first focusable element
            if (this.focusFirstElement) {
                this.focusableElements[0].focus();
            }
        } else {
            this.contentEl.setAttribute('hidden', '');
            this.rootEl.classList.remove('--open');
            //// if ARIA is not used
            if (this.statusEl && this.statusOpenText) {
                this.statusEl.textContent = this.statusOpenText;
            }
        }
    }

    // Add public open and close methods for convenience
    open() {
        this.toggle(true);
        if (this.focusFirstElement) {
            this.focusableElements[0].focus();
        }
    }

    close() {
        this.toggle(false);
    }
}

// init accordions
const disclosures = document.querySelectorAll('.disclosure');
disclosures.forEach((disclosureEl) => {
    new disclosure(disclosureEl);
});
