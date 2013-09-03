( function ( $ ) {
  $( function () {

    // define the root of the main content

    new $.LazyJaxDavis( function ( router ) {

      var $root = $( '.mod-pageMain' );
      var $navItems = $( '.mod-nav li' );

      router.bind( 'everyfetchstart', function ( page ) {
        // $root.css( 'opacity', 0.6 );
        $root.addClass( 'mod-pageMain--changing' );
        $( 'html, body' ).animate( { scrollTop: 0 } );
      } );

      router.bind( 'everyfetchsuccess', function ( page ) {
        // $root.css( 'opacity', 1 );
        $newcontent = $( page.rip( 'content' ) ).hide();
        setTimeout( function () {
          $root.removeClass( 'mod-pageMain--changing' );
          $root.empty().append( $newcontent );
          $newcontent.fadeIn();
          page.trigger( 'pageready' );

          $navItems.each( function () {
            var $navItem = $( this );
            var href = $navItem.find( 'a' ).attr( 'href' );
            var url = document.URL;
            if ( new RegExp( href ).test( url ) ){
              $navItem.addClass( 'mod-nav--current' );
            } else {
              $navItem.removeClass( 'mod-nav--current' );
            }
          } );

        }, 200 );
      });

      router.bind( 'everyfetchfail', function () {
        // alert('ajax error!');
        // $root.css( 'opacity', 1 );
        $root.removeClass( 'mod-pageMain--changing' );
      } );

    } );

  } );
} )( jQuery );


( function ( $ ) {
  $( function () {
    $( '.mod-pagetop' ).on( 'click', function () {
      $( 'html, body' ).animate( { scrollTop: 0 } );
    } );
  } );
} )( jQuery );