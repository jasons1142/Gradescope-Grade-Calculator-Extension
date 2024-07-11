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

    let space = document.createTextNode('   '); //adding space before textbox
    container.appendChild(space);
    
    let textbox = document.createElement('input'); //create textbox
    textbox.type = 'text';
    textbox.id = assignment.name;
    textbox.name = 'grade';
    textbox.value = null;
    textbox.style.width = '10%';
    
    container.appendChild(textbox); //add a textbox for user input
    let slash = document.createTextNode('   /   ');
    container.appendChild(slash);

    let textboxTwo = document.createElement('input'); //create textbox
    textboxTwo.type = 'text';
    //textboxTwo.id = assignment.name;
    textboxTwo.name = 'grade2';
    textboxTwo.value = null;
    textboxTwo.style.width = '10%';

    container.appendChild(textboxTwo);
    
   } 
    //start a new line for next checkbox and label
    container.appendChild(document.createElement('br'))
  });
}

function calculateAverages() {
  const checkboxes = document.querySelectorAll('input[name="assignments"]:checked'); //creating an array of all the elements that are actually checked off
    if (checkboxes.length === 0) { //if there are no elements checked off
        document.getElementById('average-score').textContent = 'No assignments selected.'; //display error
        return; //end function
    }

  //initializing variables
  let numeratorsum = 0;
  let denominatorsum = 0;
 
  for (let i = 0; i < checkboxes.length; i++) { //for loop that adds up all the values in the checked off boxes
   
    //declare variables
    const numerator = parseFloat(checkboxes[i].getAttribute('numerator'));
    const denominator = parseFloat(checkboxes[i].getAttribute('denominator'));
   
    if (!isNaN(numerator) && !isNaN(denominator)) { //only adding the numerators and denominators that are not NaN
      numeratorsum += numerator;
      denominatorsum += denominator;
    }
   
  }

   const inputs = document.getElementsByName('grade'); //get a list of the left input
   const inputs2 = document.getElementsByName('grade2'); //get a list of the right input
 
   for (let j = 0; j < inputs.length; j++) { //going through all the textboxes
    
      const checkbox = document.getElementById(inputs[j].id); // get the corresponding checkbox
    
      if (!checkbox.checked) { //if the checkbox of the input is not checked off
        continue; // jump to next iteration of loop
      }

      const value = parseFloat(inputs[j].value); //get value for each left input
      const value2 = parseFloat(inputs2[j].value); //get the value for each right input
     
      if (isNaN(value) && isNaN(value2)) { //if user did not input a grade
        document.getElementById('average-score').textContent = 'Grade needed for assignment(s)'; //display error
        return; //end function
      }
      else if(isNaN(value) && !isNaN(value2)){ //if the user input a denominator but not a numerator
        document.getElementById('average-score').textContent = 'Earned points missing'; //display error
        return; //end function
      }
      else if(isNaN(value2) && !isNaN(value)){ //if the user input a numerator but not a denominator
        document.getElementById('average-score').textContent = 'Total points missing'; //display error
        return; //end function
      }
      else if(value > value2){ //if numerator is greater than denominator
        document.getElementById('average-score').textContent = `Invalid input for grade(s)`; //display error
        return; //end function
      }
      else { //otherwise we can add to numerator and denominator
        numeratorsum += value;
        denominatorsum += value2;
      }
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
