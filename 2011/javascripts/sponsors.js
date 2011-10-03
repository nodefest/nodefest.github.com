var sponsors = {
  "platinum": [
    {
      "id": "dena",
      "name": "株式会社ディー・エヌ・エー",
      "logo": "dena.png",
      "description": "ディー・エヌ・エー（DeNA）は、日本、英語圏、中国語圏を中心としたワールドワイドのソーシャルゲームプラットフォーム「Mobage」を展開しています。その展開を支える技術 iOS/Android の両プラットフォームにワンソースでゲームを提供できるゲームエンジン「ngCore」の提供も行っています。「ngCore」は、Web 業界で働いている方には親しみのある言語、JavaScript を使ってアプリを開発できるほか、非エンジニアのための支援ツール、ライブラリ等も提供しています。ぜひダウンロードしてみてください。 <a href='https://developer.mobage.com'>https://developer.mobage.com</a>",
      "link": "http://dena.jp/"
    },
    {
      "id": "cyberagent",
      "name": "株式会社サイバーエージェント",
      "logo": "cyberagent.png",
      "description": "サイバーエージェントは1998年の創業以来、インターネットメディア事業、インターネット広告事業を中心に事業展開をする、インターネット総合サービス企業です。中でも、注力事業であるメディア「Ameba」はブログを中心にコミュニケーションサービス「アメーバピグ」などを展開し、2,500万人以上が利用する国内最大規模のインターネットメディアとなっています。2011年6月より開始し急速に利用者を集めている「ピグライフ」は世界最大規模の Node.js を用いた商用サービスとして注目されています。",
      "alt": "Ameba by CyberAgent アメブロ",
      "link": "http://ameblo.jp/"
    }
  ],

  "gold": [
  ],

  "silver": [
    {
      "id": "indi",
      "name": "株式会社インディソフトウェア",
      "logo": "indi.png",
      "description": "インディソフトウェアは「コンテンツを通じて世界をポジティブに」を合い言葉にコンテンツ・サービスの企画・開発を行っており、Nodeフレームワークであ るSocketStreamの採用実績もございます。",
      "link": "http://www.indi.co.jp/"
    },
    {
      "id": "pxgrid",
      "name": "株式会社ピクセルグリッド",
      "logo": "pxgrid.png",
      "description": "ピクセルグリッドはJavaScriptの会社です。Webアプリケーションのフロントエンド開発を得意としhtml5やCSS3といった技術を積極的に活用しています。node.jsの利用にも取り組んでいます。",
      "link": "http://www.pxgrid.com/"
    },
    {
      "id": "m3",
      "name": "エムスリー株式会社",
      "logo": "m3.png",
      "description": "エムスリー株式会社は20万人以上の医師が登録している日本最大規模の医療専門サイト <a href='http://www.m3.com'>m3.com</a> を中心に医療関連サービスを提供している会社です。Node.js on Herokuの運用実績があります。",
      "link": "http://corporate.m3.com/"
    }
  ],

  "supporter": [
    {
      "id": "yahoo",
      "name": "ヤフー株式会社",
      "logo": "yahoo.png",
      "description": "ヤフー株式会社が運営するYahoo! JAPANは、1か月あたり約5287万人のユニークカスタマー数※と、1日23億6500万ページビューのインターネットの総合情報サイトで、検索、コンテンツ、コミュニティー、コマース、モバイル、スマートフォンなど多くのサービスを提供しています。 ※Nielsen Online「NetView」、2011年7月、家庭もしくは職場からのアクセスによる。",
      "link": "http://www.yahoo.co.jp/",
      "order": 'first'
    },
    {
      "id": "joyent",
      "name": "Joyent",
      "logo": "joyent.png",
      "description": "Joyentは、開発者やエンタープライズ、サービスプロバイダに統合的な技術を提供する、世界的なクラウドコンピューティングソフトウェア及びサービスのプロバイダです。",
      "link": "http://www.joyent.com/"
    },
    {
      "id": "dqango",
      "name": "株式会社ドワンゴ",
      "logo": "dwango.png",
      "description": "株式会社ドワンゴは、ゲームや音楽をはじめとするエンタテインメント分野において、次世代ネットワークコミュニケーションの創出を目指す、ネットワーク・エンタテインメント・カンパニーです。",
      "link": "http://info.dwango.co.jp"
    },
    {
      "id": "fsv",
      "name": "ファーストサーバ株式会社",
      "logo": "fsv.png",
      "description": "ファーストサーバ株式会社は、レンタルサーバーサービスを主力とした、創業10年、8割以上が法人顧客の信頼と実績を誇る情報処理サービス事業者です。",
      "link": "http://www.fsv.jp/"
    }
  ]
};

function buildSponsosrArea(templateId) {
  var template = $('#' + templateId);
  template.tmpl(sponsors.platinum).appendTo('#platinumSponsors');
  template.tmpl(sponsors.gold).appendTo('#goldSponsors');
  template.tmpl(sponsors.silver).appendTo('#silverSponsors');
  template.tmpl(sponsors.supporter).appendTo('#supporters');

  listShuffle('platinumSponsors');
  listShuffle('goldSponsors');
  listShuffle('silverSponsors');
  listShuffle('supporters');
}