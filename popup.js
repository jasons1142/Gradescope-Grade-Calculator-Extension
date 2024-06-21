

function displayAverage(average) {
    document.getElementById('average').textContent = "Average of scores: " + average;
}

//send message to tab so that we may get data
function getData(){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getScores" }, (response) => {
      //if (response) {
        //displayAverage(response.average);
      //} else {
        //document.getElementById('average').textContent = "No scores found.";
      //}
    });
});
}
//check if we received message
chrome.runtime.onMessage.addListener()
