(function() {

'use strict';

var supportDevice = !navigator.userAgent.match(/iPhone|iPad|Android/);
if (!supportDevice) return;

var PROT_INTERVAL = 500;
var DOT_RADIUS = 3;

var $canvas = $('<canvas>');
var canvas = $canvas.get(0);

$canvas.appendTo('#dotEffect').attr({
  'width' : window.innerWidth,
  'height': window.innerHeight
});

$(window).on('resize', function(e) {
  $canvas.attr({
    width: window.innerWidth,
    height: window.innerHeight
  });
});

var ctx = canvas.getContext('2d');
var me = new User();

var socket;
if (window.io) {
  socket = io.connect( 'http://' + window.__socketServer, { 'sync disconnect on unload' : true } );

  socket.emit('create', function(result) {
    $.each(result.users, function(id, point) {
      if (result.id === id) {
        me.setId(id);
      }
      else {
        new User({ id: id, point: point });
      }
    });
  });

  socket.on('create', function(id) {
    new User({ id: id });
  });

  socket.on('update', function(data) {
    User.get(data.id).setPoint(data.point);
  });

  socket.on('destroy', function(id) {
    User.destroy(id);
  });
}

$(window).mousemove(throttle(function(e) {
  var x = e.clientX;
  var y = e.clientY;
  var moveX = Math.abs(me.lastPoint.x - x);
  var moveY = Math.abs(me.lastPoint.y - y);
  var moved = me.points.length === 0 || moveX > 5 || moveY > 5;

  if (moved) {
    me.setPoint({ x: x, y: y });

    if (socket) {
      socket.emit('update', { id: me.id, point: me.lastPoint });
    }
  }
}, PROT_INTERVAL));

var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  function(fn) {
    window.setTimeout(fn, 1000.0 / 60.0 );
  };

(function draw() {
  var now = Date.now();
  requestAnimationFrame(draw);

  canvas.width = canvas.width; // same as `ctx.crearRect`

  User.list.forEach(function(user) {
    var points = user.points;
    var isMe = user.isMe;
    var lastPoint = user.lastPoint;
    var point, x1, x2, y1, y2, lineProgress, dotProgress, isStop;

    for (var i = 0, len = points.length; i < len; i++) {
      point = points[i];
      x1 = null;
      y1 = null;
      x2 = point.x;
      y2 = point.y;
      isStop = false;

      if (i !== 0) {
        x1 = points[i - 1].x;
        y1 = points[i - 1].y;
      }

      lineProgress = dotProgress = (now - point.timestamp) / 2000;

      if (point === lastPoint && dotProgress > 0.4) {
        if (!lastPoint._timestamp || now - lastPoint._timestamp > 600) {
          lastPoint._timestamp = now - 20;
        }
        dotProgress = (now - lastPoint._timestamp) / 2000;
        isStop = true;
      }
      else if (point._timestamp) {
        dotProgress = (now - point._timestamp) / 2000;
      }

      if (0 < lineProgress && lineProgress < 1) {
        drawLine(x1, y1, x2, y2, lineProgress, { me: isMe });
      }

      if (0 < dotProgress && dotProgress < 1) {
        drawDot(x2, y2, dotProgress, { me: isMe, isStop: isStop });
      }
    }
  });
})();

function drawLine(x1, y1, x2, y2, progress, params) {
  if ( !x1 || !y1 || !x2 || !y2 ) {
    return;
  }

  var lengthOfLine = getLocalProgress(0, 0.1, progress, params);
  var m = lengthOfLine;
  var n = 1 - lengthOfLine;
  var x3 = n * x1 + m * x2;
  var y3 = n * y1 + m * y2;
  var grad = getGrad(x1, y1, x3, y3, lengthOfLine, progress, params);

  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.strokeStyle = grad;
  ctx.stroke();
  ctx.restore();
}

function getGrad(x1, y1, x2, y2, lengthOfLine, progress, params) {
  var COLOR1 = params.me ? [ 82, 204, 186 ] : [ 255, 153, 167 ];
  var COLOR2 = params.me ? [ 255, 248, 59 ] : [ 115, 153, 230 ];
  var color = [];
  var grad  = ctx.createLinearGradient(x1, y1, x2, y2);

  if (0 < progress && progress < 0.1) {
    grad.addColorStop(0, 'rgb(' + COLOR2.join() + ')');
    grad.addColorStop(1, 'rgb(' + COLOR1.join() + ')');
    return grad;
  }

  if (progress < 0.6) {
    var localProgress = getLocalProgress(0.1, 0.6, progress);
    for (var i = 0; i < 3; i ++) {
      color[i] = (COLOR1[i] + (COLOR2[i] - COLOR1[i]) * localProgress) | 0;
    }
    grad.addColorStop(0, 'rgb(' + COLOR2.join() + ')');
    grad.addColorStop(1, 'rgb(' + color.join() + ')');
    return grad;
  }

  var alpha = 1 - getLocalProgress(0.6, 1.0, progress);
  grad = 'rgba(' + COLOR2.join() + ',' + alpha + ')';

  return grad;
}

function drawDot(x, y, progress, params) {
  var COLOR1 = params.me ? [ 82, 204, 186 ] : [ 255, 153, 167 ];
  var COLOR2 = params.me ? [ 255, 248, 59 ] : [ 115, 153, 230 ];
  var color = [];

  var localProgress1 = getLocalProgress(0, 0.1, progress);
  var r = DOT_RADIUS - 3 + (3 * (params.isStop ? 1 : localProgress1));
  var r2 = DOT_RADIUS + 10 - (6 * localProgress1);

  for (var i = 0; i < 3; i ++) {
    var localProgress2 = getLocalProgress(0.5, 0.8, progress);
    color[i] = (COLOR1[i] + (COLOR2[i] - COLOR1[i]) * localProgress2) | 0;
  }

  var alpha = 1 - getLocalProgress(0.9, 1, progress);

  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.fillStyle = 'rgba( ' + color[0] + ', ' + color[1] + ', ' + color[2] + ',' + alpha + ' )';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, r2, 0, Math.PI * 2, false);
  ctx.fillStyle = 'rgba( ' + color[0] + ', ' + color[1] + ', ' + color[2] + ', ' + Math.min(0.2, alpha) + ')';
  ctx.fill();

  ctx.restore();
}

function getLocalProgress(min, max, progress) {
  if (progress < min) {
    return 0;
  }
  if (progress > max) {
    return 1;
  }
  return (progress - min) * 1 / (max - min);
}


//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  options = options || {};
  var later = function() {
    previous = options.leading === false ? 0 : new Date();
    timeout = null;
    result = func.apply(context, args);
  };
  return function() {
    var now = new Date();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

})();
