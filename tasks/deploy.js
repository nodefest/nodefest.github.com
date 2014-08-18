'use strict';

var chain = require('chain-tiny');
var exec = require('child_process').exec;
var util = require('./util');
var sh = util.sh;
var chdir = util.chdir;

module.exports = function(grunt) {
  grunt.registerTask('deploy', 'deploy to the repository', function() {
    var config = grunt.config.getRaw('deploy');
    var done = this.async();

    chain(function() {
      // 最新のsha1を取得
      var next = this.next;

      exec('git log -n 1 --oneline', function(err, stdout) {
        var sha1 = stdout.trim().split(/\s/)[0];
        next(null, sha1);
      });
    })
    .chain(function(sha1) {
      // コミットしてpush
      var next = this.next;
      var data = { sha1: sha1 };
      var message = grunt.template.process(config.message, { data: data });

      chdir(config.dir, function(done) {
        var dryrun = config.dryrun ? '--dry-run ' : '';
        sh([
          'git add -A',
          'git commit -m \'' + message + '\'',
          'git push ' + dryrun + 'origin ' + config.branch,
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
