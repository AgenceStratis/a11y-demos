class disclosure {
    constructor(trigger, content, status, focusFirstElement, useAria) {
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
                console.log(self)
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
        const menuLangDisclosure = new disclosure(menuLangsTrigger, menuLangsContent, '', false, true);
        menuLangDisclosure.initialize();
    }

    const menuLangsTrigger2 = document.getElementById("menu-langs2__trigger");
    const menuLangsContent2 = document.getElementById("menu-langs2__content");
    const menuLangsStatus2 = document.querySelector('[data-trigger-text]');
    if (menuLangsTrigger2 && menuLangsContent2 && menuLangsStatus2) {
        const menuLangDisclosure2 = new disclosure(menuLangsTrigger2, menuLangsContent2, menuLangsStatus2, false, false);
        menuLangDisclosure2.initialize();
    }
});
