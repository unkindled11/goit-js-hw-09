import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
// =====
const body = document.querySelector('body')
const field = document.querySelector('.field');
const timer = document.querySelector('.timer');
const start = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker')

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
// =====

let difference = 0;
start.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(dateStr) {
      difference = new Date(dateStr).getTime() - new Date().getTime();
      if (difference > 0) {
          start.disabled = false;
      } else {
      Notiflix.Notify.failure("Please choose a date in the future")
      start.disabled=true
    }
  },
};

function addLeadingZero(value) {
    return value.toString().padStart(2, 0);
};

function timeToWrite() {
    let timerId = setInterval(() => {
        difference = difference - 1000;
        let transform = convertMs(difference);
        days.textContent = addLeadingZero(transform.days)
        hours.textContent = addLeadingZero(transform.hours)
        minutes.textContent = addLeadingZero(transform.minutes)
        seconds.textContent = addLeadingZero(transform.seconds)
            if (difference < 1000) {
                clearInterval(timerId)
        };
    }, 1000);
}

start.addEventListener("click", () => {
    timeToWrite()
    start.disabled = true
});

flatpickr(input, options) 
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

days.style.backgroundColor = "coral";
hours.style.backgroundColor = "orange";
minutes.style.backgroundColor = "yellow";
seconds.style.backgroundColor = "teal";

