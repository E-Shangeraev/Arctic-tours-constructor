const from = document.querySelector('.price-from');
const to = document.querySelector('.price-to');
const complexity = document.querySelector('.complexity');

$('.range-complexity').ionRangeSlider({
  type: 'single',
  skin: 'round',
  min: 0,
  max: 1000,
  onChange: function (data) {
    if (data.from <= 3) {
      complexity.textContent = 'низкая';
    } else if (data.from > 3 && data.from <= 6) {
      complexity.textContent = 'средняя';
    } else if (data.from > 6) {
      complexity.textContent = 'высокая';
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

let my_range = $('.range-complexity');

// my_range.onChange(() => console.log(1));

// handle.forEach((h) => {
//   h.addEventListener('input', () => console.log(1));
// });
