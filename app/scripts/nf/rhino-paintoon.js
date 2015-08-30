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

  var RhinoPaintoon = function() {
    var colors = Object.keys(COLORS);
    var rand = ( Math.random() * colors.length )|0;
    this.myColorRGB = COLORS[colors[ rand ]];
    this.myColor = RhinoRenderer.hexToRGBArray(this.myColorRGB);
    this.rr = new RhinoRenderer(this.myColor);
    this.rs = new RhinoStatus();

    this.isConnected = false;
    this.client = mqtt.connect('ws://222.158.218.158', {
      clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8) + '@' + this.myColorRGB
    });
    this.client.on('connect', this._onConnect.bind(this));

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
        that.rr.rhinoSVG1.paint( order, that.myColor, now );
        that.paint('p:' + order, that.myColor, now);
        new InkEffect( that.myColor, e.pageX, e.pageY );
      });
      eve.on( 'rhino2.click', function ( e, order ) {
        var now = Date.now();
        that.rr.rhinoSVG2.paint( order, that.myColor, now );
        that.paint('c:' + order, that.myColor, now);
        new InkEffect( that.myColor, e.pageX, e.pageY );
      });
    },
    _onConnect: function() {
      this.isConnected = true;
      this.client.on('message', this._onMessage.bind(this));
      this.client.subscribe('nodefest-2015/+/sync');
    },
    _onMessage: function(topic, payload) {
      if (topic === 'nodefest-2015/client/sync') {
        var clientData = JSON.parse(payload);
        var stat = this._getClientStat(clientData);
        this.rs.updateClientStat(stat.alpha, stat.bravo);
      }
      if (topic === 'nodefest-2015/rhino/sync') {
        var paintData = JSON.parse(payload);
        Object.keys(paintData).forEach(function(order) {
          var target  = order.split(':');
          var orderId = target[0];
          var orderNo = target[1];

          var rhino = (orderId === 'p') ? this.rr.rhinoSVG1 : this.rr.rhinoSVG2;
          var data  = paintData[order];
          rhino.paint(orderNo, data.color, data.timestamp);
        }, this);
      }
    },
    paint: function(order, color, now) {
      if (!this.isConnected) { return; }
      var paint = JSON.stringify({ color: color, timestamp: now });
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
    _getClientStat: function(data) {
      return {
        alpha: data[COLORS.ALPHA] || 0,
        bravo: data[COLORS.BRAVO] || 0
      };
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
