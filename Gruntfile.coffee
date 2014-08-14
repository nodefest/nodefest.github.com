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
  grunt.task.loadNpmTasks 'grunt-contrib-watch'

  grunt.initConfig

    clean:
      build:
        src: ['build/']

    assemble:
      options:
        partials: ['src/includes/**/*.hbs']
        layout: ['src/layouts/default.hbs']
        flatten: true
      site:
        src: ['src/tmpls/*.hbs']
        dest: 'build/'

    concat:
      css:
        src: ['build/css/main.css', 'build/css/nav.css', 'build/css/icons.css']
        dest: 'build/css/style.css'
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
        dest: 'build/js/lib.js'
      jsapp:
        src: [
          'src/js/main.js'
          'src/js/NF14.view3d.js'
        ]
        dest: 'build/js/app.js'

    uglify:
      jsapp:
        files:
          'build/js/app.min.js': ['build/js/app.js']
      jslib:
        options:
          preserveComments: 'all'
        files:
          'build/js/lib.min.js': ['build/js/lib.js']

    sass:
      main:
        files:
          'build/css/main.css': 'src/scss/main.scss'

    csscomb:
      css:
        files:
          'build/css/style.css': 'build/css/style.css'

    csso:
      css:
        files:
          'build/css/style.min.css': 'build/css/style.css'

    sprite:
      nav:
        src: 'src/sprite_img/nav/*.png'
        destImg: 'build/img/nav.png'
        destCSS: 'build/css/nav.css'
      icons:
        src: 'src/sprite_img/icons/*.png'
        destImg: 'build/img/icons.png'
        destCSS: 'build/css/icons.css'

    image:
      all:
        files: [{
          expand: true,
          cwd: 'build/img/'
          src: ['*.{png,jpg,gif,svg}'],
          dest: 'build/img/'
        }]

    copy:
      build:
        files: [
          expand: true
          cwd: 'src/static/'
          src: '**'
          dest: 'build/'
        ]

    watch:
      js:
        files: ['src/js/*.js']
        tasks: ['concat:jsapp', 'uglify:jsapp']
      css:
        files: ['src/scss/*.scss']
        tasks: ['sass', 'sprite', 'concat', 'csscomb', 'csso']
      assemble:
        files: ['src/includes/*.hbs', 'src/layouts/default.hbs', 'src/tmpls/*.hbs']
        tasks: ['assemble']

  grunt.registerTask 'build:js', ['concat:jslib', 'concat:jsapp', 'uglify:jslib', 'uglify:jsapp']
  grunt.registerTask 'build:css', ['sass', 'sprite', 'image', 'concat:css', 'csscomb', 'csso']
  grunt.registerTask 'build', ['clean', 'assemble', 'copy', 'build:js', 'build:css']
  grunt.registerTask 'default', ['watch']
