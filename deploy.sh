#!/bin/sh
echo "Deploy start..."
echo ""
if [ -d deploy ]; then
  echo "[1] deployディレクトリ配下をを最新にします"
  cd deploy
  git fetch origin
  git reset --hard origin/master
  git clean -fd
  cd ..
else
  echo "[1] deployディレクトリがないので最新をcloneします"
  git clone -b master git@github.com:nodefest/nodefest.github.com.git deploy
fi

echo ""
echo "[2] gulp でdist配下にファイルをビルドします"
gulp

echo ""
echo "[3] ビルドしたファイルをコピーします"
mkdir -p deploy/2015
cp -rf dist/* deploy/2015

echo ""
echo "[4] コミットしてプッシュします"
cd deploy
git add -A
git commit -m "Update 2015 with `git rev-parse --short HEAD`"
git push origin master
cd ..

echo ""
echo "Deploy finish!"
