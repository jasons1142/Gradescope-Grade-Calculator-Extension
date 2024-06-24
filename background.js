chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.from === 'content') {
        if (message.isOnGradescope) {
            chrome.action.setPopup({ popup: 'popup.html' });
        } else {
            chrome.action.setPopup({ popup: 'NotOnGradescopePopup.html' });
        }
    }
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    if (!details.url.startsWith("https://gradescope.com/courses")) {
        chrome.action.setPopup({ popup: 'NotOnGradescopePopup.html' }); 
    }
});
