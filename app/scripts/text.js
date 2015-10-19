(function(global) {
  'use strict';

  global.NF = global.NF || {};

  global.NF.TEXT = {
    NEWS: [
      // 上が新しいやつ
      { date: '2015-10-08', text: '<a href="http://nodejs.connpass.com/event/20741/" target="_blank">参加者募集サイト</a>を公開しました' },
      { date: '2015-10-04', text: '<a href="#!/schedule">登壇者</a>が決定しました。' },
      { date: '2015-08-31', text: 'セッション・LT登壇希望者の募集を開始しました。' },
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
        desc:  '株式会社ドワンゴは、ゲームや音楽をはじめとするエンタテインメント分野において、次世代ネットワークコミュニケーションの創出を目指す、ネットワーク・エンタテインメント・カンパニーです。<br>約5,000万人の登録ユーザー数を誇る国内最大級の動画サイト「niconico（ニコニコ動画）」の運営をはじめ、モバイル向け音楽配信、ゲームソフト及びオンラインゲームの企画・開発・販売などを行っています。高度なネットワーク技術と独創的な発想を強みに、良質なコンテンツを様々なプラットフォームに提供しています。',
        thumb: './images/sponsors/dwango.svg',
        url:   'http://dwango.co.jp/'
      },
      {
        name:  'グリー株式会社',
        desc:  'グリーは、ソーシャル・ネットワーキング・サービス（SNS）GREEを創業事業とし、世界初のモバイルソーシャルゲームを開発するなど、日本のモバイルインターネットサービスを牽引してきました。<br>現在は、ビジネスの軸をスマートデバイス向けにシフトしながら、ゲーム事業、コマース・ライフスタイル事業、コミュニティ・メディア事業、広告事業、投資事業を展開しており、「インターネットを通じて、世界をより良くする。」をミッションとした総合インターネット企業への進化を目指しています。',
        thumb: './images/sponsors/gree.svg',
        url:   'http://corp.gree.net/jp/ja/'
      },
      {
        name:  '株式会社ディー・エヌ・エー',
        desc:  '1999年に創業した株式会社ディー・エヌ・エー（以下DeNA）はeコマース、ソーシャルゲームを中心に、モバイルサービスに特化した事業展開を行っています。近年ではキュレーションサービスの展開や、自動車やヘルスケアなどリアル巨大産業への進出をしています。<br>Delight and Impact the World<br>私たちのサービスで世界中の人々を喜ばせたい、楽しませたいという思いを込めて、「Delight」という言葉と「DeNA」の共通の頭文字である「D」をデライト・マークにすることで表現しました。<br>日本だけでなく世界中の人々に親しんでもらえる、価値あるサービスを創造していきたい。世界中の人々に親しんでもらえるような手書き風の書体にしたデザインには、そんな私たちの願いを込めています。<br>世界トップレベルのモバイル・インターネットのノウハウを持つDeNAが、世界中のお客様のニーズを深く理解し、新たな価値あるサービスをスピーディーに作り上げ、喜びと驚きを届けていきたいと考えています。',
        thumb: './images/sponsors/dena.svg',
        url:   'https://dena.com/jp/'
      },
      {
        name: '株式会社ピクセルグリッド',
        desc: '株式会社ピクセルグリッドはJavaScriptの会社です。<br>メンバーの多くは技術書籍の著書があり、講演をこなすフロントエンド・エンジニア。フロントエンド技術に特化し、JavaScriptとHTML5などの新しい技術を使った制作を得意としています。<br>Single Page Applicationのフロントエンド設計・実装、大規模Webサイトの設計・テンプレート制作、スマートフォン用のWebサービス、Webサイトの制作など気軽にご相談ください。',
        thumb: './images/sponsors/pxgrid.svg',
        url:   'http://www.pxgrid.com/'
      },
      {
        name:  '株式会社サイバーエージェント',
        desc:  'サイバーエージェントは1998年の創業以来、「21世紀を代表する会社を創る」をビジョンに掲げ、インターネット総合サービス企業としてビジネスを展開しています。加速度的に進むスマートフォン普及に伴い、数多くのスマートフォン向けサービスを開発。会員数4000万人を誇る国内最大規模の「Ameba」をはじめ、多数の人気ゲームやコミュニティサービスを提供するほか、音楽配信や動画関連サービスなど、エンターテインメント分野の事業にも挑戦しています。2014年9月に東証一部へ市場変更いたしましたが、ベンチャー企業として常に大きな成長に向けた挑戦を続けてまいります。',
        thumb: './images/sponsors/cyberagent.svg',
        url:   'https://www.cyberagent.co.jp/'
      },
      {
        name:  '株式会社パエリア',
        desc:  '株式会社パエリアは「ものづくりをはじめる人が生まれやすい世界を作る」をビジョンとする、IoTに関わるサービスを開発する会社です。<br>大規模モバイルサービスを開発していたメンバーが多く、サービスデザインやネットワークインフラ、アプリケーションの開発力を生かし、現在はハードウェアに関わる会社様と共にサービス開発を行っています。<br>新たにIoTに関わるサービスを開発してみたいのでソフトウェアについて相談したい、サービス設計を詰めたいがモバイルの知見が少ないので一緒に考えて欲しい、ハードウェアとソフトウェアの架け橋になってくれる立ち位置の人がいないなど、そのような場合はぜひお気軽にご連絡ください。',
        thumb: './images/sponsors/paeria.svg',
        url:   'http://paeria.co.jp/'
      },
      {
        name:  '日本マイクロソフト株式会社',
        desc:  '日本マイクロソフト株式会社は、マイクロソフト コーポレーションの日本法人です。マイクロソフトは、モバイル ファースト＆クラウド ファーストの世界におけるプラットフォームとプロダクティビティのリーディング カンパニーで、「Empower every person and every organization on the planet to achieve more.（地球上のすべての個人とすべての組織が、より多くのことを達成できるようにする）」を企業ミッションとしています。<br>日本マイクロソフトは、この企業ミッションに基づき、「革新的で、親しみやすく、安心でき、喜んで使っていただけるクラウドとデバイスを提供する会社」を目指しています。',
        thumb: './images/sponsors/microsoft.svg',
        url:   'https://azure.microsoft.com/ja-jp/'
      },
      {
        name:  'ユニバ株式会社',
        desc:  '渋谷区でウェブ制作を行っている、17名の小さなプロダクションです。<br>プロモーションや、キャンペーン、ブランディングの制作や、ウェブのシステム開発を行っています。特に、新しい製品のプロトタイプや実験的なイベントなど、技術的に新しい領域で積極的に活動しています。<br>現在は、サーバサイドのシステム、スマートフォンアプリ、デジタルサイネージ、ハードウェアの開発も行っています。 <br>ウェブを中心にしながら、年々ツールやアイディアをアップデートして、そのときにやりがいのある領域を求めて活動しています。<br>コマーシャルな領域以外には、ウェブ関連の技術勉強会を開催したり、Maker Fairへの参加、東京Node学園祭へのスポンサード、アートプロジェクトへの参加など、技術コミュニティやアートコミュニティの一員としての活動も積極的に行っています。',
        thumb: './images/sponsors/uniba.png',
        url:   'http://uniba.jp/'
      },
      {
        name:  'ニフティ株式会社',
        desc:  '「ニフティとなら、きっとかなう。」のコーポレートメッセージの元、「クラウド」「ネットワーク」「Webサービス」といった、モノのサービス化=IoTに必要となる「I」＝「インターネット側」のタスクについて一元的にサポートする「IoTデザインセンター」を開設しました。<br>国内だけではなく北米リージョン・中国での「鴻図雲（ホンツーユン）」を開設し月間稼働率99.99％を保証するIaaSに加え、NifMoというMVNO、アプリの開発工数を下げるmBaaSと合わせて企業やプロジェクトによるモノのサービス化を支援します。',
        thumb: './images/sponsors/nifty.png',
        url:   'http://iot.nifty.com/'
      },
      {
        name:  '株式会社リクルートテクノロジーズ',
        desc:  '株式会社リクルートテクノロジーズはリクルートグループのIT・ネットマーケティングテクノロジー開発機能会社です。<br>リクルートグループ各社のニーズを見据えて競合優位性の高いIT・ネットマーケティング基盤を開拓、実装することにより、競争優位を構築していきます。業界を驚かせるレベルでテクノロジーの開拓を行い、業界のルールをイノベーションによって変革して行きます。オープンソースを積極的に活用しており、リアルタイムWebの実現に向けNode.jsの導入などに取り組んでいます。',
        thumb: './images/sponsors/recruittech.png',
        url:   'http://recruit-tech.co.jp/'
      },
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
          time: '17:45 - 18:05',
          type: 3,
          content: ['lt']
        },
        {
          time: '18:05 - 18:45',
          type: 2,
          content: ['s17']
        },
        {
          time: '18:45 - 18:55',
          type: 2,
          content: ['s18']
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
          title: 'The State of JavaScript',
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
          thumb: './images/speakers/linda_pp.jpg',
          title: 'ウェブ初心者が Electron でフロントエンド入門した話',
          speakers: [
            {
              url: 'https://twitter.com/linda_pp',
              name: '@Linda_pp'
            }
          ]
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
          thumb: './images/speakers/azu_re.png',
          title: '技術文章をソフトウェア開発する話',
          speakers: [
            {
              url: 'https://twitter.com/azu_re',
              name: '@azu_re'
            }
          ]
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
          thumb: './images/speakers/kidach1.png',
          title: '大規模Node.jsを支えるロードバランスとオートスケールの独自実装',
          speakers: [
            {
              url:  'http://twitter.com/kidach1',
              name: '@kidach1'
            }
          ]
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
          thumb: './images/speakers/qsona.png',
          title: 'Node.jsでのゲームサーバ開発 愛すべきバッドノウハウ3選',
          speakers: [
            {
              url:  'http://twitter.com/qsona',
              name: '@qsona'
            }
          ]
        },
        s13: {
          thumb: './images/speakers/girlie_mac.jpg',
          title: 'Hardware Hacking for JavaScript Developers',
          speakers: [
            {
              url:  'http://twitter.com/girlie_mac',
              name: '@girlie_mac'
            }
          ]
        },
        s14: {
          thumb: './images/speakers/h13i32maru.jpg',
          title: 'ESDoc - ES6時代のドキュメンテーションツール -',
          speakers: [
            {
              url:  'http://twitter.com/h13i32maru',
              name: '@h13i32maru'
            }
          ]
        },
        s15: {
          thumb: './images/speakers/akito0107.jpg',
          title: 'Node.jsの運用の中で見えてきた課題と対策 〜大規模プッシュ通知基盤Pusna-RSの事例紹介〜',
          speakers: [
            {
              url:  'https://github.com/akito0107/',
              name: '伊藤 瑛'
            }
          ]
        },
        s16: {
          thumb: './images/speakers/amagitakayosi.jpg',
          title: 'フロントエンドに秩序を取り戻す方法 〜はてなブログ編集画面をリニューアルするためにやったこと〜',
          speakers: [
            {
              url:  'http://twitter.com/amagitakayosi',
              name: '@amagitakayosi'
            }
          ]
        },
        s17: {
          thumb: './images/speakers/dummy.png',
          title: 'スポンサーズトーク',
          speakers: [
            // {
            //   url: '',
            //   name: ''
            // }
          ]
        },
        s18: {
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
          { title: 'Nodeを使って', name: '我妻謙樹', url: '' },
          { title: 'Meteorでつくったアプリを運用してみた', name: '@besutome', url: 'http://twitter.com/besutome' },
          { title: 'unassert: JavaScript でも契約による設計で堅牢なプログラミングを行う', name: '@t_wada', url: 'http://twitter.com/t_wada' }
        ]
      }
    },

    SPEAKERS: {
      DOMESTIC: [
        // 左端・上から順に
        {
          name: '谷口 大樹',
          twitter: 'kidach1',
          thumb: './images/speakers/kidach1.png',
          desc: '株式会社アカツキ所属。Node.jsとDvorakキーボードが好き。Node/socket.ioをバックエンドとしたゲームの開発、運用をしています。<br>最近の趣味はAndroidアプリ開発。ReactiveExtensionsのノウハウがいい感じに活かせて（RxJava/RxAndroid）楽しいです。'
        },
        {
          name: 'Tomomi ❤ Imura',
          twitter: 'girlie_mac',
          thumb: './images/speakers/girlie_mac.jpg',
          desc: '元々は Front-end Engineer なのですが、たまにブラウザを離れたところで JavaScript で面白いことをしています。最近は Raspberry Pi で Node.js を使って猫カメラを作って Hacker News のトップページになったり、ガジェット系番組に出たりして話題になったのでいい気になっています。<br>職業は、サンフランシスコでリアルタイムデータストリームを提供する PubNub というスタートアップの Sr. Developer Evangelist をやっています。日本語がちょっと適当なのでその分は猫画像で補いますのでよろしくね。'
        },
        {
          name: 'アマギタカヨシ',
          twitter: 'amagitakayosi',
          thumb: './images/speakers/amagitakayosi.jpg',
          desc: '株式会社はてな、26歳新卒プログラマ。<br>主にJS、時々Perlを書いてます。<br>今年の目標はフロントエンド設計の最先端に追いつくこと。<br>普段はJSで音出したり画面光らせて喜んでます、よろしく🙏'
        },
        {
          name: '丸山 亮',
          twitter: 'h13i32maru',
          thumb: './images/speakers/h13i32maru.jpg',
          desc: 'クックパッド株式会社でプロダクトオーナー兼エンジニアとしてサービス開発をしています。個人ではESDocというES6向けのドキュメンテーションツールの開発とCodeLunch.fmというポッドキャストを配信しています。最近もっぱらドキュメントのことについて考えているので、その界隈がもりあがると良いなーと思っています。趣味は料理と民芸食器を集めることです。'
        },
        {
          name: '伊藤 瑛',
          twitter: '',
          thumb: './images/speakers/akito0107.jpg',
          desc: '2015年新卒で株式会社リクルートテクノロジーズに入社、Node製の大規模プッシュ通知基盤Pusna-RSの開発、運用をしています。<br>NodeはもとよりJavascriptをほとんど書いたことがない状態でプロジェクトに放り込まれ、日々、苦しみつつも楽しい毎日を送っています。<br>最近はkoaを使って面白便利なwebアプリを書くのにハマっています。'
        },
        {
          name: 'azu',
          twitter: 'azu_re',
          thumb: './images/speakers/azu_re.png',
          desc: 'ECMAScriptやJavaScriptを追っかけていて、JSer.infoというサイトをやっていたりします。<br>最近の趣味は技術書を書いていて、その中の文章やコードからどうやってtypoを減らすか考えることです。'
        }
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
          desc: 'Mariko Kosaka is an engineer who loves data and knitting. When she is not making software at Scripto, she uses code to help her design textiles & organize local JavaScript meetup in New York City called BrooklynJS.'
        },
      ]
    }
  };
})(window);
