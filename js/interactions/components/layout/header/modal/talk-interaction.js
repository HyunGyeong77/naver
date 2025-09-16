
let sectionStartX;
let headerStartX;

export function talkInteraction() {
    const menu = document.querySelectorAll(".flicking-menu");

    mouseEventRegistration(menu[1], sectionStartX);
    mouseEventRegistration(menu[0], headerStartX);
    scrollEvent(menu);
}

export function mouseEventRegistration(target, startX) {
    const handleMouseDown = (e) => {
        const {clientX, currentTarget} = e;
        startX = clientX;

        currentTarget.addEventListener("mousemove", handleMouseMove);
    }

    const handleMouseMove = (e) => {
        const {clientX, currentTarget} = e;
        const child = currentTarget.children[0];
        const moveValue = (startX - clientX) > 0 ? -3 : 3;
        let translateX = Number(getComputedStyle(child).getPropertyValue("--translateX").replace("px", ""));
        translateX += moveValue;

        if(translateX > 0) {
            translateX = 0;
        }
        
        if(translateX < -64) {
            translateX = -64;
        }

        child.style.setProperty("--translateX", `${translateX}px`);
        document.addEventListener("mouseup", handleMouseUp);
    }

    const handleMouseUp = (e) => {
        e.currentTarget.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    target.addEventListener("mousedown", handleMouseDown);
}

function scrollEvent(menu) {
    const dialog = document.querySelector(".talk-dialog");
    const scroll = dialog.children[0];

    let isProgress = false;

    const handleScroll = () => {
        if(isProgress) return;
        isProgress = true;

        requestAnimationFrame(() => {
            const menuRect =  menu[1].getBoundingClientRect().top;
            menu[0].classList.toggle("open", menuRect < 85);
            isProgress = false;
        });
    }

    scroll.addEventListener("scroll", handleScroll);
}