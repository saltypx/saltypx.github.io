document.addEventListener("DOMContentLoaded", function () {
    const headerBar = document.querySelector(".top-bar");
    const headerText = document.querySelector(".top-bar h1");
    const body = document.body;

    if (headerBar && headerText) {
        const baseFontSize = 30;
        const maxFontSize = 60;
        const baseHeight = 90;
        const expandedHeight = 150;
        const attractionSpeed = 0.1;
        const heightSpeed = 0.4;
        let targetFontSize = baseFontSize;
        let currentFontSize = baseFontSize;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        let animationFrame;
        let isMouseOver = false;

        const animateHeader = () => {
            const currentHeight = parseFloat(getComputedStyle(headerBar).height);
            const currentFontSize = parseFloat(getComputedStyle(headerText).fontSize);

            const newHeight = currentHeight + (isMouseOver ? expandedHeight - currentHeight : baseHeight - currentHeight) * heightSpeed;
            const newFontSize = currentFontSize + (targetFontSize - currentFontSize) * heightSpeed;

            currentX += (targetX - currentX) * attractionSpeed;
            currentY += (targetY - currentY) * attractionSpeed;

            headerBar.style.height = `${newHeight}px`;
            headerText.style.fontSize = `${newFontSize}px`;
            headerText.style.transform = `translate(${currentX}px, ${currentY}px)`;

            body.style.marginTop = `${newHeight + 30}px`;
            animationFrame = requestAnimationFrame(animateHeader);
        };

         const handleMove = (x, y) => {
            const rect = headerBar.getBoundingClientRect();
            targetX = x - (rect.left + rect.width / 2);
            targetY = y - (rect.top + rect.height / 2);
        };

       const handleMouseMove = (event) => {
            handleMove(event.clientX, event.clientY);
        };

        const handleTouchMove = (event) => {
            const touch = event.touches[0];
            handleMove(touch.clientX, touch.clientY);
        };

        const handleEnter = () => {
            isMouseOver = true;
            targetFontSize = maxFontSize;
            cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(animateHeader);
        };

        const handleLeave = () => {
            isMouseOver = false;
            targetFontSize = baseFontSize;
            targetX = 0;
            targetY = 0;
        };

        headerBar.addEventListener("mousemove", handleMouseMove);
        headerBar.addEventListener("mouseenter", handleEnter);
        headerBar.addEventListener("mouseleave", handleLeave);

        headerBar.addEventListener("touchmove", handleTouchMove, { passive: false });
        headerBar.addEventListener("touchstart", (event) => {
            event.preventDefault();
            handleEnter();
        }, { passive: false });
        headerBar.addEventListener("touchend", handleLeave, { passive: false });
    }
});