var hashChange = require('../vendor/hashChange');

// https://stackoverflow.com/a/3169849
function clearSelection () {
  if (window.getSelection) {
    if (window.getSelection().empty) {  // Chrome
      window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) {  // Firefox
      window.getSelection().removeAllRanges();
    }
  } else if (document.selection) {  // IE?
    document.selection.empty();
  }
}

module.exports = function() {
  var overlays = require('../module/speaker-overlay')();

  var screens = [].slice.call(document.querySelectorAll('.schedule-body'));

  _initDrag();

  var lastScreenId;

  hashChange.addListener(function (hash) {
    var parts = /^[\/|#]?(([^-]+)(-(.+))?)/.exec(hash);
    var overlayKey = (parts && parts[3]) ? parts[1] : false;
    var screenID = parts && parts[2];

    var screen;
    screens
      .filter(function (otherScreen) {
        if (otherScreen.id === screenID) {
          screen = otherScreen;
          return false;
        }
        return true;
      })
      .forEach(function (otherScreen) {
        otherScreen.style.display = 'none';
      })
    
    if (!screen) {
      screen = screens[0];
    }

    screen.style.display = 'block';

    if (screen.id !== lastScreenId) {
      lastScreenId = screen.id
      // Reset the table scrolling
      screen.querySelector('.confcal-box').scrollTo(0, 0);
    }

    overlays.showOverlay(overlayKey, screenID);
  });

  function _initDrag () {
    var moving
    document.body.addEventListener('mousemove', function (ev) {
      if (!moving) {
        return
      }
      moving.box.scrollTo(
        moving.scroll.x + moving.mouse.x - ev.pageX,
        moving.scroll.y + moving.mouse.y - ev.pageY
      )
      clearSelection()
    })
    document.body.addEventListener('mouseup', function () {
      moving = null
    })
    screens.forEach(function (screen) {
      var box = screen.querySelector('.confcal-box')
      screen.addEventListener('mousedown', function (ev) {
        var node = ev.target;
        while (node !== document.body && node !== box) {
          node = node.parentNode;
        }
        if (node === document.body) {
          return; // Not a child
        }
        moving = {
          mouse: {
            x: ev.pageX,
            y: ev.pageY
          },
          scroll: {
            x: box.scrollLeft,
            y: box.scrollTop
          },
          box: box,
        };
      })
    })
  }
};
