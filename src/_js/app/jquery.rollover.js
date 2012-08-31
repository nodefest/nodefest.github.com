jQuery.fn.rollover = function() {
  return this.each(function() {
    var $img = $(this);

    var img = new Image();
    img.src = $img.attr('src').replace(/_n/,'_r');

    $img.on('mouseover', function(){
      var src = $img.attr('src');
      $img.attr('src', src.replace(/_n/,'_r'));
    });

    $img.on('mouseout', function() {
      var src = $img.attr('src');
      $img.attr('src', src.replace(/_r/,'_n'));
    });
  });
};
