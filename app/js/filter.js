const btnToggle = document.querySelectorAll('.filter__toggle');
const dropdownToggle = document.querySelectorAll('.btn.dropdown-toggle');
const dropdownItem = document.querySelectorAll('.dropdown-item');
const complexity = document.querySelector('.complexity');
const from = document.querySelector('.price-from');
const to = document.querySelector('.price-to');
const priceMin = 30000;
const priceMax = 1000000;

const previewList = document.querySelector('.preview__list');
const territoryFilter = document.querySelectorAll('.territory a');
const typesFilter = document.querySelectorAll('.filter__types .filter__toggle');
const filterSeason = document.querySelectorAll('.filter__season a');
const filterComplexity = document.querySelector('.filter__complexity input');

dropdownItem.forEach((drp) => {
  drp.addEventListener('click', () => {
    drp.parentElement.previousElementSibling.children[0].textContent = drp.textContent;
  });
});

async function postData(url, obj) {
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: 'param=' + JSON.stringify(obj),
  }).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText));
    }
    return Promise.resolve(response.json());
  });
  return await result;
}

function updatePreviewList(data) {
  previewList.innerHTML = '';
  if (data) {
    data.forEach((item) => {
      const li = `
      <li class="preview__tour" style="background-image: url('img/${item.image}')" data-tour_id="${item.tour_id}">
        <h4 class="preview__tour-name">${item.name}</h4>
        <a class="preview__tour-show" href="#">Подробно</a>
      </li>
      `;
      previewList.insertAdjacentHTML('beforeend', li);
    });
  }
  if (data.length === 0) {
    previewList.insertAdjacentHTML(
      'beforeend',
      '<span class="preview__not-found">По вашему запросу ничего не найдено</span>',
    );
  }
}

// Передаваемый объект филтров

let objFilter = {
  territory: 'Не выбрано',
  types: [],
  season: 'Не выбрано',
  complexity: '0',
  priceMin: priceMin,
  priceMax: priceMax,
};

// Получение начальных данных по турам без фильтрации
function defaultFilter(obj) {
  postData('filters/filter.php', obj).then((data) => {
    console.log(data);
    updatePreviewList(data);
  });
}
defaultFilter(objFilter);

// Фильтр - Территория проведения туров

territoryFilter.forEach((item) => {
  item.addEventListener('click', (e) => {
    objFilter.territory = e.target.textContent;
    postData('filters/filter.php', objFilter).then((data) => {
      console.log(data);
      updatePreviewList(data);
    });
  });
});

// Фильтр - Искомые типы туров

typesFilter.forEach((btn) => {
  btn.dataset.enabled = 'false';

  btn.addEventListener('click', (e) => {
    btn.classList.toggle('filter__toggle--active');
    const set = btn.parentElement.dataset.types;

    if (btn.classList.contains('filter__toggle--active')) {
      btn.dataset.enabled = 'true';
      setObjFilterSetting('types', set);
      console.log(objFilter);
      postData('filters/filter.php', objFilter).then((data) => {
        console.log(data);
        updatePreviewList(data);
      });
    } else {
      btn.dataset.enabled = 'false';
      deleteObjFilterSetting('types', set);
      console.log(objFilter);
      postData('filters/filter.php', objFilter).then((data) => {
        console.log(data);
        updatePreviewList(data);
      });
    }
  });
});

function setObjFilterSetting(array, elem) {
  elem = elem.trim();

  if (!objFilter[array].includes(elem)) {
    objFilter[array].push(elem);
  }
}

function deleteObjFilterSetting(array, elem) {
  elem = elem.trim();
  const index = objFilter[array].indexOf(elem);

  if (index > -1) {
    objFilter[array].splice(index, 1);
  }
}

// Фильтр - Сезон проведения туров

filterSeason.forEach((item) => {
  item.addEventListener('click', (e) => {
    objFilter.season = e.target.dataset.season;
    console.log(objFilter);
    postData('filters/filter.php', objFilter).then((data) => {
      console.log(data);
      updatePreviewList(data);
    });
  });
});

// Фильтр - Сложность тура

$('.range-complexity').ionRangeSlider({
  type: 'single',
  skin: 'round',
  onFinish: function (data) {
    if (data.from === 1) {
      complexity.textContent = 'низкая';
      objFilter.complexity = '1';
    } else if (data.from === 2) {
      complexity.textContent = 'средняя';
      objFilter.complexity = '2';
    } else if (data.from === 3) {
      complexity.textContent = 'высокая';
      objFilter.complexity = '3';
    } else {
      complexity.textContent = 'любая';
      objFilter.complexity = '0';
    }
    console.log(objFilter);
    postData('filters/filter.php', objFilter).then((data) => {
      console.log(data);
      updatePreviewList(data);
    });
  },
});

// Фильтр - Стоимость тура

$('.range-price').ionRangeSlider({
  type: 'double',
  skin: 'round',
  min: priceMin,
  max: priceMax,
  from: 200000,
  step: 5000,
  to: 750000,
  onChange: function (data) {
    from.textContent = data.from;
    to.textContent = data.to;
  },
  onFinish: function (data) {
    objFilter.priceMin = data.from;
    objFilter.priceMax = data.to;
    console.log(objFilter);
    postData('filters/filter.php', objFilter).then((data) => {
      console.log(data);
      updatePreviewList(data);
    });
  },
});
