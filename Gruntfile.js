var matchdep = require('matchdep');

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
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: '%VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: true,
        prereleaseName: false,
        regExp: false
      }
    }

  });

  // load all grunt plugins from node_modules folder
  matchdep.filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  // Default task(s).
  grunt.registerTask('build:tests:qunit', ['concat:qunit']);
  grunt.registerTask('build:prod', ['uglify']);
  grunt.registerTask('deploy', ['bump-only:patch', 'uglify', 'bump-commit']);
  grunt.registerTask('default', ['build:prod']);

};