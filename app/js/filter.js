const btnToggle = document.querySelectorAll('.filter__toggle');
const dropdownToggle = document.querySelectorAll('.btn.dropdown-toggle');
const dropdownItem = document.querySelectorAll('.dropdown-item');

btnToggle.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('filter__toggle--active');
    btn.dataset.enabled = 'true';
  });
});

dropdownItem.forEach((drp) => {
  drp.addEventListener('click', () => {
    drp.parentElement.previousElementSibling.children[0].textContent = drp.textContent;
  });
});
