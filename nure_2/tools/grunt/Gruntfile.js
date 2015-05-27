module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Compress and concat js files.
		uglify: {
			options: {
				mangle: false,
				compress: false
			},
			concat: {
				files: {
					'<%= buildPath %>nure.min.js': [
						'<%= appPath %>ood/js/inheritance.js',
                        '<%= appPath %>ood/js/polymorphism.js',
                        '<%= appPath %>ood/js/encapsulation.js'
					]
				}
			}
		},

		// Compress and concat css files.
		//recess: {
		//	dist: {
		//		options: {
		//			compress: true
		//		},
		//		files: {
		//			'<%= buildPath %>nure.min.css': [
		//				'<%= assetPath %>css/normalize.css',
		//				'<%= assetPath %>css/splashScreen.css'
		//			]
		//		}
		//	}
		//},

		// Compress html files.
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'<%= buildPath %>index.html': '<%= buildPath %>index.html'
				}
			}
		},

		// Process tech comments in html files.
		processhtml: {
	        dev: {
	          files: {
	            '<%= buildPath %>index.html': ['<%= appPath %>ood/index.html']
	          }
	        }
	    },

		// Check code style rules.
		jshint: {
            options: {
                jshintrc: '../jshint/.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '<%= appPath %>{,*/}*.js',
                '<%= appPath %>ood/js/*.js',
                '!<%= appPath %>js/*.min.js',
                '!<%= appPath %>js/*.min.map.js'
            ]
        },

//        jsdoc: {
//            api: {
//                src: ['<%= appPath %>/js/main.js'],
//                options: {
//                    destination: '<%= docsPath %>'
//                }
//            }
//        },
//        watch: {
//            js: {
//                files: ['<%= appPath %>/js/{,*/}*.js', '<%= appPath %>/*.html', '<%= appPath %>/stylesheets/*.css'],
//                tasks: ['jshint:src'],
//                options: {
//                    livereload: true
//                }
//            },
//            livereload: {
//                options: {
//                    livereload: '<%= connect.server.options.livereload %>'
//                }
//            }
//        },

        // Path variables.
		assetPath: '../../assets/',
		appPath: '../../src/',
		buildPath: '../../build/',
		docsPath: '../../doc/',
		rootPath: '../../'
	});

	// Load the plugins that provides the "default" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-recess');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-processhtml');

	// Grunt task(s).
    grunt.registerTask('check', function() {
        grunt.log.writeln('Grunt works!');
    });
    grunt.registerTask('default', [
		'check'
	]);

    grunt.registerTask('style', [
        'jshint'
    ]);

    grunt.registerTask('build', [
        'jshint',
        'uglify',
        'processhtml',
        'htmlmin'
    ]);
};
