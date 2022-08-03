const ccvaeu = () => {
    const button = document.getElementById('ccvaeu-button');
    const text = document.getElementById('ccvaeu-text');
    const form = document.getElementById('ccvaeu-form');

    if (button) {
        button.addEventListener('click', () => {
            text.style.display = "block";
            form.style.display = "none";
            text.focus();
        }, false);
    }
};

document.addEventListener("DOMContentLoaded", function ()  {
    ccvaeu();
});
