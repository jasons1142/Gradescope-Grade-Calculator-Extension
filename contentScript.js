//alert('Hello')
//function extractScores() {
    //const scoreElements = document.getElementsByClassName("submissionStatus--score");
    //const scores = Array.from(scoreElements).map(el=>parseFloat(el.innerText));
    //return scores;
//}

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


