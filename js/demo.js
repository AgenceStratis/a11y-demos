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
    runInterval = setInterval(function() {
        htmlString = htmlString + 1;
        insertText(document.getElementById(action), htmlString, 'afterbegin', incrementContent);
    }, 2000);
}
const stopAll = () => {
    clearInterval(runInterval);
}
