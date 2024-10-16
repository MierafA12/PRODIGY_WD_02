let startTime = 0, updatedTime = 0, difference = 0, interval = null;
let running = false, lapCount = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resumeBtn = document.getElementById("resumeBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsContainer = document.getElementById("laps");

function startTimer() {
    startTime = new Date().getTime() - difference;
    interval = setInterval(updateDisplay, 1000);
    running = true;

    
    startBtn.style.display = 'none';
    stopBtn.style.display = 'inline';
    lapBtn.style.display = 'inline';
    resumeBtn.style.display = 'none';
    resetBtn.style.display = 'none';
}

function stopTimer() {
    clearInterval(interval);
    running = false;
    difference = new Date().getTime() - startTime;

    // Change button visibility: Hide Stop and Lap, show Resume and Reset
    stopBtn.style.display = 'none';
    lapBtn.style.display = 'none';
    resumeBtn.style.display = 'inline';
    resetBtn.style.display = 'inline';
}

function resumeTimer() {
    startTime = new Date().getTime() - difference;
    interval = setInterval(updateDisplay, 1000);
    running = true;

    // Change button visibility: Hide Resume and Reset, show Stop and Lap
    resumeBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    stopBtn.style.display = 'inline';
    lapBtn.style.display = 'inline';
}

function resetTimer() {
    clearInterval(interval);
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    display.innerText = "00:00:00";
    lapsContainer.innerHTML = "";
    running = false;
    lapCount = 0;

    // Reset buttons to the initial state: Show Start, hide everything else
    startBtn.style.display = 'inline';
    stopBtn.style.display = 'none';
    resumeBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    lapBtn.style.display = 'none';
}

function lapTimer() {
    lapCount++;
    const lapTime = display.innerText;
    const lapElement = document.createElement('p');
    lapElement.innerText = `Lap ${lapCount}: ${lapTime}`;
    lapsContainer.appendChild(lapElement);
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    let hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((updatedTime / 1000) % 60);
    
    display.innerText = 
        (hours < 10 ? "0" : "") + hours + ":" + 
        (minutes < 10 ? "0" : "") + minutes + ":" + 
        (seconds < 10 ? "0" : "") + seconds;
}

// Event listeners for the buttons
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resumeBtn.addEventListener('click', resumeTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);
