module.exports = function(grunt) {
  grunt.registerTask('watch', [ 'watch' ]);

  grunt.initConfig({
    compass: {
      dist: {
        options: {
          sassDir: '.',
          cssDir: 'build/',
          outputStyle: 'compressed'
        }
      }
    },
    haml: {
      dist: {
        expand: true,
        flatten : true,
        src: '*.haml',
        dest: 'build/',
        ext: '.html'
      },
    },
    uglify: {
      dist: {
        files: [{
          'build/player.min.js': ['player.js']
        }]
      },
    },
    watch: {
      options: {
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at ' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        },
      },
      css: {
        files: '*.sass',
        tasks: 'compass'
      },
      html: {
        files: '*.haml',
        tasks: 'haml'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-haml');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['compass', 'haml', 'uglify']);
};