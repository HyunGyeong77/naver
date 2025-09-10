export default function dialogInteraction() {
    const buttons = document.querySelector(".header-top").querySelectorAll('[class*="area"] button');
    let isOpen = false;

    buttons.forEach(item => {
        item.addEventListener("click", function() {
            const dialog = this.nextElementSibling;
            const tooltip = this.parentNode.querySelector(".tooltip");

            isOpen = !isOpen;
            this.setAttribute("aria-expanded", isOpen ? "true" : "false");

            if(isOpen) {
                tooltip.remove();
            }

            dialog.open = isOpen;
        });
    });
}