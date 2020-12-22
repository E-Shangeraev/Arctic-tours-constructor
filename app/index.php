<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" type="text/css" href="css/daterangepicker.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/css/ion.rangeSlider.min.css"
    />
    <link rel="stylesheet" href="css/style.min.css" />
    <script
      src="https://api-maps.yandex.ru/2.1/?apikey=8596f46f-4416-4fbb-87ee-ef65ee25576e&lang=ru_RU"
      type="text/javascript"
    ></script>
    <script src="https://kit.fontawesome.com/d7003bc6f6.js" crossorigin="anonymous"></script>
    <title>Document</title>
  </head>
  <body>
    <main>
      <section class="filter container">
        <section class="row">
          <aside class="col-sm-3 filter__settings">
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
              <span class="filter__item filter__item--red price-from">200000</span>
              <span class="filter__item"> до </span>
              <span class="filter__item filter__item--red price-to">750000</span>
              <span class="filter__item"> рублей</span>
              <input type="text" class="range-price" name="range-price" data-grid="true" />
            </div>
          </aside>

          <div class="col-sm-9 d-flex flex-column filter__view">
            <div class="d-flex map__tabs">
              <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    id="pills-ready-tab"
                    data-toggle="pill"
                    href="#pills-ready"
                    role="tab"
                    aria-controls="pills-ready"
                    aria-selected="true"
                    >Готовые туры</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="pills-constructor-tab"
                    data-toggle="pill"
                    href="#pills-constructor"
                    role="tab"
                    aria-controls="pills-constructor"
                    aria-selected="false"
                    >Конструктор туров</a
                  >
                </li>
              </ul>

              <p class="ml-auto filter__cabinet">
                <a href="#">Личный кабинет</a>
                <img src="svg/user.svg" alt="" />
              </p>
            </div>

            <div class="tab-content filter__content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-ready"
                role="tabpanel"
                aria-labelledby="pills-ready-tab"
              >
                <div class="map" id="map" style="width: 100%; height: 100%"></div>

                <div class="preview" id="preview-ready">
                  <header class="preview__header">
                    <h3 class="preview__title">Подходящие туры</h3>
                    <a href="#" class="preview__arrow"></a>
                  </header>
                  <ul class="preview__list"></ul>
                </div>
              </div>


              <div
                class="tab-pane fade d-flex flex-column"
                id="pills-constructor"
                role="tabpanel"
                aria-labelledby="pills-constructor-tab"
              >
                <div class="map" id="map-constructor" style="width: 100%; height: 100%"></div>

                <div class="preview" id="preview-constructor">
                  <header class="preview__header">
                    <h3 class="preview__title">Мой маршрут</h3>
                    <a href="#" class="preview__arrow"></a>
                  </header>
                  <ul class="preview__list"></ul>
                </div>
              </div>
            </div>

            <div class="map__search">
              <span>Поиск по ключевым словам</span>
              <div class="map__input">
                <input type="text" id="suggest" />
              </div>
            </div>
          </div>
        </section>

        <section class="row locale">
          <aside class="col-sm-3 filter__settings filter__settings--tour">
            <div class="tour__settings">
              <h3 class="filter__item" style="margin-bottom: 10px">Послелок озеро Хантайское</h3>

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

              <div class="filter__lodging">
                <h3 class="filter__title">Возможный транспорт до локации:</h3>
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

              <div class="filter__reservation">
                <button class="btn-reservation">Добавить в тур</button>
              </div>
            </div>
          </aside>

          <article class="col-sm-9 d-flex flex-column filter__description tour__article">
            <header class="locale__header">
              <h2 class="locale__name">Поселок озеро Хантайское. Национальный колорит в Таймырской глуши</h2>
            </header>

            <p class="locale__descr">Небольшой национальный посёлок Хантайское озеро лежит чуть западнее устья реки Хаканча. А с запада посёлок ограничивает глубоко вдающийся в берег залив. Таким образом, посёлок расположен на полуострове. Здесь живут, в основном, долгане и эвенки. Жителей около полутысячи.</p>

            <div class="locale__promo">
              <img class="locale__img" src="img/locales/locale-1/1.jpg" alt="Фотография с локации" />
            </div>

            <h4 class="locale__subtitle">ИСТОРИЯ ПОСЕЛКА</h4>
            <p class="locale__descr">
              Изначально посёлок формировался как стойбище коренного населения без постоянных построек. Основу нынешнего населённого пункта построили в 1952—1959 гг. ссыльные из немецких поселений на Волге, из Польши и Прибалтики. Таким образом, архитектура посёлка формировалась различными этапами его развития. Ближе к берегу стоят здание старой школы и два ряда деревянных домов, построенных депортированными. Третий ряд домов был построен в конце 1960-х годов в период преобразования колхоза и совхоза: новая школа, здания администрации ГОУСП «Хантайский» и посёлка, четырёхквартирные дома. В 1970-е годы после принудительного переселения в 1969 году 48 долганских и говорящих по-якутски эвенкийских семей, была построена следующая группа домов в стороне от озера.
              В 1976 г. Указом Президиума ВС РСФСР поселок Таймыр переименован в Хантайское Озеро.
            </p>
            
            <h4 class="locale__subtitle">ЭКОНОМИКА И ИНФРАСТРУКТУРА</h4>
            <p class="locale__descr">
              Посёлок расположен на полуострове в юго-западной части Хантайского озера. На берегу имеется небольшой порт (пирс). В посёлке работают школа-интернат, детский сад, участковая больница, магазин, пекарня, отделение «Федеральной почтовой связи», отделение ОАО «Электросвязь», сельский Дом культуры, библиотека, ДЭС, ГОУСП «Хантайское», семейно-родовые хозяйства, община МНС «Буркан». Большинство жителей посёлка Хантайское Озеро заняты в традиционных отраслях хозяйствования коренных народов Севера.
            </p>

            <p class="locale__descr">
              Поселок интересен в плане изучения традиций коренных народов Таймыра, из-за удаленности от цивилизации почти не изменившихся с древних времен. Туристы смогут стать участниками нескольких уникальных местных промыслов и обрядов:
            </p>

            <ul class="locale__facts">
              <li class="locale__fact">
                <img src="svg/locale-facts/tambourine.svg" alt="" />
                <p class="locale__descr locale__descr--fact">
                  Эвенки отмечают Новый год в середине лета. А езе они задабривают дух огня, вместо того чтобы положить подарки под ёлочку. Во время шаманского ритуала Кормления огня в поселке озеро Хантайское у вас будет шанс в этом убедиться!
                </p>
              </li>
              <li class="locale__fact">
                <img src="svg/locale-facts/fishing_rod.svg" alt="" />
                <p class="locale__descr locale__descr--fact">
                  Трофейная рыбалка.  Реки в окрестностях поселка озеро Хантайское очень богатым животным миром. В них представлен практически весь видовой состав рыб. Это и таймень, и ленок, и хариус, и сиг, и др. Вы сможете поймать тайменя весом до 20 кг
                </p>
              </li>
            </ul>
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
      </section>
    </main>

    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"
    ></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
      integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
      integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
      crossorigin="anonymous"
    ></script>

    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"
    ></script>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"
    ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/js/ion.rangeSlider.min.js"></script>

    <script src="js/filter.js"></script>
    <script src="js/dateRangePicker.js"></script>
    <script src="js/yandexMap.js"></script>
    <script src="js/yandexMapConstructor.js"></script>
    <script src="js/filterConstructor.js"></script>
  </body>
</html>
