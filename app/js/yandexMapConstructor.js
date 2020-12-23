let myRouteArr = [];
let locales = [];

function setNumberToLoc() {
  let locNum = document.querySelectorAll('.preview__tour-number');
  locNum.forEach((item, index) => {
    item.textContent = `${index + 1}. `;
  });
}

function init() {
  // Создание карты.
  const myMap = new ymaps.Map('map-constructor', {
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

        const elem = document.querySelectorAll('#preview-constructor li');

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
          }
        } else {
          previewListConstructor.insertAdjacentHTML('beforeend', li.trim());
        }

        setNumberToLoc();
      },

      onMoreClick: function () {
        const locId = document.querySelector('.popover--constructor').dataset.loc_id;
        const obj = { locId };

        postData('constructor/loc_description.php', obj).then((data) => showTourDescription(data));
      },
    },
  );

  //======================================================

  // const createPoint = (coords, name, image, content) => {
  //   const p = new ymaps.Placemark(
  //     coords,
  //     {
  //       object: name,
  //       name: name,
  //       balloonImage: image,
  //       balloonContent: content,
  //     },
  //     {
  //       hintLayout: HintLayout,
  //       balloonLayout: MyBalloonLayout,
  //       balloonContentLayout: MyBalloonContentLayout,
  //       iconContent: '2',
  //       // Опции.
  //       // Необходимо указать данный тип макета.
  //       iconLayout: 'default#imageWithContent',
  //       // Своё изображение иконки метки.
  //       iconImageHref: 'svg/pointer.svg',
  //       // Размеры метки.
  //       iconImageSize: [48, 48],
  //       // Смещение левого верхнего угла иконки относительно
  //       // её "ножки" (точки привязки).
  //       iconImageOffset: [0, 0],
  //       // Смещение слоя с содержимым относительно слоя с картинкой.
  //       iconContentOffset: [19, 6],
  //     },
  //   );
  //   myMap.geoObjects.add(p);
  // };

  // createPoint(
  //   [69.398406, 88.154598],
  //   'Озеро Хантайское',
  //   '../img/tours/1.jpg',
  //   'Ночевка и трофейная рыбалка на одном из красивейших озер Зауралья',
  // );

  // createPoint(
  //   [69.332106, 88.174678],
  //   'Плато Путорана',
  //   '../img/tours/2.jpg',
  //   'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
  // );
  //===================================================

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

  console.log('setFilter');

  // // Фильтр - Территория проведения туров
  // territoryFilter.forEach((item) => {
  //   item.addEventListener('click', (e) => {
  //     objFilter.territory = e.target.textContent;
  //     postData('constructor/filter-constructor.php', objFilter).then((data) => {
  //       console.log(data);
  //       getMyPoints(data);
  //     });
  //   });
  // });

  // // Фильтр - Искомые типы туров

  // typesFilter.forEach((btn) => {
  //   btn.dataset.enabled = 'false';

  //   btn.addEventListener('click', (e) => {
  //     btn.classList.toggle('filter__toggle--active');
  //     const set = btn.parentElement.dataset.types;

  //     if (btn.classList.contains('filter__toggle--active')) {
  //       btn.dataset.enabled = 'true';
  //       setObjFilterSetting('types', set);
  //       console.log(objFilter);
  //       postData('constructor/filter-constructor.php', objFilter).then((data) => {
  //         console.log(data);
  //         getMyPoints(data);
  //       });
  //     } else {
  //       btn.dataset.enabled = 'false';
  //       deleteObjFilterSetting('types', set);
  //       console.log(objFilter);
  //       postData('constructor/filter-constructor.php', objFilter).then((data) => {
  //         console.log(data);
  //         getMyPoints(data);
  //       });
  //     }
  //   });
  // });

  // function setObjFilterSetting(array, elem) {
  //   elem = elem.trim();

  //   if (!objFilter[array].includes(elem)) {
  //     objFilter[array].push(elem);
  //   }
  // }

  // function deleteObjFilterSetting(array, elem) {
  //   elem = elem.trim();
  //   const index = objFilter[array].indexOf(elem);

  //   if (index > -1) {
  //     objFilter[array].splice(index, 1);
  //   }
  // }

  // // Фильтр - Сезон проведения туров

  // filterSeason.forEach((item) => {
  //   item.addEventListener('click', (e) => {
  //     objFilter.season = e.target.dataset.season;
  //     console.log(objFilter);
  //     postData('constructor/filter-constructor.php', objFilter).then((data) => {
  //       console.log(data);
  //       getMyPoints(data);
  //     });
  //   });
  // });

  // // Фильтр - Сложность тура

  // $('.range-complexity').ionRangeSlider({
  //   type: 'single',
  //   skin: 'round',
  //   onFinish: function (data) {
  //     if (data.from === 1) {
  //       complexity.textContent = 'низкая';
  //       objFilter.complexity = '1';
  //     } else if (data.from === 2) {
  //       complexity.textContent = 'средняя';
  //       objFilter.complexity = '2';
  //     } else if (data.from === 3) {
  //       complexity.textContent = 'высокая';
  //       objFilter.complexity = '3';
  //     } else {
  //       complexity.textContent = 'любая';
  //       objFilter.complexity = '0';
  //     }
  //     console.log(objFilter);
  //     postData('constructor/filter-constructor.phpp', objFilter).then((data) => {
  //       console.log(data);
  //       getMyPoints(data);
  //     });
  //   },
  // });

  // // Фильтр - Стоимость тура

  // $('.range-price').ionRangeSlider({
  //   type: 'double',
  //   skin: 'round',
  //   min: priceMin,
  //   max: priceMax,
  //   from: 200000,
  //   step: 5000,
  //   to: 750000,
  //   onChange: function (data) {
  //     from.textContent = data.from;
  //     to.textContent = data.to;
  //   },
  //   onFinish: function (data) {
  //     objFilter.priceMin = data.from;
  //     objFilter.priceMax = data.to;
  //     console.log(objFilter);
  //     postData('constructor/filter-constructor.php', objFilter).then((data) => {
  //       console.log(data);
  //       getMyPoints(data);
  //     });
  //   },
  // });

  //===================================================

  //========= Добавление локации в маршрут ============

  const previewListConstructor = document.querySelector('#preview-constructor .preview__list');
  const previewLocAdd = document.querySelector('#add');
  const previewLocMore = document.querySelector('#more');

  console.log(previewLocAdd);

  //===================================================

  //================== Маршрутизация ==================

  // const createRoute = () => {
  //   const route = new ymaps.multiRouter.MultiRoute(
  //     {
  //       // Точки маршрута.
  //       // Обязательное поле.
  //       referencePoints: [
  //         [69.341106, 88.174678],
  //         [69.354106, 88.174678],
  //         [69.398406, 88.154598],
  //       ],
  //     },
  //     {
  //       hintLayout: HintLayout,
  //       balloonLayout: MyBalloonLayout,
  //       balloonContentLayout: MyBalloonContentLayout,
  //       iconContent: '2',
  //       // Опции.
  //       // Необходимо указать данный тип макета.
  //       iconLayout: 'default#imageWithContent',
  //       // Своё изображение иконки метки.
  //       iconImageHref: 'svg/pointer.svg',
  //       // Размеры метки.
  //       iconImageSize: [48, 48],
  //       // Смещение левого верхнего угла иконки относительно
  //       // её "ножки" (точки привязки).
  //       iconImageOffset: [0, 0],
  //       // Смещение слоя с содержимым относительно слоя с картинкой.
  //       iconContentOffset: [19, 6],

  //       // Внешний вид путевых точек.
  //       // Задаем собственную картинку для последней путевой точки.
  //       wayPointIconLayout: 'default#image',
  //       wayPointIconImageHref: 'svg/pointer.svg',
  //       // Внешний вид линии активного маршрута.
  //       routeActiveStrokeWidth: 3,
  //       routeActiveStrokeStyle: 'solid',
  //       routeActiveStrokeColor: '#2B4761',
  //       // Внешний вид линий альтернативных маршрутов.
  //       routeStrokeStyle: 'dot',
  //       routeStrokeWidth: 3,
  //       // Автоматически устанавливать границы карты так,
  //       // чтобы маршрут был виден целиком.
  //       boundsAutoApply: true,
  //     },
  //   );

  //   // Добавление маршрута на карту.
  //   myMap.geoObjects.add(multiRoute);
  // };

  // Создание экземпляра маршрута.
  // const multiRoute = new ymaps.multiRouter.MultiRoute(
  //   {
  //     // Точки маршрута.
  //     // Обязательное поле.
  //     referencePoints: [
  //       [69.341106, 88.174678],
  //       [69.354106, 88.174678],
  //       [69.398406, 88.154598],
  //     ],
  //   },
  //   {
  //     // Внешний вид путевых точек.
  //     // Убираем отображение путевой точки.
  //     wayPointIconLayout: '',
  //     // Внешний вид линии активного маршрута.
  //     routeActiveStrokeWidth: 3,
  //     routeActiveStrokeStyle: 'solid',
  //     routeActiveStrokeColor: '#2B4761',
  //     // Внешний вид линий альтернативных маршрутов.
  //     routeStrokeStyle: 'dot',
  //     routeStrokeWidth: 3,
  //     // Автоматически устанавливать границы карты так,
  //     // чтобы маршрут был виден целиком.
  //     boundsAutoApply: true,
  //   },
  // );

  // // Добавление маршрута на карту.
  // myMap.geoObjects.add(multiRoute);

  //===================================================
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
