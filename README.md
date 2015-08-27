# nodefest 2015

## ToDo
- [ ] 以下の参考リンクの内容が更新されたら対応
- [ ] 未完成なまま公開するならそれらしくする
- [ ] モバイル対応

## Getting Started
```
$ npm install
$ bower install
```

### How To Use
プレビューするだけなら、

```
$ gulp serve
```

結合、圧縮など、本番と同じファイルを生成してプレビューするなら、

```
$ gulp serve:dist
```

## 参考リンク
- [登壇者情報](https://docs.google.com/spreadsheets/d/148BfYGgkvHoDzYMf40bOV2IRFPbSeKs3JJjIkjB-TOE/edit#gid=0)
- [スケジュール情報](https://gist.github.com/yosuke-furukawa/af376641216e4d30e605#file-NodeFest%202015%20time%20schedule-md)

## テキストの修正について
本サイト内のいくつかの部分（以下のリスト）のテキストは、単一のファイルを修正することで文言の変更が可能です。

- All / Sponsors
- About / News
- About / Featured Speakers
- Schedule / 予定の表
- Speakers / 海外登壇者
- Speakers / 登壇者

`/app/scripts/text.js`を修正すると、これらの内容を変更できます。

## デプロイについて
このリポジトリで作業した内容を、どうやって本番反映するかです。

[nodefest](https://github.com/nodefest/nodefest.github.com)リポジトリの`master`にpushすることで反映されます。

pushされると同時に本番公開されちゃうので、そこだけご注意！

`2015`というディレクトリ配下に置いたファイルに、`nodefest.jp/2015/`としてアクセスできるようになります。

以下のコマンドを実行すると、`2015`ブランチの`dist`の内容が、`master`ブランチの`2015`ディレクトリにコピーされます。

```
$ npm run deploy
```
