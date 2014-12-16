'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-cafe-mocha');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-newer');

  grunt.initConfig({
    env: {
      test: {
        NODE_ENV: 'test',
        PORT: 4001
      },
      development: {
        NODE_ENV: 'development',
        PORT: 4000
      }
    },
    cafemocha: {
      test: {
        src: 'test/*.js',
        options: {
          ui: 'bdd',
          reporter: 'spec'
        },
      }
    },
    watch: {
      js: {
        files: ['./{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          // livereload: '<%= connect.options.livereload %>'
        }
      },
      livereload: {
        // options: {
        //   livereload: '<%= connect.options.livereload %>'
        // },
        files: [
          'public/{,*/}*.html',
          'public/styles/{,*/}*.css',
          'public/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'gruntfile.js',
          '{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/{,*/}*.js']
      }
    },
  });
  grunt.registerTask('test', [ 'env:test', 'cafemocha:test' ]);
  grunt.registerTask('serve', [ 'env:development', 'watch' ]);
};
