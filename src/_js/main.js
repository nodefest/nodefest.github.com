$(function() {
  $('img[src*=_n]').rollover();

  $.LazyJaxDavis(function(router) {
    var $content = $('.mod-pageBody-main');

    router.bind('everyfetchstart', function(page) {
      window.scrollTo(0, 0);
      $content.css('opacity', 0.6);
    });

    router.bind('everyfetchsuccess', function(page) {
      var newcontent = page.rip('content');
      var $newcontent = $(newcontent).hide();
      $content.css('opacity', 1).empty().append($newcontent); 
      $newcontent.slideDown();
      page.trigger('pageready');
    });
  });

  //Nodefest.Model.Avatar.images = [
  //  './img/avatar1.gif',
  //  './img/avatar2.gif'
  //];

  //var avatars = new Nodefest.Collection.Avatars();

  //var avatarsField = new Nodefest.View.AvatarsField({
  //  collection: avatars,
  //  el: '.field'
  //});

  //avatars.createMe();
  //avatars.sync();
});
