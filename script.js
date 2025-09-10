const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle) {
    // Set theme based on saved preference or system default
    (() => {
        const savedTheme = localStorage.getItem("theme");
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        const isDarkTheme = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
        document.body.classList.toggle("dark-theme", isDarkTheme);
        const icon = themeToggle.querySelector("i");
        if (icon) {
            icon.className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
        }
    })();

    // switch between light and dark themes
    const toggleTheme = () => {
        const isDarkTheme = document.body.classList.toggle("dark-theme");
        localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
        const icon = themeToggle.querySelector("i");
        if (icon) {
            icon.className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
        }
    };

    themeToggle.addEventListener("click", toggleTheme);
}