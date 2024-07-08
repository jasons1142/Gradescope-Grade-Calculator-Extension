 function createAssignmentCheckboxes(assignments) {
  const container = document.getElementById('assignments-container'); //formatting the class in popup.html
  container.innerHTML = ''; //clearing out content within container

  assignments.forEach(assignment => { //for each assignment
    let checkbox = document.createElement('input'); //create checkbox
    checkbox.type = 'checkbox';
    checkbox.id = assignment.name; //gives the checkbox a unique id, the name of the assignment
    checkbox.name = 'assignments';
    checkbox.value = assignment.score; //gives the checkbox a value, the score received
    checkbox.setAttribute('numerator', assignment.numerator); //set an attribute for the numerator of each checkbox
    checkbox.setAttribute('denominator', assignment.denominator); //set an attribute for the denominator of each checkbox

    const label = document.createElement('label'); //create label
    label.htmlFor = assignment.name;
    label.textContent = assignment.name; //text content of the label is the name of the assignment

    //append checkbox and label together
    container.appendChild(checkbox);
    container.appendChild(label); 

   if(assignment.numerator == null && assignment.denominator == null){//if it is submitted but not graded

    let space = document.createTextNode(' '); //adding space before textbox
    container.appendChild(space);
    
    let textbox = document.createElement('input'); //create textbox
    textbox.type = 'text';
    textbox.id = assignment.name;
    textbox.name = 'grade';
    textbox.value = null;
    textbox.style.width = '10%';
    
    container.appendChild(textbox); //add a textbox for user input
    
   } 
    //start a new line for next checkbox and label
    container.appendChild(document.createElement('br'))
  });
}

function calculateAverages() {
  const checkboxes = document.querySelectorAll('input[name="assignments"]:checked'); //creating an array of all the elements that are actually checked off
    if (checkboxes.length === 0) { //checking to see if elements are actually clicked
        document.getElementById('average-score').textContent = 'No assignments selected.';
        return;
    }
  let numeratorsum = 0;
  let denominatorsum = 0;
  for (let i = 0; i < checkboxes.length; i++) { //for loop that adds up all the values in the checked off boxes
    numeratorsum += parseFloat(checkboxes[i].getAttribute('numerator')); //parseFloat gets the string numerator and turns it into a number
    denominatorsum += parseFloat(checkboxes[i].getAttribute('denominator')); //parseFloat gets the string numerator and turns it into a number
  }
  const average = (numeratorsum/denominatorsum)*100; //calculating the average
  document.getElementById('average-score').textContent = `Average score: ${average.toFixed(2)}`; //text content of an HTML aspect with the id 'average-score' will be updated to hold the average score to two decimal places

  return average;
}

document.getElementById('calculate-average').addEventListener('click', calculateAverages); //calculate averages will be run when the user clicks on an something with the id 'calculate-average'

chrome.tabs.query({active: true, currentWindow: true }, (tabs) => {
  if (tabs.length == 0) {
    console.error('No active tabs found');
    return;
  }


   chrome.tabs.sendMessage(tabs[0].id, {action: "getAssignments"}, (response) => { //send message to contentscript so we can extract data
    if (chrome.runtime.lastError) { //error case
       console.error('Error sending message:', chrome.runtime.lastError);
      document.getElementById('NotOnGradescope').innerHTML = `
    <p style="text-align: center;">
      Uh oh. Looks like you're not on Gradescope. To calculate your average, navigate to a course on Gradescope and refresh!
    </p>
`;
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

document.addEventListener('click', function (event) { //event listener for when we get a click on either SelectAll or DeselectAll
  const targetId = event.target.id;
  let SelectAllButton = document.getElementById('SelectAll');
  let DeselectAllButton = document.getElementById('DeselectAll');

  if (targetId === 'SelectAll') { //if we clicked Select All
    SelectAllCheckboxes(); //call the function
    DeselectAllButton.checked = false; //uncheck the other button
  } else if (targetId === 'DeselectAll') { //if we clicked Deselect All
    DeselectAllCheckboxes(); //call that function
    SelectAllButton.checked = false; //uncheck the other button
  }
});

 function SelectAllCheckboxes () { //creating a function to select all assignments when button SelectAll is clicked
    let checkboxes = document.querySelectorAll('input[name="assignments"]');
    checkboxes.forEach(function (checkbox) {
                checkbox.checked = true;
    });
 }

function DeselectAllCheckboxes() { //creating a function to deselect all assignments when button DeselectAll is clicked
    let checkboxes = document.querySelectorAll('input[name="assignments"]');
    checkboxes.forEach(function (checkbox) {
                checkbox.checked = false;
    });
 }

