document.addEventListener('DOMContentLoaded', function() {
    const copyButton = document.getElementById('copy-button');
    const appButton = document.getElementById('app-button');
    const promptText = document.getElementById('prompt-text');
    const buttonText = copyButton.querySelector('.button-text');

    function cleanText(text) {
        return text
            .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width spaces
            .replace(/\r?\n/g, '\n') // Normalize line endings
            .trim(); // Remove extra whitespace
    }

    copyButton.addEventListener('click', async function() {
        try {
            const textToCopy = cleanText(promptText.innerText);
            await navigator.clipboard.writeText(textToCopy);
            copyButton.classList.add('copied');
            buttonText.textContent = 'Copied!';
            appButton.disabled = false;
            
            setTimeout(() => {
                copyButton.classList.remove('copied');
                buttonText.textContent = 'Copy Recipe';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });

    appButton.addEventListener('click', function() {
        window.location.href = 'https://chat.openai.com/g/g-20Ce4z9Ee-method-cooking';
    });
});
