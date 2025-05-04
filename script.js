document.addEventListener("DOMContentLoaded", function () {
    const topBar = document.querySelector(".top-bar");
    const slider = document.querySelector("#header-height-slider");
    const headerText = document.querySelector(".top-bar h1");

    if (topBar) {
        // Set initial margin-top for the body
        const setBodyMargin = () => {
            const topBarHeight = topBar.offsetHeight;
            document.body.style.marginTop = topBarHeight + "px";
        };

        // Adjust font size of the h1 to fit the header height
        const adjustFontSize = () => {
            const topBarHeight = topBar.offsetHeight;
            if (headerText) {
                headerText.style.fontSize = (topBarHeight * 0.5) + "px"; // Adjust font size (50% of header height)
            }
        };

        // Initial adjustments
        setBodyMargin();
        adjustFontSize();

        // Update header height and font size dynamically when slider is moved
        if (slider) {
            slider.addEventListener("input", function () {
                topBar.style.height = this.value + "px";
                setBodyMargin(); // Adjust body margin dynamically
                adjustFontSize(); // Adjust font size dynamically
            });
        }
    }
});