const btnToggle = document.querySelectorAll('.filter__toggle');
const dropdownToggle = document.querySelectorAll('.btn.dropdown-toggle');

const filter = document.querySelector('.filter');
const filterSettings = document.querySelector('.filter__settings');

const previewList = document.querySelector('.preview__list');
const preview = document.querySelector('.preview');
const previewTourShow = document.querySelector('.preview__tour-show');
// const previewArrow = document.querySelectorAll('.preview__arrow');

const readyTab = document.querySelector('#pills-ready-tab');
const constructorTab = document.querySelector('#pills-constructor-tab');

async function postData(url, obj) {
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: 'param=' + JSON.stringify(obj),
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText));
    }
    return Promise.resolve(response.json());
  });
  return await result;
}

function postNew(url, obj) {
  $(function () {
    $.ajax({
      type: 'POST',
      url: url,
      data: obj,
      success: success,
    }).done(function () {
      console.log('hello');
    });
  });
}

// postData('config/getImage.php', 1).then((data) => {
//   const img = `<img src="data:image/jpeg;base64, ${data}" alt=""/>`;
//   console.log(img);
// });

{
  /* <li class="preview__tour" style="background-image: url('img/${item.image}')" data-tour_id="${item.tour_id}"></li> */
}
function updatePreviewList(data) {
  previewList.innerHTML = '';
  if (data) {
    data.forEach((item) => {
      const li = `
      <li class="preview__tour" style="background-image: url('data:image/jpeg;base64,${item.image}')" data-tour_id="${item.tour_id}">
        <h4 class="preview__tour-name">${item.name}</h4>
        <a class="preview__tour-show" href="#">Подробно</a>
      </li>
      `;
      previewList.insertAdjacentHTML('beforeend', li);
    });
  }
  if (data.length === 0) {
    previewList.insertAdjacentHTML(
      'beforeend',
      '<span class="preview__not-found">По вашему запросу ничего не найдено</span>',
    );
  }
  console.log(previewTourShow);
}

// Передаваемый объект филтров

let objFilter = {
  territory: 'Не выбрано',
  types: [],
  season: 'Не выбрано',
  complexity: '0',
  priceMin: 500,
  priceMax: 1000000,
  groupFrom: 1,
  groupTo: 10,
};

let objImage = {
  field: ['image'],
  table: 'routes',
  var: 'tour_id',
  id: [],
};

