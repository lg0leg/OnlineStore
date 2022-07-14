import { toyItem, data } from './data';
import * as noUiSlider from 'nouislider';

const searchInput = document.querySelector('#search-input');
const toyCounter = document.querySelector('#toy-counter');
const sortForm = document.querySelector('#sort');
const bellForm = document.querySelector('#bell-form');
const ballForm = document.querySelector('#ball-form');
const pineForm = document.querySelector('#pine-form');
const snowflakeForm = document.querySelector('#snowflake-form');
const toyForm = document.querySelector('#toy-form');
const whiteColorForm = document.querySelector('#color-white');
const yellowColorForm = document.querySelector('#color-yellow');
const redColorForm = document.querySelector('#color-red');
const blueColorForm = document.querySelector('#color-blue');
const greenColorForm = document.querySelector('#color-green');
const bigSizeForm = document.querySelector('#size-big');
const middleSizeForm = document.querySelector('#size-middle');
const smallSizeForm = document.querySelector('#size-small');
const onlyFavoritesForm = document.querySelector('#favorites-checkbox');
const sliderCopies = document.getElementById('slider-copies') as noUiSlider.target;
const sliderYear = document.getElementById('slider-year') as noUiSlider.target;
const sliderCopiesCounterStart = document.querySelector('#slider-copies-counter-start');
const sliderCopiesCounterEnd = document.querySelector('#slider-copies-counter-end');
const sliderYearCounterStart = document.querySelector('#slider-year-counter-start');
const sliderYearCounterEnd = document.querySelector('#slider-year-counter-end');
const colorItems = document.querySelector('.colors-cont');
const toyCards = document.querySelector('#toy-cards');
const resetSettings = document.querySelector('#reset-settings');
const setElect = new Set();
// const noMatchAlert = document.querySelector('#no-match-alert');

let renderNumArr: number[] = [];
let checkedFormsArr: string[] = [];
let checkedColorsArr: string[] = [];
let checkedSizeArr: string[] = [];
let checkedFavoritesArr: boolean[] = [];
let bellChecked = 'no';
let ballChecked = 'no';
let pineChecked = 'no';
let snowflakeChecked = 'no';
let toyChecked = 'no';
let copiesCounterStart = 1;
let copiesCounterEnd = 12;
let yearCounterStart = 1940;
let yearCounterEnd = 2020;
let whiteChecked = 'no';
let yellowChecked = 'no';
let redChecked = 'no';
let blueChecked = 'no';
let greenChecked = 'no';
let bigSizeChecked = 'no';
let middleSizeChecked = 'no';
let smallSizeChecked = 'no';
let onlyFavoritesChecked = 'no';

/*Первый рендер всех карточек*/

allFilters(data);

/*Слайдеры*/
if (sliderCopies) {
  noUiSlider.create(sliderCopies, {
    start: [1, 12],
    step: 1,
    connect: true,
    range: {
      min: [1],
      max: [12],
    },
  });
}

if (sliderYear) {
  noUiSlider.create(sliderYear, {
    start: [1940, 2020],
    step: 10,
    connect: true,
    range: {
      min: [1940],
      max: [2020],
    },
  });
}

/*Создает и заполняет карточку*/

function createToyCard(num: number) {
  const item: HTMLDivElement = document.createElement('div');
  item.classList.add('toy-card-item');
  item.setAttribute('data-card-id', `${num}`);
  item.innerHTML = `<p class="toy-name">${data[num].name}</p>
    <picture>
      <source srcset="./toys/webp/${num + 1}.webp" type="image/webp">
      <img class="toy-image" src="./toys/${num + 1}.png" alt="toy image" width="85" height="85"/>
    </picture>
    <p class="toy-count">Количество: ${data[num].count}</p>
    <p class="toy-year">Год выпуска: ${data[num].year} год</p>
    <p class="toy-shape">Форма игрушки: ${data[num].shape}</p>
    <p class="toy-color">Цвет игрушки: ${data[num].color}</p>
    <p class="toy-size">Размер игрушки: ${data[num].size}</p>
    <p class="toy-favorite">Редкий товар: ${data[num].favorite == true ? 'да' : 'нет'}</p>`;
  toyCards && toyCards.appendChild(item);
  if (setElect.has(num)) {
    item.classList.add('toy-card-item-elect');
  }
  item.classList.add('hidden-card');
  setTimeout(() => item.classList.remove('hidden-card'), 10);
  item.addEventListener('click', () => {
    cardHandler(item, num);
  });
}

