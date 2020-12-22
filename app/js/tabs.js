const navLink = document.querySelectorAll('.nav-link');

navLink.forEach((tab) => {
  tab.addEventListener('click', () => {
    if (readyTab.classList.contains('active')) {
      console.log('ready');
    }
    if (constructorTab.classList.contains('active')) {
      console.log('constructor');
    }
  });
});
