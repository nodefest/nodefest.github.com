(function(global) {
  'use strict';

  global.NF = global.NF || {};

  global.NF.TEXT = {
    NEWS: [
      // 上が新しいやつ
      { date: '2015-08-31', text: '<a href="http://goo.gl/forms/66JmdMXiU6">セッション・LT登壇希望者の募集</a>を開始しました。' },
      { date: '2015-08-31', text: '公式サイトを本公開しました。' }
    ],
    SPONSORS: [
      // 左端から順に
      {
        name:  'Kaizen Platform, Inc.',
        desc:  'Webサイト & Ad 最適化のSaaS "Kaizen Platform" を開発・運営する企業です。<br>Node.js はバックエンドのサーバーはもちろん、各種 JavaScript のビルド、CSS を含むアセットの管理などに多用しており、当社システムの基幹部分を支える重要なプラットフォームになっています。',
        thumb: './images/sponsors/kaizenplatform.svg',
        url:   'https://kaizenplatform.com/'
      },

      // 必ずKaizenが先頭！！
      {
        name:  '株式会社ドワンゴ',
        desc:  '株式会社ドワンゴは、ゲームや音楽をはじめとするエンタテインメント分野において、次世代ネットワークコミュニケーションの創出を目指す、ネットワーク・エンタテインメント・カンパニーです。約5,000万人の登録ユーザー数を誇る国内最大級の動画サイト「niconico（ニコニコ動画）」の運営をはじめ、モバイル向け音楽配信、ゲームソフト及びオンラインゲームの企画・開発・販売などを行っています。高度なネットワーク技術と独創的な発想を強みに、良質なコンテンツを様々なプラットフォームに提供しています。',
        thumb: './images/sponsors/dwango.png',
        url:   'http://dwango.co.jp/'
      },
      {
        name:  'グリー株式会社',
        desc:  'グリーは、ソーシャル・ネットワーキング・サービス（SNS）GREEを創業事業とし、世界初のモバイルソーシャルゲームを開発するなど、日本のモバイルインターネットサービスを牽引してきました。現在は、ビジネスの軸をスマートデバイス向けにシフトしながら、ゲーム事業、コマース・ライフスタイル事業、コミュニティ・メディア事業、広告事業、投資事業を展開しており、「インターネットを通じて、世界をより良くする。」をミッションとした総合インターネット企業への進化を目指しています。',
        thumb: './images/sponsors/gree.svg',
        url:   'http://corp.gree.net/jp/ja/'
      },
      {
        name:  '株式会社ディー・エヌ・エー',
        desc:  '',
        thumb: './images/sponsors/dena.svg',
        url:   'https://dena.com/jp/'
      }
      // {
      //   name:  'スポンサー募集中',
      //   desc:  '「東京Node学園祭 2015」は2015年11月7日に開催される、Node.jsについての日本最大のカンファレンスです。 協賛を希望される方は、「<a href="https://docs.google.com/document/d/1dOl3jbuHrUclLFqIZBWytk2l-A84ZjSBoJk1Mr30918/edit">スポンサーシップのご案内</a>」をご確認の上、<a href="https://docs.google.com/forms/d/1fhgchPhfK1bBk_nGZLcAXK5mM4u6f1sQB28kyRAL_Ks/viewform">「東京Node学園祭 2015」 協賛申込書</a>」からお申込みください。',
      //   thumb: './images/sponsors/dummy.png',
      //   url:   'https://docs.google.com/forms/d/1fhgchPhfK1bBk_nGZLcAXK5mM4u6f1sQB28kyRAL_Ks/viewform'
      // }
    ],

    SCHEDULE: {
      // 上から順に
      ORDER: [
        {
          time: '09:00 - 10:00',
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
          thumb: './images/speakers/yosuke_furukawa.jpg',
          title: 'Greeting, Notice',
          speakers: [
            {
              url: 'http://twitter.com/yosuke_furukawa',
              name: '@yosuke_furukawa'
            },
            {
              url: 'http://twitter.com/tito_net',
              name: '@tito_net'
            }
          ]
        },
        s2: {
          thumb: './images/speakers/nodeschool.png',
          title: 'NodeSchool in Japan',
          speakers: [
            {
              url: 'http://nodeschool.io/',
              name: 'NodeSchool mentors'
            }
          ]
        },
        s3: {
          thumb: './images/speakers/dummy.png',
          title: 'NodeDiscussion',
          speakers: [
            // {
            //   url: 'http://twitter.com/jacob',
            //   name: '@jacob'
            // },
            // {
            //   url: 'http://twitter.com/mikeal',
            //   name: '@mikeal'
            // },
            // {
            //   url: 'http://twitter.com/rvagg',
            //   name: '@rvagg'
            // },
            // {
            //   url: 'http://twitter.com/domenic',
            //   name: '@domenic'
            // }
          ]
        },
        s4: {
          thumb: './images/speakers/domenic.jpg',
          title: '基調講演',
          speakers: [
            {
              url: 'http://twitter.com/domenic',
              name: '@domenic'
            }
          ]
        },
        s5: {
          thumb: './images/speakers/rvagg.jpg',
          title: '調整中',
          speakers: [
            {
              url: 'http://twitter.com/rvagg',
              name: '@rvagg'
            }
          ]
        },
        s6: {
          thumb: './images/speakers/dummy.png',
          title: '調整中',
          speakers: []
        },
        s7: {
          thumb: './images/speakers/dshaw.png',
          title: '調整中',
          speakers: [
            {
              url: 'http://twitter.com/dshaw',
              name: '@dshaw'
            }
          ]
        },
        s8: {
          thumb: './images/speakers/dummy.png',
          title: '調整中',
          speakers: []
        },
        s9: {
          thumb: './images/speakers/maybekatz.jpg',
          title: '調整中',
          speakers: [
            {
              url: 'http://twitter.com/maybekatz',
              name: '@maybekatz'
            }
          ]
        },
        s10: {
          thumb: './images/speakers/dummy.png',
          title: '調整中',
          speakers: []
        },
        s11: {
          thumb: './images/speakers/kosamari.jpg',
          title: '調整中',
          speakers: [
            {
              url: 'http://twitter.com/kosamari',
              name: '@kosamari'
            }
          ]
        },
        s12: {
          thumb: './images/speakers/dummy.png',
          title: '調整中',
          speakers: []
        },
        s13: {
          thumb: './images/speakers/dummy.png',
          title: '調整中',
          speakers: []
        },
        s14: {
          thumb: './images/speakers/dummy.png',
          title: '調整中',
          speakers: []
        },
        s15: {
          thumb: './images/speakers/dummy.png',
          title: '調整中',
          speakers: []
        },
        s16: {
          thumb: './images/speakers/dummy.png',
          title: '調整中',
          speakers: []
        },
        s17: {
          thumb: './images/speakers/yosuke_furukawa.jpg',
          title: 'Closing message',
          speakers: [
            {
              url: 'http://twitter.com/yosuke_furukawa',
              name: '@yosuke_furukawa'
            }
          ]
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
          thumb: './images/speakers/domenic.jpg',
          desc: 'Domenic Denicola is a software engineer on the Google Chrome team. His job is to advance the  state-of-the-art in web platform technology, coordinating, prototyping, implementing, and standardizing APIs to driving the web forward. Domenic serves on the Ecma TC39 committee in charge of standardizing JavaScript and is the editor of the <a href="http://streams.spec.whatwg.org/" target="_blank">Streams Standard</a>. In his free time he contributes to the Node.js and jsdom projects.'
        },
        {
          name: 'Kat Marchán',
          twitter: 'maybekatz',
          thumb: './images/speakers/maybekatz.jpg',
          desc: 'Is one of the CLI engineers at npm, Inc. She previously specialized in JavaScript web applications, and was a contributor for the CanJS web framework. Within JavaScript land, Kat likes build and automation tooling, ES6/ES2015, and web-based edge technologies like web components. Beyond that, she loves distributed system architectures, Lisp, compilers and programming language theory, and taking selfies.'
        },
        {
          name: 'Rod Vagg',
          twitter: 'rvagg',
          thumb: './images/speakers/rvagg.jpg',
          desc: 'Rod Vagg is Chief Node Officer at NodeSource. Rod is known for his work across the Node.js ecosystem, including in the the Node.js databases community and for the creation of key NodeSchool workshoppers. He is passionate about Node.js and its future as a wide-spread, general-purpose and enterprise programming platform. This passion has lead to his involvement in io.js as a way to reinvigorate the core of Node.js and bring it in alignment with the future of JavaScript. Under the new converged Node.js Foundation, Rod represents the TSC (Technical Steering Committee) to the Foundation\'s board.'
        },
        {
          name: 'Mariko Kosaka',
          twitter: 'kosamari',
          thumb: './images/speakers/kosamari.jpg',
          desc: 'Mariko Kosaka is an engineer who loves data and knitting. When she is not making software at Scripto, she uses code to help her design textiles & organize local javascrict meetup in New York City called BrooklynJS.'
        },
      ]
    }
  };
})(window);
