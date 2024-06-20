alert('Hello')
function extractScores() {
    const scoreElements = document.getElementsByClassName("submissionStatus--Score");
    const scores = Array.from(scoreElements).map(el=>parseFloat(el.innerText));
    return scores;
}

function calculateAverage(scores) {
    if (scores.length == 0) return 0;
    const sum = scores.reduce((acc, score) => acc + score, 0);
    return sum/scores.length;
}

const scores = extractScores();
const average = calculateAverage(scores);