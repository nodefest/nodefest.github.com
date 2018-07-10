# nodefest.github.com

これは、[東京Node学園祭公式サイト](https://nodefest.jp)のリポジトリです。

## リポジトリの歩き方

- GitHub Pagesでホストされています
  - そのため、`master`にマージされたものは、即本番に公開されます
- 各年ごとにディレクトリが切られています
- ルートにある`index.html`は、各年のサイトへリダイレクトするためだけに存在します

## 開発
```sh
npm i
npm start
```

これでサーバーが立ち上がり、プレビューできます。
cssやjsの開発は、各年度ディレクトリ配下で個別に用意して実行してください。（HMRや自動リロードなどは、現状の作りだとできません・・）

## ブランチ

```
- master
  - feat/201x
    - feat/201x-foo
  - patch/foo
```

Pull Requestはもちろん歓迎ですが、[Slackのチャンネル](https://iojs-jp-slack.herokuapp.com/)でお声がけいただけるとさらに嬉しいです！
