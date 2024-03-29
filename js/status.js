const insertHtml = (element, htmlString, position) => {
    element.insertAdjacentHTML(position, htmlString)
};

let timer;

const reloadAriaLive = (btn, area) => {
    const button = document.getElementById(btn);
    const canal = document.getElementById(area);

    if (button) {
        button.addEventListener('click', () => {
            clearTimeout(timer);
            canal.innerHTML = '';
            ariaLIve(0, area);
        }, false);
    }
};

const ariaLIve = (i, area) => {
    const messagesArray = ["<p>Laura : Bonjour à tous.</p>","<p>Nicolas : Bonjour !</p>","<p>Laura : Question bête, comment fonctionne une zone live ?</p>","<p>Nicolas : Voyons Laura, il n'y a pas de questions bêtes ici.</p>"];
    const canal = document.getElementById(area);

    function myLoop() {
        timer = setTimeout(() => {
            insertHtml(canal, messagesArray[i], "beforeend");
            i++;
            if (i < messagesArray.length) {
                myLoop();
            }
        }, Math.floor(Math.random() * 4000));
    }

    myLoop();
};

const liveRegionAtomic = (p, bp, bn) => {
    const paragraphe = document.getElementById(p);
    const buttonPrev = document.getElementById(bp);
    const buttonNext = document.getElementById(bn);

    if (buttonNext) {
        buttonNext.addEventListener('click', (event) => {
            if (!event.target.hasAttribute("disabled")) {
                paragraphe.textContent = "21 à 40";
                buttonNext.setAttribute("disabled", "");
                buttonPrev.removeAttribute("disabled");
            }
        }, false);
    }

    if (buttonPrev) {
        buttonPrev.addEventListener('click', (event) => {
            if (!event.target.hasAttribute("disabled")) {
                paragraphe.textContent = "1 à 20";
                buttonNext.removeAttribute("disabled");
                buttonPrev.setAttribute("disabled", "");
            }
        }, false);
    }
};

const liveRegionAlert = () => {
    const button = document.getElementById("live-region-alert-button");
    const area = document.getElementById("live-region-alert");

    if (button) {
        button.addEventListener('click', function () {
            area.style.display = "block";
        }, false);
    }

};

const progressbar = () =>  {
    const run = document.getElementById("progressbar-button");
    const bar = document.getElementById("progressbar");
    const percent = document.getElementById("percent");
    const progress = document.getElementById("progress");

    let value = 0;
    let interval;

    const stateProgressBar = () => {
        bar.setAttribute("aria-valuenow", value);
        bar.setAttribute("aria-valuetext", value +'%');
        progress.style.width = value + "%";
        percent.textContent = value;
    }

    const resetProgressBar = () => {
        value = 0;
        stateProgressBar();
    };

    const startProgressBar = () => {
        if (value >= 100) {
            clearInterval(interval);
        } else {
            value += 10;
            stateProgressBar();
        }
    };

    if (run) {
        run.addEventListener('click', () => {
            clearInterval(interval);
            resetProgressBar();
            interval = setInterval(startProgressBar, 500);
        }, false);
    }
};

class formValidator {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
    }

    initialize = () => {
        this.validateOnEntry();
        this.validateOnSubmit();
    }

    setStatus = (field, message, status) => {
        const alert = this.form.querySelector('.alert');
        const errorExist = document.getElementById(`${field.id}-alert`);

        if (status === "success") {
            if (errorExist) {
                errorExist.remove();
            }
        }

        if (status === "error") {
            if (!errorExist) {
                const p = document.createElement("p");
                p.setAttribute('id', `${field.id}-alert`);
                p.textContent = `${message}`;
                alert.appendChild(p);
            }
        }
    }

    validateFields = (field) => {
        if (field.value.trim() === "") {
            this.setStatus(field, `Le champ ${field.previousElementSibling.dataset.label}  est obligatoire`, "error");
        } else {
            this.setStatus(field, null, "success");
        }

        if (field.type === "email") {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (re.test(field.value)) {
                this.setStatus(field, null, "success");
            } else {
                this.setStatus(field, `Le champ ${field.previousElementSibling.dataset.label}  n'est pas un format valide. Exemple de courriel jean.dupond@courriel.fr`, "error");
            }
        }
    }

    validateOnSubmit = () => {
        let self = this;

        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();

                self.fields.forEach(field => {
                    const input = document.getElementById(`${field}`);

                    self.validateFields(input);
                });
            }, false);
        }
    }

    validateOnEntry = () => {
        let self = this;

        this.fields.forEach(field => {
            const input = document.getElementById(`${field}`);

            if (input) {
                input.addEventListener('input', event => {
                    self.validateFields(input);
                });
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function ()  {
    reloadAriaLive('zl-reload', 'canal');
    liveRegionAtomic("live-region-atomic-false", "live-region-atomic-false-prev", "live-region-atomic-false-next");
    liveRegionAtomic("live-region-atomic-true", "live-region-atomic-true-prev", "live-region-atomic-true-next");
    liveRegionAtomic("live-region-status", "live-region-status-prev", "live-region-status-next");
    liveRegionAlert();
    reloadAriaLive('zl-reload-log', 'canal-log');
    progressbar();

    const form = document.getElementById("zla-form");
    const fields = ["zla-prenom", "zla-nom", "zla-email"];
    const validator = new formValidator(form, fields);
    validator.initialize();

    const form2 = document.getElementById("zla-form2");
    const fields2 = ["zla-prenom2", "zla-nom2", "zla-email2"];
    const validator2 = new formValidator(form2, fields2);
    validator2.initialize();
});
