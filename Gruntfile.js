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
      serverTest: {
        files: ['server/**/*.js'],
        tasks: ['newer:jshint:server', 'sync', 'cafemocha:test']
      },
      clientTest: {
        files: ['client/{app,test}/**/*.js'],
        tasks: ['newer:jshint:client']
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
      client: {
        src: [
          'gruntfile.js',
          'client/{app,test}/**/*.js'
        ]
      },
      server: {
        src: [
          'gruntfile.js',
          'server/**/*.js'
        ]
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
  grunt.registerTask('test', [ 'env:test', 'watch' ]);
  grunt.registerTask('serve', [ 'env:development' ]);
};
