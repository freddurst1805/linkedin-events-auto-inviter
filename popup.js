
// Menu Popup
document.getElementById('toggle').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: startApp
        });
    });
});
document.getElementById('stop').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: stopApp
        });
    });
});

let intervalToggleLKD;
let intervalScrollingLKD;

function startApp() {
    let lastHeight = 0;

    // Coche tous les contacts
    intervalToggleLKD = setInterval(() =>{
        const inviteButtons = document.querySelectorAll('#invitee-picker-results-container ul.artdeco-typeahead__results-list li .ember-checkbox[aria-selected="false"]');
        inviteButtons.forEach(button => {
            button.click();
        });
    }, 200);

    // Scroll le block des contacts vers le bas
    intervalScrollingLKD = setInterval(() => {
        const scrollableBlock = document.querySelector('#invitee-picker-results-container');

        if(scrollableBlock) {
            scrollableBlock.scrollTop = scrollableBlock.scrollHeight;
            const newHeight = scrollableBlock.scrollHeight;

            if (newHeight > lastHeight) {
                lastHeight = newHeight;
            }
        }
    }, 200);

}

function stopApp() {
    clearInterval(intervalScrollingLKD);
    clearInterval(intervalToggleLKD);
}