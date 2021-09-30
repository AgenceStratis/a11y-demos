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

document.addEventListener("DOMContentLoaded", function() {
    onChangeOnSelect();
    noOnChangeOnSelect();
    ccvaeu();
    MicroModal.init();
});