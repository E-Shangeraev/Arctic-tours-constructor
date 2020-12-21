$(function () {
  $('input[name="birthday"]').daterangepicker({
    singleDatePicker: false,
    showDropdowns: true,
    minYear: moment().get('year'),
    maxYear: moment().get('year') + 10,
    locale: {
      format: 'DD / MM / YYYY',
      daysOfWeek: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      firstDay: 1,
    },
  });
});
