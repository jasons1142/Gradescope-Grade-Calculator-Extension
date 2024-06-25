chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.from === 'content') {
        if (message.isOnGradescope) {
            chrome.action.setPopup({ popup: 'popup.html' });
        } else {
            chrome.action.setPopup({ popup: 'NotOnGradescopePopup.html' });
        }
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if (changeInfo.url){ //if the url has changed
        if (tab.url && tab.url.includes("gradescope.com/courses")){ //if the url is in gradescope
            chrome.action.setPopup({popup: 'popup.html'}); //set the correct popup
        } else{
            chrome.action.setPopup({popup: 'NotOnGradescope.html'}); //set the error popup
        }
    }
});
