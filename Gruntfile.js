var matchdep = require('matchdep');

module.exports = function(grunt) {

  // load all grunt plugins from node_modules folder
  matchdep.filterAll('grunt-*').forEach(grunt.loadNpmTasks);

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

  grunt.registerTask('build:tests:qunit', ['concat:qunit']);
  grunt.registerTask('build:prod', ['uglify']);

  grunt.registerTask('deploy:commit', ['uglify', 'bump-commit']);
  grunt.registerTask('deploy:patch', ['bump-only:patch', 'deploy:commit']);
  grunt.registerTask('deploy:minor', ['bump-only:minor', 'deploy:commit']);
  grunt.registerTask('deploy:major', ['bump-only:major', 'deploy:commit']);
  grunt.registerTask('deploy',       ['deploy:patch']);

  grunt.registerTask('default', ['build:prod']);

};