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
              <!-- <h4 class="filter__item">Дата начала:</h4> -->
              <input class="filter__dropdown" type="text" name="birthday" value="" />
              <!-- <h4 class="filter__item">Длительность:</h4>
              <div id="reportrange" class="filter__dropdown">
                <i class="fa fa-calendar"></i>&nbsp; <span></span>
              </div> -->
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
              <span class="hor-shadow"></span>
              <span class="ver-shadow"></span>
              <div
                class="tab-pane fade show active"
                id="pills-ready"
                role="tabpanel"
                aria-labelledby="pills-ready-tab"
              >
                <div class="map" id="map" style="width: 100%; height: 100%"></div>
              </div>
              <div
                class="tab-pane fade d-flex flex-column"
                id="pills-constructor"
                role="tabpanel"
                aria-labelledby="pills-constructor-tab"
              >
                <!-- <div id="map" style="width: 600px; height: 400px"></div> -->
              </div>
            </div>

            <div class="preview">
              <header class="preview__header">
                <h3 class="preview__title">Подходящие туры</h3>
                <a href="#" class="preview__arrow"></a>
              </header>
              <ul class="preview__list"></ul>
            </div>

            <div class="map__search">
              <span>Поиск по ключевым словам</span>
              <div class="map__input">
                <input type="text" id="suggest" />
              </div>
            </div>
          </div>
        </section>

        <!-- <section class="row tour">
          <aside class="col-sm-3 filter__settings filter__settings--tour">
            <div class="tour__settings">
              <h3 class="filter__item" style="margin-bottom: 10px">Плато Путорана</h3>
              <h3 class="filter__title" style="margin-bottom: 20px">В сердце России</h3>

              <span class="filter__item">Сложность: высокая</span>

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
                <h3 class="filter__title">Проживание во время тура:</h3>
                <ul class="filter__lodging-list">
                  <li class="filter__lodging-item">
                    <img src="svg/tent.svg" alt="6 ночей" />
                    <span class="filter__item">6 ночей</span>
                  </li>
                  <li class="filter__lodging-item">
                    <img src="svg/hotel.svg" alt="1 ночь" />
                    <span class="filter__item">1 ночь</span>
                  </li>
                </ul>
              </div>

              <div class="filter__total-price">
                <h3 class="filter__title" style="text-transform: uppercase">Итоговая стоимость:</h3>
                <span class="filter__item filter__item--red">115 900</span>
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
              <h2 class="tour__name">
                В сердце России. Сплав по Микчангде и восхождение на плато Путорана
              </h2>
              <a href="#">Стрелка</a>
            </header>

            <p class="tour__descr">
              Природа на плато Путорана уникальна: горы без вершин, глубочайшие каньоны, живописные
              фьорды и настоящие лабиринты из сотен рек, озер и водопадов. А еще здесь находится
              георгафический центр России.
            </p>

            <div class="tour__promo">
              <img class="tour__img" src="img/tours/tour-1/1.jpg" alt="Фотография с тура" />
              <p class="tour__warning warning">
                <b class="warning__title">ОБРАТИТЕ ВНИМАНИЕ!</b>
                <span class="warning__text">
                  Это путешествие рекомендовано Русским географическим обществом
                </span>
              </p>
            </div>

            <p class="tour__descr">
              Первые 4 дня путешествия вы будете сплавляться на рафтах по горной реке Микчангда,
              протекающей по центру плато Путорана. Добравшись до озера Лама, вы отдохнете в
              кемпинге, совершая пешие прогулки к водопадам и на вершину плато. А вот 4 главных
              причины, чтобы отправиться в это путешествие:
            </p>

            <ul class="tour__actions">
              <li class="tour__action">
                <img src="svg/tour-actions/helicopter.svg" alt="" />
                <p class="tour__descr tour__descr--action">
                  В стоимость программы включена вертолетная заброска к месту начала маршрута — во
                  время полета вам откроется незабываемая панорама бескрайнего плато с глубочайшими
                  каньонами и высокими водопадами
                </p>
              </li>
              <li class="tour__action">
                <img src="svg/tour-actions/mountains.svg" alt="" />
                <p class="tour__descr tour__descr--action">
                  Во время сплава по Микчангде вас ждут красивейшие пейзажи Путоранского
                  заповедника: окружающие долину реки, и горы, — одни из самых высоких на плато
                  (1200-1300 м)
                </p>
              </li>
              <li class="tour__action">
                <img src="svg/tour-actions/fish.svg" alt="" />
                <p class="tour__descr tour__descr--action">
                  У вас будет возможность устроить трофейную рыбалку на хариуса и тайменя.
                  Дополнительный текст до наполнения в три строки. Tum altĕrum calceum lenĭter
                  cautēque in pavimentum posuit et in somnum lapsus est
                </p>
              </li>
              <li class="tour__action">
                <img src="svg/tour-actions/service.svg" alt="" />
                <p class="tour__descr tour__descr--action">
                  А также попробовать национальную кухню народов крайнего Севера и узнаете секреты
                  приготовления традиционного блюда — сугудай. Дополнительный текст до наполнения в
                  три строки
                </p>
              </li>
            </ul>

            <h3 class="tour__program">Программа тура</h3>

            <p class="tour__descr">
              Путешествие начинается в Норильске, куда вам нужно добраться самостоятельно.
              Рекомендуем утренний рейс с прилетом в Норильск до 07:00. Для возвращения в Москву
              также выбирайте утренние рейсы с вылетом из Норильска до 08:00.
            </p>

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
              С пятого по седьмой дни тура вы будете жить в кемпинге на берегу озера Лама.
              Разместитесь в двухместных палатках (два спальных отсека, разделенных просторным
              тамбуром). В каждой палатке – двуспальные туристические кровати с матрасами, спальники
              с температурой комфорта -10°С, постельное белье (простыни, подушки, одеяла). Тамбур
              оборудован светильником и обработан антикомариным средством. На территории кемпинга
              есть столовая на 12 человек, две душевые кабины (палаточные), стационарные туалеты,
              походная баня (с температурой нагрева 110°С) и костровая поляна. Заключительную ночь
              путешествия вы проведете в двухместном номере отеля «Норильск» 3*, расположенном в
              центре города. В вашем номере будет удобная мебель, ванная или душевая, телевизор,
              интернет. К услугам гостей на территории – сауна, бильярд, спортивный зал.
            </p>

            <div class="tour__promo">
              <img class="tour__img" src="img/tours/tour-1/2.jpg" alt="Фотография с тура" />
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
        </section> -->
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
  </body>
</html>
