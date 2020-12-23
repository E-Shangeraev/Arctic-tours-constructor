const container = document.querySelector('.filter .row');

const filterReady = `
<aside class="col-sm-3 filter__settings ready">
  <div class="filter__territory">
    <h3 class="filter__title">Территория проведения туров</h3>
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle filter__dropdown"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspreview="true"
        aria-expanded="false"
      >
        <span class="filter__item">Не выбрано</span>
      </button>
      <div class="dropdown-menu territory" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Не выбрано</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Плато Путорана</a>
        <a class="dropdown-item" href="#">Озеро Лама</a>
        <a class="dropdown-item" href="#">Озеро Хантайское</a>
        <a class="dropdown-item" href="#">Пос. Снежногорск</a>
        <a class="dropdown-item" href="#">Город Дудинка</a>
      </div>
    </div>
  </div>

  <div class="filter__types">
    <h3 class="filter__title">Искомые типы туров</h3>
    <ul>
      <li class="filter__item" data-types = 'helicopter'>
        Вертолетные туры
        <button class="filter__toggle">
          <span></span>
        </button>
      </li>
      <li class="filter__item" data-types = 'cruise'>
        Круизные туры
        <button class="filter__toggle">
          <span></span>
        </button>
      </li>
      <li class="filter__item" data-types = 'hiking'>
        Пешие туры
        <button class="filter__toggle">
          <span></span>
        </button>
      </li>
      <li class="filter__item" data-types = 'other'>
        Прочие туры
        <button class="filter__toggle">
          <span></span>
        </button>
      </li>
    </ul>
  </div>

  <div class="filter__season">
    <h3 class="filter__title">Сезон проведения туров</h3>
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle filter__dropdown"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspreview="true"
        aria-expanded="false"
      >
        <span class="filter__item">Не выбрано</span>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#" data-season="Не выбрано">Не выбрано</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#" data-season="summer">Лето</a>
        <a class="dropdown-item" href="#" data-season="autumn">Осень</a>
        <a class="dropdown-item" href="#" data-season="winter">Зима</a>
        <a class="dropdown-item" href="#" data-season="spring">Весна</a>
      </div>
    </div>
  </div>

  <div class="filter__time">
    <h3 class="filter__title">Время проведения туров</h3>
    <input class="filter__dropdown" type="text" name="birthday" value="" />
  </div>

  <div class="filter__complexity">
    <h3 class="filter__title">
      Сложность тура: <span class="complexity" style="opacity: 0.4">любая</span>
    </h3>
    <input
      type="text"
      class="range-complexity"
      name="range-complexity"
      data-min="0"
      data-max="3"
      data-from="0"
    />
  </div>

  <div class="filter__price">
    <h3 class="filter__title">Стоимость тура:</h3>
    <span class="filter__item">От </span>
    <span class="filter__item filter__item--red price-from">500</span>
    <span class="filter__item"> до </span>
    <span class="filter__item filter__item--red price-to">1000000</span>
    <span class="filter__item"> рублей</span>
    <input type="text" class="range-price" name="range-price" data-grid="true" />
  </div>
</aside>
`;

const filterConstructor = `
<aside class="col-sm-3 filter__settings constructor">
  <div class="filter__territory">
    <h3 class="filter__title">Туристические локации</h3>
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle filter__dropdown"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspreview="true"
        aria-expanded="false"
      >
        <span class="filter__item">Не выбрано</span>
      </button>
      <div class="dropdown-menu territory" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Не выбрано</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Плато Путорана</a>
        <a class="dropdown-item" href="#">Озеро Лама</a>
        <a class="dropdown-item" href="#">Озеро Хантайское</a>
        <a class="dropdown-item" href="#">Пос. Снежногорск</a>
        <a class="dropdown-item" href="#">Город Дудинка</a>
      </div>
    </div>
  </div>

  <div class="filter__types">
    <h3 class="filter__title">Логистическая доступность</h3>
    <ul>
      <li class="filter__item" data-types = 'helicopter'>
        Вертолетная локация
        <button class="filter__toggle">
          <span></span>
        </button>
      </li>
      <li class="filter__item" data-types = 'cruise'>
        Круизная локация
        <button class="filter__toggle">
          <span></span>
        </button>
      </li>
      <li class="filter__item" data-types = 'hiking'>
        Пешая локация
        <button class="filter__toggle">
          <span></span>
        </button>
      </li>
      <li class="filter__item" data-types = 'other'>
        Прочие локации
        <button class="filter__toggle">
          <span></span>
        </button>
      </li>
    </ul>
  </div>

  <div class="filter__season">
    <h3 class="filter__title">Сезонная доступность</h3>
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle filter__dropdown"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspreview="true"
        aria-expanded="false"
      >
        <span class="filter__item">Не выбрано</span>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#" data-season="Не выбрано">Не выбрано</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#" data-season="summer">Лето</a>
        <a class="dropdown-item" href="#" data-season="autumn">Осень</a>
        <a class="dropdown-item" href="#" data-season="winter">Зима</a>
        <a class="dropdown-item" href="#" data-season="spring">Весна</a>
      </div>
    </div>
  </div>

  <div class="filter__time">
    <h3 class="filter__title">Время проведения тура</h3>
    <input class="filter__dropdown" type="text" name="birthday" value="" />
  </div>

  <div class="filter__complexity">
    <h3 class="filter__title">
      Сложность локаций: <span class="complexity" style="opacity: 0.4">любая</span>
    </h3>
    <input
      type="text"
      class="range-complexity"
      name="range-complexity"
      data-min="0"
      data-max="3"
      data-from="0"
    />
  </div>

  <div class="filter__price">
    <h3 class="filter__title">Стоимость локаций:</h3>
    <span class="filter__item">От </span>
    <span class="filter__item filter__item--red price-from">500</span>
    <span class="filter__item"> до </span>
    <span class="filter__item filter__item--red price-to">1000000</span>
    <span class="filter__item"> рублей</span>
    <input type="text" class="range-price" name="range-price" data-grid="true" />
  </div>
</aside>
`;

container.insertAdjacentHTML('afterbegin', filterReady);
