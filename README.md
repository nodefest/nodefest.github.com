# Nodefest 2013

## 開発環境構築

grunt-cliとbundlerをインストール。

    $ gem install bundler
    $ npm install -g grunt-cli

gemとnpmのモジュールをインストール。

    $ bundle install --path vendor/bundle
    $ npm install

開発サーバーを起動。

    $ grunt server

`http://localhost:3000/2013/`で確認できる。

## ディレクトリ構成

    .
    ├── build             # ビルドしたファイルが出力される
    │   └── ...
    ├── data              # サイトのデータ
    │   ├── news.yml
    │   ├── session.yml
    │   ├── speaker.yml
    │   └── sponsor.yml
    ├── src               # ソースファイル
         ├── tmpls        #   - handlebarsのテンプレート
         ├── partials     #   - テンプレートのパーシャル
         ├── scss         #   - scss
         └── static       #   - ビルドを必要としない静的ファイル（そのままbuild以下にコピーされる）

## タスク

### grunt build （デフォルトタスク）

    $ grunt build

    or

    $ grunt

`src`以下のファイルをコンパイルして`build`ディレクトリに出力する。

### grunt server

    $ grunt server

`src`と`data`ディレクトリをwatchしつつ、開発用サーバーを立ち上げる。

デフォルトは3000番ポートでサーバーが立ち上がる。ポートは環境変数で変更可能。

    $ PORT=4000 grunt server

### grunt publish

    $ grunt publish

本番サイトにアップするタスク。

ビルドしたファイルを`nodefest/nodefest.github.com`リポジトリの`master`ブランチの`2013`ディレクトリにコピーしてpushする。

ビルド結果のファイルの内、アンダースコアから始まるディレクトリ、ファイルはデプロイされない。
