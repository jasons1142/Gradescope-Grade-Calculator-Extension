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
    if (changeInfo.status === 'complete'){
        if (tab.url && tab.url.includes("gradescope.com/courses")){
            chrome.action.setPopup({popup: 'popup.html'});
        } else{
            chrome.action.setPopup({popup: 'NotOnGradescope.html});
        }
    }
});