/*Изменение стиля по клику + счетчик*/

function cardHandler(item: HTMLDivElement, id: number) {
  if (setElect.has(id)) {
    item.classList.remove('toy-card-item-elect');
    setElect.delete(id);
  } else {
    if (setElect.size < 20) {
      item.classList.add('toy-card-item-elect');
      setElect.add(id);
    } else {
      toyCounter?.classList.add('toy-counter-alert');
      setTimeout(() => {
        toyCounter?.classList.remove('toy-counter-alert');
      }, 1500);
    }
  }
  toyCounter && (toyCounter.innerHTML = `${setElect.size}`);
}

/*Заполняет контейнер карточками с номерами из массива*/

function renderCards(arrNum: Array<number>) {
  toyCards && (toyCards.innerHTML = '');
  for (const num of arrNum) {
    createToyCard(num);
  }

  if (arrNum.length == 0) {
    const alert = document.createElement('div');
    alert.classList.add('no-match-alert');
    alert.innerHTML = 'Увы, таких игрушек в коллекции нет&#128532;';
    toyCards?.appendChild(alert);
  }
}

/*Создает массив из выбранных форм игрушек*/

function checkFilterForms(bellChecked: string, ballChecked: string, pineChecked: string, snowflakeChecked: string, toyChecked: string) {
  if (bellChecked == 'yes') {
    checkedFormsArr.push('колокольчик');
  }
  if (ballChecked == 'yes') {
    checkedFormsArr.push('шар');
  }
  if (pineChecked == 'yes') {
    checkedFormsArr.push('шишка');
  }
  if (snowflakeChecked == 'yes') {
    checkedFormsArr.push('снежинка');
  }
  if (toyChecked == 'yes') {
    checkedFormsArr.push('фигурка');
  }
  if (checkedFormsArr.length == 0) {
    checkedFormsArr = ['колокольчик', 'шар', 'шишка', 'снежинка', 'фигурка'];
  }
}

/*Создает массив из выбранных цветов игрушек*/

function checkFilterColors(whiteChecked: string, yellowChecked: string, redChecked: string, blueChecked: string, greenChecked: string) {
  if (whiteChecked == 'yes') {
    checkedColorsArr.push('белый');
  }
  if (yellowChecked == 'yes') {
    checkedColorsArr.push('желтый');
  }
  if (redChecked == 'yes') {
    checkedColorsArr.push('красный');
  }
  if (blueChecked == 'yes') {
    checkedColorsArr.push('синий');
  }
  if (greenChecked == 'yes') {
    checkedColorsArr.push('зелёный');
  }
  if (checkedColorsArr.length == 0) {
    checkedColorsArr = ['белый', 'желтый', 'красный', 'синий', 'зелёный'];
  }
}

/*Создает массив из выбранных размеров игрушек*/

function checkFilterSizes(bigSizeChecked: string, middleSizeChecked: string, smallSizeChecked: string) {
  if (bigSizeChecked == 'yes') {
    checkedSizeArr.push('большой');
  }
  if (middleSizeChecked == 'yes') {
    checkedSizeArr.push('средний');
  }
  if (smallSizeChecked == 'yes') {
    checkedSizeArr.push('малый');
  }
  if (checkedSizeArr.length == 0) {
    checkedSizeArr = ['большой', 'средний', 'малый'];
  }
}

function checkFilterFavorites(onlyFavoritesChecked: string) {
  if (onlyFavoritesChecked == 'yes') {
    checkedFavoritesArr = [true];
  } else {
    checkedFavoritesArr = [true, false];
  }
}

/*Оставляет только карточки, соответствующие фильтрам*/

