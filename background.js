chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) { //changing the popup based on what tab we are on
  if (message.from === 'content' && message.url) {
    if (message.url.includes("gradescope.com/courses")) {
      chrome.action.setPopup({ popup: 'popup.html' });
    } else {
      chrome.action.setPopup({ popup: 'NotOnGradescopePopup.html' });
    }
  }
});

