module.exports = (grunt) ->
  
  grunt.task.loadNpmTasks 'assemble'
  grunt.task.loadNpmTasks 'grunt-contrib-sass'

  grunt.initConfig

    assemble:

      options:
        partials: 'partials/*.hbs'

      pages:
        options:
          data: 'data/*.yml'

        files: [
          {
            src: 'pagesrc/index.hbs'
            dest: '2013/index.html'
          },
          {
            src: 'pagesrc/sessions.hbs'
            dest: '2013/sessions.html'
          },
          {
            src: 'pagesrc/speakers.hbs'
            dest: '2013/speakers.html'
          },
          {
            src: 'pagesrc/sponsors.hbs'
            dest: '2013/sponsors.html'
          },
          {
            src: 'pagesrc/access.hbs'
            dest: '2013/access.html'
          }
        ]

    sass:
      dist:
        options:
          bundleExec: true
        files:
          '2013/assets/css/style.css': 'scss/style.scss'

  grunt.registerTask 'build', [
    'sass'
    'assemble'
  ]

  grunt.registerTask 'default', [
    'build'
  ]

