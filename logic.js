let startTime;
let updatedTime;
let difference;
let timerID;
let running = false;
let lapCounter = 0;

const startPauseButton = document.getElementById('start-pause-button');
const timeDisplay = document.getElementById('time-display');
const laps = document.getElementById('laps');

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerID = setInterval(updateTime, 10);
        startPauseButton.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(timerID);
        difference = new Date().getTime() - startTime;
        startPauseButton.textContent = 'Start';
        running = false;
    }
}

function stop() {
    if (running) {
        clearInterval(timerID);
        difference = new Date().getTime() - startTime;
        startPauseButton.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(timerID);
    startTime = null;
    difference = null;
    running = false;
    lapCounter = 0;
    timeDisplay.textContent = '00:00:00.00';
    startPauseButton.textContent = 'Start';
    laps.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = new Date().getTime() - startTime;
        const formattedLapTime = formatTime(lapTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${++lapCounter}: ${formattedLapTime}`;
        laps.appendChild(lapElement);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    timeDisplay.textContent = formatTime(difference);
}

function formatTime(ms) {
    const milliseconds = parseInt((ms % 1000) / 10);
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}
