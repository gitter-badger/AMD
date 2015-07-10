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
        files: ['bower.json'],
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
//HACK to trick shitty npm publish
// rename .git directory so that npm version will not create tags
// after that rename it back
// UPDATE: node module needs to use module.exports...which i am not using it
// TODOS:
// - find a way to deploy to both places in the same time ( bower, node )
// - include in deployment process a task to run tests and to abort deployment if tests are failing
// - include a task to automaticaly create changelogs based on commits - https://github.com/lalitkapoor/github-changes
  grunt.registerTask('build:tests:qunit', ['concat:qunit']);
  grunt.registerTask('build:prod', ['uglify']);

  grunt.registerTask('deploy:commit', ['uglify', 'bump-commit']);
  grunt.registerTask('deploy:tests', ['bump-only:patch', 'uglify']);
  grunt.registerTask('deploy:patch', ['bump-only:patch', 'deploy:commit']);
  grunt.registerTask('deploy:minor', ['bump-only:minor', 'deploy:commit']);
  grunt.registerTask('deploy:major', ['bump-only:major', 'deploy:commit']);
  grunt.registerTask('deploy',       ['deploy:patch']);

  grunt.registerTask('default', ['build:prod']);

};