var hash = document.location.hash || ''
var listeners = []

function set (newHash, force) {
  if (!newHash) {
    newHash = ''
  }
  var oldHash = hash
  if (oldHash === newHash && !force) {
    return
  }
  hash = newHash
  _updateLocationHash(newHash)
  listeners.forEach(function (listener) {
    try {
      listener(hash, oldHash)
    } catch (err) {
      console.error(err)
    }
  })
}

window.addEventListener('hashchange', function () {
  set(document.location.hash)
})

function _handleClick(ev) {
  ev.preventDefault()
  set(ev.currentTarget.hash, true)
}

function _updateLocationHash(newHash) {
  if (document.location.hash !== newHash) {
    document.location.hash = newHash || '!'
  }
}

module.exports = {
  initElements: function () {
    var $a = document.getElementsByTagName('a')
    ;[].forEach.call($a, function(el) {
      var isInPage = el.origin + el.pathname === location.origin + location.pathname
      isInPage && el.addEventListener('click', _handleClick.bind(this), false)
    }, this)
  },
  addListener: function (onChange, skipImmediateTrigger) {
    listeners.push(onChange)
    if (!skipImmediateTrigger) {
      onChange(hash, null)
    }
  }
}
