/* Insert text and HTML */
const insertText = (element, htmlString, position, incrementContent) => {
    if (incrementContent) {
        htmlString = htmlString || parseInt(element.textContent) + 1;
        element.textContent = "";
    }
    element.insertAdjacentHTML(position, htmlString);
};

const insertTextOnNonNativeElement = (event, key, element, htmlString, position, incrementContent) => {
    (event.keyCode === key) ? insertText(element, htmlString, position, incrementContent) : false;
};

const checkRadioCheckbox = (element) => {
    if (element.classList.contains('checked')) {
        element.classList.remove('checked');
        element.setAttribute('aria-checked', 'false');
    } else {
        element.classList.add('checked');
        element.setAttribute('aria-checked', 'true');
    }
};

const checkRadioCheckboxOnNonNativeElement = (event, key, element) => {
    (event.keyCode === key) ? checkRadioCheckbox(element) : false;
};

/* Live interval */
let runInterval;

const runLiveMessage = (htmlString, incrementContent, action, targetId) => {
    if (!targetId) return false;

    document.getElementById(targetId).focus();
    stopAll();
    runInterval = setInterval(function () {
        htmlString = htmlString + 1;
        insertText(document.getElementById(action), htmlString, 'afterbegin', incrementContent);
    }, 2000);
}
const stopAll = () => {
    clearInterval(runInterval);
}

/* Expand collapse content */
const expandContent = (element, target, isAria) => {
    let targetElement = document.getElementById(target),
        isExpanded = targetElement.getAttribute('hidden') === null,
        iconStatusChild = element.querySelector('.iconstatus'),
        moveFocusToElement = document.getElementById(element.getAttribute('data-focus'));

    if (isExpanded) {
        if (isAria) {
            element.setAttribute('aria-expanded', 'false');
            iconStatusChild.textContent = '▼';
        }
        targetElement.setAttribute('hidden', 'hidden');
    } else {
        if (isAria) {
            element.setAttribute('aria-expanded', 'true');
            iconStatusChild.textContent = '▲';
        }
        targetElement.removeAttribute('hidden');
    }

    if (!isAria) {
        moveFocusToElement.removeAttribute('hidden');
        moveFocusToElement.focus();
        element.setAttribute('hidden', 'hidden');
    }
};

/* Pressed button */
const selectBtn = (element, isAria) => {
    let parent = element.closest('.tabs'),
        children = parent.querySelectorAll('.tab');

    for (let i = 0; i < children.length; i++) {
        children[i].classList.remove('--is-selected');
        if (isAria) {
            children[i].setAttribute('aria-pressed', 'false');
        } else {
            children[i].querySelector('.status').textContent = 'non-enfoncé';
        }
    }
    if (isAria) {
        element.setAttribute('aria-pressed', 'true');
    } else {
        element.querySelector('.status').textContent = 'enfoncé';
    }
    element.classList.add('--is-selected');
};

/* Invalid field form */
const checkField = (field) => {
    let myField = document.getElementById(field),
        errorMessageElement = document.getElementById(myField.getAttribute('aria-errormessage')) || document.getElementById(myField.getAttribute('aria-describedby')) || document.getElementById(myField.getAttribute('data-describedby')),
        errorMessage = myField.getAttribute('data-errormessage');

    errorMessageElement.textContent = errorMessage;
    errorMessageElement.removeAttribute('hidden');
    myField.setAttribute('aria-invalid', 'true');
    myField.focus();
};

const clearErrorMessage = (field) => {
    let errorMessageElement = document.getElementById(field.getAttribute('aria-errormessage')) || document.getElementById(field.getAttribute('aria-describedby')) || document.getElementById(field.getAttribute('data-describedby'));

    errorMessageElement.textContent = "";
    field.setAttribute('aria-invalid', 'true');
};
