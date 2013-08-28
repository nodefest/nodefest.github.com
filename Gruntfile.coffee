module.exports = (grunt) ->
  
  grunt.task.loadNpmTasks 'assemble'
  grunt.task.loadNpmTasks 'grunt-contrib-sass'
  grunt.task.loadNpmTasks 'grunt-contrib-watch'
  grunt.task.loadNpmTasks 'grunt-contrib-connect'

  grunt.initConfig

    assemble:
      options:
        partials: 'src/partials/*.hbs'
        data: 'data/*.yml'
      dist:
        files:
          '2013/': 'src/tmpls/*.hbs'

    sass:
      options:
        bundleExec: true
      dist:
        files:
          '2013/assets/css/style.css': 'src/scss/style.scss'

    connect:
      options:
        port: process.env.PORT || 3000

    watch:
      sass:
        files: 'src/scss/*'
        tasks: 'sass'
      assemble:
        files: ['data/*', 'src/tmpls/*', 'src/partials/*']
        tasks: 'assemble'

  grunt.registerTask 'build', ['sass', 'assemble']
  grunt.registerTask 'server', ['build', 'connect', 'watch']
  grunt.registerTask 'default', ['build']
