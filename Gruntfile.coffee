module.exports = (grunt) ->
  
  grunt.task.loadNpmTasks 'assemble'
  grunt.task.loadNpmTasks 'grunt-contrib-sass'

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

  grunt.registerTask 'build', [
    'sass'
    'assemble'
  ]

  grunt.registerTask 'default', [
    'build'
  ]

