module.exports = function(grunt) {
	grunt.initConfig({
		sass: {

		},
		jshint: {

		},
		uglify: {

		},
		connect: {

		},
		watch: {

		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('dev', []);
	grunt.registerTask('serve', []);
	grunt.registerTask('server', ['serve']);
	grunt.registerTask('dist', []);
	grunt.registerTask('default', ['dist']);
};
