import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minEl = document.querySelector('[data-minutes]');
const secEl = document.querySelector('[data-seconds]');

let selectedDate;
startBtn.disabled = true;

flatpickr(input, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      selectedDate = selectedDates[0];
      if (selectedDate > new Date()) {
        startBtn.disabled = false;
      } else {
        Notiflix.Notify.failure('Please choose a date in the future');
      }
    },
  });

  startBtn.addEventListener('click', countdownTimer);

  function countdownTimer() {
    let remainingTime = selectedDate - new Date();
    if (remainingTime < 0) {
      return;
    };
    const intervalId = setInterval(() => {
      remainingTime = remainingTime - 1000;
      if (remainingTime < 0) {
        clearInterval(intervalId);
        remainingTime = 0;
      }
      const { days, hours, minutes, seconds } = convertMs(remainingTime);
      daysEl.textContent = addLeadingZero(days);
      hoursEl.textContent = addLeadingZero(hours);
      minEl.textContent = addLeadingZero(minutes);
      secEl.textContent = addLeadingZero(seconds);
    }, 1000);
  };

  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  };
  
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
  };
