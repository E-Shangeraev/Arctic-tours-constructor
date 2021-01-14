const form = document.querySelector('.reservation-popup__form');
const inputName = document.querySelector('.reservation-popup__form input[name="name"]');
const inputPhone = document.querySelector('.reservation-popup__form input[name="tel"]');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  objFilter.name = inputName.value;
  objFilter.phone = inputPhone.value;

  if (document.querySelector('.tour__name')) {
    objFilter.selectedTour = document.querySelector('.tour__name').textContent;
  }

  console.log(objFilter);

  postData('config/mail.php', objFilter)
    .then((response) => console.log(`Сообщение отправлено: ${response}`))
    .catch((error) => console.error(error));

  form.reset();
});
