const insertHtml = (element, htmlString, position, incrementContent) => {
    if (incrementContent) {
        htmlString = parseInt(element.textContent) + 1;
        element.textContent = "";
    }
    element.insertAdjacentHTML(position, htmlString);

    return false;
};

const insertHtmlOnNonNativeElement = (event, key, element, htmlString, position, incrementContent) => {
    (event.keyCode === key) ? insertHtml(element, htmlString, position, incrementContent) : false;
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
