//load in content
document.addEventListener("DOMContentLoaded", function(){getData()}); //once loaded in get the data from gradescope

 function createAssignmentCheckboxes(assignments) {
  const container = document.getElementById('assignments-container');
  container.innerHTML = '';

  assignments.forEach(assignment => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = assignment;
    checkbox.name = 'assignments';
    checkbox.value = assignment;

    const label = document.createElement('label');
    label.htmlFor = assignment;
    label.textContent = assignment;

    container.appendChild(checkbox);
    container.appendChild(label);

    container.appendChild(document.createElement('br'))
  });
}

chrome.tabs.query({active: true, currentWindow: true }, (tabs) => {
  if (tabs.length == 0) {
    console.error('No active tabs found');
    return;
  }

  chrome.tabs.sendMessage(tabs[0].id, {action: "getAssignments"}, (response) => { //send message to contentscript so we can extract data
    if (chrome.runtime.lastError) { //error case
      console.error('Error sending message:', chrome.runtime.lastError);
      document.getElementById('assignments-container').textContent = "Error retrieving assingments.";
      return;
    }

    console.log('Received response:', response); 
    if (response && response.assignments && response.assignments.length > 0) { //if we received a response
      createAssignmentCheckboxes(response.assignments); //create checkboxes
    } else {
      document.getElementById('assignments-container').textContent = "No assignments found."; 
    }
  });
});


function checkBoxes(grades){
    
};

function textBoxes(grades){
    
};



