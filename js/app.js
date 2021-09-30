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
        console.log("inscription OK");
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

document.addEventListener("DOMContentLoaded", function() {
    onChangeOnSelect();
    noOnChangeOnSelect();
    ccvaeu();
    validateFeoForm();
    MicroModal.init();
});