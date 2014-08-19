BUILD_DIR = 'build/2014'
DEPLOY_DIR = 'deploy'
DEPLOY_BRANCH = 'master'
DEPLOY_REPOSITORY = 'git@github.com:nodefest/nodefest.github.com.git'

module.exports = (grunt) ->

  grunt.task.loadNpmTasks 'grunt-contrib-clean'
  grunt.task.loadNpmTasks 'assemble'
  grunt.task.loadNpmTasks 'grunt-contrib-concat'
  grunt.task.loadNpmTasks 'grunt-contrib-uglify'
  grunt.task.loadNpmTasks 'grunt-contrib-sass'
  grunt.task.loadNpmTasks 'grunt-csscomb'
  grunt.task.loadNpmTasks 'grunt-csso'
  grunt.task.loadNpmTasks 'grunt-spritesmith'
  grunt.task.loadNpmTasks 'grunt-image'
  grunt.task.loadNpmTasks 'grunt-contrib-copy'
  grunt.task.loadNpmTasks 'grunt-notify'
  grunt.task.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadTasks 'tasks'

  grunt.initConfig

    clean:
      build:
        src: [BUILD_DIR]
      tmp:
        src: ['build/2014/_dest/']

    assemble:
      options:
        data: ['src/data/config.yml']
        partials: ['src/includes/**/*.hbs']
        layout: ['default.hbs']
        layoutdir: 'src/layouts'
      site:
        expand: true
        cwd: 'src/tmpls/'
        src: ['**/*.hbs', '!index.hbs']
        dest: BUILD_DIR
      index:
        expand: true
        options:
          layout: 'index.hbs'
        cwd: 'src/tmpls/'
        src: ['index.hbs']
        dest: BUILD_DIR

    concat:
      css:
        src: ["#{BUILD_DIR}/_dest/css/main.css", "#{BUILD_DIR}/_dest/css/nav.css", "#{BUILD_DIR}/_dest/css/icons.css"]
        dest: "#{BUILD_DIR}/css/style.css"
      jslib:
        src: [
          'bower_components/jquery/dist/jquery.min.js'
          'bower_components/jquery-easing/jquery.easing.min.js'
          'bower_components/EaseStepper/easestepper.min.js'
          'bower_components/jQuery.EaseScroller/jquery.easescroller.min.js'
          'bower_components/three.js/build/three.min.js'
          'bower_components/PeriodicEventEmitter/PeriodicEventEmitter.js'
          'bower_components/socket.io-client/socket.io.js'
        ]
        dest: "#{BUILD_DIR}/js/lib.js"
      jsapp:
        src: [
          'src/js/main.js'
          'src/js/NF14.view3d.js'
          'src/js/fireworks.js'
        ]
        dest: "#{BUILD_DIR}/js/app.js"

    uglify:
      jsapp:
        files: [{
          expand: true
          cwd: "#{BUILD_DIR}/js/"
          src: 'app.js'
          dest: "#{BUILD_DIR}/js/"
          ext: '.min.js'
        }]
      jslib:
        options:
          preserveComments: 'all'
        files: [{
          expand: true
          cwd: "#{BUILD_DIR}/js/"
          src: 'lib.js'
          dest: "#{BUILD_DIR}/js/"
          ext: '.min.js'
        }]

    sass:
      main:
        files: [{
          expand: true
          cwd: 'src/scss/'
          src: ['main.scss']
          dest: "#{BUILD_DIR}/_dest/css/"
          ext: '.css'
        }]

    csscomb:
      dynamic_mappings:
        expand: true
        cwd: "#{BUILD_DIR}/css/"
        src: ['style.css']
        dest: "#{BUILD_DIR}/_dest/css/"
        ext: '.css'

    csso:
      dynamic_mappings:
        expand: true
        cwd: "#{BUILD_DIR}/_dest/css/"
        src: ['style.css']
        dest: "#{BUILD_DIR}/css/"
        ext: '.min.css'

    sprite:
      nav:
        src: 'src/static/img/nav/*.png'
        destImg: "#{BUILD_DIR}/_dest/img/nav.png"
        destCSS: "#{BUILD_DIR}/_dest/css/nav.css"
      icons:
        src: 'src/static/img/icons/*.png'
        destImg: "#{BUILD_DIR}/_dest/img/icons.png"
        destCSS: "#{BUILD_DIR}/_dest/css/icons.css"

    image:
      all:
        files: [{
          expand: true,
          cwd: "#{BUILD_DIR}/img/"
          src: ['*.{png,jpg,gif,svg}']
          dest: "#{BUILD_DIR}/img/"
        }]

    copy:
      build:
        files: [
          expand: true
          cwd: 'src/static/'
          src: '**'
          dest: BUILD_DIR
        ]
      deploy:
        expand: true
        cwd: BUILD_DIR
        src: ['**/*', '!**/_**/*', '!**/_*'] # ignore files start with underscore.
        dest: "#{DEPLOY_DIR}/2014"
      image:
        files: [
          expand: true
          cwd: "#{BUILD_DIR}/_dest/img/"
          src: '**'
          dest: "#{BUILD_DIR}/img/"
        ]
      webcomponents:
        files: [
          expand: true
          cwd: 'bower_components/'
          src: [
            'platform/**',
            'polymer/**',
            'core-shared-lib/**',
            'google-apis/**',
            'google-map/**'
          ]
          dest: "#{BUILD_DIR}/webcomponents/"
        ]

    notify:
      watch:
        options:
          title: 'Nodefest 2014'
          message: '＼(^o^)／ｵﾜﾀ'

    watch:
      js:
        files: ['src/js/*.js']
        tasks: ['concat:jsapp', 'uglify:jsapp', 'notify']
      css:
        files: ['src/scss/*.scss']
        tasks: ['build:css', 'notify']
      assemble:
        files: ['src/**/*.hbs']
        tasks: ['assemble', 'notify']

    setup:
      repository: DEPLOY_REPOSITORY
      branch: DEPLOY_BRANCH
      dir: DEPLOY_DIR

    deploy:
      #dryrun: true
      branch: DEPLOY_BRANCH
      dir: DEPLOY_DIR
      message: 'Update 2014 with <%= sha1 %>'

  grunt.registerTask 'build:js', ['concat:jslib', 'concat:jsapp', 'uglify:jslib', 'uglify:jsapp']
  grunt.registerTask 'build:css', ['sass', 'sprite', 'concat:css', 'csscomb', 'csso']
  grunt.registerTask 'build', ['clean:build', 'assemble', 'build:js', 'build:css', 'copy:build', 'copy:image', 'copy:webcomponents', 'image', 'clean:tmp']
  grunt.registerTask 'publish', ['setup', 'build', 'copy:deploy', 'deploy']
  grunt.registerTask 'default', ['watch']
