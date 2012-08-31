jQuery.fn.headerNavi = function() {
  var $imgs = this;

  $imgs.setCurrent = function() {
    var url = location.href;
    if (url.match(/\/$/)) url += 'index.html';

    var $img = $imgs.filter(function() {
      return url.match($(this).parent().attr('href'));
    });

    $imgs.each(function() {
      var $img = $(this);
      $img.attr('src', $img.data('orig-src'));
      $img.data('selected', false);
    });
    $img.data('selected', true);
    $img.attr('src', $img.data('select-src'));
  };

  return $imgs.each(function() {
    var $img = $(this);

    var origSrc;
    var hoverSrc;
    var selectSrc;

    var src = $img.attr('src');

    if (src.match(/_n\.png$/)) {
      origSrc = $img.attr('src');
      hoverSrc = origSrc.replace(/_n/,'_r');
      selectSrc = origSrc.replace(/_n/,'_a');
      (new Image()).src = selectSrc;
    }
    else {
      selectSrc = $img.attr('src');
      origSrc = selectSrc.replace(/_a/,'_n');
      hoverSrc = selectSrc.replace(/_a/,'_r');
      $img.data('selected', true);
      (new Image()).src = origSrc;
    }

    (new Image()).src = hoverSrc;

    // save
    $img.data('orig-src', origSrc);
    $img.data('hover-src', hoverSrc);
    $img.data('select-src', selectSrc);

    $img.on('mouseover', function() {
      if (!$img.data('selected')) {
        $img.attr('src', $img.data('hover-src'));
      }
    });

    $img.on('mouseout', function() {
      if (!$img.data('selected')) {
        $img.attr('src', $img.data('orig-src'));
      }
    });

    $img.on('click', function() {
      $imgs.setCurrent();
    });
  });
};
