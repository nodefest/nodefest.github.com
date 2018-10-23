module.exports = function() {
  _initCloseButton()

  var overlay;
  var screen;

  return {
    showOverlay: function (overlayKey, newScreen) {
      screen = newScreen;
      if (overlay) {
        document.body.classList.remove('is-expand');
        overlay.classList.remove('is-expand');
        overlay = null
      }
      if (overlayKey) {
        overlay = document.querySelector('.overlay[data-key="' + overlayKey + '"]')
      }
      if (overlay) {
        var content = overlay.querySelector('.overlay-content');
        var button  = overlay.querySelector('.overlay-button');
    
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
    }
  }

  function _initCloseButton () {
    var closer = [].slice.call(document.querySelectorAll('.overlay'));
  
    closer.forEach(function(el) {
      el.addEventListener('click', _closeSpeaker, false);
    });
    document.addEventListener('keydown', _closeSpeakerByEsc, false);
  
  
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
        location.hash = screen;
      }
    }
  
    function _closeSpeakerByEsc(ev) {
      // Esc only
      if (ev.keyCode !== 27) { return; }
  
      location.hash = screen;
    }
  }
};
