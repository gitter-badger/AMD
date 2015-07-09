module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat:{
      qunit:{
        src:['tests/unit/**/*.js'],
        dest:'ephemeral/tests/tests.js'
      }
    },
    uglify: {
        options: {
            mangle:     true,
            compress:   true,
            banner:     '/* <%= pkg.name %> v<%= pkg.version %>  */'
        },
        prod:    {
            files: {
                'nucleo-amd.min.js': ['lib/main.js']
            }
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('build:tests:qunit', ['concat:qunit']);
  grunt.registerTask('build:prod', ['uglify']);
  grunt.registerTask('default', ['build:prod']);

};