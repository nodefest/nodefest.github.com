BUILD_DIR = 'build/2013'

module.exports = (grunt) ->
  
  grunt.task.loadNpmTasks 'assemble'
  grunt.task.loadNpmTasks 'grunt-contrib-sass'
  grunt.task.loadNpmTasks 'grunt-contrib-copy'
  grunt.task.loadNpmTasks 'grunt-contrib-clean'
  grunt.task.loadNpmTasks 'grunt-contrib-connect'
  grunt.task.loadNpmTasks 'grunt-contrib-watch'

  grunt.initConfig

    assemble:
      options:
        partials: 'src/partials/*.hbs'
        data: 'data/*.yml'
      dist:
        expand: true
        cwd: 'src/tmpls'
        src: '*.hbs'
        dest: BUILD_DIR

    sass:
      options:
        bundleExec: true
      dist:
        files: [
          src: 'src/scss/style.scss'
          dest: "#{BUILD_DIR}/assets/css/style.css"
        ]

    copy:
      dist:
        expand: true
        cwd: 'src/static'
        src: '**/*'
        dest: BUILD_DIR

    clean: [BUILD_DIR]

    connect:
      server:
        options:
          port: process.env.PORT || 3000
          base: './build'

    watch:
      assemble:
        files: ['data/*', 'src/tmpls/*', 'src/partials/*']
        tasks: 'assemble'
      sass:
        files: 'src/scss/*'
        tasks: 'sass'
      copy:
        files: 'src/static/**/*'
        tasks: 'copy'

  grunt.registerTask 'build', ['clean', 'sass', 'assemble', 'copy']
  grunt.registerTask 'server', ['build', 'connect', 'watch']
  grunt.registerTask 'default', ['build']
