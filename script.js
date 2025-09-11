const themeToggle = document.querySelector(".theme-toggle");
const promptInput = document.querySelector(".prompt-input");
const promptform = document.querySelector(".prompt-form");
const promptBtn = document.querySelector(".prompt-btn");
const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");

const examplePrompts = [
    "A magic forest with glowing plants and fairy homes among giant mushrooms",
    "An old steampunk airship floating through golden clouds at sunset",
    "A future Mars colony with glass domes and gardens against red mountains",
    "A dragon sleeping on gold coins in a crystal cave", 
    "An underwater kingdom with merpeople and glowing coral buildings",
    "A floating island with waterfalls pouring into clouds below",
    "A witch's cottage in fall with magic herbs in the garden",
    "A robot painting in a sunny studio with art supplies staircases",
    "A magical library with floating glowing books and spiral staircases",
    "A japanese shrine during cherry blossom season with lanterns and misty mountains"
]
    
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

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const selectedModel = modelSelect.value;
        const imageCount = parseInt(countSelect.value) || 1;
        const aspectRatio = ratioSelect.value || "1/1";
        const promptText = promptInput.value.trim();

        console.log(selectedModel, imageCount, aspectRatio, promptText);
    }

    // fill prompt input with a random example prompt
    promptBtn.addEventListener("click", () => {
        const Prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
        promptInput.value = Prompt;
        promptInput.focus();
        
    });

    promptform.addEventListener("submit", handleFormSubmit);

    themeToggle.addEventListener("click", toggleTheme);
}