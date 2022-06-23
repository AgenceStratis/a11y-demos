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
    element.classList.contains('checked') ? element.classList.remove('checked') : element.classList.add('checked');
};

const checkRadioCheckboxOnNonNativeElement = (event, key, element) => {
    (event.keyCode === key) ? checkRadioCheckbox(element) : false;
};
