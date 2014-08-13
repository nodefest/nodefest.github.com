/**
 * @author yomotsu / https://github.com/yomotsu/PeriodicEventEmitter
 */

;( function ( global ) {

  'use strict';

  var instances = [];
  
  var loop = function () {
    
    var i, l, instance, elapsed ,count;

    for ( i = 0, l = instances.length; i < l; i ++ ) {

      instance = instances[ i ];

      if ( instance.isSleeping ) {

        continue;

      }

      instance.elapsedTime = +new Date() - instance.startTime;
      count = Math.floor( instance.elapsedTime / instance.period );
    
      if ( count !== instance.count ) {
    
        instance.count = count;
        instance.dispatchEvent( { type: 'period', count: instance.count } );
    
      }

    }

    if ( instances.length !== 0 ) {

      requestAnimationFrame( loop );

    }
  
  };
  
  global.PeriodicEventEmitter = function ( period ) {

    this.startTime = +new Date();
    this.elapsedTime = 0;
    this.period = period;
    this.count = 0;
    this.isSleeping = false;
    this.uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function ( c ) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString( 16 );
    } );

    instances.push( this );

    if ( instances.length === 1 ) {

      loop();

    }

  };

  global.PeriodicEventEmitter.prototype = {

    constructor: global.PeriodicEventEmitter,

    delete: function () {

      var i, l;

      for ( i = 0, l = instances.length; i < l; i ++ ) {

        if ( this.uuid === instances[ i ].uuid ) {

          instances.splice( i, 1 );
          break;

        }

      }

    },

    reset: function () {

      this.startTime = +new Date();
      this.count = 0;

    },

    sleep: function () {

      this.isSleeping = true;
      
    },

    awake: function () {

      this.isSleeping = false;
      
    },

    // https://github.com/mrdoob/eventdispatcher.js
    addEventListener: function ( type, listener ) {

      if ( this._listeners === undefined ) this._listeners = {};

      var listeners = this._listeners;

      if ( listeners[ type ] === undefined ) {

        listeners[ type ] = [];

      }

      if ( listeners[ type ].indexOf( listener ) === - 1 ) {

        listeners[ type ].push( listener );

      }

    },

    dispatchEvent: function ( event ) {
        
      if ( this._listeners === undefined ) return;

      var listeners = this._listeners;
      var listenerArray = listeners[ event.type ];

      if ( listenerArray !== undefined ) {

        event.target = this;

        var array = [];
        var length = listenerArray.length;

        for ( var i = 0; i < length; i ++ ) {

          array[ i ] = listenerArray[ i ];

        }

        for ( var i = 0; i < length; i ++ ) {

          array[ i ].call( this, event );

        }

      }

    },

  };

} )( this );
