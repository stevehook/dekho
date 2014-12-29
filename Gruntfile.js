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
        PORT: 4001,
        JWT_SECRET: 'thisshouldbearealsecretinproduction'
      },
      development: {
        NODE_ENV: 'development',
        PORT: 4000,
        JWT_SECRET: 'thisshouldbearealsecretinproduction'
      }
    },
    cafemocha: {
      test: {
        src: 'server/test/*.js',
        options: {
          ui: 'bdd',
          reporter: 'spec'
        },
      }
    },
    watch: {
      js: {
        files: ['server/**/*.js'],
        tasks: ['newer:jshint:all', 'sync', 'cafemocha:test'],
        options: {
          // livereload: '<%= connect.options.livereload %>'
        }
      },
      livereload: {
        // options: {
        //   livereload: '<%= connect.options.livereload %>'
        // },
        files: [
          'server/public/{,*/}*.html',
          'server/public/styles/{,*/}*.css',
          'server/public/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
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
          jshintrc: 'server/test/.jshintrc'
        },
        src: ['server/test/{,*/}*.js']
      }
    },
    sync: {
      options: {}
    }
  });
  grunt.registerTask('sync', 'uses sequelize to setup the database schema', function() {
    var db = require('./server/models');
    var done = this.async();
    db.sequelize.sync({ force: true }).complete(function(err) {
      if (err) { throw err[0]; }
      done();
    });
  });
  grunt.registerTask('test-once', [ 'env:test', 'sync', 'cafemocha:test' ]);
  grunt.registerTask('test', [ 'test-once', 'watch' ]);
  grunt.registerTask('serve', [ 'env:development' ]);
};
