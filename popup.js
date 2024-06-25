//load in content
document.addEventListener("DOMContentLoaded", function(){getData()}); //once loaded in get the data from gradescope

//function displayAverage(average) {
    //document.getElementById('average').textContent = "Average of scores: " + average;
//}


//send message to gradescope so that we may get data
function getData(){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
        let message = {
            txt: "getmydata"
        }
        chrome.tabs.sendMessage(tabs[0].id, message); //send message to current window
    });
}

//check if we received message and if we did call function
chrome.runtime.onMessage.addListener(receivedMessage);

function receivedMessage(request, sender, sendResponse){

    //if (request.length != # assignments) {
        //document.getElementsByTagName('p') += '<br>' + '<p>' + 'Looks like you have some ungraded assignments. Fill in the text box to estimate your grade!' + '</p>'
        //allGraded = request
        //unGraded = .......
        //checkBoxes(allGraded) // call function to create checkboxes for all the graded assignments
        //textBoxes(unGraded) //call function to create textboxes for all  ungraded assignments
    //}
    //else{
    //allGraded = request 
    //checkBoxes(alldata) //create checkboxes for all the graded assignments
    //}
};

function checkBoxes(grades){
    
};

function textBoxes(grades){
    
};

function createSubmissionButtons(submissions) {
  const container = document.getElementById('submissions-container');
  container.innerHTML = ' ';

  submissions.forEach(submission => {
    const button = document.createElement('button');
    button.textContent = `${submission.name} - ${submission.status}`;
    container.appendChild(button);
  });
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getSubmissions" }, (response) => {
    if (response && response.submissions) {
      createSubmissionButtons(response.submissions);
    } else {
      document.getElementById('submissions-container').textContent = "No submissions found.";
    }
  });
});