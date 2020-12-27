function init() {
  // Создание карты.
  const myMap = new ymaps.Map('ymap', {
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

  function setSearchControl(myPoints) {
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
      searchBar.value = '';
    });
  }

  //===================================================
  const previewList = document.querySelector('.preview__list');
  const previewTourShow = document.querySelectorAll('.preview__tour-show');
  // console.log(previewTourShow);

  previewList.addEventListener('click', (e) => {
    let a = e.target.closest('a');

    if (!a) return;

    if (!previewList.contains(a)) return;

    const tourId = a.parentElement.dataset.tour_id;
    const objShow = { tourId: tourId };
    // Создает коллекцию.
    const myCollection = new ymaps.GeoObjectCollection();
    let myPoints = [];
    let points = [];

    postData('filters/points.php', objShow)
      .then((data) => {
        console.log(data);

        data.forEach((item) => {
          let coords = [];
          coords.push(item.coords_x);
          coords.push(item.coords_y);
          points.push(coords);

          let obj = {
            coords,
            name: item.name,
            image: `img/${item.image}`,
            text: item.text,
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
                iconImageOffset: [-23, -42],
                // Смещение слоя с содержимым относительно слоя с картинкой.
                iconContentOffset: [19, 6],
              },
            ),
          );
        });
        // Добавляем коллекцию меток на карту.
        myMap.geoObjects.splice(0, 1, myCollection);
        setSearchControl(myPoints);

        return points;
      })
      .then((points) => {
        console.log(points);

        //================== Маршрутизация ==================

        // Создание экземпляра маршрута.
        const multiRoute = new ymaps.multiRouter.MultiRoute(
          {
            // Точки маршрута.
            referencePoints: points,
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
            routeStrokeWidth: 0,
            // Автоматически устанавливать границы карты так,
            // чтобы маршрут был виден целиком.
            boundsAutoApply: true,
          },
        );

        // Добавление маршрута на карту.
        myMap.geoObjects.splice(1, 1, multiRoute);
        // ymaps.ready(init);
        // myMap.update();
        //===================================================
      });
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
  // Ищем в свойстве text и name каждого элемента массива.
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
  points.forEach((point) => {
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
  });

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
