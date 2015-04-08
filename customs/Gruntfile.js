module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      dist: {
        files: ['build/']
      }
    }
  });

  grunt.registerTask('clean', function() {
    grunt.config('clean')
    debugger
  })
};
