const previewConstructor = document.querySelector('#preview-constructor');
let myRouteArr = [];
let locales = [];
let myPoints = [];
let priceArr = [];
let totalPriceConstructor = 0;

function setNumberToLoc() {
  let locNum = document.querySelectorAll('.preview__tour-number');
  locNum.forEach((item, index) => {
    item.textContent = `${index + 1}. `;
  });
}

function init() {
  // Создание карты.
  const myMap = new ymaps.Map('ymap-constructor', {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [69.342106, 88.174678],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    controls: ['zoomControl'],
    zoom: 10,
  });

  //================= Кастомный хинт ====================

  const HintLayout = ymaps.templateLayoutFactory.createClass(
    `
    <div class='hint'>
      <b>{{ properties.object }}</b> <br/>
    </div>`,
    {
      // Определяем метод getShape, который
      // будет возвращать размеры макета хинта.
      // Это необходимо для того, чтобы хинт автоматически
      // сдвигал позицию при выходе за пределы карты.
      getShape: function () {
        var el = this.getElement(),
          result = null;
        if (el) {
          var firstChild = el.firstChild;
          result = new ymaps.shape.Rectangle(
            new ymaps.geometry.pixel.Rectangle([
              [0, 0],
              [firstChild.offsetWidth, firstChild.offsetHeight],
            ]),
          );
        }
        return result;
      },
    },
  );

  //======================================================

  //================= Кастомный балун ====================

  const MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
    `
    <div class="popover top popover--constructor" data-loc_id='{{properties.locId}}'>
      <header class="popover__header">
        <h3 class="popover__title">{{properties.name}}</h3><br />
        <a class="close" href="#">&times;</a>
      </header>
      <div class="arrow"></div>
      <div class="popover-inner">
        $[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]
      </div>
    </div>
    `,
    {
      build: function () {
        this.constructor.superclass.build.call(this);
        this._$element = $('.popover', this.getParentElement());
        this.applyElementOffset();
        this._$element.find('.close').on('click', $.proxy(this.onCloseClick, this));
      },
      applyElementOffset: function () {
        this._$element.css({
          left: -(this._$element[0].offsetWidth / 2),
          top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight),
        });
      },
      onCloseClick: function (e) {
        e.preventDefault();
        this.events.fire('userclose');
      },
      _isElement: function (element) {
        return element && element[0] && element.find('.arrow')[0];
      },
    },
  );

  const myCoordsCollection = new ymaps.GeoObjectCollection();
  let points = [];

  const MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
    `
    <div class="popover__content">
      <img class="popover__img" src="$[properties.balloonImage]" />
      <div class="popover__text">$[properties.balloonContent]</div>
      <p class="popover__buttons">
        <button class="preview__tour-show" id="add">Добавить</button>
        <button class="preview__tour-show" id="more">Подробно</button>
      </p>
    </div>
    `,
    {
      build: function () {
        // Сначала вызываем метод build родительского класса.
        MyBalloonContentLayout.superclass.build.call(this);
        // А затем выполняем дополнительные действия.
        const add = $('#add');
        const more = $('#more');
        add.bind('click', this.onAddClick);
        more.bind('click', this.onMoreClick);
      },
      // Аналогично переопределяем функцию clear, чтобы снять
      // прослушивание клика при удалении макета с карты.
      clear: function () {
        // Выполняем действия в обратном порядке - сначала снимаем слушателя,
        // а потом вызываем метод clear родительского класса.
        $('#add').unbind('click', this.onAddClick);
        $('#more').unbind('click', this.onMoreClick);
        MyBalloonContentLayout.superclass.clear.call(this);
      },

      onAddClick: function () {
        console.log('this work!');
        const previewListConstructor = document.querySelector(
          '#preview-constructor .preview__list',
        );
        const title = document.querySelector('.popover__title').textContent;
        const image = document.querySelector('.popover__img').src;
        const locId = document.querySelector('.popover--constructor').dataset.loc_id;

        const li = `
          <li class="preview__tour" style="background-image: url('${image}')" data-loc_id="${locId}">
            <h4 class="preview__tour-name">
              <span class="preview__tour-number">1</span>
              ${title}
            </h4>
            <p class="popover__buttons">
              <button class="preview__tour-show" id="remove">Убрать</button>
              <button class="preview__tour-show" id="more">Подробно</button>
            </p>
          </li>
        `;

        // let activePlacemark;
        // myPlacemark.events.add('click', function (e) {
        //   if (activePlacemark) {
        //     activePlacemark.options.set('iconImageHref', 'svg/pointer-blue.svg');
        //   }
        //   activePlacemark = e.get('target');
        //   activePlacemark.options.set('iconImageHref', 'svg/pointer.svg');
        // });

        // ======== При добавлении локации в маршрут идет запрос на координаты локации =========

        let coords = [];
        postData('constructor/loc_coords.php', { locId })
          .then((data) => {
            data = data[0];
            coords.push(data.coords_x);
            coords.push(data.coords_y);
            console.log(data);

            // ================ Добавление туров в мой маршрут ==========
            const elem = document.querySelectorAll('#preview-constructor li');
            const calcButton = `
              <button class='btn-calc'>Рассчитать тур</button>
            `;

            if (previewListConstructor.children.length > 0) {
              let isSet = false;
              elem.forEach((item) => {
                if (item.dataset.loc_id === locId) {
                  isSet = true;
                  return;
                }
              });

              if (!isSet) {
                previewListConstructor.insertAdjacentHTML('beforeend', li.trim());
                myPoints.push(coords);
                priceArr.push(data.price);
              }
            } else {
              previewListConstructor.insertAdjacentHTML('beforeend', li.trim());
              previewConstructor.insertAdjacentHTML('beforeend', calcButton);
              myPoints.push(coords);
              priceArr.push(data.price);
            }

            setNumberToLoc();

            const calcPrice = document.querySelector('#preview-constructor .btn-calc');

            calcPrice.addEventListener('click', () => {
              const reducer = (a, b) => parseInt(a) + parseInt(b);
              totalPriceConstructor = priceArr.reduce(reducer);
              console.log(totalPriceConstructor);

              if (document.querySelector('.locale')) {
                filter.removeChild(document.querySelector('.locale'));
              }
              // showTourConstructor(data);
            });

            // ======================================================

            let obj = {
              coords,
              name: data.name,
              image: `img/${data.image}`,
              text: data.preview_text,
            };

            points.push(obj);

            return myPoints;
            // ======================================================
          })
          .then((myPoints) => {
            console.log('myPoints: ', myPoints);
            console.log('priceArr: ', priceArr);

            //================== Маршрутизация ==================

            // Создание экземпляра маршрута.
            const myRoute = new ymaps.multiRouter.MultiRoute(
              {
                // Точки маршрута.
                referencePoints: myPoints,
              },
              {
                // Убираем отображение путевой точки.
                wayPointIconLayout: '',
                // Внешний вид линии активного маршрута.
                routeActiveStrokeWidth: 3,
                routeActiveStrokeStyle: 'solid',
                routeActiveStrokeColor: '#2B4761',
                // Внешний вид линий альтернативных маршрутов.
                routeStrokeStyle: 'dot',
                routeStrokeWidth: 2,
                // Автоматически устанавливать границы карты так,
                // чтобы маршрут был виден целиком.
                boundsAutoApply: false,
              },
            );

            // Добавление маршрута на карту.
            myMap.geoObjects.splice(1, 1, myRoute);

            //===================================================
          });
      },

      onMoreClick: function () {
        const locId = document.querySelector('.popover--constructor').dataset.loc_id;
        const obj = { locId };

        postData('constructor/loc_description.php', obj).then((data) =>
          showLocaleDescription(data),
        );
      },
    },
  );

  //====== Поисковые подсказки по своим данным ========

  const arr = [
    'Озеро Хантайское',
    'Плато Путорана',
    'Озеро Лама',
    'Поселок Снежногорск',
    'Город Дудинка',
  ];

  const find = function (arr, find) {
    return arr.filter(function (value) {
      return (value + '').toLowerCase().indexOf(find.toLowerCase()) != -1;
    });
  };

  const myProvider = {
    suggest: function (request, options) {
      var res = find(arr, request),
        arrayResult = [],
        results = Math.min(options.results, res.length);
      for (var i = 0; i < results; i++) {
        arrayResult.push({ displayName: res[i], value: res[i] });
      }
      return ymaps.vow.resolve(arrayResult);
    },
  };

  const suggestView = new ymaps.SuggestView('suggest', { provider: myProvider, results: 3 });

  //===================================================

  //============== Добавление своих меток =============

  // Создает массив с данными.
  function getMyPoints(data) {
    // Создает коллекцию.
    const myCollection = new ymaps.GeoObjectCollection();

    console.log(data);

    let myPoints = [];
    let points = [];

    data.forEach((item) => {
      let coords = [];
      coords.push(item.coords_x);
      coords.push(item.coords_y);
      points.push(coords);

      let obj = {
        coords,
        name: item.name,
        image: `img/${item.image}`,
        text: item.preview_text,
        locId: item.loc_id,
      };

      myPoints.push(obj);
    });
    console.log(myPoints);
    console.log(points);

    // Заполняем коллекцию данными.
    myPoints.forEach((point) => {
      myCollection.add(
        new ymaps.Placemark(
          point.coords,
          {
            object: point.name,
            name: point.name,
            balloonImage: point.image,
            balloonContent: point.text,
            locId: point.locId,
          },
          {
            hintLayout: HintLayout,
            balloonLayout: MyBalloonLayout,
            balloonContentLayout: MyBalloonContentLayout,
            iconContent: '2',
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: 'svg/pointer-blue.svg',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-23, -42],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 6],
          },
        ),
      );
    });
    // Добавляем коллекцию меток на карту.
    // myMap.geoObjects.add(myCollection);
    myMap.geoObjects.splice(0, 1, myCollection);
    console.log(myCollection);

    // Создаем экземпляр класса ymaps.control.SearchControl
    const mySearchControl = new ymaps.control.SearchControl({
      options: {
        // Заменяем стандартный провайдер данных (геокодер) нашим собственным.
        provider: new CustomSearchProvider(myPoints),
        // Не будем показывать еще одну метку при выборе результата поиска,
        // т.к. метки коллекции myCollection уже добавлены на карту.
        noPlacemark: true,
        resultsPerPage: 5,
      },
    });

    myMap.controls.add(mySearchControl);

    const searchBar = document.querySelector('#suggest');

    searchBar.addEventListener('input', () => {
      const ySearchBar = document.querySelector('.ymaps-2-1-78-searchbox-input__input');
      ySearchBar.value = searchBar.value;
    });

    searchBar.addEventListener('change', () => {
      const ySearchBar = document.querySelector('.ymaps-2-1-78-searchbox-input__input');
      mySearchControl.search(ySearchBar.value);
    });
  }
  postData('constructor/filter-constructor.php', objFilter).then((data) => getMyPoints(data));

  constructorTab.addEventListener('click', () => {
    filterSettings.classList.remove('ready');
    filterSettings.classList.add('constructor');
    preview.style.display = 'none';
    if (document.querySelector('.tour')) {
      document.querySelector('.tour').remove();
    }

    container.children[0].remove();
    container.insertAdjacentHTML('afterbegin', filterConstructor);
    setFilter('constructor/filter-constructor.php', getMyPoints);
  });

  //===================================================

  // ==================== Удаление локации ==================

  previewListConstructor.addEventListener('click', (e) => {
    let remove = e.target.closest('#remove');

    if (!remove) return;

    let number = remove.parentElement.parentElement.querySelector('.preview__tour-number')
      .textContent;
    number = number[0] - 1;
    console.log(number);

    myPoints.splice(number, 1);
    // Создание экземпляра маршрута.
    const myRoute = new ymaps.multiRouter.MultiRoute(
      {
        // Точки маршрута.
        referencePoints: myPoints,
      },
      {
        // Убираем отображение путевой точки.
        wayPointIconLayout: '',
        // Внешний вид линии активного маршрута.
        routeActiveStrokeWidth: 3,
        routeActiveStrokeStyle: 'solid',
        routeActiveStrokeColor: '#2B4761',
        // Внешний вид линий альтернативных маршрутов.
        routeStrokeStyle: 'dot',
        routeStrokeWidth: 2,
        // Автоматически устанавливать границы карты так,
        // чтобы маршрут был виден целиком.
        boundsAutoApply: false,
      },
    );

    // Обновление маршрута при удалении локации.
    myMap.geoObjects.splice(1, 1, myRoute);

    remove.parentElement.parentElement.remove();

    setNumberToLoc();

    // ========= Удаление кнопки Рассчитать тур ===========
    const calcPrice = document.querySelector('#preview-constructor .btn-calc');

    if (myPoints.length < 1) {
      calcPrice.remove();
    }

    // ====================================================
    return;
  });
  // ======================================================

  // ========== Изменение цвета маркера при клике ===========

  // objectManager = new ymaps.ObjectManager({
  //   // Чтобы метки начали кластеризоваться, выставляем опцию.
  //   clusterize: true,
  //   geoObjectOpenBalloonOnClick: false,
  //   clusterOpenBalloonOnClick: false,
  // });

  // myMap.geoObjects.add(objectManager);

  // postData('constructor/locales.php', {}).then((data) => {
  //   console.log(data);
  //   objectManager.add(data);
  // });

  // // // Необходимо указать данный тип макета.
  // // iconLayout: 'default#imageWithContent',
  // // // Своё изображение иконки метки.
  // // iconImageHref: 'svg/pointer-blue.svg',

  // function onObjectEvent(e) {
  //   var objectId = e.get('objectId');
  //   if (e.get('type') == 'mouseenter') {
  //     // Метод setObjectOptions позволяет задавать опции объекта "на лету".
  //     objectManager.objects.setObjectOptions(objectId, {
  //       iconImageHref: 'svg/pointer.svg',
  //     });
  //   } else {
  //     objectManager.objects.setObjectOptions(objectId, {
  //       iconImageHref: 'svg/pointer-blue.svg',
  //     });
  //   }
  // }

  // function onClusterEvent(e) {
  //   var objectId = e.get('objectId');
  //   if (e.get('type') == 'mouseenter') {
  //     objectManager.clusters.setClusterOptions(objectId, {
  //       iconImageHref: 'svg/pointer.svg',
  //     });
  //   } else {
  //     objectManager.clusters.setClusterOptions(objectId, {
  //       iconImageHref: 'svg/pointer-blue.svg',
  //     });
  //   }
  // }

  // objectManager.objects.events.add(['mouseenter', 'mouseleave'], onObjectEvent);
  // objectManager.clusters.events.add(['mouseenter', 'mouseleave'], onClusterEvent);

  // ======================================================
}

