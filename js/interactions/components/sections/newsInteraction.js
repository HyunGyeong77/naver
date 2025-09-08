

export default function newsInteraction() {
    menuClick();
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
                newDivs.forEach(item => item.classList.add("hidden"));

                newDivs.forEach(item => console.log(item.className));

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