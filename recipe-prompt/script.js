document.addEventListener('DOMContentLoaded', function() {
    const CONFIG = {
        appUrl: 'chatgpt://g/g-20Ce4z9Ee-method-cooking',
        webUrl: 'https://chat.openai.com/g/g-20Ce4z9Ee-method-cooking',
        copyTimeout: 2000
    };

    const copyButton = document.getElementById('copy-button');
    const appButton = document.getElementById('app-button');
    const promptText = document.getElementById('prompt-text');
    const buttonText = copyButton.querySelector('.button-text');

    function cleanText(text) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        let cleanedText = tempDiv.textContent;
        return cleanedText
            .replace(/[\u200B-\u200D\uFEFF]/g, '')
            .replace(/\r?\n/g, '\n')
            .replace(/[^\x20-\x7E\n]/g, '')
            .trim();
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
            }, CONFIG.copyTimeout);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });

    appButton.addEventListener('click', function() {
        // Try to detect if we're on iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        
        if (isIOS) {
            // On iOS, directly use the web URL to avoid the invalid address error
            window.location.href = CONFIG.webUrl;
        } else {
            // On other platforms, try the app URL first with fallback
            const appWindow = window.open(CONFIG.appUrl, '_blank');
            
            // If opening the app URL fails or after a delay, try the web URL
            setTimeout(() => {
                if (!appWindow || appWindow.closed) {
                    window.location.href = CONFIG.webUrl;
                }
            }, 1000);
        }
    });
});
