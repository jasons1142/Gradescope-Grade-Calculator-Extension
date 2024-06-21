chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.from === 'content' && !message.isOnGradescope) {
    //if we are not on gradescope send message to popup.js
     chrome.runtime.sendMessage({
      from: 'background',
      action: 'updatePopup',
      message: 'Not on Gradescope'
    });
  }
});
