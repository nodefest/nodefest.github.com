(function(global) {
  'use strict';

  global.NF = global.NF || {};

  global.NF.TEXT = {
    NEWS: [
      // 上が新しいやつ
      { date: '2015-09-01', text: '公式サイトを本公開しました。' },
      { date: '2015-08-31', text: 'ティーザーサイトを公開しました。' }
    ],
    SPONSORS: [
      // 左端から順に
      {
        name:  '株式会社ピクセルグリッド',
        desc:  'ピクセルグリッドはJavaScriptの会社です。HTML5やCSS3といった技術も合わせたWebアプリケーションのフロントエンド開発をもっとも得意としています。また、サーバー技術としてだけでなく、フロントエンド開発のインフラとしてもNode.jsを積極的に活用。さらに、自社で運営するフロントエンド開発者のための技術情報配信サービス「<a href="http://app.codegrid.net">CodeGrid</a>」では、Node.js関連の情報発信も活発に行っています。',
        thumb: 'http://dummyimage.com/220x160',
        url:   'http://www.pxgrid.com/'
      },
      {
        name:  '株式会社ピクセルグリッドゥーン',
        desc:  'ピクセルグリッドゥーンです',
        thumb: 'http://dummyimage.com/220x160',
        url:   'http://www.pxgrid.com/'
      },
    ],

    SCHEDULE: {
      // 上から順に
      ORDER: [
        {
          time: '9:00 - 10:00',
          type: 1,
          content: ['f1']
        },
        {
          time: '10:00 - 10:05',
          type: 2,
          content: ['s1']
        },
        {
          time: '10:05 - 10:20',
          type: 1,
          content: ['f2']
        },
        {
          time: '10:20 - 12:00',
          type: 2,
          content: ['s2', 's3']
        },
        {
          time: '12:00 - 13:00',
          type: 1,
          content: ['f3']
        },
        {
          time: '13:00 - 13:45',
          type: 2,
          content: ['s4']
        },
        {
          time: '13:45 - 14:00',
          type: 1,
          content: ['f2']
        },
        {
          time: '14:00 - 14:30',
          type: 2,
          content: ['s5', 's6']
        },
        {
          time: '14:30 - 15:00',
          type: 2,
          content: ['s7', 's8']
        },
        {
          time: '15:00 - 15:15',
          type: 1,
          content: ['f2']
        },
        {
          time: '15:15 - 15:45',
          type: 2,
          content: ['s9', 's10']
        },
        {
          time: '15:45 - 16:15',
          type: 2,
          content: ['s11', 's12']
        },
        {
          time: '16:15 - 16:30',
          type: 1,
          content: ['f2']
        },
        {
          time: '16:30 - 17:00',
          type: 2,
          content: ['s13', 's14']
        },
        {
          time: '17:00 - 17:30',
          type: 2,
          content: ['s15', 's16']
        },
        {
          time: '17:30 - 17:45',
          type: 1,
          content: ['f2']
        },
        {
          time: '17:45 - 18:45',
          type: 3,
          content: ['lt']
        },
        {
          time: '18:45 - 18:55',
          type: 2,
          content: ['s17']
        },
        {
          time: '18:55 - 19:25',
          type: 1,
          content: ['f4']
        }
      ],
      CONTENT: {
        f1: '開場 / Open',
        f2: '休憩 / Break',
        f3: '昼食 / Lunch',
        f4: '終了 / Close',
        s1: {
          thumb: 'http://www.gravatar.com/avatar/488f250a73526954e447cb39669615c8.png?s=256',
          title: 'まずあたしの歌を聞いて！',
          url:   'http://twitter.com/tacamy',
          name:  '@tacamy'
        },
        s2: {
          thumb: 'https://pbs.twimg.com/profile_images/206948941/wall-e_400x400.jpg',
          title: 'Node.jsとわたし',
          url:   'http://twitter.com/yosuke_furukawa',
          name:  '@yosuke_furukawa'
        },
        s3: {
          thumb: 'http://www.gravatar.com/avatar/488f250a73526954e447cb39669615c8.png?s=256',
          title: 'いいからあたしの歌を聞いて！',
          url:   'http://twitter.com/tacamy',
          name:  '@tacamy'
        },
        s4: {
          thumb: 'http://www.gravatar.com/avatar/488f250a73526954e447cb39669615c8.png?s=256',
          title: 'いいからあたしの歌を聞いて！',
          url:   'http://twitter.com/tacamy',
          name:  '@tacamy'
        },
        s5: {
          thumb: 'http://www.gravatar.com/avatar/488f250a73526954e447cb39669615c8.png?s=256',
          title: 'いいからあたしの歌を聞いて！',
          url:   'http://twitter.com/tacamy',
          name:  '@tacamy'
        },
        s6: {
          thumb: 'http://www.gravatar.com/avatar/488f250a73526954e447cb39669615c8.png?s=256',
          title: 'いいからあたしの歌を聞いて！',
          url:   'http://twitter.com/tacamy',
          name:  '@tacamy'
        },
        s7: {
          thumb: 'http://www.gravatar.com/avatar/488f250a73526954e447cb39669615c8.png?s=256',
          title: 'いいからあたしの歌を聞いて！',
          url:   'http://twitter.com/tacamy',
          name:  '@tacamy'
        },
        s8: {
          thumb: 'http://www.gravatar.com/avatar/488f250a73526954e447cb39669615c8.png?s=256',
          title: 'いいからあたしの歌を聞いて！',
          url:   'http://twitter.com/tacamy',
          name:  '@tacamy'
        },
        s9: {
          thumb: 'http://www.gravatar.com/avatar/488f250a73526954e447cb39669615c8.png?s=256',
          title: 'いいからあたしの歌を聞いて！',
          url:   'http://twitter.com/tacamy',
          name:  '@tacamy'
        },
        s10: {
          thumb: 'http://www.gravatar.com/avatar/488f250a73526954e447cb39669615c8.png?s=256',
          title: 'いいからあたしの歌を聞いて！',
          url:   'http://twitter.com/tacamy',
          name:  '@tacamy'
        },
        s11: {
          thumb: 'http://www.gravatar.com/avatar/488f250a73526954e447cb39669615c8.png?s=256',
          title: 'いいからあたしの歌を聞いて！',
          url:   'http://twitter.com/tacamy',
          name:  '@tacamy'
        },
        s12: {
          thumb: 'http://www.gravatar.com/avatar/488f250a73526954e447cb39669615c8.png?s=256',
          title: 'いいからあたしの歌を聞いて！',
          url:   'http://twitter.com/tacamy',
          name:  '@tacamy'
        },
        s13: {
          thumb: 'http://www.gravatar.com/avatar/488f250a73526954e447cb39669615c8.png?s=256',
          title: 'いいからあたしの歌を聞いて！',
          url:   'http://twitter.com/tacamy',
          name:  '@tacamy'
        },
        s14: {
          thumb: 'http://www.gravatar.com/avatar/488f250a73526954e447cb39669615c8.png?s=256',
          title: 'いいからあたしの歌を聞いて！',
          url:   'http://twitter.com/tacamy',
          name:  '@tacamy'
        },
        s15: {
          thumb: 'http://www.gravatar.com/avatar/488f250a73526954e447cb39669615c8.png?s=256',
          title: 'いいからあたしの歌を聞いて！',
          url:   'http://twitter.com/tacamy',
          name:  '@tacamy'
        },
        s16: {
          thumb: 'http://www.gravatar.com/avatar/488f250a73526954e447cb39669615c8.png?s=256',
          title: 'いいからあたしの歌を聞いて！',
          url:   'http://twitter.com/tacamy',
          name:  '@tacamy'
        },
        s17: {
          thumb: 'http://www.gravatar.com/avatar/488f250a73526954e447cb39669615c8.png?s=256',
          title: 'いいからあたしの歌を聞いて！',
          url:   'http://twitter.com/tacamy',
          name:  '@tacamy'
        },
        lt: [
          // 上から順に
          // ここだけなぜこうなってるかって？聞くだけ野暮だぜ！
          { title: 'LT1', 'twitter': 'hoge' },
          { title: 'LT2', 'twitter': 'hoge' },
          { title: 'LT3', 'twitter': 'hoge' },
          { title: 'LT4', 'twitter': 'hoge' },
          { title: 'LT5', 'twitter': 'hoge' },
          { title: 'LT6', 'twitter': 'hoge' }
        ]
      }
    },

    SPEAKERS: {
      DOMESTIC: [
        // 左端・上から順に
        { name: 'なまえ', twitter: 'hogehoge', job: 'CEO', thumb: 'http://dummyimage.com/224', desc: 'にゃー' },
        { name: 'なまえ', twitter: 'hogehoge', job: 'CEO', thumb: 'http://dummyimage.com/224', desc: 'ぬーん' },
        { name: 'なまえ', twitter: 'hogehoge', job: 'CEO', thumb: 'http://dummyimage.com/224', desc: 'ぽえーん' }
      ],
      OVERSEAS: [
        // 左端・上から順に
        {
          name: 'Domenic Denicola',
          twitter: 'domenic',
          job: 'TODO',
          thumb: './images/speakers/domenic.jpg',
          desc: 'Domenic Denicola is a software engineer on the Google Chrome team. His job is to advance the  state-of-the-art in web platform technology, coordinating, prototyping, implementing, and standardizing APIs to driving the web forward. Domenic serves on the Ecma TC39 committee in charge of standardizing JavaScript and is the editor of the <a href="http://streams.spec.whatwg.org/" target="_blank">Streams Standard</a>. In his free time he contributes to the Node.js and jsdom projects.'
        },
        {
          name: 'Kat Marchán',
          twitter: 'maybekatz',
          job: 'TODO',
          thumb: './images/speakers/maybekatz.jpg',
          desc: 'Is one of the CLI engineers at npm, Inc. She previously specialized in JavaScript web applications, and was a contributor for the CanJS web framework. Within JavaScript land, Kat likes build and automation tooling, ES6/ES2015, and web-based edge technologies like web components. Beyond that, she loves distributed system architectures, Lisp, compilers and programming language theory, and taking selfies.'
        },
        {
          name: 'Rod Vagg',
          twitter: 'rvagg',
          job: 'TODO',
          thumb: './images/speakers/rvagg.jpg',
          desc: 'Rod Vagg is Director of Engineering with NodeSource. Rod is known for his work across the Node.js ecosystem, including in the the Node.js databases community and for the creation of key NodeSchool workshoppers. He is passionate about Node.js and its future as a wide-spread, general-purpose and enterprise programming platform. This passion has lead to his involvement in io.js as a way to reinvigorate the core of Node.js and bring it in alignment with the future of JavaScript. Under the new converged Node.js Foundation, Rod represents the TSC (Technical Steering Committee) to the Foundation\'s board.'
        },
      ]
    }
  };
})(window);

