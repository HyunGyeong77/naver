export default function floatingInteraction() {
    preferBtnClick();
    screenInfoBtnClick();
    preferTextBtnClick();
    preferScreenBtnClick();
}

const handleModalClick = (classBtn, classDialog, isModal) => {
    const button = document.querySelector(classBtn);

    button.addEventListener("click", () => {
        const dialog = document.getElementById(classDialog);

        isModal.value = !isModal.value;
        button.classList.toggle("modalOpen", isModal.value);
        dialog.open = isModal.value;

        const handleDocumentClick = (e) => {
            if(e.target.className.includes("prefer-btn") || e.target.closest("#prefer-dialog")) {
                return;
            }

            isModal.value = false;
            button.classList.toggle("modalOpen", isModal.value);
            dialog.open = isModal.value;
        }

        if(isModal.value) {
            document.addEventListener("click", handleDocumentClick);
        } else {
            document.removeEventListener("click", handleDocumentClick);
        }
    });
}

function preferBtnClick() {
    let isModal = {value: false};

    handleModalClick(".prefer-btn", "prefer-dialog", isModal);
}

function screenInfoBtnClick() {
    const dialog = document.getElementById("screen-style-info-dialog");
    const closeBtn = dialog.querySelector("button");
    let isModal = {value: false};

    closeBtn.addEventListener("click", () => {
        isModal.value = false;
        dialog.open = false;
    });

    handleModalClick(".screen-style-info-btn", "screen-style-info-dialog", isModal);
}

const handleSelectBtnClick = (classBtn) => {
    const btns = document.querySelectorAll(classBtn);

    btns.forEach(item => {
        item.addEventListener("click", () => {
            btns.forEach(item => {
                item.classList.remove("select");
            });

            item.classList.add("select");

            console.log(item);
        });
    })
}

function preferTextBtnClick() {
    handleSelectBtnClick(".prefer-text-btn");
}

function preferScreenBtnClick() {
    handleSelectBtnClick(".prefer-screen-btn");
}