const from = document.querySelector('.price-from');
const to = document.querySelector('.price-to');
const complexity = document.querySelector('.complexity');

const groupFrom = document.querySelector('.group-from');
const groupTo = document.querySelector('.group-to');

$('.range-complexity').ionRangeSlider({
  type: 'single',
  skin: 'round',
  onChange: function (data) {
    if (data.from === 1) {
      complexity.textContent = 'низкая';
    } else if (data.from === 2) {
      complexity.textContent = 'средняя';
    } else if (data.from === 3) {
      complexity.textContent = 'высокая';
    } else {
      complexity.textContent = 'любая';
    }
  },
});

$('.range-price').ionRangeSlider({
  type: 'double',
  skin: 'round',
  min: 30000,
  max: 1000000,
  from: 200000,
  step: 5000,
  to: 750000,
  onChange: function (data) {
    from.textContent = data.from;
    to.textContent = data.to;
  },
});

$('.range-group-size').ionRangeSlider({
  type: 'double',
  skin: 'round',
  step: 1,
  onChange: function (data) {
    groupFrom.textContent = data.from;
    groupTo.textContent = data.to;
  },
});
