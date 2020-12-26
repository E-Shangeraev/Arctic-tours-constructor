const form = document.querySelector('.reservation-popup__form');
const inputName = document.querySelector('.reservation-popup__form input[name="name"]');
const inputPhone = document.querySelector('.reservation-popup__form input[name="phone"]');

console.log(inputName);
console.log(inputPhone);

// async function postData(url, obj) {
//   const result = await fetch(url, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json, text/javascript, */*; q=0.01',
//       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//     },
//     body: 'param=' + JSON.stringify(obj),
//   }).then((response) => {
//     if (response.status !== 200) {
//       return Promise.reject(new Error(response.statusText));
//     }
//     return Promise.resolve(response.json());
//   });
//   return await result;
// }

// const postMail = async (data) => {
//   let result = await fetch('config/mail.php', {
//     method: 'POST',
//     body: data,
//   });

//   return await result.text();
// };

form.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log('submit');
  const obj = {};

  obj.name = inputName.value;
  obj.phone = inputPhone.value;

  // let formData = new FormData(form);

  postData('config/mail.php', obj)
    .then((response) => console.log(`Сообщение отправлено: ${response}`))
    .catch((error) => console.error(error));

  form.reset();
});
