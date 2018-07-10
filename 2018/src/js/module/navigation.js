module.exports = function() {
  var opener = document.querySelector('.header-button');
  var closer = document.querySelector('.navigation');

  var body = document.body;
  var navigation = document.querySelector('.navigation');
  var list = document.querySelector('.navigation-list');

  if (!(opener && closer && navigation && list)) {
    return;
  }

  opener.addEventListener('click', _openNav, false);
  closer.addEventListener('click', _closeNav, false);
  document.addEventListener('keydown', _closeNavByEsc, false);

  function _openNav(ev) {
    ev.preventDefault();
    body.classList.add('is-expand');
    navigation.classList.add('is-expand');
  }

  function _closeNav(ev) {
    // DOCUMENT_POSITION_FOLLOWING OR
    // DOCUMENT_POSITION_PRECEDING & DOCUMENT_POSITION_CONTAINED_BY
    var pos = list.compareDocumentPosition(ev.target);
    if (pos === 4 || pos === 10) {
      ev.preventDefault();
      body.classList.remove('is-expand');
      navigation.classList.remove('is-expand');
    }
    // aタグは通す
    if (ev.target.tagName.toLowerCase() === 'a') {
      body.classList.remove('is-expand');
      navigation.classList.remove('is-expand');
    }
  }

  function _closeNavByEsc(ev) {
    // Esc only
    if (ev.keyCode !== 27) { return; }

    var navigation = document.querySelector('.navigation.is-expand');
    if (navigation === null) { return; }

    body.classList.remove('is-expand');
    navigation.classList.remove('is-expand');
  }
};
