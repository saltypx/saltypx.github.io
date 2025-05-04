document.addEventListener("DOMContentLoaded", function () {
    const headerBar = document.querySelector(".top-bar");
    const headerText = document.querySelector(".top-bar h1");
    const body = document.body;

    if (headerBar && headerText) {
        const baseFontSize = 30; // Base font size in pixels
        const maxFontSize = 60; // Maximum font size in pixels
        const baseHeight = 90; // Base height of the header bar in pixels
        const expandedHeight = 150; // Expanded height of the header bar in pixels
        const attractionSpeed = 0.1; // Slower speed for text to lag behind the cursor
        const heightSpeed = 0.4; // Faster speed for header bar height animation
        let targetFontSize = baseFontSize; // The desired font size
        let currentFontSize = baseFontSize; // The current font size
        let targetX = 0; // Target X position for the text
        let targetY = 0; // Target Y position for the text
        let currentX = 0; // Current X position for the text
        let currentY = 0; // Current Y position for the text
        let animationFrame;
        let isMouseOver = false; // Track whether the mouse is over the header bar

        // Smoothly animate the font size, position, and header bar height
        const animateHeader = () => {
            const currentHeight = parseFloat(getComputedStyle(headerBar).height);
            const currentFontSize = parseFloat(getComputedStyle(headerText).fontSize);

            // Gradually approach the target height and font size
            const newHeight = currentHeight + (isMouseOver ? expandedHeight - currentHeight : baseHeight - currentHeight) * heightSpeed;
            const newFontSize = currentFontSize + (targetFontSize - currentFontSize) * heightSpeed;

            // Gradually approach the target position for the text
            currentX += (targetX - currentX) * attractionSpeed;
            currentY += (targetY - currentY) * attractionSpeed;

            // Apply the new height, font size, and text position
            headerBar.style.height = `${newHeight}px`;
            headerText.style.fontSize = `${newFontSize}px`;
            headerText.style.transform = `translate(${currentX}px, ${currentY}px)`;

            // Adjust the body margin to match the header height
            body.style.marginTop = `${newHeight + 30}px`; // Push content farther down

            // Continue the animation loop
            animationFrame = requestAnimationFrame(animateHeader);
        };

        // Handle mouse or touch movement over the header bar
        const handleMove = (x, y) => {
            const rect = headerBar.getBoundingClientRect();
            targetX = x - (rect.left + rect.width / 2); // Horizontal offset
            targetY = y - (rect.top + rect.height / 2); // Vertical offset
        };

        // Handle mousemove event
        const handleMouseMove = (event) => {
            handleMove(event.clientX, event.clientY);
        };

        // Handle touchmove event
        const handleTouchMove = (event) => {
            const touch = event.touches[0]; // Get the first touch point
            handleMove(touch.clientX, touch.clientY);
        };

        // Handle mouse or touch enter on the header bar
        const handleEnter = () => {
            isMouseOver = true;
            targetFontSize = maxFontSize; // Increase font size
            cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(animateHeader);
        };

        // Handle mouse or touch leave from the header bar
        const handleLeave = () => {
            isMouseOver = false;
            targetFontSize = baseFontSize; // Reset font size
            targetX = 0; // Reset position
            targetY = 0; // Reset position
        };

        // Add event listeners for mouse
        headerBar.addEventListener("mousemove", handleMouseMove);
        headerBar.addEventListener("mouseenter", handleEnter);
        headerBar.addEventListener("mouseleave", handleLeave);

        // Add event listeners for touch
        headerBar.addEventListener("touchmove", handleTouchMove, { passive: false });
        headerBar.addEventListener("touchstart", (event) => {
            event.preventDefault();
            handleEnter();
        }, { passive: false });
        headerBar.addEventListener("touchend", handleLeave, { passive: false });
    }
});