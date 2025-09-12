

export default function tooltipInteraction() {
    headerToolTip();
    newsToolTip();
}

function headerToolTip() {
    const area = document.querySelector(".header-top").querySelectorAll('[class*=area]');
    const areaTxt = ["바로가기", "네이버페이", "네이버톡", "알림", "장바구니"];
    let timer;

    const handleBtnEnter = (txt, index) => (e) => {
        /** @type {HTMLElement} */
        const target = e.currentTarget;
        
        if(target.children[0] instanceof HTMLButtonElement &&
            target.children[0].getAttribute("aria-expanded") === "true") return;

        if(target.querySelector(".tooltip")) return;
        if(timer) clearTimeout(timer);

        timer = setTimeout(() => {
            const div = document.createElement("div");
            div.textContent = txt[index];
            div.className = "tooltip";

            target.insertAdjacentElement('beforeend', div);
        }, 100);
    }

    const handleBtnLeave = (e) => {
        if(timer) clearTimeout(timer);

        /** @type {HTMLElement} */
        const tooltip = e.currentTarget.parentNode.querySelector(".tooltip");

        if(tooltip) {
            tooltip.remove();
        }
    }

    area.forEach((item, index) => {
        item.addEventListener("mouseenter", handleBtnEnter(areaTxt, index));
        item.addEventListener("mouseleave", handleBtnLeave);
    });

    const buttons = document.querySelector(".header-top").querySelectorAll('[class*=area] > button');
    const aTags = document.querySelector(".header-top").querySelectorAll('[class*=area] > a');
    const buttonsTxt = areaTxt.filter((_, index) => index !== 1 && index !== 4);
    const aTagsTxt = areaTxt.filter((_, index) => index === 1 || index === 4);

    const handleFocus = (txt, index) => (e) => {
        /** @type {HTMLElement} */
        const target = e.currentTarget;
        const parent = target.parentNode;
    
        if(parent.querySelector(".tooltip") || target.getAttribute("aria-expanded") === "true") return;
    
        const div = document.createElement("div");
        div.textContent = txt[index];
        div.className = "tooltip";
    
        parent.insertBefore(div, target);
    }
    
    const handleBlur = (e) => {
        const tooltip = e.currentTarget.parentNode.querySelector(".tooltip");
    
        if(tooltip) {
            tooltip.remove();
        }
    }

    const initEventListener = (item, txt, index) => {
        item.addEventListener("focus", handleFocus(txt, index));
        item.addEventListener("blur", handleBlur);
    }

    buttons.forEach((item, index) => {
        initEventListener(item, buttonsTxt, index);
    });

    aTags.forEach((item, index) => {
        initEventListener(item, aTagsTxt, index);
    });
}

function newsToolTip() {
    const buttons = document.querySelector(".section-news ul").querySelector("li:first-child").querySelectorAll("button");
    const buttonsTxt = [
        "예전 PC와 동일한 방식으로 보기",
        "모바일과 동일한 방식으로 보기"
    ];

    const handleBtnEnter = (index) => (e) => {
        /** @type {HTMLElement} */
        const target = e.currentTarget;

        if(target.querySelector(".tooltip")) return;

        const span = document.createElement("span");
        span.textContent = buttonsTxt[index];
        span.className = "tooltip";

        target.appendChild(span);
    }

    const handleBtnLeave = (e) => {
        const tooltip = e.currentTarget.querySelector(".tooltip");

        if(tooltip) {
            tooltip.remove();
        }
    }

    buttons.forEach((item, index) => {
        item.addEventListener("mouseenter", handleBtnEnter(index));
        item.addEventListener("mouseleave", handleBtnLeave);
        item.addEventListener("focus", handleBtnEnter(index));
        item.addEventListener("blur", handleBtnLeave);
    });
}