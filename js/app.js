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

const reloadAriaLive = () => {
    const button = document.getElementById('zl-reload');
    const canal = document.getElementById('canal');

    button.addEventListener('click', function () {
        clearTimeout(timer);
        canal.innerHTML='';
        ariaLIve(0);
    }, false);
}

const ariaLIve = (i) => {
    const messagesArray = ["<p>Laura : Bonjour à tous.</p>","<p>Nicolas : Bonjour !</p>","<p>Laura : Question bête, comment fonctionne l'attribut aria-live ?</p>","<p>Nicolas : Voyons Laura, il n'y a pas de questions bêtes ici.</p>"];
    const canal = document.getElementById('canal');

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
}


document.addEventListener("DOMContentLoaded", function() {
    onChangeOnSelect();
    noOnChangeOnSelect();
    ccvaeu();
    validateFeoForm();
    validateFeoForm2();
    MicroModal.init();
    reloadAriaLive();
    liveRegionAtomic("live-region-atomic", "live-region-atomic-prev", "live-region-atomic-next");
    liveRegionAtomic("live-region-atomic2", "live-region-atomic-prev2", "live-region-atomic-next2");
});