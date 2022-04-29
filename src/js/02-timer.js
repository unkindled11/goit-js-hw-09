import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
// =====
const body = document.querySelector('body')
const field = document.querySelector('.field');
const timer = document.querySelector('.timer');
const start = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker')

const data = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

const timerSeconds = 1000;
// =====

let difference = 0;
start.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  
  onClose(selectedDates) {
      difference = new Date(selectedDates).getTime() - new Date().getTime();
      if (difference > 0) {
          start.disabled = false;
      } else {
      Notiflix.Notify.failure("Please choose a date in the future")
      start.disabled=true
    }
  },
};

flatpickr(input, options);

function updateFormat( days, hours, minutes, seconds ) {
    data.days.textContent = days;
    data.hours.textContent = hours;
    data.minutes.textContent = minutes;
    data.seconds.textContent = seconds;
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = timerSeconds;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, 0);
};



function timeToWrite() {
    let timerId = setInterval(() => {
        difference = difference - timerSeconds;
        const {days,hours,minutes,seconds} = convertMs(difference);
        updateFormat(days, hours, minutes, seconds);
            if (difference < timerSeconds) {
                clearInterval(timerId);
        }
    }, 1000);
}

start.addEventListener("click", () => {
    timeToWrite()
    start.disabled = true
});

data.days.style.backgroundColor = "coral";
data.hours.style.backgroundColor = "orange";
data.minutes.style.backgroundColor = "yellow";
data.seconds.style.backgroundColor = "teal";


