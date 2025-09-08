import newsLoad from './components/sections/newsLoad.js';

export default function initLoads() {
    newsLoad();
    
    setTimeout(() => {
        document.querySelector("body").removeAttribute('class');
    }, 40);
}