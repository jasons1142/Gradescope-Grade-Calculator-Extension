

function extractAssignments() {
    const assignments = []; //creating array of assignments
    const assignmentRows = document.querySelectorAll('tr.odd, tr.even'); //get all the rows from gradescope

    assignmentRows.forEach(row => { //for each row
        const nameElement = row.querySelector('th.table--primaryLink a'); //get the name of the assignment
        const scoreElement = row.querySelector('td.') //get the score received on the assignment
        if (nameElement) { //checking to see if the name element exists
            const name = nameElement.innerText.trim(); 
            let score = null;

            if (scoreElement) {
                const scoreText = scoreElement.innerText.trim();
                if (!isNaN(scoreText)) {
                    score = parse(scoreText);
                }
            }
            assignments.push({name, score});
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


