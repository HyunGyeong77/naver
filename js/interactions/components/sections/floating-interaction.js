export default function floatingInteraction() {
    screenInfoBtnClick();
    prefer();
}

export const darkCheck = () => {
    const html = document.querySelector("html");
    const imgs = [];

    const darkImgChange = (img) => {
        const src = img.getAttribute("src");
        let fileName = src.split("/").pop().split(".")[0];
        const extension = src.split("/").pop().split(".")[1];
        const path = src.split("/")[1];

        if(fileName.includes("-dark")) {
            fileName = fileName.split("-dark").shift();
        }

        if(html.getAttribute("dark-mode") === "true") {
            img.setAttribute("src", `assets/${path}/${fileName}-dark.${extension}`);
        } else {
            img.setAttribute("src", `assets/${path}/${fileName}.${extension}`);
        }
    }

    const arrImgsPush = (className, element) => {
        document.querySelectorAll(className).forEach(item => {
            element.push(item.querySelector("img"));
        });
    }
    
    arrImgsPush(".stock-link", imgs);
    arrImgsPush(".news-link", imgs);

    const hamburgerDialog = document.querySelector(".hamburger-dialog");
    if(hamburgerDialog) {
        const dialogImgs = hamburgerDialog.querySelectorAll('[class*=wrap] > img');

        dialogImgs.forEach(item => {
            imgs.push(item);
        });
    }

    const talkDialog = document.querySelector(".talk-dialog");
    if(talkDialog) {
        const bannerImg = talkDialog.querySelector(".opentalk-banner img");
        const talktip = talkDialog.querySelector(".talk-tip img");
        const highlightImg = talkDialog.querySelector(".highlight-header img");
        imgs.push(bannerImg, talktip, highlightImg);
    }

    const newsPageList = document.querySelector(".news-page-list");
    if(newsPageList) {
        const img = newsPageList.querySelector(".newsstand");
        imgs.push(img);
    }

    const headerAdvertImg = document.querySelector(".btm-advert").querySelector("img");
    if(headerAdvertImg) {
        imgs.push(headerAdvertImg);
    }

    imgs.map(item => {
        darkImgChange(item);
    })
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

function prefer() {
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
                    const html = document.querySelector("html");
                    const darkmode = html.getAttribute("dark-mode");

                    switch(item.children[1].innerText) {
                        case "라이트 모드":
                            if(darkmode === "false") return;

                            html.setAttribute("dark-mode", false);
                            break;
                        case "다크 모드":
                            if(darkmode === "true") return;

                            html.setAttribute("dark-mode", true);
                            break;
                        case "기기 설정":
                            const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

                            if(darkmode === prefersDarkMode.toString()) return;

                            if(prefersDarkMode) {
                                html.setAttribute("dark-mode", true);
                            } else {
                                html.setAttribute("dark-mode", false);
                            }
                            break;
                    }

                    darkCheck();
                }
            });
        })
    }

    const preferTextBtnClick = () => {
        handleSelectBtnClick(".prefer-text-btn");
    }

    const preferScreenBtnClick = () => {
        handleSelectBtnClick(".prefer-screen-btn");
    }

    const preferBtnClick = () => {
        let isModal = {value: false};

        handleModalClick(".prefer-btn", "prefer-dialog", isModal);
    }

    preferTextBtnClick();
    preferScreenBtnClick();
    preferBtnClick();
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