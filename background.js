chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.from === 'content' && !message.isOnGradescope) {
    //if we are not on gradescope we want to change what our extension looks like
  }
});
