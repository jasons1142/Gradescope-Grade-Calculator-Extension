//load in content
document.addEventListener("DOMContentLoaded", function(){getData()}); //once loaded in get the data from gradescope

//function displayAverage(average) {
    //document.getElementById('average').textContent = "Average of scores: " + average;
//}

//send message to gradescope so that we may get data
function getData(){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
        let message{
            txt: "getmydata"
        }
        chrome.tabs.sendMessage(tabs[0].id, message); //send message to current window
    });
}

//check if we received message and if we did call function
chrome.runtime.onMessage.addListener(receivedMessage);

function receivedMessage(message, sender, sendResponse){};
