

export default function newsInteraction() {
    menuClick();
}

function menuClick() {
    const buttons = document.querySelectorAll(".news-top ul button");

    const handleBtnClick = (e) => {
        /** @type {HTMLElement} */
        const target = e.currentTarget;
        const value = target.dataset.value;
        const sections = document.querySelectorAll(".news-top section");

        sections.forEach(item => {
            item.classList.toggle("none", !item.className.includes(value));
        });

        buttons.forEach(item => {
            item.classList.toggle("select", item === target);
        });
    }

    buttons.forEach(item => {
        item.addEventListener("click", handleBtnClick);
    });
}