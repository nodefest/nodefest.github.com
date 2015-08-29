;(function(global) {
  'use strict';

  global.NF = global.NF || {};

  var mqtt = global.mqtt;
  var eve  = global.eve;
  var RhinoRenderer = global.NF.RR;
  var RhinoStatus   = global.NF.RS;
  var InkEffect     = global.NF.InkEffect;

  var COLORS = {
    ALPHA: '#0091EA',
    BRAVO: '#FFAB00'
  };
  var colors = Object.keys(COLORS);
  var rand = ( Math.random() * colors.length )|0;
  var myColor = RhinoRenderer.hexToRGBArray(COLORS[colors[ rand ]]);

  var RhinoPaintoon = function() {
    this.isConnected = false;
    this.client = mqtt.connect('ws://222.158.218.158');
    this.client.on('connect', this._onConnect.bind(this));

    this.rr = new RhinoRenderer(myColor);
    this.rs = new RhinoStatus();

    this._watchTimer = null;

    this._bindRhinoEve();
    this._watchStatus();
  };

  RhinoPaintoon.prototype = {
    constructor: RhinoPaintoon,
    _bindRhinoEve: function() {
      var that = this;
      eve.on( 'rhino1.click', function ( e, order ) {
        var now = Date.now();
        that.rr.rhinoSVG1.paint( order, myColor, now );
        that.paint('p:' + order, myColor, now);
        new InkEffect( myColor, e.pageX, e.pageY );
      });
      eve.on( 'rhino2.click', function ( e, order ) {
        var now = Date.now();
        that.rr.rhinoSVG2.paint( order, myColor, now );
        that.paint('c:' + order, myColor, now);
        new InkEffect( myColor, e.pageX, e.pageY );
      });
    },
    _onConnect: function() {
      this.isConnected = true;
      this.client.on('message', this._onMessage.bind(this));
      this.client.subscribe('nodefest-2015/#');
    },
    _onMessage: function(topic, payload) {
      var that = this;
      if (topic === 'nodefest-2015/client/sync') {
        var clientData = JSON.parse(payload);
        var clientNum = clientData.connected;
      }
      if (topic === 'nodefest-2015/rhino/sync') {
        var paintData = JSON.parse(payload);
        Object.keys(paintData).forEach(function(order) {
          var target  = order.split(':');
          var orderId = target[0];
          var orderNo = target[1];

          var rhino = (orderId === 'p') ? that.rr.rhinoSVG1 : that.rr.rhinoSVG2;
          var data  = paintData[order];
          rhino.paint(orderNo, data.color, data.timestamp);
        });
      }
    },
    paint: function(order, myColor, now) {
      if (!this.isConnected) { return; }
      var paint = JSON.stringify({ color: myColor, timestamp: now });
      var payload = order + '@' + paint;
      this.client.publish('nodefest-2015/rhino/paint', payload);
    },
    play:  function() {
      this.rr.playAll();
      if (this._watchTimer === null) {
        this._watchStatus();
      }
    },
    pause: function() {
      this.rr.stopAll();
      if (this._watchTimer !== null) {
        this._unwatchStatus();
      }
    },
    _watchStatus: function() {
      var that = this;
      (function __loop() {
        var stat = that._getPaintStat();
        that.rs.updatePaintStat(stat.alpha, stat.bravo);
        that._watchTimer = requestAnimationFrame(__loop);
      }());
    },
    _unwatchStatus: function() {
      cancelAnimationFrame(this._watchTimer);
      this._watchTimer = null;
    },
    _getPaintStat: function() {
      var all   = this.rr.rhinoSVG1.getTileLength() + this.rr.rhinoSVG2.getTileLength();

      var stat1 = this.rr.rhinoSVG1.getPaintStatus();
      var stat2 = this.rr.rhinoSVG2.getPaintStatus();
      var alpha1 = COLORS.ALPHA in stat1 ? stat1[COLORS.ALPHA] : 0;
      var alpha2 = COLORS.ALPHA in stat2 ? stat2[COLORS.ALPHA] : 0;
      var bravo1 = COLORS.BRAVO in stat1 ? stat1[COLORS.BRAVO] : 0;
      var bravo2 = COLORS.BRAVO in stat2 ? stat2[COLORS.BRAVO] : 0;

      var alphaNum = ((alpha1 + alpha2) / all) * 100;
      var bravoNum = ((bravo1 + bravo2) / all) * 100;

      return {
        alpha: alphaNum.toFixed(1),
        bravo: bravoNum.toFixed(1)
      };
    }
  };

  global.NF.RP = RhinoPaintoon;

}(window));
