

export function talkInteraction(boolean) {
    const menu = document.querySelector(".flicking-menu");
    let startX;

    const handleMouseDown = (e) => {
        const {clientX} = e;
        startX = clientX;

        console.log("e");

        menu.addEventListener("mousemove", handleMouseMove);
    }

    const handleMouseMove = (e) => {
        const {clientX} = e;
        const child = menu.children[0];
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
        console.log(translateX, moveValue);
        
        document.addEventListener("mouseup", handleMouseUp);
    }

    const handleMouseUp = () => {
        menu.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    boolean ? menu.addEventListener("mousedown", handleMouseDown) : menu.removeEventListener("mousedown", handleMouseDown);
}