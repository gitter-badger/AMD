module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat:{
      qunit:{
        src:['tests/unit/**/*.js'],
        dest:'ephemeral/tests/tests.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('build:tests:qunit', ['concat:qunit']);
  grunt.registerTask('default', ['babel']);

};