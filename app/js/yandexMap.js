// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
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
      controls: [],
      zoom: 12,
    }),
    //==========Изменение внешнего вида маркера==========

    // Создаём макет содержимого.
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>',
    ),
    myPlacemark = new ymaps.Placemark(
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
    ),
    myPlacemarkWithContent = new ymaps.Placemark(
      [69.398406, 88.154598],
      {
        hintContent: 'Озеро Хантайское',
        balloonContent: 'Ночевка и трофейная рыбалка на одном из красивейших озер Зауралья',
        iconContent: '2',
      },
      {
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

  myMap.geoObjects.add(myPlacemark).add(myPlacemarkWithContent),
    //===================================================

    //==========Добавление своих меток==========

    // Создает коллекцию.
    (myCollection = new ymaps.GeoObjectCollection()),
    // Создает массив с данными.
    (myPoints = [
      { coords: [69.341106, 88.174678], text: 'Трактир' },
      { coords: [69.332106, 88.174678], text: 'Стадион' },
      { coords: [69.354106, 88.174678], text: 'Вокзал' },
    ]);

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
  var mySearchControl = new ymaps.control.SearchControl({
    options: {
      // Заменяем стандартный провайдер данных (геокодер) нашим собственным.
      provider: new CustomSearchProvider(myPoints),
      // Не будем показывать еще одну метку при выборе результата поиска,
      // т.к. метки коллекции myCollection уже добавлены на карту.
      noPlacemark: true,
      resultsPerPage: 5,
    },
  });

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

  // Добавляем контрол в верхний правый угол,
  myMap.controls.add(mySearchControl, { float: 'right' });

  //===================================================

  const suggestView1 = new ymaps.SuggestView('suggest');
}
