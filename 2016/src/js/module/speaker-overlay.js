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
    var content = overlay.querySelector('.overlay-content');
    var button  = overlay.querySelector('.overlay-button');

    // アニメーションで制御するのでいったん全部消す
    overlay.style.display = content.style.display = button.style.display = 'none';

    // アニメーションしないならコレだけで良い
    body.classList.add('is-expand');
    overlay.classList.add('is-expand');

    // アニメーション！
    Velocity(overlay, 'fadeIn', { duration: 50 }).then(function() {
      overlay.style.display = '';
      Velocity(content, 'slideDown', { delay: 300, duration: 200 }).then(function() {
        Velocity(button, 'fadeIn');
      });
    });

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
