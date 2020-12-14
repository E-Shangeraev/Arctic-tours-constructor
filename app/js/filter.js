const btnToggle = document.querySelectorAll('.filter__toggle');
const dropdownToggle = document.querySelectorAll('.btn.dropdown-toggle');
const dropdownItem = document.querySelectorAll('.dropdown-item');
const previewList = document.querySelector('.preview__list');
const territoryFilter = document.querySelectorAll('.territory a');

btnToggle.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('filter__toggle--active');
    btn.dataset.enabled = 'true';
  });
});

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

// Получение начальных данных по турам без фильтрации
function defaultFilter(obj) {
  postData('filters/all.php', obj).then((data) => {
    console.log(data);
    data.forEach((item) => {
      const li = `
      <li class="preview__tour" style="background-image: url('img/${item.image}')" data-tour_id="${item.tour_id}">
        <h4 class="preview__tour-name">${item.name}</h4>
        <a class="preview__tour-show" href="#">Подробно</a>
      </li>
      `;
      previewList.insertAdjacentHTML('beforeend', li);
    });
  });
}
defaultFilter({ name: 'good' });

// Фильтр - Территория проведения туров

let objFilter = {};

territoryFilter.forEach((item) => {
  item.addEventListener('click', (e) => {
    let objFilter = {};

    objFilter.territory = e.target.textContent;

    postData('filters/territory.php', objFilter).then((data) => console.log(data));

    // $.ajax({
    //   type: 'POST',
    //   url: 'filters/territory.php',
    //   dataType: 'json',
    //   data: 'param=' + JSON.stringify(objFilter),
    //   success: function (html) {
    //     console.log(html);
    //   },
    // });
  });
});
