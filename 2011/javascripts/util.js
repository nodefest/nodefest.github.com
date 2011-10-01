function listShuffle(id) {
  var list = $('#' + id)
    , items = $('li[class!=top]', list)
    , firstItem = $('.first', list)
    , length = items.length
    , i;

  var ary = [];
  for (i = 0; i < length; ++i) {
    ary.push(i);
  }

  i = length;
  while(i){
    var j = Math.floor(Math.random()*i);
    var t = ary[--i];
    ary[i] = ary[j];
    ary[j] = t;
  }

  list.html('');
  for (i = 0; i < length; ++i) {
    list.append(items.get(ary[i]));
  }

  if (firstItem.length > 0) {
    list.prepend(firstItem);
  }
}