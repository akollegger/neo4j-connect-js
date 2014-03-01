// Generated on 2014-02-16 using generator-isomod 0.1.2
'use strict';

module.exports = function (grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        expand: true,
        flatten: true,
        sourceMap: true,
        src: ['src/*.coffee', 'src/*.coffee.md'],
        dest: 'build/',
        ext: '.js'
      },
    },
    coffeelint: {
      app: ['src/*.coffee'],
      options: {
        'no_trailing_whitespace': {
          'level': 'ignore'
        },
        'max_line_length': {
          'value': 120
        }
      }
    },
    mochaTest: {
      all: {
        options: {
          ui: 'bdd',
          require: ['coffee-script', 'should'],
          reporter:'spec',
        },
        src: ['test/**/*.coffee']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'mochaTest']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'mochaTest']
      }
    },
    browserify: {
      basic: {
        src: ['build/neo4j-connect.js'],
        dest: 'dist/neo4j-connect.js',
        options: {
          standalone: 'Neo4jConnect',
          external: ['superagent']
        }
      }
    },
    clean: {
      build: ['dist', 'build', 'docs']
    },
    sync: {
      options: {
        include: ['name', 'version', 'main', 'dependencies']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['coffeelint', 'coffee', 'jshint', 'browserify', 'mochaTest']);

};
