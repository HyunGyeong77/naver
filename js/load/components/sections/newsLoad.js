export default function newsLoad() {
    const loadPage = async (mainPath, subPath) => {
        try {
            const response1 = await fetch(mainPath);
            const data1 = await response1.text();
            
            document.querySelector(".section-news").insertAdjacentHTML('beforeend', data1);

            const response2 = await fetch(subPath);
            const data2 = await response2.text();

            document.querySelector(".news-top").insertAdjacentHTML('beforeend', data2);
        } catch (error) {
            console.error("오류 발생: ", error);
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        loadPage('components/section/news/news.html', 'components/section/news/page/news-page1.html');
    });
}