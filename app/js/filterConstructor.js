const previewListConstructor = document.querySelector('#preview-constructor .preview__list');

previewListConstructor.addEventListener('click', (e) => {
  let remove = e.target.closest('#remove');

  if (!remove) return;

  const locale = remove.parentElement.parentElement;
  console.log(locale);

  myRouteArr.forEach((item, index, arr) => {
    if (item === locale) {
      arr.splice(index, 1);
    }
  });
  remove.parentElement.parentElement.remove();

  setNumberToLoc();
});

previewListConstructor.addEventListener('click', (e) => {
  let more = e.target.closest('#more');

  if (!more) return;

  console.log('Подробнее');
});
