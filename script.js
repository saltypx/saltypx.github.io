document.addEventListener("DOMContentLoaded", function () {
    const headerBar = document.querySelector(".top-bar");
    const headerText = document.querySelector(".top-bar h1");

    if (headerBar && headerText) {
        const baseFontSize = 20; // Base font size in pixels
        const maxFontSize = 40; // Maximum font size in pixels
        const attractionSpeed = 0.1; // Speed at which the text moves towards the touch/mouse
        let targetFontSize = baseFontSize; // The desired font size
        let currentFontSize = baseFontSize; // The current font size
        let targetX = 0; // Target X position for the text
        let targetY = 0; // Target Y position for the text
        let currentX = 0; // Current X position for the text
        let currentY = 0; // Current Y position for the text
        let animationFrame;

        // Prevent default touch behavior to avoid swipe-to-reload
        const preventDefaultTouch = (event) => {
            event.preventDefault();
        };

        // Smoothly animate the font size and position
        const animateText = () => {
            // Gradually approach the target font size
            currentFontSize += (targetFontSize - currentFontSize) * 0.1;

            // Gradually approach the target position
            currentX += (targetX - currentX) * attractionSpeed;
            currentY += (targetY - currentY) * attractionSpeed;

            // Apply the font size and position
            headerText.style.fontSize = currentFontSize + "px";
            headerText.style.transform = `translate(${currentX}px, ${currentY}px)`;

            // Continue the animation loop
            animationFrame = requestAnimationFrame(animateText);
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
            targetFontSize = maxFontSize; // Increase font size
            cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(animateText);
        };

        // Handle mouse or touch leave from the header bar
        const handleLeave = () => {
            targetFontSize = baseFontSize; // Reset font size
            targetX = 0; // Reset position
            targetY = 0; // Reset position
        };

        // Add event listeners for mouse
        headerBar.addEventListener("mousemove", handleMouseMove);
        headerBar.addEventListener("mouseenter", handleEnter);
        headerBar.addEventListener("mouseleave", handleLeave);

        // Add event listeners for touch
        headerBar.addEventListener("touchmove", handleTouchMove);
        headerBar.addEventListener("touchstart", handleEnter);
        headerBar.addEventListener("touchend", handleLeave);

        // Prevent swipe-to-reload behavior
        headerBar.addEventListener("touchstart", preventDefaultTouch, { passive: false });
        headerBar.addEventListener("touchmove", preventDefaultTouch, { passive: false });
    }
});