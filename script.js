const themeToggle = document.querySelector(".theme-toggle");
const promptInput = document.querySelector(".prompt-input");
const promptform = document.querySelector(".prompt-form");
const promptBtn = document.querySelector(".prompt-btn");
const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");
const gridGallery = document.querySelector(".gallery-grid");

const API_KEY = "";

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

    const generateImages = async (selectedModel, imageCount, aspectRatio, promptText) => {
        const MODEL_URL = "https://router.huggingface.co/hf-inference/models/${selectedModel}";

        try {
            const response = await fetch(MODEL_URL, {
                headers: {
				Authorization: `Bearer ${API_KEY}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
            });
            const result = await response.blob();
    } catch (error) {
            console.log(error);
    }
}

    // Create placeholder cards with loading spinners
    const createImageCards = (selectedModel, imageCount, aspectRatio, promptText) => {
        gridGallery.innerHTML = "";
        for (let i = 0; i < imageCount; i++) {
            gridGallery.innerHTML += `
            <div class="img-card loading" id="img-card-${i}" style="aspect-ratio: ${aspectRatio}">
                        <div class="status-container">
                            <div class="spinner"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="#e63939" d="m22.7 17.5l-8.1-14c-.8-1.4-2.7-1.9-4.1-1.1c-.5.3-.9.7-1.1 1.1l-8.1 14c-.8 1.4-.3 3.3 1.1 4.1c.5.3 1 .4 1.5.4H20c1.7 0 3-1.4 3-3c.1-.6-.1-1.1-.3-1.5M12 18c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1m1-5c0 .6-.4 1-1 1s-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1z"/></svg>
                            <p class="status-text">Generating...</p>
                        </div>
                        <img src="test.png" alt="" class="result-img" />
                        </div> `;
        }

        generateImages(selectedModel, imageCount, aspectRatio, promptText);
    }

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // get form values
        const selectedModel = modelSelect.value;
        const imageCount = parseInt(countSelect.value) || 1;
        const aspectRatio = ratioSelect.value || "1/1";
        const promptText = promptInput.value.trim();

        createImageCards(selectedModel, imageCount, aspectRatio, promptText);
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