function setFilter(url, callback) {
  const territoryFilter = document.querySelectorAll(`.territory a`);
  const typesFilter = document.querySelectorAll(`.filter__types .filter__toggle`);
  const filterSeason = document.querySelectorAll(`.filter__season a`);
  const complexity = document.querySelector('.complexity');
  const from = document.querySelector('.price-from');
  const to = document.querySelector('.price-to');
  const dropdownItem = document.querySelectorAll('.dropdown-item');

  dropdownItem.forEach((drp) => {
    drp.addEventListener('click', () => {
      drp.parentElement.previousElementSibling.children[0].textContent = drp.textContent;
    });
  });
  // const filterComplexity = document.querySelector(`.filter__complexity input`);

  // Получение начальных данных по турам без фильтрации
  function defaultFilter(obj) {
    postData(url, obj).then((data) => {
      console.log(data);
      callback(data);
    });
  }
  defaultFilter(objFilter);

  // Фильтр - Территория проведения туров
  territoryFilter.forEach((item) => {
    item.addEventListener('click', (e) => {
      objFilter.territory = e.target.textContent;
      postData(url, objFilter).then((data) => {
        console.log(data);
        callback(data);
      });
    });
  });

  // Фильтр - Искомые типы туров

  typesFilter.forEach((btn) => {
    btn.dataset.enabled = 'false';

    btn.addEventListener('click', (e) => {
      btn.classList.toggle('filter__toggle--active');
      const set = btn.parentElement.dataset.types;

      if (btn.classList.contains('filter__toggle--active')) {
        btn.dataset.enabled = 'true';
        setObjFilterSetting('types', set);
        console.log(objFilter);
        postData(url, objFilter).then((data) => {
          console.log(data);
          callback(data);
        });
      } else {
        btn.dataset.enabled = 'false';
        deleteObjFilterSetting('types', set);
        console.log(objFilter);
        postData(url, objFilter).then((data) => {
          console.log(data);
          callback(data);
        });
      }
    });
  });

  // Фильтр - Сезон проведения туров

  filterSeason.forEach((item) => {
    item.addEventListener('click', (e) => {
      objFilter.season = e.target.dataset.season;
      console.log(objFilter);
      postData(url, objFilter).then((data) => {
        console.log(data);
        callback(data);
      });
    });
  });

  // Фильтр - время проведения туров

  $(function () {
    $('input[name="birthday"]').daterangepicker({
      singleDatePicker: false,
      showDropdowns: true,
      minYear: moment().get('year'),
      maxYear: moment().get('year') + 10,
      locale: {
        format: 'DD / MM / YYYY',
        daysOfWeek: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        monthNames: [
          'Январь',
          'Февраль',
          'Март',
          'Апрель',
          'Май',
          'Июнь',
          'Июль',
          'Август',
          'Сентябрь',
          'Октябрь',
          'Ноябрь',
          'Декабрь',
        ],
        firstDay: 1,
      },
    });

    const timeOfTour = document.querySelector('input[name="birthday"]').value;
    objFilter.timeOfTour = timeOfTour;

    $('input[name="birthday"]').on('hide.daterangepicker', function () {
      const timeOfTour = document.querySelector('input[name="birthday"]').value;
      objFilter.timeOfTour = timeOfTour;
      console.log(timeOfTour);
    });
  });

  // Фильтр - Сложность тура

  $(`.range-complexity`).ionRangeSlider({
    type: 'single',
    skin: 'round',
    onFinish: function (data) {
      if (data.from === 1) {
        complexity.textContent = 'низкая';
        objFilter.complexity = '1';
      } else if (data.from === 2) {
        complexity.textContent = 'средняя';
        objFilter.complexity = '2';
      } else if (data.from === 3) {
        complexity.textContent = 'высокая';
        objFilter.complexity = '3';
      } else {
        complexity.textContent = 'любая';
        objFilter.complexity = '0';
      }
      console.log(objFilter);
      postData(url, objFilter).then((data) => {
        console.log(data);
        callback(data);
      });
    },
  });

  // Фильтр - Стоимость тура

  $(`.range-price`).ionRangeSlider({
    type: 'double',
    skin: 'round',
    min: 500,
    max: 1000000,
    from: 500,
    step: 5000,
    to: 1000000,
    onChange: function (data) {
      from.textContent = data.from;
      to.textContent = data.to;
    },
    onFinish: function (data) {
      objFilter.priceMin = data.from;
      objFilter.priceMax = data.to;
      console.log(objFilter);
      postData(url, objFilter).then((data) => {
        console.log(data);
        callback(data);
      });
    },
  });
}
setFilter('filters/filter.php', updatePreviewList);

function setObjFilterSetting(array, elem) {
  elem = elem.trim();

  if (!objFilter[array].includes(elem)) {
    objFilter[array].push(elem);
  }
}

function deleteObjFilterSetting(array, elem) {
  elem = elem.trim();
  const index = objFilter[array].indexOf(elem);

  if (index > -1) {
    objFilter[array].splice(index, 1);
  }
}

// Клик по кнопке "Подробнее" - раскрывается описание тура

