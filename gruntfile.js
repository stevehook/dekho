module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-cafe-mocha');
  grunt.loadNpmTasks('grunt-env');

  grunt.initConfig({
    env: {
      test: { NODE_ENV: 'TEST' }
    },
    cafemocha: {
      test: {
        src: 'test/*.js',
        options: {
          ui: 'bdd',
          reporter: 'spec'
        },
      }
    }
  });
  grunt.registerTask('test', [ 'env:test', 'cafemocha:test' ]);
};
