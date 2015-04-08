module.exports = function(grunt) {
  grunt.initConfig({
    sass_files: [{
      expand: true,
      src: '**/*.scss',
      dest: 'build/css/',
      ext:  '.css'
    }],

    css_files: [{
      expand: true,
      cwd: 'build/css/',
      src: '**/*.css'
    }],

    sass: {
      dist: {
        files: ['<%= sass_files %>']
      },
      options: {
        style: 'expanded'
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie > 7']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'build/css/*.css',
        dest: 'build/autoprefixed/'
      }
    },

    cssmin: {
      minify: {
        expand: true,
        flatten: true,
        src: ['build/autoprefixed/*.css'],
        dest: './',
        ext: '.min.css'
      },
      options: {
        shorthandCompacting: false,
        processImport: true,
        sourceMap: true
      }
    },

    clean: {
      build: ['build/', '.sass-cache'],
      stylesheets: ['*.min.css', '*.min.css.map']
    },

    watch: {
      options: {
        livereload: true,
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        }
      },

      scripts: {
        files: ['Gruntfile.js', '**/*.scss'],
        tasks: ['clean:stylesheets', 'sass', 'autoprefixer', 'cssmin', 'clean:build']
      }
    }
  });

  grunt.registerTask('default', ['clean:stylesheets', 'sass', 'autoprefixer', 'cssmin', 'clean:build']);
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
