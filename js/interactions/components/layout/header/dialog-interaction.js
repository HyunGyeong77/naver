import {talkInteraction} from './modal/talk-interaction.js';
import {darkCheck} from '../../sections/floating-interaction.js';

export default function dialogInteraction() {
    const buttons = document.querySelector(".header-top").querySelectorAll('[class*=area] > button');
    let isOpen = Array.from(buttons.length).fill(false);

    const documentClick = (item, index) => (e) => {
        /** @type {HTMLElement} */
        const target = e.target;
        const dialog = item.nextElementSibling;
        const parent = item.parentNode;

        if(parent && dialog) {
            if(parent.contains(target)) return;

            item.setAttribute("aria-expanded", "false");
            isOpen[index] = false;
            dialog.remove();
        }
    }

    buttons.forEach((item, index) => {
        item.addEventListener("click", async function() {
            const response = await fetch(`components/header/${item.id}.html`);
            const data = await response.text();

            const tooltip = this.parentNode.querySelector(".tooltip");

            isOpen[index] = !isOpen[index];
            this.setAttribute("aria-expanded", isOpen[index] ? "true" : "false");

            if(isOpen[index]) {
                if(tooltip) {
                    tooltip.remove();
                }

                this.insertAdjacentHTML('afterend', data);
                document.addEventListener("click", documentClick(this, index));
                
                darkCheck();

                if(item.id.includes("talk")) {
                    talkInteraction(true);
                }
            } else {
                this.nextElementSibling.remove();
                document.removeEventListener("click", documentClick);

                if(item.id.includes("talk")) {
                    talkInteraction(false);
                }
            }
        });
    });
}