function showTourDescription(data) {
  if (document.querySelector('.tour')) {
    filter.removeChild(document.querySelector('.tour'));
  }
  console.log(data);

  // let actions = data.actions.split(';');
  let actions = [data['action-1'], data['action-2'], data['action-3'], data['action-4']];
  actions = actions.map((item, index) => {
    if (item) {
      const actionImage = data[`action-img-${index + 1}`];
      return `
      <li class="tour__action">
        <img src="data:image/svg+xml;base64, ${actionImage}" alt="" />
        <p class="tour__descr tour__descr--action">${item}</p>
      </li>`;
    }
  });
  // actions = actions.toString().replace(/,/g, '');
  actions = actions.join('');

  const tourDesc = `
    <section class="row tour">
    <aside class="col-sm-3 filter__settings filter__settings--tour">
      <div class="tour__settings">
        <h3 class="filter__item" style="margin-bottom: 10px">${data.territory}</h3>
        <h3 class="filter__title" style="margin-bottom: 20px">${data.subtitle}</h3>

        <span class="filter__item">Сложность: высокая</span>

        <p class="filter__group-size">
          <span class="filter__item">Размер группы от </span>
          <span class="filter__item filter__item--red group-from">1</span>
          <span class="filter__item"> до </span>
          <span class="filter__item filter__item--red group-to">1</span>
          <span class="filter__item"> человек</span>
          <input
            type="text"
            class="range-group-size"
            name="range-group-size"
            data-min="1"
            data-max="10"
            data-from="1"
            data-to="1"
            data-grid="false"
          />
        </p>

        <div class="filter__lodging">
          <h3 class="filter__title">Проживание во время тура:</h3>
          <ul class="filter__lodging-list">
            <li class="filter__lodging-item">
              <img src="svg/tent.svg" alt="${data.tent}" />
              <span class="filter__item">${data.tent}</span>
            </li>
            <li class="filter__lodging-item">
              <img src="svg/hotel.svg" alt="${data.hotel}" />
              <span class="filter__item">${data.hotel}</span>
            </li>
          </ul>
        </div>

        <div class="filter__total-price">
          <h3 class="filter__title" style="text-transform: uppercase">Итоговая стоимость:</h3>
          <span class="filter__item filter__item--red total-price">${data.price}</span>
          <span class="filter__item"> рублей с человека</span>
        </div>

        <div class="filter__reservation">
          <button class="btn-reservation">Забронировать</button>
        </div>
      </div>

      <div>
        <span class="filter__item">Возможно вас заинтересуют</span>
        <h3 class="filter__title">Похожие на этот туры</h3>

        <ul class="tour__similar preview__list">
          <li class="preview__tour" style="background-image: url('img/tours/1.jpg')">
            <h4 class="preview__tour-name">Горы без вершин. Путешествие на плато Путорана</h4>
            <a class="preview__tour-show" href="#">Подробно</a>
          </li>
          <li class="preview__tour" style="background-image: url('img/tours/2.jpg')">
            <h4 class="preview__tour-name">
              В сердце России. Сплав по Микчангде и восхождение на плато Путорана
            </h4>
            <a class="preview__tour-show" href="#">Подробно</a>
          </li>
          <li class="preview__tour" style="background-image: url('img/tours/3.jpg')">
            <h4 class="preview__tour-name">
              Енисейская экспедиция. Круиз из Красноярска в Дудинку
            </h4>
            <a class="preview__tour-show" href="#">Подробно</a>
          </li>
        </ul>
      </div>
    </aside>

    <article class="col-sm-9 d-flex flex-column filter__description tour__article">
      <header class="tour__header">
        <h2 class="tour__name">${data.title}</h2>
      </header>

      <p class="tour__descr">${data.intro}</p>

      <div class="tour__promo">
        <img class="tour__img" src="data:image/jpeg;base64, ${data['image_1']}" alt="Фотография с локации" />
        <p class="tour__warning warning">
          <b class="warning__title">ОБРАТИТЕ ВНИМАНИЕ!</b>
          <span class="warning__text">
            Это путешествие рекомендовано Русским географическим обществом
          </span>
        </p>
      </div>

      <p class="tour__descr">${data.description}</p>

      <ul class="tour__actions">${actions}</ul>

      <h3 class="tour__program">Программа тура</h3>

      <p class="tour__descr">${data.program_intro}</p>

      <ul class="program">
        <li class="program__item">
          <h4 class="program__day">
            <span>> День 1: </span>
            <span>Вертолетная заброска на Микчангду</span>
          </h4>
          <p class="program__descr">
            Вас ждет посадка на вертолет МИ-8 и заброска к месту начала маршрута на реке
            Микчангда. Она течет в самом центре плато Путорана, а горы, окружающие долину
            реки, — одни из самых высоких на плато (1200-1300 м). Прибыв на место, вы
            разобьете лагерь и пообедаете. После совершите небольшое путешествие к водопаду
            Орлиный высотой более 60 метров (2 км в пути, с набором высоты 250 м). Затем
            вернетесь в лагерь, поужинаете у костра и заночуете в палатках.
          </p>
        </li>
        <li class="program__item">
          <h4 class="program__day">
            <span>> День 2: </span>
            <span>Начало сплава</span>
          </h4>
          <p class="program__descr">
            После завтрака вы пройдете ускоренный курс навыков сплава на рафтах и отправитесь
            в водное путешествие по долине реки Микчангда. На обед вы остановитесь на
            живописном перекате реки, где сможете отдохнуть и порыбачить. После обеда вы
            продолжите сплав. На пути вам встретится не тающий ледник, вы остановитесь, чтобы
            его осмотреть. Ближе к вечеру вы выберете место для лагеря в дельте одной из рек,
            впадающих в Микчангду. Установите палатки, поужинаете и отдохнете. Протяженность
            сплава — 25-30 км.
          </p>
        </li>
        <li class="program__item">
          <h4 class="program__day">
            <span>> День 3: </span>
            <span>Начало сплава</span>
          </h4>
          <p class="program__descr">
            После завтрака вы продолжите сплавляться на рафтах по реке Микчангда до дельты
            реки Абагалах. В этом месте участок реки сильно разветвляется, образуя сеть из
            сотен островов. Так что во время прохождения маршрута вам придется приложить
            немалые усилия, чтобы попадать в русло. Днем вы сделаете привал для обеда и
            рыбалки, а вечером разобьете лагерь, поужинаете у костра и отдохнете.
            Протяженность сплава — 30-35 км.
          </p>
        </li>
        <li class="program__item">
          <h4 class="program__day">
            <span>> День 4: </span>
            <span>Начало сплава</span>
          </h4>
          <p class="program__descr">
            После завтрака вы продолжите сплавляться на рафтах по реке Микчангда до дельты
            реки Абагалах. В этом месте участок реки сильно разветвляется, образуя сеть из
            сотен островов. Так что во время прохождения маршрута вам придется приложить
            немалые усилия, чтобы попадать в русло. Днем вы сделаете привал для обеда и
            рыбалки, а вечером разобьете лагерь, поужинаете у костра и отдохнете.
            Протяженность сплава — 30-35 км.
          </p>
        </li>
        <li class="program__item">
          <h4 class="program__day">
            <span>> День 5: </span>
            <span>Выход к озеру Лама</span>
          </h4>
          <p class="program__descr">
            После завтрака вы пройдете на рафтах под веслами сложную дельту реки Микчангда, а
            затем, выйдя на озеро Лама, включите моторы. К обеду причалите к берегу и
            прогуляетесь к живописному водопаду «Бомба» высотой более 30 метров (5 км в пути с
            набором высоты 150 метров). После прогулки вы пообедаете и отправитесь на рафтах
            по озеру Лама до полуострова Каменный, где разместитесь в кемпинге. Вечером вас
            ужин с национальными блюдами народов Севера, а также горячая баня с купанием в
            озере Лама.
          </p>
        </li>
      </ul>

      <p class="tour__descr">
        <b style="display: block">Проживание во время тура</b>
        ${data.residence}
      </p>

      <div class="tour__promo">
        <img class="tour__img" src="data:image/jpeg;base64, ${data['image_2']}" alt="Фотография с тура" />
      </div>
    </article>

    <footer class="tour__footer col-sm-12">
      <p class="tour__footer-info">
        <span>Фото: </span>
        Ксения Рымская, Денис Кожевников, Алексей Белов
      </p>
      <p class="tour__footer-info">
        <span>Полезная информация по турам: </span>
        <a href="#">Памятка для туриста</a>
      </p>
    </footer>
  </section>
  `;

  filter.insertAdjacentHTML('beforeend', tourDesc);

  const groupFrom = document.querySelector('.group-from');
  const groupTo = document.querySelector('.group-to');
  const totalPrice = document.querySelector('.tour .total-price');
  const price = data.price;
  console.log(data);

  totalPrice.textContent = price;
  objFilter.price = price;

  $('.range-group-size').ionRangeSlider({
    type: 'double',
    skin: 'round',
    step: 1,
    onChange: function (data) {
      groupFrom.textContent = data.from;
      objFilter.groupFrom = data.from;
      groupTo.textContent = data.to;
      objFilter.groupTo = data.to;

      const total = calcTotalPrice(objFilter.groupFrom, objFilter.groupTo, price);

      objFilter.price = total;
      totalPrice.textContent = total;

      console.log(objFilter);
      console.log(total);
    },
  });

  $('.tour .btn-reservation').magnificPopup({
    items: {
      src: '#reservation-popup',
      type: 'inline',
    },
  });
}

