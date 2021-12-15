const insertHtml = (element, htmlString, position) => {
    element.insertAdjacentHTML(position, htmlString)
};

const onChangeOnSelect = () => {
    const select = document.getElementById('select');

    if (select) {
        select.addEventListener('change', () => {
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
        button.addEventListener('click', () => {
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

    button.addEventListener('click', () => {
        text.style.display = "block";
        form.style.display = "none";
        text.focus();
    }, false);
};

const coc = () => {
    const button = document.getElementById('coc-button');
    const text = document.getElementById('coc-text');

    button.addEventListener('click', () => {
        text.textContent = "Merci pour votre participation !";
        text.style.display = "block";
    }, false);
};

let timer;

const reloadAriaLive = (btn, area) => {
    const button = document.getElementById(btn);
    const canal = document.getElementById(area);

    button.addEventListener('click', () => {
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

    buttonNext.addEventListener('click', (event) => {
        if (!event.target.hasAttribute("disabled")) {
            paragraphe.textContent = "21 à 40";
            buttonNext.setAttribute("disabled", "");
            buttonPrev.removeAttribute("disabled");
        }
    }, false);

    buttonPrev.addEventListener('click', (event) => {
        if (!event.target.hasAttribute("disabled")) {
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

    run.addEventListener('click', () => {
        clearInterval(interval);
        resetProgressBar();
        interval = setInterval(startProgressBar, 2000);
    }, false);

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
        const alert = document.getElementById("zla-alert");
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

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            self.fields.forEach(field => {
               const input = document.getElementById(`${field}`);

               self.validateFields(input);
            });
        }, false);
    }

    validateOnEntry = () => {
        let self = this;

        this.fields.forEach(field => {
            const input = document.getElementById(`${field}`);

            input.addEventListener('input', event => {
                self.validateFields(input);
            });
        });
    }
}

const focusTrap = (element) => {
    const focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    const KEYCODE_TAB = 9;

    element.addEventListener('keydown', (e) => {
        const isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

        if (!isTabPressed) {
            return;
        }

        if ( e.shiftKey ) /* shift + tab */ {
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
            }
        } else /* tab */ {
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
            }
        }
    });
}

class disclosure {
    constructor(trigger, content) {
        this.trigger = trigger;
        this.content = content;
    }

    initialize = () => {
        let self = this;

        this.trigger.addEventListener('click', (e) => {
            if(e.target.getAttribute('aria-expanded') === 'false') {
                self.trigger.setAttribute('aria-expanded', 'true');
                self.trigger.parentNode.classList.add('--open');
            } else {
                self.trigger.setAttribute('aria-expanded', 'false');
                self.trigger.parentNode.classList.remove('--open');
            }
        }, false);
    }
}

class weatherOWM {
    constructor(wrapper, {
        appId = false,
        cityName = 'paris',
    }) {
        this.wrapper = wrapper;
        this.appId = appId;
        this.cityName = cityName;

        if (this.appId && this.cityName) {
            this.baseApiUrl = `//api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.appId}&lang=fr&units=metric`;
        }

        fetch(this.baseApiUrl)
            .then((resp) => resp.json()) // Transform the data into json
            .then((data) => {
                this.weatherToday(data);
            })
            .catch(function(error) {
                console.log('The JSON file could not be found. ');
                console.log(error);
            });
    }

    dirToStr = (d) => {
        const directions = ['Nord', 'Nord Est', 'Est', 'Sud Est', 'Sud', 'Sud Ouest', 'Ouest', 'Nord Ouest'];
        const directionsIcon = ['direction-up', 'direction-up-right', 'direction-right', 'direction-down-right', 'direction-down', 'direction-down-left', 'direction-left', 'direction-up-left'];
        d = d < 0 ?
            d = 360 - Math.abs(d) % 360
            : d % 360;
        return [`${directions[d / 45 | 0]}`,`${directionsIcon[d / 45 | 0]}`];
    }

    weatherToday = (data) => {
        this.wrapper.innerHTML = `
            Météo sur ${data.name} :
            ${data.weather[0].description}, ${Math.floor(data.main.temp)}°c,
            direction du vent :
            <i class="wi wi-${this.dirToStr(data.wind.deg)[1]}" aria-hidden="true"></i>
            <span class="sr-only">${this.dirToStr(data.wind.deg)[0]}</span>
        `;
    }
}

class Tooltip {
    constructor(element) {
        this.element = element;
        this.button = element.querySelector('button');
        this.tooltip = element.querySelector('[role=tooltip]');
        this.globalEscapeBound  = this.globalEscape.bind(this);
        this.bindEvents();
    }

    bindEvents() {
        this.element.addEventListener('mouseenter', this.open.bind(this));
        this.button.addEventListener('focus', this.open.bind(this));
        this.element.addEventListener('mouseleave', this.close.bind(this));
        this.button.addEventListener('blur', this.close.bind(this));
    }

    open() {
        this.showTooltip();
        this.attachGlobalListener();
    }

    close() {
        this.hideTooltip();
        this.removeGlobalListener();
    }

    attachGlobalListener() {
        document.addEventListener('keydown', this.globalEscapeBound);
    }

    removeGlobalListener() {
        document.removeEventListener('keydown', this.globalEscapeBound);
    }

    globalEscape(event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            this.close();
        }
    }

    showTooltip() {
        this.tooltip.removeAttribute('hidden');
    }

    hideTooltip() {
        this.tooltip.setAttribute('hidden', 'hidden');
    }
}

findNearestHeading = (el) => {
    if (el.previousElementSibling) {
        if (el.previousElementSibling.tagName === 'H2') {
            return el.previousElementSibling
        } else {
            return findNearestHeading(el.previousElementSibling);
        }
    } else if (el.parentElement) {
        return findNearestHeading(el.parentElement);
    } else {
        return null;
    }
}

/*
class MenuMainAnchor {
    constructor(menu, target) {
        this.menu = menu;
        this.target = target;
        this.init();
    }

    init() {
        const headings = document.querySelectorAll('h2:not(.demo h2), h3:not(.demo h3)');
        const anchors = [];

        headings.forEach(function(heading, index) {
            // heading name
            const headingName = heading.innerText;

            // heading anchor
            let anchorName = heading.getAttribute('id');
            if (!anchorName) {
                anchorName = `section${index}`;
                heading.setAttribute('id', anchorName);
            }

            // Parent
            let parent;
            let child;
            if (heading.nodeName === 'H2') {
                parent = 'root';
                child = true;
            } else if (heading.nodeName === 'H3') {
                parent = findNearestHeading(heading).getAttribute('id');
                child = false;
            }

            anchors.push({
                'name': headingName,
                'anchor': anchorName,
                'parent': parent,
                'haschildren': child
            });
        }, this);

        // console.log(anchors)

        const indexed = anchors.reduce(function(result, item) {
            result[item.anchor] = item;
            return result;
        }, {});

        const arr = [];

        const result = anchors.filter(function(item) {
            const root = indexed[item.parent];

            // delete item.parent;
            // delete item.haschildren;

            if(root) {
                // add item as a child
                root.children = (root.children || []).concat(item);

            }

            arr.push(parent);



            // This part determines if the item is a root item or not
            //return !parent;

        });

        console.log(arr)

        //console.log(arr)
        //const jsonTree = JSON.stringify(result, 0, 4);
        //console.log(jsonTree)

        function buildMenu(container, menu) {
            if (!menu || !menu.length) return;
            const ul = document.createElement("ul");

            for (const {name, children} of menu) {
                const li = document.createElement("li");
                li.textContent = name;
                li.className = "leaf";
                if (children) {
                    buildMenu(li, children, true);
                }
                ul.appendChild(li);
            }
            container.appendChild(ul);
        }

        buildMenu(document.getElementById("main-menu"), arr);

    }
}
*/


document.addEventListener("DOMContentLoaded", function ()  {
    onChangeOnSelect();
    noOnChangeOnSelect();
    ccvaeu();
    coc();
    MicroModal.init();
    reloadAriaLive('zl-reload', 'canal');
    liveRegionAtomic("live-region-atomic-false", "live-region-atomic-false-prev", "live-region-atomic-false-next");
    liveRegionAtomic("live-region-atomic-true", "live-region-atomic-true-prev", "live-region-atomic-true-next");
    liveRegionAtomic("live-region-status", "live-region-status-prev", "live-region-status-next");
    liveRegionAlert();
    reloadAriaLive('zl-reload-log', 'canal-log');
    progressbar();
    focusTrap(document.querySelector('.menu-focus-trap'));

    const form = document.getElementById("zla-form");
    const fields = ["zla-prenom", "zla-nom", "zla-email"];
    const validator = new formValidator(form, fields);
    validator.initialize();

    const menuLangsTrigger = document.getElementById("menu-langs__trigger");
    const menuLangsContent = document.getElementById("menu-langs__content");
    const menuLangDiscolsure = new disclosure(menuLangsTrigger, menuLangsContent);
    menuLangDiscolsure.initialize();

    const menuOrderTrigger = document.getElementById("menu-order__trigger");
    const menuOrderContent = document.getElementById("menu-order__content");
    const menuOrderDiscolsure = new disclosure(menuOrderTrigger, menuOrderContent);
    menuOrderDiscolsure.initialize();

    const wrapperWeather = document.getElementById('weather');
    const weather = new weatherOWM(wrapperWeather, {
        appId: "6c6a157ce2b7fc2f9a3707399c3b970a",
        cityName: "Paris",
    });

    Array.from(document.querySelectorAll('.tooltip-container')).forEach(element => new Tooltip(element));

    // const menuMainWrapper = document.getElementById('main-menu');
    // const menuMainContent = document.getElementById('menu-content');
    // const menuMain = new MenuMainAnchor(menuMainWrapper, menuMainContent);
});