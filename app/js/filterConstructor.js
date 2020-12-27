const previewListConstructor = document.querySelector('#preview-constructor .preview__list');

previewListConstructor.addEventListener('click', (e) => {
  let more = e.target.closest('#more');

  if (!more) return;

  const locId = more.parentElement.parentElement.dataset.loc_id;
  const obj = { locId };

  console.log(obj);

  postData('constructor/loc_description.php', obj).then((data) => showLocaleDescription(data));

  console.log('Подробнее');
});

function showLocaleDescription(data) {
  if (document.querySelector('.locale')) {
    filter.removeChild(document.querySelector('.locale'));
  }
  if (document.querySelector('.tour-constructor')) {
    filter.removeChild(document.querySelector('.tour-constructor'));
  }
  let facts = data.facts.split(';');
  facts = facts.map((item) => {
    return `
    <li class="locale__fact">
      <img src="svg/locale-facts/tambourine.svg" alt="" />
      <p class="locale__descr locale__descr--fact">${item}</p>
    </li>`;
  });
  facts = facts.toString().replace(/,/g, '');

  let transport = data.transport.split(';');
  console.log(transport);
  transport = transport.map((item) => {
    let img;
    item = item.trim();

    if (item === 'Вертолет') {
      img = 'svg/locale-transports/helicopter.svg';
    }
    if (item === 'Судно на воздушной подушке') {
      img = 'svg/locale-transports/hovercraft.svg';
    }

    return `
    <li class="filter__transport-item">
      <img src=${img} alt="${item}" />
      <span class="filter__item">${item}</span>
    </li>`;
  });
  transport = transport.toString().replace(/,/g, '');

  let lodging = data.lodging.split(';');
  lodging = lodging.map((item) => {
    let img;
    item = item.trim();
    if (item === 'Палатка') {
      img = 'svg/locale-transports/tent.svg';
    }
    if (item === 'Ночлег у местных жителей') {
      img = 'svg/locale-transports/hut.svg';
    }

    return `
    <li class="filter__lodging-item">
      <img src=${img} alt="${item}" />
      <span class="filter__item">${item}</span>
    </li>`;
  });
  lodging = lodging.toString().replace(/,/g, '');

  const locDesc = `
  <section class="row locale">
    <aside class="col-sm-3 filter__settings filter__settings--tour">
      <div class="tour__settings">
        <h3 class="filter__item" style="margin-bottom: 10px">${data.territory}</h3>

        <span class="filter__item">Сложность посещения: высокая</span><br><br>

        <div class="filter__transport">
          <h3 class="filter__title">Возможный транспорт до локации:</h3>
          <ul class="filter__transport-list">${transport}</ul>
        </div>

        <div class="filter__lodging">
          <h3 class="filter__title">Проживание во время тура:</h3>
          <ul class="filter__lodging-list">${lodging}</ul>
        </div>

        <div class="filter__reservation">
          <button class="btn-reservation">Добавить в тур</button>
        </div>
      </div>
    </aside>

    <article class="col-sm-9 d-flex flex-column filter__description tour__article">
      <header class="locale__header">
        <h2 class="locale__name">${data.title}</h2>
      </header>

      <p class="locale__descr">${data.intro}</p>

      <div class="locale__promo">
        <img class="locale__img" src="${data.image}" alt="Фотография с локации" />
      </div>

      <p class="locale__descr">${data.description}</p>

      <ul class="locale__facts">${facts}</ul>
    </article>

    <footer class="locale__footer col-sm-12">
      <p class="locale__footer-info">
        <span>Фото: </span>
        Максим Голубченко
      </p>
      <p class="locale__footer-info">
        <span>Полезная информация по турам: </span>
        <a href="#">Памятка для туриста</a>
      </p>
    </footer>
  </section>
  `;

  filter.insertAdjacentHTML('beforeend', locDesc);

  const groupFrom = document.querySelector('.group-from');
  const groupTo = document.querySelector('.group-to');

  $('.range-group-size').ionRangeSlider({
    type: 'double',
    skin: 'round',
    step: 1,
    onChange: function (data) {
      groupFrom.textContent = data.from;
      groupTo.textContent = data.to;
    },
  });
}

