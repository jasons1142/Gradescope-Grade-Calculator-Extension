chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.from === 'content' && !message.isOnGradescope) {
    //if we are not on gradescope we want to change what our extension looks like
    document.getElementsByClassName("extension")[0].innerHTML = '<h1>' + 'Uh oh, looks like you\'re not on a Gradescope!' + '</h1>' + '<p>' + 'To calculate your grade, navigate to one of your courses on Gradescope.' + '</p>'
  }
});
