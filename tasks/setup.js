'use strict';

var chain = require('chain-tiny');
var util = require('./util');
var sh = util.sh;
var chdir = util.chdir;

module.exports = function(grunt) {
  grunt.registerTask('setup', 'setup for deploy', function() {
    var config = grunt.config('setup');
    var done = this.async();

    chain(function() {
      // デプロイ用のディレクトリがなければ対象のリポジトリをcloneしてくる
      var clone = grunt.template.process(
        'git clone -b <%= branch %> <%= repository %> <%= dir %>',
        { data: config }
      );

      if (!grunt.file.exists(config.dir + '/.git')) {
        sh(clone, this.next);
      }
      else {
        this.next(null);
      }
    })
    .chain(function() {
      // デプロイ対象のブランチを最新の状態にする
      var next = this.next;

      chdir(config.dir, function(done) {
        sh([
          'git fetch origin',
          'git reset --hard origin/' + config.branch,
          'git clean -fd'
        ], function(err) {
          done();
          next(err);
        });
      });
    })
    .end(function(err) {
      if (err) {
        grunt.fail.fatal(err);
      }
      else {
        done();
      }
    });
  });
};
