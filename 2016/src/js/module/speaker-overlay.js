module.exports = function() {

  var body = document.body;
  var opener = [].slice.call(document.querySelectorAll('.speaker'));
  var closer = [].slice.call(document.querySelectorAll('.overlay-button'));

  opener.forEach(function(el) {
    el.addEventListener('click', _openSpeaker, false);
  });
  closer.forEach(function(el) {
    el.addEventListener('click', _closeSpeaker, false);
  });

  function _openSpeaker(ev) {
    ev.preventDefault();
    var key = ev.currentTarget.getAttribute('data-key');
    var overlay = document.querySelector('.overlay[data-key="' + key + '"]');
    body.classList.add('is-expand');
    overlay.classList.add('is-expand');
  }

  function _closeSpeaker(ev) {
    ev.preventDefault();
    var overlay = document.querySelector('.overlay.is-expand');
    body.classList.remove('is-expand');
    overlay.classList.remove('is-expand');
  }

};