function showTourConstructor(data) {
  if (document.querySelector('.tour-constructor')) {
    filter.removeChild(document.querySelector('.tour-constructor'));
  }
  if (document.querySelector('.locale')) {
    filter.removeChild(document.querySelector('.locale'));
  }

  console.log(data);

  // let facts = data.facts.split(';');
  // facts = facts.map((item) => {
  //   return `
  //   <li class="locale__fact">
  //     <img src="svg/locale-facts/tambourine.svg" alt="" />
  //     <p class="locale__descr locale__descr--fact">${item}</p>
  //   </li>`;
  // });
  // facts = facts.toString().replace(/,/g, '');
  let title = data.map((item) => item.territory);
  title = title.join(' - ');
  console.log(title);

  let image = data.map((item) => {
    return `
    <div class="tour__slide" style="background-image: url('${item.image}')">
      <span class="slide__name">${item.territory}</span>
    </div>
    `;
  });
  image = image.toString().replace(/,/g, '');

  let facts = data.map((item, index) => {
    let localeFacts = item.facts.split(';');
    return `
    <li>
      <div class="locale__fact">
        <img src='svg/locale-facts/fishing_rod.svg' alt="" />
        <p class="filter__item">
          ${localeFacts}. Здесь вы пробудете 
          <span class="filter__item filter__item--red day-count-${index}">1 день</span>.
        </p>
      </div>
      <div class="filter__group-size">
        <span class="filter__item">Длительность вашего пребывания здесь:</span>
        <input
          type="text"
          class="range-day-count-${index}"
          name="range-day-count"
          data-min="1"
          data-max="30"
          data-from="1"
          data-grid="false"
        />
      </div><br><br>
    </li>
  `;
  });
  facts = facts.toString().replace(/,/g, '');

  let program = data.map((item, index) => {
    return `
      <li class="program__item">
        <h4 class="program__day">
          <span>> Локация ${index + 1}: </span>
          <span>${item.territory}</span>
        </h4>
        <p class="program__descr">${item.intro}</p>
      </li>
    `;
  });
  program = program.toString().replace(',', '');

  const tourConstructor = `
  <section class="row tour-constructor">
    <aside class="col-sm-3 filter__settings filter__settings--tour">
      <div class="tour__settings">
      <h3 class="filter__item" style="margin-bottom: 10px">Конструируемый тур</h3>
      <h3 class="filter__title" style="margin-bottom: 20px">
        ${data[0].territory} - ${data[data.length - 1].territory}
      </h3>

        <span class="filter__item">Общая сложность: средняя</span>

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
          <ul class="filter__lodging-list"></ul>
        </div>

        <div class="filter__total-price">
          <h3 class="filter__title" style="text-transform: uppercase">Ориентировочная стоимость:</h3>
          <span class="filter__item filter__item--red total-price">115 900</span>
          <span class="filter__item"> рублей с человека</span>
        </div>

        <div class="filter__reservation">
          <button class="btn-reservation">Забронировать</button>
        </div>
      </div>
    </aside>

    <article class="col-sm-9 d-flex flex-column filter__description tour__article">
      <header class="locale__header">
        <h2 class="locale__name">${title}</h2>
      </header>
      
      <div class="tour__promo">
        <div class="tour__warning warning">
          <b class="warning__title">ОБРАТИТЕ ВНИМАНИЕ!</b>
          <p class="warning__text">
            Этот тур составили вы сами, используя конструктор туров. Конструктор учитывает все возможные условия сочетаемости точек вашего маршрута, поэтому если вы видите эту страницу, то с вашим туром все в порядке и он состоится. Однако, описание тура также составлено автоматически и может содержать не все подробности о нем. Более детально обсудить тур вы сможете с туроператором, который возьмется за его выполнение.
          </p>
        </div><br>
        
        <div class="tour__slider">${image}</div>
      </div>
      
      <p class="locale__descr">Во время этого тура вы посетите несколько локаций туристско-рекреационного кластера «Арктический». Вот главные точки интереса, которые привлекут ваше внимание в ходе тура:</p>

      <ul class="locale__facts">${facts}</ul>
      

      <h3 class="tour__program">Программа тура</h3>
      <ul class="program">${program}</ul>
    </article>

    <footer class="locale__footer col-sm-12">
      <p class="locale__footer-info">
        <span>Фото: </span>
        Максим Голубченко
      </p>
      <p class="locale__footer-info">
        <span>Полезная информация по турам: </span>
        <a href="#">Памятка для туриста</a>
      </p>
    </footer>
  </section>
  `;

  filter.insertAdjacentHTML('beforeend', tourConstructor);

  objFilter.territory = title;

  $(function () {
    $('.tour__slider').slick({
      arrows: true,
      autoplay: false,
      autoplaySpeed: 8000,
      speed: 1400,
      cssEase: 'ease-in-out',
      pauseOnHover: false,
      waitForAnimate: true,
    });
  });

  function setRangeDayCount(index) {
    const dayCount = document.querySelector(`.day-count-${index}`);

    $(`.range-day-count-${index}`).ionRangeSlider({
      type: 'single',
      skin: 'round',
      min: 1,
      max: 30,
      from: 1,
      step: 1,
      onChange: function (data) {
        const num = String(data.from);

        if (num.match(/1$/)) {
          dayCount.textContent = num + ' день';
        }
        if (num.match(/[2-4]$/)) {
          dayCount.textContent = num + ' дня';
        }
        if (num.match(/[0, 5-9]$/)) {
          dayCount.textContent = num + ' дней';
        }
        if (num >= 11 && num <= 19) {
          dayCount.textContent = num + ' дней';
        }
      },
    });
  }

  data.forEach((item, index) => setRangeDayCount(index));

  const totalPriceText = document.querySelector('.tour-constructor .total-price');
  const groupFrom = document.querySelector('.group-from');
  const groupTo = document.querySelector('.group-to');

  totalPriceText.textContent = totalPriceConstructor;

  $('.range-group-size').ionRangeSlider({
    type: 'double',
    skin: 'round',
    min: 1,
    max: 10,
    from: 1,
    to: 10,
    step: 1,
    onChange: function (data) {
      groupFrom.textContent = data.from;
      groupTo.textContent = data.to;
      objFilter.groupFrom = data.from;
      objFilter.groupTo = data.to;

      console.log(totalPriceConstructor);

      const total = calcTotalPrice(objFilter.groupFrom, objFilter.groupTo, totalPriceConstructor);
      objFilter.price = total;
      totalPriceText.textContent = total;
    },
  });

  $('.tour-constructor .btn-reservation').magnificPopup({
    items: {
      src: '#reservation-popup',
      type: 'inline',
    },
  });

  const btnReserv = document.querySelector('.tour-constructor .btn-reservation');
  btnReserv.addEventListener('click', () => {
    const locDays = document.querySelectorAll('.locale__fact span');
    let days = objFilter.territory.split('-');

    locDays.forEach((day, index) => {
      days.splice(index + (index + 1), 0, ` (${day.textContent});`);
    });

    days = days
      .join('')
      .split(';')
      .filter((item) => item);

    objFilter.territory = days.join(' - ');
  });
}

console.log(previewConstructor);

previewConstructor.addEventListener('click', (e) => {
  const calcPrice = e.target.closest('#preview-constructor .btn-calc');
  const previewTour = document.querySelectorAll('#preview-constructor .preview__tour');

  if (e.target != calcPrice) return;

  const obj = {
    locId: [],
  };

  previewTour.forEach((item) => {
    obj.locId.push(item.dataset.loc_id);
  });
  console.log(obj);

  postData('constructor/constructor.php', obj).then((data) => {
    showTourConstructor(data);
  });
});

// Сворачаивание/разворачивание превью списка туров

preview.addEventListener('click', (e) => {
  if (!e.target.closest('.preview__arrow')) return;

  e.target.classList.toggle('preview__arrow--close');
  previewList.classList.toggle('preview__list--close');
});

// Сворачаивание/разворачивание превью списка туров

previewConstructor.addEventListener('click', (e) => {
  if (!e.target.closest('.preview__arrow')) return;

  e.target.classList.toggle('preview__arrow--close');
  previewListConstructor.classList.toggle('preview__list--close');
});
