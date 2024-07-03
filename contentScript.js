

function extractAssignments() {
    const assignments = []; //creating array of assignments
    const assignmentRows = document.querySelectorAll('tr.odd, tr.even'); //get all the rows from gradescope

    assignmentRows.forEach(row => { //for each row
        const nameElement = row.querySelector('th.table--primaryLink a'); //get the name of the assignment
        const scoreElement = row.querySelector('td.submissionStatus div.submissionStatus--score'); //get the score received on the assingment
        if (nameElement) { //checking to see if the name element exists
            const name = nameElement.innerText.trim(); 
            let numerator = null; //initialize variable
            let denominator = null; //initialize variable

            if (scoreElement) {
            const scoreText = scoreElement.innerText.trim(); //trimming any extra space in the fractional score
                if (scoreText.includes('/')) { //checking to see if the score has a '/'
                    const parts = scoreText.split('/'); //splitting the fraction into two parts in an array
                    if (parts.length === 2) { //checking to make sure that parts has two elements
                        const numerator = parseFloat(parts[0].trim()); //making the numerator the first part that was split
                        const denominator = parseFloat(parts[1].trim());//making the denominator the second part that was split
                        //if (!isNaN(denominator) && !isNaN(numerator) && denominator !== 0) { //making sure the numerator and denominator are numbers and the denominator is not 0
                            //score = (numerator/denominator) * 100; //making the score the quotient of numerator/denominator
                        //}
                    }
                }
            }
            assignments.push({name, numerator, denominator}); //pushing an array with each element having a name, numerator, and denominator
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


