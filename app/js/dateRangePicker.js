$(function () {
  $('input[name="birthday"]').daterangepicker(
    {
      singleDatePicker: true,
      showDropdowns: true,
      minYear: 1901,
      maxYear: parseInt(moment().format('YYYY'), 10),
      locale: {
        format: 'DD-MM-YYYY',
      },
    },
    function (start, end, label) {
      var years = moment().diff(start, 'years');
    },
  );
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
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [
          moment().subtract(1, 'month').startOf('month'),
          moment().subtract(1, 'month').endOf('month'),
        ],
      },
    },
    cb,
  );

  cb(start, end);
});
