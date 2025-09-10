import newsLoad from './components/sections/news-load.js';

export default function initLoads() {
    newsLoad();
    
    setTimeout(() => {
        document.querySelector("body").removeAttribute('class');
    }, 40);
}