function allFilters(data: Array<toyItem>) {
  let copyData = data.slice();

  checkedFormsArr = [];
  checkFilterForms(bellChecked, ballChecked, pineChecked, snowflakeChecked, toyChecked);
  copyData = copyData.filter((item) => checkedFormsArr.includes(item.shape));

  copyData = copyData.filter((item) => +item.count >= copiesCounterStart && +item.count <= copiesCounterEnd);
  copyData = copyData.filter((item) => +item.year >= yearCounterStart && +item.year <= yearCounterEnd);

  checkedColorsArr = [];
  checkFilterColors(whiteChecked, yellowChecked, redChecked, blueChecked, greenChecked);
  copyData = copyData.filter((item) => checkedColorsArr.includes(item.color));

  checkedSizeArr = [];
  checkFilterSizes(bigSizeChecked, middleSizeChecked, smallSizeChecked);
  copyData = copyData.filter((item) => checkedSizeArr.includes(item.size));

  checkedFavoritesArr = [];
  checkFilterFavorites(onlyFavoritesChecked);
  copyData = copyData.filter((item) => checkedFavoritesArr.includes(item.favorite));

  if ((searchInput as HTMLInputElement).value != '') {
    copyData = copyData.filter((item) => item.name.toLowerCase().includes((searchInput as HTMLInputElement).value.toLowerCase()));
  }

  if ((sortForm as HTMLInputElement).value == 'sort-by-name-down') {
    copyData.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
  } else if ((sortForm as HTMLInputElement).value == 'sort-by-name-up') {
    copyData.sort(function (a, b) {
      if (b.name.toLowerCase() < a.name.toLowerCase()) return -1;
      if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
      return 0;
    });
  } else if ((sortForm as HTMLInputElement).value == 'sort-by-year-up') {
    copyData.sort((a, b) => +a.year - +b.year);
  } else if ((sortForm as HTMLInputElement).value == 'sort-by-year-down') {
    copyData.sort((a, b) => +b.year - +a.year);
  }

  renderNumArr = [];
  copyData.forEach((item) => renderNumArr.push(+item.num - 1));
  renderCards(renderNumArr);
}

/*Сброс фильтров*/

function clearFilters() {
  renderNumArr = [];
  checkedFormsArr = [];
  checkedColorsArr = [];
  checkedSizeArr = [];
  checkedFavoritesArr = [];
  bellChecked = 'no';
  ballChecked = 'no';
  pineChecked = 'no';
  snowflakeChecked = 'no';
  toyChecked = 'no';
  copiesCounterStart = 1;
  copiesCounterEnd = 12;
  yearCounterStart = 1940;
  yearCounterEnd = 2020;
  whiteChecked = 'no';
  yellowChecked = 'no';
  redChecked = 'no';
  blueChecked = 'no';
  greenChecked = 'no';
  bigSizeChecked = 'no';
  middleSizeChecked = 'no';
  smallSizeChecked = 'no';
  onlyFavoritesChecked = 'no';

  bellForm?.classList.remove('toy-form-item-active');
  ballForm?.classList.remove('toy-form-item-active');
  pineForm?.classList.remove('toy-form-item-active');
  snowflakeForm?.classList.remove('toy-form-item-active');
  toyForm?.classList.remove('toy-form-item-active');

  if (sliderCopies && sliderCopies.noUiSlider) {
    sliderCopies.noUiSlider.set([1, 12]);
  }
  if (sliderYear && sliderYear.noUiSlider) {
    sliderYear.noUiSlider.set([1940, 2020]);
  }
  sliderCopiesCounterStart && (sliderCopiesCounterStart.innerHTML = '1');
  sliderCopiesCounterEnd && (sliderCopiesCounterEnd.innerHTML = '12');
  sliderYearCounterStart && (sliderYearCounterStart.innerHTML = '1940');
  sliderYearCounterEnd && (sliderYearCounterEnd.innerHTML = '2020');

  whiteColorForm?.classList.remove('checkbox');
  yellowColorForm?.classList.remove('checkbox');
  redColorForm?.classList.remove('checkbox');
  blueColorForm?.classList.remove('checkbox');
  greenColorForm?.classList.remove('checkbox');

  bigSizeForm?.classList.remove('checkbox-alt');
  middleSizeForm?.classList.remove('checkbox-alt');
  smallSizeForm?.classList.remove('checkbox-alt');

  onlyFavoritesForm?.classList.remove('checkbox-alt');

  if (toyCards) {
    toyCards.innerHTML = '';
  }
  allFilters(data);
}

/*Обработчики*/

/*Окно поиска*/

searchInput?.addEventListener('keyup', () => {
  allFilters(data);
});

/*Список сортировок*/

sortForm?.addEventListener('change', () => {
  allFilters(data);
});

/*Иконки игрушек*/

bellForm?.addEventListener('click', () => {
  bellForm.classList.toggle('toy-form-item-active');
  if (bellChecked == 'no') {
    bellChecked = 'yes';
  } else {
    bellChecked = 'no';
  }
  allFilters(data);
});

