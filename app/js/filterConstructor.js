const previewListConstructor = document.querySelector('.preview--constructor .preview__list');

previewListConstructor.addEventListener('click', (e) => {
  let remove = e.target.closest('#remove');

  if (!remove) return;

  if (!previewList.contains(remove)) return;

  // document.querySelector('')
});
