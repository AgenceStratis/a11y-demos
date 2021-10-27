const insertHtml = (element, htmlString, position) => {
    element.insertAdjacentHTML(position, htmlString)
};

const onChangeOnSelect = () => {
    const select = document.getElementById('select');

    if (select) {
        select.addEventListener('change', function () {
            if (this.value !== '0') {
                window.location = this.value;
            }
        }, false);
    }
};

const noOnChangeOnSelect = () => {
    const button = document.getElementById('submit');
    const select2 = document.getElementById('select2');

    if (button && select2) {
        button.addEventListener('click', function () {
            if (select2.value !== '0') {
                window.location.href = select2.value;
            }
        }, false);
    }
};

const ccvaeu = () => {
    const button = document.getElementById('ccvaeu-button');
    const text = document.getElementById('ccvaeu-text');
    const form = document.getElementById('ccvaeu-form');

    button.addEventListener('click', function () {
        text.style.display = "block";
        form.style.display = "none";
        text.focus();
    }, false);
};

const coc = () => {
    const button = document.getElementById('coc-button');
    const text = document.getElementById('coc-text');
    const form = document.getElementById('coc-form');

    button.addEventListener('click', function () {
        text.textContent = "Merci pour votre participation !";
        //form.style.display = "none";
        //text.focus();
    }, false);
};

const validateEmail = (mail) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const errorMessage = `<p id="feo-email-error" class="error-message">Le courriel renseigné n'est pas correcte. Exemple de courriel attendu jean.dupond@gmail.com</p>`;
    const errorMessageNode = document.getElementById('feo-email-error');
    const feoForm = document.getElementById('feo-form');
    const validationMessage = `<p id="feo-form-validation" tabindex="-1">Vous êtes bien inscrit à notre lettre d'information, un courriel de confirmation vient de vous être envoyé.</p>`;
    const feoWrapper = document.getElementById('feo-wrapper');
    const feoEmail = document.getElementById('feo-email');

    if (mail.value.match(mailformat)) {
        if (errorMessageNode) {
            errorMessageNode.remove();
        }
        feoForm.style.display = "none";
        insertHtml(feoWrapper, validationMessage, "afterbegin");
        const validationMessageNode = document.getElementById('feo-form-validation');
        validationMessageNode.focus();
    } else {
        if (!errorMessageNode) {
            mail.setAttribute("aria-describedby", "feo-email-error");
            insertHtml(mail, errorMessage, "afterend");
            feoEmail.setAttribute("aria-invalid", "true");
        }
        mail.focus();
    }
};

const validateFeoForm = () => {
    const button = document.getElementById('feo-button');
    const inputEmail = document.getElementById('feo-email');

    button.addEventListener('click', function (event) {
        event.preventDefault();
        validateEmail(inputEmail);
    }, false);
};

const validateEmail2 = (mail) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const errorMessage = `<p id="feo-email-error2" class="error-message">Le courriel renseigné n'est pas correcte. Exemple de courriel attendu jean.dupond@gmail.com</p>`;
    const errorMessageNode = document.getElementById('feo-email-error2');
    const feoForm = document.getElementById('feo-form2');
    const validationMessage = `<p id="feo-form-validation2" tabindex="-1">Vous êtes bien inscrit à notre lettre d'information, un courriel de confirmation vient de vous être envoyé.</p>`;
    const feoWrapper = document.getElementById('feo-wrapper2');
    //const feoEmail = document.getElementById('feo-email2');

    if (mail.value.match(mailformat)) {
        if (errorMessageNode) {
            errorMessageNode.remove();
        }
        feoForm.style.display = "none";
        insertHtml(feoWrapper, validationMessage, "afterbegin");
        const validationMessageNode = document.getElementById('feo-form-validation2');
        //validationMessageNode.focus();
    } else {
        if (!errorMessageNode) {
            //mail.setAttribute("aria-describedby", "feo-email-error2");
            insertHtml(mail, errorMessage, "afterend");
            //feoEmail.setAttribute("aria-invalid", "true");
        }
        //mail.focus();
    }
};

const validateFeoForm2 = () => {
    const button = document.getElementById('feo-button2');
    const inputEmail = document.getElementById('feo-email2');

    button.addEventListener('click', function (event) {
        event.preventDefault();
        validateEmail2(inputEmail);
    }, false);
};

let timer;

const reloadAriaLive = (btn, area) => {
    const button = document.getElementById(btn);
    const canal = document.getElementById(area);

    button.addEventListener('click', function () {
        clearTimeout(timer);
        canal.innerHTML='';
        ariaLIve(0, area);
    }, false);
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
        }, Math.floor(Math.random() * 6000));
    }

    myLoop();
};

const liveRegionAtomic = (p, bp, bn) => {
    const paragraphe = document.getElementById(p);
    const buttonPrev = document.getElementById(bp);
    const buttonNext = document.getElementById(bn);

    buttonNext.addEventListener('click', function () {
        if (!this.hasAttribute("disabled")) {
            paragraphe.textContent = "21 à 40";
            buttonNext.setAttribute("disabled", "");
            buttonPrev.removeAttribute("disabled");
        }
    }, false);

    buttonPrev.addEventListener('click', function () {
        if (!this.hasAttribute("disabled")) {
            paragraphe.textContent = "1 à 20";
            buttonNext.removeAttribute("disabled");
            buttonPrev.setAttribute("disabled", "");
        }
    }, false);
};

const liveRegionAlert = () => {
    const button = document.getElementById("live-region-alert-button");
    const area = document.getElementById("live-region-alert");
    button.addEventListener('click', function () {
        area.style.display = "block";
    }, false);

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
        //bar.setAttribute("aria-valuetext", value +'%');
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

    run.addEventListener('click', function () {
        clearInterval(interval);
        resetProgressBar();
        interval = setInterval(startProgressBar, 2000);
    }, false);

};


document.addEventListener("DOMContentLoaded", function() {
    onChangeOnSelect();
    noOnChangeOnSelect();
    ccvaeu();
    coc();
    validateFeoForm();
    validateFeoForm2();
    MicroModal.init();
    reloadAriaLive('zl-reload', 'canal');
    liveRegionAtomic("live-region-atomic-false", "live-region-atomic-false-prev", "live-region-atomic-false-next");
    liveRegionAtomic("live-region-atomic-true", "live-region-atomic-true-prev", "live-region-atomic-true-next");
    liveRegionAtomic("live-region-status", "live-region-status-prev", "live-region-status-next");
    liveRegionAlert();
    reloadAriaLive('zl-reload-log', 'canal-log');
    progressbar();
});