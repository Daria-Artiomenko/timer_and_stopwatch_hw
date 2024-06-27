// Timer 
const timerHours = document.querySelector('.hours');
const timerMinutes = document.querySelector('.minutes');
const timerSeconds = document.querySelector('.seconds');
const timerDisplay = document.querySelector('.set-timer-inputs');

const timerStartBtn = document.querySelector('.timer-controls .start');
const timerPauseBtn = document.querySelector('.timer-controls .pause');
const timerResetBtn = document.querySelector('.timer-controls .reset');

const timer = document.querySelector('.display-timer');

let intervalId;
let totalSeconds;

function validateTimer(e) {
    const timerValue = e.target.value;
    if ( timerValue > 59) {
        e.target.value = '59';
    } 
}

function validateTimerBlur(e) {
    const timerValue = e.target.value;
    if (timerValue == 0 || timerValue === '') {
        e.target.value = '00';
    } 
    else if (timerValue < 10) {
        e.target.value = '0' + timerValue
    }
}

timerDisplay.addEventListener('focus', (e) => {e.target.value = ''}, true);
timerDisplay.addEventListener('blur', (e) =>  validateTimerBlur(e), true);
timerDisplay.addEventListener('input', (e) => validateTimer(e));

function setTimer() {
    const hours = timerHours.value;
    const minutes = timerMinutes.value;
    const seconds = timerSeconds.value;

    totalSeconds = +hours * 3600 + +minutes * 60 + +seconds;
    timer.textContent = `${padTime(hours)} : ${padTime(minutes)} : ${padTime(seconds)}`;

    timerDisplay.classList.add('hidden');
    timer.classList.remove('hidden');
}

function padTime(value) {
    return value.toString().padStart(2, '0');
}
  
function startTimer() {
    intervalId = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateTimerDisplay();
        }
        if (totalSeconds === 0) {
            clearInterval(intervalId);
            alert('Time is over!');
            timerDisplay.classList.remove('hidden');
            timer.classList.add('hidden');
        }

    }, 1000);
}

function updateTimerDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    timer.textContent = `${padTime(hours)} : ${padTime(minutes)} : ${padTime(seconds)}`;
}

function pauseTimer() {
    clearInterval(intervalId);
    intervalId = null;
}
  
function resetTimer() {
    clearInterval(intervalId);
    intervalId = null;
    updateTimerDisplay();
    totalSeconds = 0;
    timerDisplay.classList.remove('hidden');
    timer.classList.add('hidden');
}


timerStartBtn.addEventListener('click', () => {
    setTimer();
    startTimer()
});

timerPauseBtn.addEventListener('click', () => pauseTimer());
timerResetBtn.addEventListener('click', () => resetTimer());






// Stopwatch 
const stopwatchDisplay = document.querySelector('.stopwatch-display');
const stopwatchStartBtn = document.querySelector('.stopwatch-controls .start');
const stopwatchStopBtn = document.querySelector('.stopwatch-controls .pause');
const stopwatchResetBtn = document.querySelector('.stopwatch-controls .reset');

let stopwatchInterval;
let stopwatchTime = 0;

function updateStopwatchDisplay() {
  const hours = Math.floor(stopwatchTime / 3600);
  const minutes = Math.floor((stopwatchTime % 3600) / 60);
  const seconds = stopwatchTime % 60;
  stopwatchDisplay.textContent = `${padTime(hours)} : ${padTime(minutes)} : ${padTime(seconds)}`;
}


stopwatchStartBtn.addEventListener('click', () => {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(() => {
      stopwatchTime++;
      updateStopwatchDisplay();
    }, 1000);
  }
});

stopwatchStopBtn.addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
});

stopwatchResetBtn.addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchTime = 0;
  updateStopwatchDisplay();
});






















