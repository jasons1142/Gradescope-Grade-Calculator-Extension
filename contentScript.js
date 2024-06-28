//alert('Hello')
 function extractAssignments() {
    const assignments = []; //creating array of assignments
    const assignmentRows = document.querySelectorAll('tr.odd, tr.even'); //get all the rows from gradescope

    assignmentRows.forEach(row => { //for each row
        const nameElement = row.querySelector('th.table--primaryLink a'); //get the name of the assignment
        if (nameElement) {
            const name = nameElement.innerText.trim(); 
            assignments.push(name);
        }
    });
    return assignments;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getAssignments") {
        const  assignments = extractAssignments();
        sendResponse({assignments: assignments});
    }
});


//function calculateAverage(scores) {
   // if (scores.length == 0) return 0;
    //const sum = scores.reduce((acc, score) => acc + score, 0);
    //return sum/scores.length;
//}

//const scores = extractScores();
//const average = calculateAverage(scores);

//function for finding if extension is running on gradescope.com/courses
function isOnGradescope(url) {
  return url.includes("gradescope.com/courses");
}

// Sending a message to the extension with result
chrome.runtime.sendMessage({
  from: 'content',
  isOnGradescope: isOnGradescope(window.location.href)
});


