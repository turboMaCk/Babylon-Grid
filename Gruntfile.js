module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dev: {
				files: [{
					expand: true,
					cwd: 'src/sass',
					src: ['*.{scss, sass}'],
					dest: 'dist/css',
					ext: '.css'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src/sass',
					src: ['*.{scss, sass}'],
					dest: 'dist/css',
					ext: '.css'
				}],
				options: {
					style: 'compressed'
				}
			}
		},
		jshint: {
			scripts: ['src/javascript/jquery.babylongrid.js'],
			gruntfile: ['Gruntfile.js']
		},
		uglify: {
			scripts: {
				files: [{
				expand: true,
				cwd: 'src/javascript/',
				src: '*.js',
				dest: 'dist/js'
			}]
			}
		},
		connect: {
			server: {
				options: {
					hostname: '127.0.0.1',
					port: 1337,
					base: 'demo'
				}
			}
		},
		watch: {
			scripts: {
				files: 'src/javascript/jquery.babylongrid.js',
				tasks: ['jshint:scripts'],
			},
			sass: {
				files: 'src/sass/*.{sass, scss}',
				tasks: ['sass:dev']
			},
			statics: {
				files: 'demo/index.html',
				tasks: []
			},
			options: {
				livereload: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('dev', ['jshint', 'sass:dev']);
	grunt.registerTask('serve', ['dev', 'connect:server', 'watch']);
	grunt.registerTask('server', ['serve']);
	grunt.registerTask('dist', ['jshint', 'sass:dist', 'uglify:scripts']);
	grunt.registerTask('default', ['dist']);
};
