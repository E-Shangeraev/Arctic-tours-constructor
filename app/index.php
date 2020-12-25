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
    
    <script src="js/aside.js"></script>
    <script src="js/filter.js"></script>
    <script src="js/yandexMap.js"></script>
    <script src="js/yandexMapConstructor.js"></script>
    <script src="js/filterConstructor.js"></script>
   
  </body>
</html>
