(function() {

'use strict';

var MAX_POINTS = 5;

var list = User.list = [];
var map = User.idMap = {};

function User(args) {
  this.points = [];
  this.lastPoint = {};

  if (args) {
    this.id = args.id;
    this.setPoint(args.point);
    map[this.id] = this;
  }
  else {
    this.isMe = true;
  }

  list.push(this);
}

User.get = function(id) {
  return map[id];
};

User.destroy = function(id) {
  var idx;
  list.forEach(function(user, i) {
    if (user.id === id) idx = i;
  });
  if (idx) list.splice(idx, 1);

  delete map[id];
};

User.prototype.setId = function(id) {
  this.id = id;
};

User.prototype.setPoint = function(point) {
  if (!point) return;

  this.lastPoint = { x: point.x, y: point.y, timestamp: Date.now() };
  this.points.push(this.lastPoint);
  if (this.points.length > MAX_POINTS) {
    this.points.shift();
  }
};

window.User = User;

})();
