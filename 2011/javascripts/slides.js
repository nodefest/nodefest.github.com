var slides = {
  "items": [
    {
      "title": "基調講演",
      "speaker": "Ryan Dahl",
      "link": "http://node.js",
    },
    {
      "title": "Beginner 向けライブコーディング（仮）",
      "speaker": "Jxck",
      "link": "http://www.slideshare.net/Jxck/nodejs-intro-5849386",
    },
    {
      "title": "Yahoo! JAPAN におけるNode.jsへの取り組み",
      "speaker": "調整中 (ヤフー株式会社)",
      "link": "http://www.slideshare.net/kishoreyekkanti/nodejs-5597417",
    },
    {
      "title": "調整中",
      "speaker": "名村卓 (株式会社サイバーエージェント)",
      "link": "http://www.slideshare.net/kishoreyekkanti/nodejs-5597417",
    },
    {
      "title": "調整中",
      "speaker": "調整中 (株式会社ディー・エヌ・エー)",
      "link": "http://www.slideshare.net/kishoreyekkanti/nodejs-5597417",
    },
    {
      "title": "Socket.IOについて (仮)",
      "speaker": "Guillermo Rauch",
      "link": "http://www.slideshare.net/kishoreyekkanti/nodejs-5597417",
    }
  ],

  build: function(target, templateLink, templateSlideShare) {
    templateLink = $(templateLink);
    templateSlideShare = $(templateSlideShare);

    $.each(slides.items, function(key, item) {
      if (item.link.match(/^http\:\/\/www\.slideshare\.net/)) {
        item.link = item.link.match(/[0-9]+$/);
        templateSlideShare.tmpl(item).appendTo(target);
      } else {
        templateLink.tmpl(item).appendTo(target);
      }
    });
  }
};
