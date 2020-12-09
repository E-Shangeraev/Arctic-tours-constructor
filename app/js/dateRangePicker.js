$(function () {
  $('input[name="birthday"]').daterangepicker({
    singleDatePicker: true,
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

$(function () {
  var start = moment().subtract(29, 'days');
  var end = moment();

  function cb(start, end) {
    $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  }

  $('#reportrange').daterangepicker(
    {
      startDate: start,
      endDate: end,
      timePicker24Hour: true,
      ranges: {
        '7 дней': [moment(), moment(6, 'days')],
        '14 дней': [moment().subtract(13, 'days'), moment()],
        '21 день': [moment().subtract(20, 'days'), moment()],
        '30 дней': [moment().subtract(29, 'days'), moment()],
        '45 дней': [moment().subtract(44, 'days'), moment()],
        'Last Month': [
          moment().subtract(1, 'month').startOf('month'),
          moment().subtract(1, 'month').endOf('month'),
        ],
      },
      locale: {
        format: 'DD / MM / YYYY',
      },
    },
    cb,
  );

  cb(start, end);
});

$('input[name="available-date"]').daterangepicker({
  singleDatePicker: true,
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
