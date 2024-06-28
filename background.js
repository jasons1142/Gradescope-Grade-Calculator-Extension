chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.from === 'content') {
        if (message.isOnGradescope && message.isOnGradescope.url && message.isOnGradescope.url.includes("gradescope.com/courses")) {
            chrome.action.setPopup({ popup: 'popup.html' });
        } else {
            chrome.action.setPopup({ popup: 'NotOnGradescopePopup.html' });
        }
    }
});
