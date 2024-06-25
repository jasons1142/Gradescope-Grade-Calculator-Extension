//alert('Hello')
function extractSubmissions() {
    const submissions = [];
    const submissionRows = document.querySelectorAll('tr.odd, tr.even');

    submissionRows.forEach(row => {
        const nameElement = row.querySelector('th.table--primarylink');
        const statusElement = row.querySelector('td.submission-status');
        if (nameElement && statusElement) {
            const name = nameElement.innerText.trim();
            const status = statusElement.innerText.trim();
            submissions.push({ name, status })
        }
    });
    return submissions;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSubmissions") {
        const submissions = extractSubmissions();
        sendResponse({submissions: submissions});
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


