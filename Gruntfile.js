module.exports = function(grunt) {
	require('jit-grunt')(grunt);

	grunt.initConfig({

		webpack: {
			intro: {
				// webpack options
				entry: './src/components/app.jsx',
				output: {
					path: 'assets/js',
					filename: 'app.js'
				},
				module: {
					loaders: [
						{
							test: /\.jsx?$/,
							exclude: /node_modules/,
							loader: 'babel-loader'
						}
					]
				},

				failOnError: true
			}
		},

		postcss: {
			options: {
				map: true,
				processors: [
					require('lost'),
					require('postcss-nested'),
					require('postcss-import'),
					require('postcss-brand-colors'),
					require('autoprefixer-core')({browsers: 'last 1 version'}),
					require('csswring')
				]
			},
			dist: {
				src: 'src/styles/app.css',
				dest: 'assets/styles/app.css'
			}
		},

		watch: {
			javascript: {
				files: [
					'src/components/**/*.js',
					'src/components/**/*.jsx'
				],
				tasks: ['webpack']
			},
			styles: {
				files: ['src/styles/app.css'],
				tasks: ['postcss']
			}
		}

	});

	grunt.registerTask('default', ['watch']);
}