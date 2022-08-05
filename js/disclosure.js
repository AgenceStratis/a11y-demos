class disclosure {
    constructor(trigger, content, focusFirstElement, useAria, status) {
        this.trigger = trigger;
        this.content = content;
        this.status = status;
        this.focusFirstElement = focusFirstElement;
        this.useAria = useAria;
    }

    initialize = () => {
        let self = this;

        if (self.content) {
            const focusable = self.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

            self.trigger.addEventListener('click', (e) => {
                if (self.useAria) {
                    if (e.target.getAttribute('aria-expanded') === 'false') {
                        self.trigger.setAttribute('aria-expanded', 'true');
                        self.trigger.parentNode.classList.add('--open');
                        if (self.focusFirstElement) {
                            focusable[0].focus();
                        }
                    } else {
                        self.trigger.setAttribute('aria-expanded', 'false');
                        self.trigger.parentNode.classList.remove('--open');
                    }
                } else {
                    if (self.trigger.parentNode.classList.contains('--open')) {
                        self.status.textContent = e.target.getAttribute('data-trigger-open');
                        self.trigger.parentNode.classList.remove('--open');
                    } else {
                        self.status.textContent = e.target.getAttribute('data-trigger-close');
                        self.trigger.parentNode.classList.add('--open');
                        if (self.focusFirstElement) {
                            focusable[0].focus();
                        }
                    }
                }
            }, false);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const menuLangsTrigger = document.getElementById("menu-langs__trigger");
    const menuLangsContent = document.getElementById("menu-langs__content");
    if (menuLangsTrigger && menuLangsContent) {
        const menuLangDisclosure = new disclosure(menuLangsTrigger, menuLangsContent, false, true, '');
        menuLangDisclosure.initialize();
    }

    const menuLangsTrigger2 = document.getElementById("menu-langs2__trigger");
    const menuLangsContent2 = document.getElementById("menu-langs2__content");
    const menuLangsStatus2 = document.querySelector('[data-trigger-text]');
    if (menuLangsTrigger2 && menuLangsContent2 && menuLangsStatus2) {
        const menuLangDisclosure2 = new disclosure(menuLangsTrigger2, menuLangsContent2, false, false, menuLangsStatus2);
        menuLangDisclosure2.initialize();
    }

    const menuOrderTrigger = document.getElementById("menu-order__trigger");
    const menuOrderContent = document.getElementById("menu-order__content");
    if (menuOrderTrigger && menuOrderContent) {
        const menuOrderDiscolsure = new disclosure(menuOrderTrigger, menuOrderContent, false, true, '');
        menuOrderDiscolsure.initialize();
    }

    const menuOrderTrigger2 = document.getElementById("menu-order__trigger2");
    const menuOrderContent2 = document.getElementById("menu-order__content2");
    if (menuOrderTrigger2 && menuOrderContent2) {
        const menuOrderDiscolsure2 = new disclosure(menuOrderTrigger2, menuOrderContent2, false, true, '');
        menuOrderDiscolsure2.initialize();
    }

    const menuOrderTrigger3 = document.getElementById("menu-order__trigger3");
    const menuOrderContent3 = document.getElementById("menu-order__content3");
    if (menuOrderTrigger3 && menuOrderContent3) {
        const menuOrderDiscolsure3 = new disclosure(menuOrderTrigger3, menuOrderContent3, false, true, '');
        menuOrderDiscolsure3.initialize();
    }
});