ballForm?.addEventListener('click', () => {
  ballForm.classList.toggle('toy-form-item-active');
  if (ballChecked == 'no') {
    ballChecked = 'yes';
  } else {
    ballChecked = 'no';
  }
  allFilters(data);
});

pineForm?.addEventListener('click', () => {
  pineForm.classList.toggle('toy-form-item-active');
  if (pineChecked == 'no') {
    pineChecked = 'yes';
  } else {
    pineChecked = 'no';
  }
  allFilters(data);
});

snowflakeForm?.addEventListener('click', () => {
  snowflakeForm.classList.toggle('toy-form-item-active');
  if (snowflakeChecked == 'no') {
    snowflakeChecked = 'yes';
  } else {
    snowflakeChecked = 'no';
  }
  allFilters(data);
});

toyForm?.addEventListener('click', () => {
  toyForm.classList.toggle('toy-form-item-active');
  if (toyChecked == 'no') {
    toyChecked = 'yes';
  } else {
    toyChecked = 'no';
  }
  allFilters(data);
});

/*Счетчики слайдера*/

if (sliderCopies.noUiSlider) {
  sliderCopies.noUiSlider.on('update', function (values, handle) {
    const inputs = [sliderCopiesCounterStart as HTMLInputElement, sliderCopiesCounterEnd as HTMLInputElement];
    copiesCounterStart = Math.round(+values[0]);
    copiesCounterEnd = Math.round(+values[1]);
    inputs[handle].value = `${Math.round(+values[handle])}`;
    allFilters(data);
  });
}

if (sliderYear.noUiSlider) {
  sliderYear.noUiSlider.on('update', function (values, handle) {
    const inputs = [sliderYearCounterStart as HTMLInputElement, sliderYearCounterEnd as HTMLInputElement];
    yearCounterStart = Math.round(+values[0]);
    yearCounterEnd = Math.round(+values[1]);
    inputs[handle].value = `${Math.round(+values[handle])}`;
    allFilters(data);
  });
}

/*Чекбоксы цветов*/

colorItems?.addEventListener('click', (event) => {
  (event.target as HTMLElement).classList.toggle('checkbox');
  allFilters(data);
});

whiteColorForm?.addEventListener('click', () => {
  if (whiteChecked == 'no') {
    whiteChecked = 'yes';
  } else {
    whiteChecked = 'no';
  }
});

yellowColorForm?.addEventListener('click', () => {
  if (yellowChecked == 'no') {
    yellowChecked = 'yes';
  } else {
    yellowChecked = 'no';
  }
});

redColorForm?.addEventListener('click', () => {
  if (redChecked == 'no') {
    redChecked = 'yes';
  } else {
    redChecked = 'no';
  }
});

blueColorForm?.addEventListener('click', () => {
  if (blueChecked == 'no') {
    blueChecked = 'yes';
  } else {
    blueChecked = 'no';
  }
});

greenColorForm?.addEventListener('click', () => {
  if (greenChecked == 'no') {
    greenChecked = 'yes';
  } else {
    greenChecked = 'no';
  }
});

/*Чекбоксы размеров и избранного, кнопка сброса настроек*/

bigSizeForm?.addEventListener('click', () => {
  bigSizeForm.classList.toggle('checkbox-alt');
  if (bigSizeChecked == 'no') {
    bigSizeChecked = 'yes';
  } else {
    bigSizeChecked = 'no';
  }
  allFilters(data);
});

middleSizeForm?.addEventListener('click', () => {
  middleSizeForm.classList.toggle('checkbox-alt');
  if (middleSizeChecked == 'no') {
    middleSizeChecked = 'yes';
  } else {
    middleSizeChecked = 'no';
  }
  allFilters(data);
});

smallSizeForm?.addEventListener('click', () => {
  smallSizeForm.classList.toggle('checkbox-alt');
  if (smallSizeChecked == 'no') {
    smallSizeChecked = 'yes';
  } else {
    smallSizeChecked = 'no';
  }
  allFilters(data);
});

onlyFavoritesForm?.addEventListener('click', () => {
  onlyFavoritesForm.classList.toggle('checkbox-alt');
  if (onlyFavoritesChecked == 'no') {
    onlyFavoritesChecked = 'yes';
  } else {
    onlyFavoritesChecked = 'no';
  }
  allFilters(data);
});

resetSettings?.addEventListener('click', () => {
  clearFilters();
});

export { setElect };
