import Notiflix from 'notiflix';

const refs = {
  inputData: document.querySelector('.form'),
};
let { inputData } = refs;

inputData.addEventListener('submit', startCreatePromises);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          )
        );
      } else {
        reject(
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          )
        );
      }
    }, delay);
  });
};

function startCreatePromises(evt) {
  evt.preventDefault();

  let step = Number(evt.currentTarget.step.value);
  let delay = Number(evt.currentTarget.delay.value);
  let amount = Number(evt.currentTarget.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(success => console.log('✅ Fulfilled promise'))
      .catch(error => console.log('❌ Rejected promise'));
    delay += step;
  }
};
