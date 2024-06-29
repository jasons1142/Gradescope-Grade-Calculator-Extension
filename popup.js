 function createAssignmentCheckboxes(assignments) {
  const container = document.getElementById('assignments-container'); //formatting the class in popup.html
  container.innerHTML = ''; //clearing out content within container

  assignments.forEach(assignment => { //for each assignment
    const checkbox = document.createElement('input'); //create textbox
    checkbox.type = 'checkbox';
    checkbox.id = assignment;
    checkbox.name = 'assignments';
    checkbox.value = assignment;

    const label = document.createElement('label'); //create label
    label.htmlFor = assignment;
    label.textContent = assignment;

    //append checkbox and label together
    container.appendChild(checkbox);
    container.appendChild(label);

    //start a new line for next checkbox and label
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
      /* document.getElementById('NotOnGradescope').innerHTML = `
    <p style="text-align: center;">
      Uh oh. Looks like you're not on Gradescope. To calculate your average, navigate to a course on Gradescope and refresh!
    </p>
`; */
      return;
    }

    console.log('Received response:', response); 
    if (response && response.assignments && response.assignments.length > 0) { //if we received a response from contentscript
      createAssignmentCheckboxes(response.assignments); //create checkboxes
    } else {
      document.getElementById('assignments-container').textContent = "No assignments found."; //display that we did not find any assignments
    }
  });
});



