

export default function newsInteraction() {
    menuClick();
}

function menuClick() {
    const buttons = document.querySelectorAll(".section-news ul button");

    const handleBtnClick = (e) => {
        /** @type {HTMLElement} */
        const target = e.currentTarget;
        const value = target.dataset.value;

        buttons.forEach(item => {
            item.classList.toggle("select", item === target);
        })

        const pageChange = async (mainPath, subPath) => {
            try {
                const response1 = await fetch(mainPath);
                const data1 = await response1.text();

                document.querySelector(".section-news").insertAdjacentHTML('beforeend', data1);

                const response2 = await fetch(subPath);
                const data2 = await response2.text();

                document.querySelector(`.${value}-top`).insertAdjacentHTML('beforeend', data2);
            } catch (error) {
                console.error("오류 발생 :", error);
            }
        }
        
        document.querySelectorAll(".section-news div").forEach(item => {
            item.remove();
        });

        pageChange(`components/section/news/${value}.html`, `components/section/news/page/${value}-page1.html`);
    }

    buttons.forEach(item => {
        item.addEventListener("click", handleBtnClick);
    });
}