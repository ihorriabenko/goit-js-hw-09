import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// refs
const refs = {
  dateForm: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
  daysSpan: document.querySelector('span[data-days]'),
  hoursSpan: document.querySelector('span[data-hours]'),
  minutesSpan: document.querySelector('span[data-minutes]'),
  secondsSpan: document.querySelector('span[data-seconds]'),
};

// data picker
refs.btnStart.disabled = true;
let timerId = null;
let userDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.btnStart.disabled = true;
    } else {
      refs.btnStart.disabled = false;
      refs.btnStart.style.cursor = 'pointer';
    }
    userDate = selectedDates[0];
  },
};

flatpickr(refs.dateForm, options);

// start
const onClickStartTimer = () => {
  timerId = setInterval(() => {
    const dif = userDate - new Date();
    if (dif <= 0) {
      clearInterval(timerId);
      return;
    } setTime()
  }, 1000);
};

refs.btnStart.addEventListener('click', onClickStartTimer);

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

function pads (value) {
  return String(value).padStart(2, '0');
}

function setTime () {
  const { days, hours, minutes, seconds } = convertMs(userDate - new Date());
  refs.daysSpan.textContent = pads(days);
  refs.hoursSpan.textContent = pads(hours);
  refs.minutesSpan.textContent = pads(minutes);
  refs.secondsSpan.textContent = pads(seconds);
}
