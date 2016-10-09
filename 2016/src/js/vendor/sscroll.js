function SScroll(options) {
  options = options || {}
  this.options = {
    gapX:     options.gapX     || 40,
    gapY:     options.gapY     || 40,
    duration: options.duration || 500,
    easing:   options.easing   || function (t) { return t*(2-t) }
  }

  // こっそりhashが書き換えられないならやめておく
  if (!history.replaceState) { return }

  this._bindEvent()
  this._checkHash()
  return this
}

SScroll.prototype = {
  constructor:   SScroll,
  _bindEvent:    _bindEvent,
  _checkHash:    _checkHash,
  _handleClick:  _handleClick,
  _scrollByHash: _scrollByHash,
  _scrollTo:     _scrollTo,
  _modifyHash:   _modifyHash
}

function _bindEvent() {
  var $a = document.getElementsByTagName('a')
  ;[].forEach.call($a, function(el) {
    var isInPage = el.origin + el.pathname === location.origin + location.pathname
    isInPage && el.addEventListener('click', this._handleClick.bind(this), false)
  }, this)
}

function _checkHash() {
  this._scrollByHash(location.hash)
}

function _modifyHash(hash) {
  history.pushState(null, null, hash)
}

function _handleClick(ev) {
  ev.preventDefault()
  var hash = ev.currentTarget.hash
  this._scrollByHash(hash)
  this._modifyHash(hash)
}

function _scrollByHash(hash) {
  var destEl = document.getElementById(hash.slice(1))
  destEl && this._scrollTo(0, destEl.offsetTop, this.options)
}

function _scrollTo(x, y, options) {
  var duration = options.duration,
      easing   = options.easing
  x -= options.gapX
  y -= options.gapY

  var frame = null
  var fromX = window.scrollX || window.pageXOffset,
      fromY = window.scrollY || window.pageYOffset,
      startTime = Date.now()

  if (frame) {
    cancelAnimationFrame(frame)
  }

  frame = requestAnimationFrame(__step)

  function __step() {
    var time = Date.now(),
        val,
        curX, curY

    var elapsed = (time - startTime) / duration
    elapsed = elapsed > 1 ? 1 : elapsed
    val = easing(elapsed)

    curX = fromX + (x - fromX) * val
    curY = fromY + (y - fromY) * val

    window.scrollTo(curX, curY)

    if (curX === x && curY === y) {
      cancelAnimationFrame(frame)
      fromX = fromY = startTime = frame = null
      return
    }

    frame = requestAnimationFrame(__step)
  }
}

module.exports = SScroll;
