"use strict";

class SimpleModal {

    constructor(modalTitle, modalText, acceptText, cancelText, toggleBtn, isAlert) {
        this.modalTitle = modalTitle || "Attention !";
        this.modalText = modalText || "Souhaitez-vous réellement faire ceci ?";
        this.acceptText = acceptText || "Oui";
        this.cancelText = cancelText || "";
        this.toggleBtn = toggleBtn || document.body;
        this.isAlert = isAlert || false;

        this.parent = document.body;

        this.modal = undefined;
        this.acceptButton = undefined;
        this.cancelButton = undefined;
        this.closeButton = undefined;

        this._createModal();
    }

    events() {
        /* Focus trap */
        // add all the elements inside modal which you want to make focusable
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const firstFocusableElement = this.modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
        const focusableContent = this.modal.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

        this.modal.addEventListener('keydown', function(e) {
            let isTabPressed = e.key === 'Tab';

            if (!isTabPressed) {
                return;
            }

            if (e.shiftKey) { // if shift key pressed for shift + tab combination
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus(); // add focus for the last focusable element
                    e.preventDefault();
                }
            } else { // if tab key is pressed
                if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                    firstFocusableElement.focus(); // add focus for the first focusable element
                    e.preventDefault();
                }
            }
        });

        this.modal.focus();

        /* Close on click on any button */
        this.acceptButton.addEventListener("click", () => {
            this._destroyModal();
        });

        if (this.cancelText) {
            this.cancelButton.addEventListener("click", () => {
                this._destroyModal();
            });
        }

        this.closeButton.addEventListener("click", () => {
            this._destroyModal();
        });

        /* Close modal on Escape */
        this.modal.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this._destroyModal();
            }
        });
    }

    _createModal() {
        /* Background dialog */
        this.modal = document.createElement('div');
        this.modal.classList.add('simple-modal-dialog');
        this.modal.setAttribute('tabindex', '-1');
        this.modal.setAttribute('role', this.isAlert ? 'alertdialog' : 'dialog');
        this.modal.setAttribute('aria-modal', 'true');
        this.modal.setAttribute('aria-label', this.modalTitle);

        /* Message window */
        const window = document.createElement('div');
        window.classList.add('simple-modal-window');
        this.modal.appendChild(window);

        /* Title */
        const title = document.createElement('h2');
        title.classList.add('simple-modal-title');
        title.textContent = this.modalTitle;
        window.appendChild(title);

        /* Title text */
        const titleText = document.createElement('p');
        titleText.classList.add('simple-modal-title-text');
        titleText.textContent = this.modalText;
        window.appendChild(titleText);

        /* Accept and cancel button group */
        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('simple-modal-button-group');
        window.appendChild(buttonGroup);

        /* Accept button */
        if (this.acceptText) {
            this.acceptButton = document.createElement('button');
            this.acceptButton.type = "button";
            this.acceptButton.classList.add('simple-modal-button-green');
            this.acceptButton.setAttribute('title', this.acceptText + ' (fermer la fenêtre modale)');
            this.acceptButton.textContent = this.acceptText;
            buttonGroup.appendChild(this.acceptButton);
        }

        /* Cancel button */
        if (this.cancelText) {
            this.cancelButton = document.createElement('button');
            this.cancelButton.type = "button";
            this.cancelButton.classList.add('simple-modal-button-red');
            this.cancelButton.setAttribute('title', this.cancelText + ' (fermer la fenêtre modale)');
            this.cancelButton.textContent = this.cancelText;
            buttonGroup.appendChild(this.cancelButton);
        }

        /* Close */
        this.closeButton = document.createElement('button');
        this.closeButton.type = "button";
        this.closeButton.innerHTML = "<span aria-hidden='true'>&times;</span><span class='sr-only'>Fermer</span>";
        this.closeButton.classList.add('simple-modal-close');
        this.closeButton.setAttribute('title', 'Fermer la fenêtre modale');
        window.appendChild(this.closeButton);

        /* Let's rock */
        this.parent.appendChild(this.modal);
    }

    _destroyModal() {
        this.toggleBtn.focus();
        this.parent.removeChild(this.modal);
        delete this;
    }
}
