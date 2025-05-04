document.addEventListener("DOMContentLoaded", function () {
    const headerBar = document.querySelector(".top-bar");
    const headerText = document.querySelector(".top-bar h1");

    if (headerBar && headerText) {
        const baseFontSize = 20; // Base font size in pixels
        const maxFontSize = 40; // Maximum font size in pixels
        const attractionSpeed = 0.1; // Speed at which the text moves towards the mouse
        let targetFontSize = baseFontSize; // The desired font size
        let currentFontSize = baseFontSize; // The current font size
        let targetX = 0; // Target X position for the text
        let targetY = 0; // Target Y position for the text
        let currentX = 0; // Current X position for the text
        let currentY = 0; // Current Y position for the text
        let animationFrame;

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

        // Handle mouse movement over the header bar
        const handleMouseMove = (event) => {
            const rect = headerBar.getBoundingClientRect();
            targetX = event.clientX - (rect.left + rect.width / 2); // Horizontal offset
            targetY = event.clientY - (rect.top + rect.height / 2); // Vertical offset
        };

        // Handle mouse enter on the header bar
        const handleMouseEnter = () => {
            targetFontSize = maxFontSize; // Increase font size
            cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(animateText);
        };

        // Handle mouse leave from the header bar
        const handleMouseLeave = () => {
            targetFontSize = baseFontSize; // Reset font size
            targetX = 0; // Reset position
            targetY = 0; // Reset position
        };

        // Add event listeners
        headerBar.addEventListener("mousemove", handleMouseMove);
        headerBar.addEventListener("mouseenter", handleMouseEnter);
        headerBar.addEventListener("mouseleave", handleMouseLeave);
    }
});