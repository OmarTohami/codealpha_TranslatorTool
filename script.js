// Free translation API (no API billing account needed)
const API_URL = "https://api.mymemory.translated.net/get";

// DOM elements
const translateBtn = document.getElementById("translate-btn");
const textInput = document.getElementById("text-to-translate");
const sourceLang = document.getElementById("source-language");
const targetLang = document.getElementById("target-language");
const resultBox = document.getElementById("result-box");
const translatedText = document.getElementById("translated-text");
const copyBtn = document.getElementById("copy-btn");
const copyNotification = document.getElementById('copy-notification');
const errorNotification = document.getElementById('error-notification');
const swapBtn = document.getElementById('swap-btn');

const errorMsg = "Please enter text to translate";
const copyMsg = "Copied to clipboard!";

// Translate button click event
translateBtn.addEventListener("click", async () => {
    const text = textInput.value.trim();
    const source = sourceLang.value;
    const target = targetLang.value;

    if (!text) {
        // Show error notification
        showNotification(errorNotification, errorMsg);
        // Add error class to textarea
        textInput.classList.add('error');
        // Remove error class after animation
        setTimeout(() => {
            textInput.classList.remove('error');
        }, 500);
        return;
    }

    try {
        translatedText.textContent = "Translating...";
        resultBox.classList.remove("hidden");

        // Call API using longpair parameter
        const response = await fetch(`${API_URL}?q=${encodeURIComponent(text)}&langpair=${source}|${target}`);
        const data = await response.json();

        // Display translation
        if (data.responseData) {
            translatedText.textContent = data.responseData.translatedText;
        } else {
            translatedText.textContent = "Translation not available";
        }
    } catch (error) {
        translatedText.textContent = "Error: " + error.message;
    }
});

// Copy button click event
copyBtn.addEventListener("click", () => {
    const text = translatedText.textContent;
    if(text){
        // Copy the txt
        navigator.clipboard.writeText(text);
        // Show error notification
        showNotification(copyNotification, copyMsg);
    }
});

// Swap button click event
swapBtn.addEventListener('click', () => {
    // Swap values
    const temp = sourceLang.value;
    sourceLang.value = targetLang.value;
    targetLang.value = temp;
    
    // Auto-translate if text exists
    if (translatedText.textContent.trim()) {
        const temp = translatedText.textContent;
        textInput.value = temp;
        translateBtn.click();
    }
});

// Helper function to show notifications
function showNotification(notification, message) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}