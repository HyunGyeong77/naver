

export default function tooltipInteraction() {
    headerToolTip();
}

function headerToolTip() {
    const buttons = document.querySelector(".header-top").querySelectorAll('[class*="area"] button');
    const aTags = document.querySelector(".header-top").querySelectorAll('[class*="area"] a');
    const buttonsTxt = ["바로가기", "네이버톡", "알림"];
    const aTagsTxt = ["네이버페이", "장바구니"]

    const handleAreaMouseEnter = (txt, index) => (e) => {
        /** @type {HTMLElement} */
        const target = e.currentTarget;

        if(target.parentNode.querySelector(".tooltip")) return;

        const div = document.createElement("div");
        div.textContent = txt[index];
        div.className = "tooltip";

        target.parentNode.insertBefore(div, target);
    }

    const handleAreaMouseLeave = (e) => {
        /** @type {HTMLElement} */
        const tooltip = e.currentTarget.parentNode.querySelector(".tooltip");

        if(tooltip) {
            tooltip.remove();
        }
    }

    const initEventListener = (element, txt, index) => {
        element.addEventListener("mouseenter", handleAreaMouseEnter(txt, index));
        element.addEventListener("mouseleave", handleAreaMouseLeave);
        element.addEventListener("focus", handleAreaMouseEnter(txt, index));
        element.addEventListener("blur", handleAreaMouseLeave);
    }

    buttons.forEach((item, index) => {
        initEventListener(item, buttonsTxt, index);
    });

    aTags.forEach((item, index) => {
        initEventListener(item, aTagsTxt, index);
    })
}