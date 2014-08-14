module.exports = (grunt) ->

  grunt.task.loadNpmTasks 'grunt-contrib-sass'
  grunt.task.loadNpmTasks 'grunt-contrib-concat'
  grunt.task.loadNpmTasks 'grunt-spritesmith'
  grunt.task.loadNpmTasks 'grunt-image'
  grunt.task.loadNpmTasks 'grunt-csso'
  grunt.task.loadNpmTasks 'grunt-csscomb'
  grunt.task.loadNpmTasks 'grunt-contrib-uglify'
  grunt.task.loadNpmTasks 'grunt-contrib-watch'

  grunt.initConfig

    concat:
      css:
        src: ['./_html/css/main.css', './_html/css/nav.css', './_html/css/icons.css']
        dest: './_html/css/style.css'
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
        dest: './_html/js/lib.js'
      jsapp:
        src: [
          '_html/js/main.js'
          '_html/js/NF14.view3d.js'
        ]
        dest: './_html/js/app.js'

    uglify:
      jsapp:
        files:
          './_html/js/app.min.js': ['./_html/js/app.js']
      jslib:
        options:
          preserveComments: 'all'
        files:
          './_html/js/lib.min.js': ['./_html/js/lib.js']

    sass:
      main:
        files:
          './_html/css/main.css': './_html/scss/main.scss'

    csscomb:
      css:
        files:
          './_html/css/style.css': './_html/css/style.css'

    csso:
      css:
        files:
          './_html/css/style.min.css': './_html/css/style.css'

    sprite:
      nav:
        src: './_html/img/nav/*.png'
        destImg: './_html/img/nav.png'
        destCSS: './_html/css/nav.css'
      icons:
        src: './_html/img/icons/*.png'
        destImg: './_html/img/icons.png'
        destCSS: './_html/css/icons.css'

    image:
      all:
        files:
          '_html/img/nav.png': '_html/img/nav.png'
          '_html/img/icons.png': '_html/img/icons.png'
          '_html/img/section__title.png': '_html/img/section__title.png'
          '_html/img/logo.svg': '_html/img/logo.svg'

    watch:
      js:
        files: [
          './_html/js/*.js'
          '!./_html/js/app.js'
          '!./_html/js/app.min.js'
          '!./_html/js/lib.js'
          '!./_html/js/lib.min.js'
        ]
        tasks: ['concat:jsapp', 'uglify:jsapp']
      css:
        files: ['./_html/scss/*.scss']
        tasks: ['sass', 'sprite', 'concat', 'csscomb', 'csso']

  grunt.registerTask 'build:js', ['concat:jslib', 'concat:jsapp', 'uglify:jslib', 'uglify:jsapp']
  grunt.registerTask 'build:css', ['sass', 'sprite', 'image', 'concat:css', 'csscomb', 'csso']
  grunt.registerTask 'build', ['build:js', 'build:css']
  grunt.registerTask 'default', ['watch']
