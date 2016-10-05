module.exports = function() {
  var trigger1 = document.querySelector('.header-button');
  var trigger2 = document.querySelector('.navigation-button');

  var body = document.body;
  var navigation = document.querySelector('.navigation');

  trigger1.addEventListener('click', _toggleNav, false);
  trigger2.addEventListener('click', _toggleNav, false);

  function _toggleNav() {
    body.classList.toggle('is-expand');
    navigation.classList.toggle('is-expand');
  }
};
