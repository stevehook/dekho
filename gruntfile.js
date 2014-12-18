'use strict';

var db = require('./models');

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
        tasks: ['newer:jshint:all', 'env:test', 'sync', 'cafemocha:test'],
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
    sync: {
      options: {}
    }
  });
  grunt.registerTask('sync', 'uses sequelize to setup the database schema', function() {
    var done = this.async();
    db.sequelize.sync({ force: true }).complete(function(err) {
      if (err) { throw err[0]; }
      done();
    });
  });
  grunt.registerTask('test', [ 'env:test', 'sync', 'cafemocha:test' ]);
  grunt.registerTask('serve', [ 'env:development', 'watch' ]);
};
