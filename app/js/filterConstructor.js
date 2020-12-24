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

        <span class="filter__item">Сложность посещения: высокая</span>

        <p class="filter__group-size">
          <span class="filter__item">Размер группы от </span>
          <span class="filter__item filter__item--red group-from">2</span>
          <span class="filter__item"> до </span>
          <span class="filter__item filter__item--red group-to">10</span>
          <span class="filter__item"> человек</span>
          <input
            type="text"
            class="range-group-size"
            name="range-group-size"
            data-min="2"
            data-max="20"
            data-from="2"
            data-to="10"
            data-grid="false"
          />
        </p>

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
