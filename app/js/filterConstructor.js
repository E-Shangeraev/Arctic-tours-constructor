const previewListConstructor = document.querySelector('#preview-constructor .preview__list');

// previewListConstructor.addEventListener('click', (e) => {
//   let remove = e.target.closest('#remove');

//   if (!remove) return;

//   myRouteArr.forEach((item, index, arr) => {
//     if (item === locale) {
//       arr.splice(index, 1);
//     }
//   });
//   remove.parentElement.parentElement.remove();

//   setNumberToLoc();
// });

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

  // let facts = data.facts.split(';');
  // facts = facts.map((item) => {
  //   return `
  //   <li class="locale__fact">
  //     <img src="svg/locale-facts/tambourine.svg" alt="" />
  //     <p class="locale__descr locale__descr--fact">${item}</p>
  //   </li>`;
  // });
  // facts = facts.toString().replace(/,/g, '');

  const tourConstructor = `
  <section class="row tour-constructor">
    <aside class="col-sm-3 filter__settings filter__settings--tour">
      <div class="tour__settings">
      <h3 class="filter__item" style="margin-bottom: 10px">Конструируемый тур</h3>
      <h3 class="filter__title" style="margin-bottom: 20px">Норильск - оз. Собачье</h3>

        <span class="filter__item">Общая сложность: средняя</span>

        <p class="filter__group-size">
          <span class="filter__item">Размер группы от </span>
          <span class="filter__item filter__item--red group-to">10</span>
          <span class="filter__item"> человек(а)</span>
          <input
            type="text"
            class="range-group-size"
            name="range-group-size"
            data-min="2"
            data-max="20"
            data-from="10"
            data-grid="false"
          />
        </p>

        <div class="filter__lodging">
          <h3 class="filter__title">Проживание во время тура:</h3>
          <ul class="filter__lodging-list"></ul>
        </div>

        <div class="filter__total-price">
          <h3 class="filter__title" style="text-transform: uppercase">Ориентировочная стоимость:</h3>
          <span class="filter__item filter__item--red">115 900</span>
          <span class="filter__item"> рублей с человека</span>
        </div>

        <div class="filter__reservation">
          <button class="btn-reservation">Забронировать</button>
        </div>
      </div>
    </aside>

    <article class="col-sm-9 d-flex flex-column filter__description tour__article">
      <header class="locale__header">
        <h2 class="locale__name">Город Норильск - поселок Снежногорск - озеро Лама - озеро Собачье. Конструируемый тур</h2>
      </header>
      
      <div class="tour__promo">
        <div class="tour__warning warning">
          <b class="warning__title">ОБРАТИТЕ ВНИМАНИЕ!</b>
          <p class="warning__text">
            Этот тур составили вы сами, используя конструктор туров. Конструктор учитывает все возможные условия сочетаемости точек вашего маршрута, поэтому если вы видите эту страницу, то с вашим туром все в порядке и он состоится. Однако, описание тура также составлено автоматически и может содержать не все подробности о нем. Более детально обсудить тур вы сможете с туроператором, который возьмется за его выполнение.
          </p>
        </div><br>
        <img class="tour__img" src="img/locales/locale-1/1.jpg" alt="Фотография с локации" />
      </div>
      
      <p class="locale__descr">Во время этого тура вы посетите несколько локаций тристско-рекреационного кластера «Арктический». Вот главные точки интереса, которые привлекут ваше внимание в ходе тура:</p>

      <ul class="locale__facts">
        <li>
          <div class="locale__fact">
            <img src='svg/locale-facts/fishing_rod.svg' alt="" />
            <p class="filter__item">
              Музеи Норильска – популярные достопримечательности, которые входят в обязательную программу посещения Норильска. На ознакомление со всеми экспонатами не хватит и нескольких месяцев, но обзорную экскурсию должен наметить для себя каждый турист. Здесь вы пробудете 
              <span class="filter__item filter__item--red day-count-1">1 день</span>.
            </p>
          </div>
          <div class="filter__group-size">
            <span class="filter__item">Длительность вашего пребывания здесь:</span>
            <input
              type="text"
              class="range-day-count-1"
              name="range-day-count"
              data-min="1"
              data-max="30"
              data-from="1"
              data-grid="false"
            />
          </div><br><br>
        </li>
        <li>
          <div class="locale__fact">
            <img src='svg/locale-facts/tambourine.svg' alt="" />
            <p class="filter__item">
              Эвенки отмечают Новый год в середине лета. А езе они задабривают дух огня, вместо того чтобы положить подарки под ёлочку. Во время шаманского ритуала Кормления огня в поселке Снежногорск у вас будет шанс в этом убедиться! Здесь вы пробудете 
              <span class="filter__item filter__item--red day-count-2">1 день</span>.
            </p>
          </div>
          <div class="filter__group-size">
            <span class="filter__item">Длительность вашего пребывания здесь:</span>
            <input
              type="text"
              class="range-day-count-2"
              name="range-day-count"
              data-min="1"
              data-max="30"
              data-from="1"
              data-grid="false"
            />
          </div><br><br>
        </li>
      </ul>
      

      <h3 class="tour__program">Программа тура</h3>
      <ul class="program">
        <li class="program__item">
          <h4 class="program__day">
            <span>> Локация 1: </span>
            <span>город Норильск</span>
          </h4>
          <p class="program__descr">
            Нори́льск — город краевого подчинения Красноярского края. Расположен на севере региона к югу от Таймырского полуострова, примерно в 90 км к востоку от Енисея и в 1500 км севернее Красноярска, в 300 км к северу от Северного полярного круга, и в 2400 км от Северного полюса. В Норильске вы можете посетить многочисленные музеи и выставки этнической культуры народов крайнего севера. Здесь вы пробудете <span>2 дня</span>
          </p>
        </li>
        <li class="program__item">
          <h4 class="program__day">
            <span>> Локация 2: </span>
            <span>поселок Снежногорск</span>
          </h4>
          <p class="program__descr">
            Снежного́рск — посёлок городского типа в Красноярском крае России, на реке Хантайке (Усть-Хантайском водохранилище), правом притоке Енисея. Расположен в 160 км к югу от Норильска. Снежногорск входит в городской округ город Норильск как его отдалённый эксклав. Со всех сторон окружён Таймырским Долгано-Ненецким районом. 
            Население — 666 чел. Здесь вы пробудете <span>1 день</span>
          </p>
        </li>
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

  const groupTo = document.querySelector('.tour-constructor .group-to');
  const dayCount = document.querySelector('.day-count-1');

  $('.range-group-size').ionRangeSlider({
    type: 'single',
    skin: 'round',
    min: 1,
    max: 20,
    from: 10,
    step: 1,
    onChange: function (data) {
      groupTo.textContent = data.from;
    },
  });

  $('.range-day-count-1').ionRangeSlider({
    type: 'single',
    skin: 'round',
    min: 1,
    max: 20,
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