function calcTotalPrice(min, max, price) {
  price = Number(price);
  const countOfPeople = max - min;
  let discount = (price / 10) * countOfPeople;

  if (countOfPeople === 0) {
    discount = 0;
  }

  const total = price - discount;

  return total;
}

// Клик по кнопке Подробно в превью списке туров

previewList.addEventListener('click', (e) => {
  if (e.target.tagName != 'A') return;
  const tourId = e.target.parentElement.dataset.tour_id;
  const objShow = { tourId: tourId };

  postData('filters/tours_description.php', objShow).then((data) => {
    console.log(data);
    console.log(data.actions);
    showTourDescription(data);
  });
});

// Переключение табов

readyTab.addEventListener('click', () => {
  preview.style.display = 'block';
  filterSettings.classList.remove('constructor');
  filterSettings.classList.add('ready');

  container.children[0].remove();
  container.insertAdjacentHTML('afterbegin', filterReady);

  if (document.querySelector('.locale')) {
    document.querySelector('.locale').remove();
  }
  if (document.querySelector('.tour-constructor')) {
    filter.removeChild(document.querySelector('.tour-constructor'));
  }

  let objFilter = {
    territory: 'Не выбрано',
    types: [],
    season: 'Не выбрано',
    complexity: '0',
    priceMin: 500,
    priceMax: 1000000,
    groupFrom: 1,
    groupTo: 10,
  };

  setFilter('filters/filter.php', updatePreviewList);
});
