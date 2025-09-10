export default function floatingInteraction() {
    screenInfoBtnClick();
    prefer();
}

export const darkCheck = () => {
    const html = document.querySelector("html");

    const darkImg = (element, path) => {
        if(html.getAttribute("dark-mode") === "true") {
            element.setAttribute("src", "assets/images/" + path + "-dark.png");
        } else {
            element.setAttribute("src", "assets/images/" + path + ".png");
        }
    }

    const arrImgsPush = (className, element) => {
        document.querySelectorAll(className).forEach(item => {
            element.push(item.querySelector("img"));
        });
    }
    const stockImg = [];
    const newsImg = [];
    const newsPaths = [
        "sports-chosun", "moneytoday", "daily-sports", "mbc",
        "channel", "ohmynews", "segye-ilbo", "asiatoday", "pressian",
        "herald", "korean-economy", "nocutnews", "joongang-daily",
        "jtbc", "seoul-economy", "gyeonggi-ilbo", "gyeongin-ilbo",
        "incheon-ilbo", "kyunghyang", "newdaily", "newsen", "daily-economy",
        "ebs", "korea-ilbo"
    ]
    
    arrImgsPush(".stock-link", stockImg);
    arrImgsPush(".news-link", newsImg);

    const newsPageList = document.querySelector(".news-page-list");

    if(newsPageList) {
        const img = newsPageList.querySelector(".newsstand");
        let fileName = img.getAttribute("src").split("/").pop().split(".")[0];

        if(fileName.includes("-dark")) {
            fileName = fileName.split("-dark").shift();
        }

        darkImg(img, fileName);
    }

    const headerAdvertImg = document.querySelector(".btm-advert").querySelector("img");
    darkImg(headerAdvertImg, "header-advert");
    darkImg(stockImg[0], "section-usd");
    newsImg.map((item, index) => {
        darkImg(item, newsPaths[index]);
    });
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