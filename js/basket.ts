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
const basketItemsPrice: { [index: string]: number } = {};
const TOY_PRICE = 4.99;

function openBasketModal() {
  overlay?.classList.remove('hide');
  basketCont?.classList.remove('hide');
  setTimeout(() => {
    basketCont?.classList.remove('fade');
  }, 10);

  setDefaultPriceList();
  setTotalPrice();
  fillBasket();
}

function closeBasketModal() {
  overlay?.classList.add('hide');
  basketCont?.classList.add('fade');
  basketCont?.classList.add('hide');

  clearPriceList();
}

function setDefaultPriceList() {
  for (const value of setElect) {
    if (typeof value == 'number') {
      basketItemsPrice[value] = TOY_PRICE;
    }
  }
}

function clearPriceList() {
  for (const el of Object.keys(basketItemsPrice)) {
    delete basketItemsPrice[el];
  }
}

function setTotalPrice() {
  let forOrder;
  let products = 0;
  (document.querySelector('input[name="order-type"]:checked') as HTMLInputElement).value === 'self' ? (forOrder = 0) : (forOrder = 5);
  for (const el of Object.values(basketItemsPrice)) {
    products += el;
  }
  orderPrice && ((orderPrice as HTMLInputElement).value = `${(forOrder + products).toFixed(2)} $`);
}

function fillBasket() {
  userItemsCont && (userItemsCont.innerHTML = '');
  for (const value of setElect) {
    if (typeof value == 'number') {
      userItemsCont?.appendChild(createBasketItem(value));
    }
  }
}

function createBasketItem(num: number) {
  let count = 1;
  let total = Math.round(TOY_PRICE * 100 * count) / 100;

  const div = document.createElement('div');
  div.classList.add('basket-item');
  div.innerHTML = `
  <img class="basket-item-img" src="./toys/${num + 1}.png" alt="picture" width="40" height="40" />
  <div class="basket-item-title">${copyData[num].name}</div>
  <div class="basket-item-in-stock">${copyData[num].count}</div>
  <button class="basket-item-button basket-minus-button" type="button">➖</button>
  <div class="basket-item-count">${count}</div>
  <button class="basket-item-button basket-plus-button" type="button">➕</button>
  <div class="basket-item-price">${total} $</div>
  `;

  div.querySelector('.basket-minus-button')?.addEventListener('click', pressMinus);
  div.querySelector('.basket-plus-button')?.addEventListener('click', pressPlus);
  function pressMinus() {
    if (count > 0) {
      count -= 1;
      total = Math.round(TOY_PRICE * 100 * count) / 100;
      basketItemsPrice[`${num}`] = total;
      (div.querySelector('.basket-item-count') as HTMLElement).innerHTML = `${count}`;
      (div.querySelector('.basket-item-price') as HTMLElement).innerHTML = `${total} $`;
    }
    setTotalPrice();
  }
  function pressPlus() {
    if (count < +copyData[num].count) {
      count += 1;
      total = Math.round(TOY_PRICE * 100 * count) / 100;
      basketItemsPrice[`${num}`] = total;
      (div.querySelector('.basket-item-count') as HTMLElement).innerHTML = `${count}`;
      (div.querySelector('.basket-item-price') as HTMLElement).innerHTML = `${total} $`;
    }
    setTotalPrice();
  }

  return div;
}

/*обработчики*/

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