// ============== Поиск по своим объектам ==============

// Провайдер данных для элемента управления ymaps.control.SearchControl.
// Осуществляет поиск геообъектов в по массиву points.
// Реализует интерфейс IGeocodeProvider.
function CustomSearchProvider(points) {
  this.points = points;
}

// Провайдер ищет по полю text стандартным методом String.ptototype.indexOf.
CustomSearchProvider.prototype.geocode = function (request, options) {
  var deferred = new ymaps.vow.defer(),
    geoObjects = new ymaps.GeoObjectCollection(),
    // Сколько результатов нужно пропустить.
    offset = options.skip || 0,
    // Количество возвращаемых результатов.
    limit = options.results || 20;

  var points = [];
  // Ищем в свойстве text каждого элемента массива.
  for (var i = 0, l = this.points.length; i < l; i++) {
    var point = this.points[i];
    if (
      point.name.toLowerCase().indexOf(request.toLowerCase()) != -1 ||
      point.text.toLowerCase().indexOf(request.toLowerCase()) != -1
    ) {
      points.push(point);
    }
  }
  // При формировании ответа можно учитывать offset и limit.
  points = points.splice(offset, limit);
  // Добавляем точки в результирующую коллекцию.
  for (var i = 0, l = points.length; i < l; i++) {
    const point = points[i];
    const coords = point.coords;
    const text = point.text;
    const name = point.name;

    geoObjects.add(
      new ymaps.Placemark(coords, {
        name: name,
        description: text,
        balloonContentBody: '<p>' + text + '</p>',
        boundedBy: [coords, coords],
      }),
    );
  }

  deferred.resolve({
    // Геообъекты поисковой выдачи.
    geoObjects: geoObjects,
    // Метаинформация ответа.
    metaData: {
      geocoder: {
        // Строка обработанного запроса.
        request: request,
        // Количество найденных результатов.
        found: geoObjects.getLength(),
        // Количество возвращенных результатов.
        results: limit,
        // Количество пропущенных результатов.
        skip: offset,
      },
    },
  });

  // Возвращаем объект-обещание.
  return deferred.promise();
};

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
