import { data } from './data';
import { setElect } from './filters';

const basketButton = document.querySelector('#basket-button');
const overlay = document.querySelector('#overlay');
const basketCont = document.querySelector('#basket-cont');
const closeBasketButton = document.querySelector('#close-basket-button');
const userItemsCont = document.querySelector('#user-selected-items');
const copyData = data.slice();

function openBasketModal() {
  overlay?.classList.remove('hide');
  basketCont?.classList.remove('hide');
  setTimeout(() => {
    basketCont?.classList.remove('fade');
  }, 10);

  userItemsCont && (userItemsCont.innerHTML = '');
  for (const value of setElect) {
    if (typeof value == 'number') {
      userItemsCont?.append(`игрушка №${value} - доступно ${copyData[value].count} штук; `);
    }
  }
}

function closeBasketModal() {
  overlay?.classList.add('hide');
  basketCont?.classList.add('fade');
  basketCont?.classList.add('hide');
}

basketButton?.addEventListener('click', () => {
  openBasketModal();
});

overlay?.addEventListener('click', () => {
  closeBasketModal();
});

closeBasketButton?.addEventListener('click', () => {
  closeBasketModal();
});

// basketCont?.addEventListener('click', () => {
//   console.log('basketCont');
// });
