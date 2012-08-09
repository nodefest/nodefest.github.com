# nodefest frontend

## setup

rubyはインストールされている前提。1.9.3推奨。それより古くても動くかもしれないけど確認はしてません。

bundlerをインストールしてください。

    $ gem install bundler

rake setupしてください。

    $ cd path/to/repo
    $ rake setup

rake serverでサーバーが起動します。

    $ rake server

デフォルトのポートは4000でポートを指定する場合は

    $ rake server PORT=3000

としてください。
