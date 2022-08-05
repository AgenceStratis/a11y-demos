class animation {
    constructor(trigger, content) {
        this.trigger = trigger;
        this.content = content;
    }

    initialize = () => {
        let self = this;

        if (self.content) {
            self.trigger.addEventListener('click', (e) => {
                if (self.content.classList.contains('--stop')) {
                    self.trigger.textContent = self.trigger.getAttribute('data-trigger-play');
                    self.content.classList.remove('--stop');
                } else {
                    self.trigger.textContent = self.trigger.getAttribute('data-trigger-pause');
                    self.content.classList.add('--stop');
                }
            }, false);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const animationTrigger = document.getElementById("trigger-animation");
    const animationElement = document.getElementById("animation");
    if (animationTrigger && animationElement) {
        const playPauseAnimation = new animation(animationTrigger, animationElement);
        playPauseAnimation.initialize();
    }
});
