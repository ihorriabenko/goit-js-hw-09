const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

const changeColor = () =>
  (timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
  }, 1000));

refs.btnStart.addEventListener('click', changeColor);

const stopChangeColor = () => {
  clearInterval(timerId);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
};

refs.btnStop.addEventListener('click', stopChangeColor);
refs.btnStop.disabled = true;
