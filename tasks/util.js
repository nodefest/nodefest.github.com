var grunt = require('grunt');
var chain = require('chain-tiny');
var shellQuote = require('shell-quote');
var colors = require('colors');

var util = module.exports;

// ワーキングディレクトリを変更する
// callback引数のdoneを呼ぶと元のディレクトリに戻る
//
// chdir('foo', function(done) {
//   sh('git commit -m "foo"', function() {
//     done();
//   });
// });
util.chdir = function util_chdir(dir, fn) {
  var cwd = process.cwd();

  grunt.log.writeln(('cd ' + dir).cyan);
  process.chdir(dir);

  fn(function done() {
    grunt.log.writeln('cd -'.cyan);
    process.chdir(cwd);
  });
};

// シェルコマンドを実行する
//
// sh('git add .', function(err, result) { ... });
// sh(['mkdir foo', 'touch foo/bar'], function(err, result) { ... });
util.sh = function util_sh(command, fn) {
  if (Array.isArray(command)) {
    chain.each(command, function(command) {
      util.sh(command, this.next);
    })
    .end(fn);
    return;
  }

  var opts = { stdio: 'inherit' };
  var args = shellQuote.parse(command);
  var cmd = args.shift();

  grunt.log.writeln(command.cyan);
  grunt.util.spawn({ cmd: cmd, args: args, opts: opts }, fn);
};
