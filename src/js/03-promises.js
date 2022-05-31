import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const formsEl = e.currentTarget.elements;
  console.log('formsEl :', formsEl);


  let amount = Number(formsEl.amount.value);
  let delay = Number(formsEl.delay.value);
  let step = Number(formsEl.step.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ i, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
      })
      .catch(({ i, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
