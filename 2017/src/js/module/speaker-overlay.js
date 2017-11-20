module.exports = function() {
  var opener = [].slice.call(document.querySelectorAll('.speaker'));
  var closer = [].slice.call(document.querySelectorAll('.overlay'));

  opener.forEach(function(el) {
    el.addEventListener('click', function(ev) {
      ev.preventDefault();
      var key = ev.currentTarget.getAttribute('data-key');
      _openSpeaker(key);
    }, false);
  });
  closer.forEach(function(el) {
    el.addEventListener('click', _closeSpeaker, false);
  });
  document.addEventListener('keydown', _closeSpeakerByEsc, false);

  // パーマリンクがあればそれを開こうとする
  var hash = location.hash;
  if (!hash) return;
  _openSpeaker(hash.substr(1));


  function _openSpeaker(key) {
    var overlay = document.querySelector('.overlay[data-key="' + key + '"]');
    // コンテンツがない場合は何もしない
    if (!overlay) return;

    var content = overlay.querySelector('.overlay-content');
    var button  = overlay.querySelector('.overlay-button');

    // パーマリンクの生成
    location.hash = key;

    // アニメーションで制御するのでいったん全部消す
    overlay.style.display = content.style.display = button.style.display = 'none';

    // アニメーションしないならコレだけで良い
    document.body.classList.add('is-expand');
    overlay.classList.add('is-expand');

    // アニメーション！
    Velocity(overlay, 'fadeIn', { duration: 50 }).then(function() {
      // コレはdisplay: flexなので戻さないと崩れる
      overlay.style.display = '';
      Velocity(content, 'fadeIn', { delay: 100, duration: 600 }).then(function() {
        Velocity(button, 'fadeIn');
      });
    });

  }

  function _closeSpeaker(ev) {
    var overlay = ev.currentTarget;
    var session = overlay.querySelector('.session');

    if (
      // DOCUMENT_POSITION_FOLLOWING OR DOCUMENT_POSITION_CONTAINED_BY
      session.compareDocumentPosition(ev.target) !== 20 &&
      // リンクは通ってよい
      ev.target.tagName.toLowerCase() !== 'a'
    ) {
      ev.preventDefault();
      document.body.classList.remove('is-expand');
      overlay.classList.remove('is-expand');
      location.hash = '!';
    }
  }

  function _closeSpeakerByEsc(ev) {
    // Esc only
    if (ev.keyCode !== 27) { return; }

    var overlay = document.querySelector('.overlay.is-expand');
    if (overlay === null) { return; }

    document.body.classList.remove('is-expand');
    overlay.classList.remove('is-expand');
    location.hash = '!';
  }
};
