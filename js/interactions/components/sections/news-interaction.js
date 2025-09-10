import {darkCheck} from './floating-interaction.js';

export default function newsInteraction() {
    menuClick();
    listClick();
}

function menuClick() {
    const buttons = document.querySelectorAll(".section-news ul button");
    let latestButtonValue = "news";

    const handleBtnClick = (e) => {
        /** @type {HTMLElement} */
        const target = e.currentTarget;
        const value = target.dataset.value;

        if(latestButtonValue === value) return;

        buttons.forEach(item => {
            item !== target ? item.setAttribute("aria-selected", false) : item.setAttribute("aria-selected", true);
            item.classList.toggle("select", item === target);
        });

        const pageChange = async (mainPath, subPath) => {
            try {
                const response1 = await fetch(mainPath);
                const data1 = await response1.text();

                document.querySelector(".section-news").insertAdjacentHTML('beforeend', data1);

                const response2 = await fetch(subPath);
                const data2 = await response2.text();

                document.querySelector(`.${value}-top`).insertAdjacentHTML('beforeend', data2);

                const sectionNewsChildren = Array.from(document.querySelector(".section-news").children);
                const filterChildren = sectionNewsChildren.slice(1);
                const oldDivs = filterChildren.filter(item => !item.className.includes(value));
                const newDivs = filterChildren.filter(item => item.className.includes(value));
                
                darkCheck();
                newDivs.forEach(item => item.classList.add("hidden"));

                if(value === "news") {
                    listClick();
                }

                requestAnimationFrame(() => {
                    oldDivs.forEach(item => item.remove());
                    newDivs.forEach(item => item.classList.remove("hidden"));
                    latestButtonValue = value;
                });
            } catch (error) {
                console.error("오류 발생 :", error);
            }
        }

        pageChange(`components/section/news/${value}.html`, `components/section/news/page/${value}-page1.html`);
    }

    buttons.forEach(item => {
        item.addEventListener("click", handleBtnClick);
    });
}

function listClick() {
    setTimeout(() => {
        const newsList = document.querySelector(".news-list");
        const newsThumbnail = document.querySelector(".news-thumbnail");

        const ariaChecked = (checkEle, notCheckEle) => {
            checkEle.setAttribute("aria-checked", true);
            notCheckEle.setAttribute("aria-checked", false);
        }

        const newsBtmChange = (title, totalPage) => {
            const btmTitle = document.querySelector(".news-btm-title");
            const btmTotalPage = document.querySelector(".news-btm-total-page");

            btmTitle.textContent = title;
            btmTotalPage.textContent = totalPage;
        }

        newsList.addEventListener("click", function() {
            if(this.getAttribute("aria-checked") === "true") return;

            const pageChange = async (mainPath, subPath, del) => {
                const response1 = await fetch(mainPath);
                const data1 = await response1.text();

                const newsTop = document.querySelector(".news-top");
                newsTop.insertAdjacentHTML('beforeend', data1);

                const response2 = await fetch(subPath);
                const data2 = await response2.text();

                const newPage = document.querySelector(".news-page-list");
                newPage.insertAdjacentHTML('beforeend', data2);

                newPage.classList.add("hidden");

                const newPageTypeBtn = newPage.querySelectorAll("ul button");

                newPageTypeBtn.forEach(item => {
                    item.addEventListener("click", function() {
                        Array.from(newPageTypeBtn).filter(item => item !== this).forEach(item => item.setAttribute("aria-selected", false));
                        this.setAttribute("aria-selected", true);

                        const dataValue = this.getAttribute("data-value");

                        const pageChange = async (mainPath) => {
                            const response = await fetch(mainPath);
                            const data = await response.text();

                            const newsPageList = document.querySelector(".news-page-list");
                            newsPageList.insertAdjacentHTML('beforeend', data);

                            const newPage = newsPageList.querySelector(`.news-list-${dataValue}1`);
                            newPage.classList.add("hidden");

                            requestAnimationFrame(() => {
                                const oldDiv = newsPageList.children[1];
                                oldDiv.remove();

                                darkCheck();

                                const btmTitle = document.querySelector(".news-btm-title");
                                const btmTotalPage = document.querySelector(".news-btm-total-page");

                                btmTitle.textContent = this.textContent + btmTitle.textContent.replace(btmTitle.textContent.split(" ")[0], "");
                                btmTotalPage.textContent = this.getAttribute("data-total-number");

                                newPage.classList.remove("hidden");
                            });
                        }

                        pageChange(`components/section/news/page/list/news-list-${dataValue}1.html`);
                    });
                });

                darkCheck();

                requestAnimationFrame(() => {
                    newsTop.querySelector(del).remove();
                    newPage.classList.remove("hidden");
                    newsBtmChange("종합/경제 언론사 뉴스", "/83");
                });
            }

            ariaChecked(this, newsThumbnail);
            pageChange("components/section/news/page/news-page-list.html", "components/section/news/page/list/news-list-economy1.html", ".news-page");
        });

        newsThumbnail.addEventListener("click", function() {
            if(this.getAttribute("aria-checked") === "true") return;

            const pageChange = async (mainPath, del) => {
                const response = await fetch(mainPath);
                const data = await response.text();

                const newsTop = document.querySelector(".news-top");
                newsTop.insertAdjacentHTML('beforeend', data);

                const newPage = newsTop.querySelector(".news-page");
                newPage.classList.add("hidden");

                darkCheck();

                requestAnimationFrame(() => {
                    newsTop.querySelector(del).remove();
                    newPage.classList.remove("hidden");
                    newsBtmChange("언론사", "/4");
                });
            }

            ariaChecked(this, newsList);
            pageChange("components/section/news/page/news-page1.html", ".news-page-list");
        })
    }, 20);
}