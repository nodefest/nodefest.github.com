module.exports = function() {

  var body = document.body;
  var opener = [].slice.call(document.querySelectorAll('.speaker'));
  var closer = [].slice.call(document.querySelectorAll('.overlay'));

  opener.forEach(function(el) {
    el.addEventListener('click', _openSpeaker, false);
  });
  closer.forEach(function(el) {
    el.addEventListener('click', _closeSpeaker, false);
  });
  document.addEventListener('keydown', _closeSpeakerByEsc, false);

  function _openSpeaker(ev) {
    ev.preventDefault();
    var key = ev.currentTarget.getAttribute('data-key');
    var overlay = document.querySelector('.overlay[data-key="' + key + '"]');
    body.classList.add('is-expand');
    overlay.classList.add('is-expand');
  }

  function _closeSpeaker(ev) {
    ev.preventDefault();
    var overlay = ev.currentTarget;
    var session = overlay.querySelector('.session');

    // DOCUMENT_POSITION_FOLLOWING OR DOCUMENT_POSITION_CONTAINED_BY
    if (session.compareDocumentPosition(ev.target) !== 20) {
      body.classList.remove('is-expand');
      overlay.classList.remove('is-expand');
    }
  }

  function _closeSpeakerByEsc(ev) {
    // Esc only
    if (ev.keyCode !== 27) { return; }

    var overlay = document.querySelector('.overlay.is-expand');
    if (overlay === null) { return; }

    body.classList.remove('is-expand');
    overlay.classList.remove('is-expand');
  }

};
