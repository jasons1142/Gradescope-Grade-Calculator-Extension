chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.from === 'content') {
        if (message.isOnGradescope) {
            chrome.action.setPopup({ popup: 'popup.html' });
        } else {
            chrome.action.setPopup({ popup: 'NotOnGradescopePopup.html' });
        }
    }
});

//if we received a message from contentscript we are on a new tab and need to update popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.from === 'content') {
        updatePopup(message.isOnGradescope);
    }
});

//check url of website when popup first appears
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { from: 'background' }, function(response) {
        if (response && response.isOnGradescope !== undefined) {
            updatePopup(response.isOnGradescope);
        }
    });
});
