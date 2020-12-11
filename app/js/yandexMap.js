function init() {
  // Создание карты.
  const myMap = new ymaps.Map('map', {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [69.342106, 88.174678],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    controls: ['zoomControl'],
    zoom: 12,
  });
  //==========Изменение внешнего вида маркера==========

  // Создаём макет содержимого.
  const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>',
  );
  const myPlacemark = new ymaps.Placemark(
    [69.342106, 88.384678],
    {
      hintContent: 'Собственный значок метки',
      balloonContent: 'Кастомная метка',
    },
    {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'svg/pointer.svg',
      // Размеры метки.
      iconImageSize: [48, 48],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [0, 0],
    },
  );

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
    <div class="popover top">
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
    </div>
    `,
  );

  //======================================================

  const myPlacemarkWithContent = new ymaps.Placemark(
    [69.398406, 88.154598],
    {
      object: 'Озеро Хантайское',
      name: 'Озеро Хантайское',
      balloonImage: '../img/tours/1.jpg',
      balloonContent: 'Ночевка и трофейная рыбалка на одном из красивейших озер Зауралья',
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
      iconImageHref: 'svg/pointer.svg',
      // Размеры метки.
      iconImageSize: [48, 48],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [0, 0],
      // Смещение слоя с содержимым относительно слоя с картинкой.
      iconContentOffset: [19, 6],
      // Макет содержимого.
      iconContentLayout: MyIconContentLayout,
    },
  );

  myMap.geoObjects.add(myPlacemark).add(myPlacemarkWithContent);
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

  // Создает коллекцию.
  const myCollection = new ymaps.GeoObjectCollection();
  // Создает массив с данными.
  const myPoints = [
    { coords: [69.341106, 88.174678], text: 'Озеро Хантайское' },
    { coords: [69.332106, 88.174678], text: 'Плато Путорана' },
    { coords: [69.354106, 88.174678], text: 'Город Дудинка' },
  ];

  // Заполняем коллекцию данными.
  myPoints.forEach((point) => {
    myCollection.add(
      new ymaps.Placemark(point.coords, {
        balloonContentBody: point.text,
      }),
    );
  });
  // Добавляем коллекцию меток на карту.
  myMap.geoObjects.add(myCollection);

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
    const ySearchBar = document.querySelector('.ymaps-2-1-77-searchbox-input__input');
    ySearchBar.value = searchBar.value;
  });

  searchBar.addEventListener('change', () => {
    const ySearchBar = document.querySelector('.ymaps-2-1-77-searchbox-input__input');
    mySearchControl.search(ySearchBar.value);
  });

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
    if (point.text.toLowerCase().indexOf(request.toLowerCase()) != -1) {
      points.push(point);
    }
  }
  // При формировании ответа можно учитывать offset и limit.
  points = points.splice(offset, limit);
  // Добавляем точки в результирующую коллекцию.
  for (var i = 0, l = points.length; i < l; i++) {
    var point = points[i],
      coords = point.coords,
      text = point.text;

    geoObjects.add(
      new ymaps.Placemark(coords, {
        name: text + ' name',
        description: text + ' description',
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
