const groupFrom = document.querySelector('.group-from');
const groupTo = document.querySelector('.group-to');

$('.range-group-size').ionRangeSlider({
  type: 'double',
  skin: 'round',
  step: 1,
  onChange: function (data) {
    groupFrom.textContent = data.from;
    groupTo.textContent = data.to;
  },
});
