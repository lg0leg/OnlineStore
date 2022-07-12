import { data } from './data';
import { setElect } from './filters';

const basketButton = document.querySelector('#basket-button');
const overlay = document.querySelector('#overlay');
const basketCont = document.querySelector('#basket-cont');
const closeBasketButton = document.querySelector('#close-basket-button');
const userItemsCont = document.querySelector('#user-selected-items');
const orderTypeCont = document.querySelector('#order-type-cont');
const orderPrice = document.querySelector('#order-price');
const copyData = data.slice();

function setTotalPrice() {
  let forOrder;
  (document.querySelector('input[name="order-type"]:checked') as HTMLInputElement).value === 'self' ? (forOrder = 0) : (forOrder = 5);
  orderPrice && ((orderPrice as HTMLInputElement).value = `${forOrder} $`);
}
setTotalPrice();

function createBasketItem(num: number) {
  const count = 1;
  const total = 4.99 * count;
  const div = document.createElement('div');
  div.classList.add('basket-item');
  div.innerHTML = `
  <img class="basket-item-img" src="./toys/${num + 1}.png" alt="picture" width="40" height="40" />
  <div class="basket-item-title">${copyData[num].name}</div>
  <div class="basket-item-in-stock">${copyData[num].count}</div>
  <button class="basket-item-button" type="button">➖</button>
  <div class="basket-item-count">${count}</div>
  <button class="basket-item-button" type="button">➕</button>
  <div class="basket-item-price">${total}$</div>
  `;
  return div;
}

// function createBasketItem(num: number) {
//   let count = 1;
//   let total = 4.99 * count;

//   const div = document.createElement('div');
//   div.classList.add('basket-item');
//   div.innerHTML = `
//   <img class="basket-item-img" src="./toys/${num + 1}.png" alt="picture" width="40" height="40" />
//   <div class="basket-item-title">${copyData[num].name}</div>
//   <div class="basket-item-in-stock">${copyData[num].count}</div>
//   <button class="basket-item-button" type="button" onclick="${pressMinus()}">➖</button>
//   <div class="basket-item-count">${count}</div>
//   <button class="basket-item-button" type="button" onclick="console.log('плюс')">➕</button>
//   <div class="basket-item-price">${total}$</div>
//   `;
//   function pressMinus() {
//     console.log('минус');
//     if (count > 0) {
//       count -= 1;
//       total = 4.99 * count;
//     }
//   }
//   return div;
// }

// class createBasketItemClass {
//   constructor(num: number) {
//     this.num = num;
//   }
//   num: number;
//   div: HTMLDivElement = document.createElement('div');
//   this.div.innerHTML = `<p>num</p>`
// }

function openBasketModal() {
  overlay?.classList.remove('hide');
  basketCont?.classList.remove('hide');
  setTimeout(() => {
    basketCont?.classList.remove('fade');
  }, 10);

  userItemsCont && (userItemsCont.innerHTML = '');
  for (const value of setElect) {
    if (typeof value == 'number') {
      // userItemsCont?.append(`игрушка №${value} - доступно ${copyData[value].count} штук; `);
      // createBasketItem(value);
      userItemsCont?.appendChild(createBasketItem(value));
    }
  }
}

function closeBasketModal() {
  overlay?.classList.add('hide');
  basketCont?.classList.add('fade');
  basketCont?.classList.add('hide');
}

orderTypeCont?.addEventListener('click', () => {
  setTotalPrice();
});

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
