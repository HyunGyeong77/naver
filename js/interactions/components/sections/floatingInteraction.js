export default function floatingInteraction() {
    pageLoad();
    preferBtnClick();
    screenInfoBtnClick();
    preferTextBtnClick();
    preferScreenBtnClick();
}

function pageLoad() {
    const html = document.querySelector("html");
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if(prefersDarkMode) {
        html.setAttribute("dark-mode", true);
    } else {
        html.setAttribute("dark-mode", false);
    }
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

            const html = document.querySelector("html");

            if(item.className.includes("text")) {
                html.classList.remove("font-small", "font-normal", "font-large");

                switch(item.children[1].innerText) {
                    case "축소":
                        html.classList.add("font-small");
                        break;
                    case "기본":
                        html.classList.add("font-normal");
                        break;
                    case "확대":
                        html.classList.add("font-large");
                        break;
                }
            } else {
                switch(item.children[1].innerText) {
                    case "라이트 모드":
                        html.setAttribute("dark-mode", false);
                        break;
                    case "다크 모드":
                        html.setAttribute("dark-mode", true);
                        break;
                    case "기기 설정":
                        pageLoad();
                        break;
                }

                const advertImg = document.querySelector(".btm-advert").querySelector("img");

                if(html.getAttribute("dark-mode") === "true") {
                    advertImg.setAttribute("src", "assets/images/header-advert-dark.png");
                } else {
                    advertImg.setAttribute("src", "assets/images/header-advert.png");
                }
            }
        });
    })
}

function preferTextBtnClick() {
    handleSelectBtnClick(".prefer-text-btn");
}

function preferScreenBtnClick() {
    handleSelectBtnClick(".prefer-screen-btn");
}